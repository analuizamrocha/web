import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { parseCsv, stringifyCsv, csvToTsv } from './csv-utils.mjs'
import {
  OAUTH_AUDIENCE,
  OAUTH_SCOPE,
  DEFAULT_INPUT,
  DEFAULT_OUTPUT,
  DEFAULT_TSV_OUTPUT,
  DEFAULT_HISTORY,
  DEFAULT_SERPAPI_CURSOR_FILE,
  DEFAULT_GSC_ROW_LIMIT,
  DEFAULT_GSC_SEARCH_TYPE,
  DEFAULT_SERPAPI_LOCATION,
  DEFAULT_SERPAPI_LANGUAGE,
  DEFAULT_SERPAPI_COUNTRY,
  DEFAULT_SERPAPI_NUM_RESULTS,
  DEFAULT_SERPAPI_MAX_CALLS,
  DEFAULT_SERPAPI_OVERRIDE_RANK,
  DEFAULT_DB_BACKEND,
  TRACKING_REQUIRED_COLUMNS,
  HISTORY_COLUMNS,
  parseBoolean,
  formatISODate,
  dateWithOffset,
  toIsoTimestamp,
  normalizeText,
  normalizePath,
  extractDomain,
  domainMatches,
  formatRank,
  pickBestCandidate,
  chooseRowsForSerpApi,
  buildGscHistoryRow,
  buildSerpApiHistoryRow,
  mergeHistoryRowSchema,
} from './rank-tracking-core.mjs'
import { createRankRepository } from './rank-repository.mjs'

export function ensureDir(fsImpl, filePath) {
  const dir = path.dirname(filePath)
  if (!fsImpl.existsSync(dir)) {
    fsImpl.mkdirSync(dir, { recursive: true })
  }
}

export function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

export function createJwtAssertion({ clientEmail, privateKey }) {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const payload = {
    iss: clientEmail,
    scope: OAUTH_SCOPE,
    aud: OAUTH_AUDIENCE,
    iat: now,
    exp: now + 3600,
  }

  const headerEncoded = base64UrlEncode(JSON.stringify(header))
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload))
  const signingInput = `${headerEncoded}.${payloadEncoded}`

  const signer = crypto.createSign('RSA-SHA256')
  signer.update(signingInput)
  signer.end()

  const signature = signer.sign(privateKey)
  const signatureEncoded = base64UrlEncode(signature)

  return `${signingInput}.${signatureEncoded}`
}

export async function fetchAccessToken({ clientEmail, privateKey, fetchImpl = fetch }) {
  const assertion = createJwtAssertion({ clientEmail, privateKey })
  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  })

  const response = await fetchImpl(OAUTH_AUDIENCE, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Failed to get OAuth access token (${response.status}): ${details}`)
  }

  const data = await response.json()
  if (!data.access_token) {
    throw new Error('OAuth token response did not include access_token.')
  }

  return data.access_token
}

export async function fetchSearchConsoleRows({
  accessToken,
  siteUrl,
  startDate,
  endDate,
  searchType,
  rowLimit,
  fetchImpl = fetch,
}) {
  const rows = []
  let startRow = 0

  while (true) {
    const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        endDate,
        type: searchType,
        dataState: 'final',
        dimensions: ['query', 'page'],
        rowLimit,
        startRow,
      }),
    })

    if (!response.ok) {
      const details = await response.text()
      throw new Error(`Failed Search Console query (${response.status}): ${details}`)
    }

    const data = await response.json()
    const batch = Array.isArray(data.rows) ? data.rows : []

    for (const entry of batch) {
      const query = entry.keys?.[0] || ''
      const page = entry.keys?.[1] || ''
      if (!query || !page) continue

      rows.push({
        query,
        page,
        clicks: Number(entry.clicks || 0),
        impressions: Number(entry.impressions || 0),
        ctr: Number(entry.ctr || 0),
        position: Number(entry.position || 0),
      })
    }

    if (batch.length < rowLimit) break
    startRow += rowLimit
  }

  return rows
}

export async function fetchSerpApiResult({
  apiKey,
  keyword,
  location,
  language,
  country,
  numResults,
  targetDomain,
  fetchImpl = fetch,
}) {
  const params = new URLSearchParams({
    engine: 'google',
    q: keyword,
    api_key: apiKey,
    location,
    hl: language,
    gl: country,
    num: String(numResults),
  })

  const endpoint = `https://serpapi.com/search.json?${params.toString()}`
  const response = await fetchImpl(endpoint)

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`SerpAPI request failed (${response.status}): ${details}`)
  }

  const data = await response.json()
  if (data.error) {
    throw new Error(`SerpAPI error: ${data.error}`)
  }

  const organic = Array.isArray(data.organic_results) ? data.organic_results : []
  const topResult = organic[0] || null

  let ownResult = null
  for (let i = 0; i < organic.length; i += 1) {
    const item = organic[i]
    const domain = extractDomain(item.link || '')
    if (domainMatches(domain, targetDomain)) {
      ownResult = {
        ...item,
        resolvedPosition: Number(item.position || i + 1),
      }
      break
    }
  }

  const totalResults = data.search_information?.total_results

  return {
    topDomain: topResult ? extractDomain(topResult.link || '') : '',
    topTitle: topResult?.title || '',
    totalResults: Number.isFinite(totalResults) ? String(totalResults) : '',
    ownResult,
  }
}

export function loadSerpApiCursor(fsImpl, filePath) {
  if (!fsImpl.existsSync(filePath)) {
    return { index: 0, lastRun: null }
  }

  try {
    const raw = fsImpl.readFileSync(filePath, 'utf8')
    const parsed = JSON.parse(raw)
    return {
      index: Number(parsed.index || 0),
      lastRun: parsed.lastRun || null,
    }
  } catch {
    return { index: 0, lastRun: null }
  }
}

export function saveSerpApiCursor(fsImpl, filePath, cursor) {
  ensureDir(fsImpl, filePath)
  fsImpl.writeFileSync(
    filePath,
    JSON.stringify(
      {
        index: Number(cursor.index || 0),
        lastRun: cursor.lastRun || null,
      },
      null,
      2
    ),
    'utf8'
  )
}

export function loadHistory(fsImpl, filePath) {
  if (!fsImpl.existsSync(filePath)) {
    return {
      header: [...HISTORY_COLUMNS],
      rows: [],
    }
  }

  const existing = fsImpl.readFileSync(filePath, 'utf8')
  const parsed = parseCsv(existing)

  return {
    header: [...HISTORY_COLUMNS],
    rows: parsed.rows.map((row) => mergeHistoryRowSchema(row)),
  }
}

export function buildRankTrackingConfig({
  args = {},
  env = process.env,
  now = new Date(),
} = {}) {
  const defaultEnd = dateWithOffset(-3, now)
  const defaultStart = new Date(defaultEnd)
  defaultStart.setUTCDate(defaultStart.getUTCDate() - 27)
  const dbBackend = String(args['db-backend'] || env.RANK_DB_BACKEND || DEFAULT_DB_BACKEND)
    .trim()
    .toLowerCase()
  const dbRequiredDefault = dbBackend === 'supabase'

  return {
    input: args.input || env.RANK_INPUT_FILE || DEFAULT_INPUT,
    output: args.output || env.RANK_OUTPUT_FILE || DEFAULT_OUTPUT,
    tsvOutput: args['tsv-output'] || env.RANK_TSV_OUTPUT_FILE || DEFAULT_TSV_OUTPUT,
    historyFile: args.history || env.RANK_HISTORY_FILE || DEFAULT_HISTORY,
    rowLimit: Math.max(
      100,
      Number(args['row-limit'] || env.GSC_ROW_LIMIT || DEFAULT_GSC_ROW_LIMIT) ||
        DEFAULT_GSC_ROW_LIMIT
    ),
    searchType: String(args['search-type'] || env.GSC_SEARCH_TYPE || DEFAULT_GSC_SEARCH_TYPE),
    siteUrl: String(args['site-url'] || env.GSC_SITE_URL || '').trim(),
    clientEmail: String(args['client-email'] || env.GSC_CLIENT_EMAIL || '').trim(),
    privateKey: String(args['private-key'] || env.GSC_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    startDate: String(args['start-date'] || env.GSC_START_DATE || formatISODate(defaultStart)),
    endDate: String(args['end-date'] || env.GSC_END_DATE || formatISODate(defaultEnd)),
    timestamp: String(args.timestamp || env.RANK_TIMESTAMP || toIsoTimestamp(now)),
    serpApi: {
      apiKey: String(args['serpapi-key'] || env.SERPAPI_API_KEY || '').trim(),
      maxCalls: Math.max(
        0,
        Number(args['serpapi-max-calls'] || env.SERPAPI_MAX_CALLS_PER_RUN || DEFAULT_SERPAPI_MAX_CALLS) ||
          DEFAULT_SERPAPI_MAX_CALLS
      ),
      location: String(args['serpapi-location'] || env.SERPAPI_LOCATION || DEFAULT_SERPAPI_LOCATION),
      language: String(args['serpapi-language'] || env.SERPAPI_LANGUAGE || DEFAULT_SERPAPI_LANGUAGE),
      country: String(args['serpapi-country'] || env.SERPAPI_COUNTRY || DEFAULT_SERPAPI_COUNTRY),
      numResults: Math.min(
        100,
        Math.max(
          10,
          Number(args['serpapi-num-results'] || env.SERPAPI_NUM_RESULTS || DEFAULT_SERPAPI_NUM_RESULTS) ||
            DEFAULT_SERPAPI_NUM_RESULTS
        )
      ),
      cursorFile:
        args['serpapi-cursor-file'] || env.SERPAPI_CURSOR_FILE || DEFAULT_SERPAPI_CURSOR_FILE,
      overrideRank: parseBoolean(
        args['serpapi-override-rank'] || env.SERPAPI_OVERRIDE_RANK,
        DEFAULT_SERPAPI_OVERRIDE_RANK
      ),
    },
    db: {
      backend: dbBackend,
      required: parseBoolean(args['db-required'] || env.RANK_DB_REQUIRED, dbRequiredDefault),
      supabaseUrl: String(args['supabase-url'] || env.SUPABASE_URL || '').trim(),
      supabaseServiceRoleKey: String(
        args['supabase-service-role-key'] || env.SUPABASE_SERVICE_ROLE_KEY || ''
      ).trim(),
    },
  }
}

export function validateRankTrackingConfig(config) {
  if (!config.siteUrl) {
    throw new Error('Missing GSC_SITE_URL. Example: https://www.analuizarocha.com.br/')
  }
  if (!config.clientEmail) {
    throw new Error('Missing GSC_CLIENT_EMAIL environment variable.')
  }
  if (!config.privateKey) {
    throw new Error('Missing GSC_PRIVATE_KEY environment variable.')
  }

  const dbBackend = String(config?.db?.backend || DEFAULT_DB_BACKEND)
    .trim()
    .toLowerCase()
  if (!['none', 'supabase'].includes(dbBackend)) {
    throw new Error(`Unsupported RANK_DB_BACKEND: ${dbBackend}`)
  }

  if (dbBackend === 'supabase') {
    if (!config?.db?.supabaseUrl) {
      throw new Error('Missing SUPABASE_URL environment variable.')
    }
    if (!config?.db?.supabaseServiceRoleKey) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable.')
    }
  }
}

export async function runDbStep({ config, logger, stepName, task, fallbackValue = null }) {
  try {
    return await task()
  } catch (error) {
    const message = `DB step "${stepName}" failed: ${error.message}`
    if (config?.db?.required) {
      throw new Error(message)
    }

    logger.warn(message)
    return fallbackValue
  }
}

export async function runRankTrackingPipeline(config, deps = {}) {
  const fsImpl = deps.fsImpl || fs
  const logger = deps.logger || console
  const fetchImpl = deps.fetchImpl || fetch
  const now = deps.now || (() => new Date())

  const getAccessToken = deps.getAccessToken
    ? deps.getAccessToken
    : (params) => fetchAccessToken({ ...params, fetchImpl })
  const getSearchConsoleRows = deps.getSearchConsoleRows
    ? deps.getSearchConsoleRows
    : (params) => fetchSearchConsoleRows({ ...params, fetchImpl })
  const getSerpApiResult = deps.getSerpApiResult
    ? deps.getSerpApiResult
    : (params) => fetchSerpApiResult({ ...params, fetchImpl })

  validateRankTrackingConfig(config)
  const rankRepository =
    deps.rankRepository || createRankRepository(config, { fetchImpl, logger })

  const timestamp = config.timestamp || toIsoTimestamp(now())

  if (!fsImpl.existsSync(config.input)) {
    throw new Error(`Input file not found: ${config.input}`)
  }

  const inputCsv = fsImpl.readFileSync(config.input, 'utf8')
  const { header, rows } = parseCsv(inputCsv)

  for (const column of TRACKING_REQUIRED_COLUMNS) {
    if (!header.includes(column)) {
      throw new Error(`Missing required column "${column}" in ${config.input}`)
    }
  }

  const keywordIdByKeyword =
    (await runDbStep({
      config,
      logger,
      stepName: 'syncKeywords',
      task: async () => {
        if (!rankRepository) return new Map()
        return rankRepository.syncKeywords({ trackingRows: rows, timestamp })
      },
      fallbackValue: new Map(),
    })) || new Map()

  const urlToTitle = new Map()
  for (const row of rows) {
    const url = String(row["Your URL that's ranking"] || '').trim()
    const title = String(row['Your page title in search results'] || '').trim()
    if (url && title && !urlToTitle.has(url)) {
      urlToTitle.set(url, title)
    }
  }

  logger.log(`Fetching Search Console data for ${config.siteUrl}`)
  logger.log(`Date range: ${config.startDate} -> ${config.endDate}`)

  const accessToken = await getAccessToken({
    clientEmail: config.clientEmail,
    privateKey: config.privateKey,
  })

  const scRows = await getSearchConsoleRows({
    accessToken,
    siteUrl: config.siteUrl,
    startDate: config.startDate,
    endDate: config.endDate,
    searchType: config.searchType,
    rowLimit: config.rowLimit,
  })

  logger.log(`Fetched ${scRows.length} query/page rows from Search Console.`)

  const rowsByQuery = new Map()
  for (const scRow of scRows) {
    const key = normalizeText(scRow.query)
    if (!key) continue
    const list = rowsByQuery.get(key) || []
    list.push(scRow)
    rowsByQuery.set(key, list)
  }

  const history = loadHistory(fsImpl, config.historyFile)
  const historyRowsToAppend = []

  let foundCount = 0
  let notFoundCount = 0

  for (const row of rows) {
    const keyword = String(row.Keywords || '').trim()
    const expectedUrl = String(row["Your URL that's ranking"] || '').trim()
    const keywordKey = normalizeText(keyword)
    if (!keywordKey) continue

    const candidates = rowsByQuery.get(keywordKey) || []
    const best = pickBestCandidate(candidates, expectedUrl)

    if (!best) {
      row['Your actual rank (1-30+)'] = 'Not found (GSC period)'
      row.Timestamp = timestamp
      notFoundCount += 1

      historyRowsToAppend.push(
        buildGscHistoryRow({
          timestamp,
          startDate: config.startDate,
          endDate: config.endDate,
          keyword,
          rank: row['Your actual rank (1-30+)'],
          expectedPage: expectedUrl,
        })
      )

      continue
    }

    const matchedUrl = best.page
    const knownTitle = urlToTitle.get(matchedUrl)

    row['Your actual rank (1-30+)'] = formatRank(best.position)
    row["Your URL that's ranking"] = matchedUrl
    row['Your page title in search results'] =
      knownTitle || row['Your page title in search results'] || ''
    row.Timestamp = timestamp
    foundCount += 1

    historyRowsToAppend.push(
      buildGscHistoryRow({
        timestamp,
        startDate: config.startDate,
        endDate: config.endDate,
        keyword,
        rank: row['Your actual rank (1-30+)'],
        position: best.position,
        impressions: best.impressions,
        clicks: best.clicks,
        ctr: best.ctr,
        matchedPage: matchedUrl,
        expectedPage: expectedUrl,
      })
    )
  }

  const targetDomain = extractDomain(config.siteUrl)
  let serpSuccess = 0
  let serpFailures = 0
  let serpConsidered = 0

  if (config.serpApi.apiKey && config.serpApi.maxCalls > 0) {
    const cursor = loadSerpApiCursor(fsImpl, config.serpApi.cursorFile)
    const { selected, nextIndex, totalRows } = chooseRowsForSerpApi(
      rows,
      config.serpApi.maxCalls,
      cursor.index
    )
    serpConsidered = totalRows

    logger.log(
      `Running SerpAPI enrichment for ${selected.length} keyword(s) out of ${totalRows} (rotation index ${cursor.index}).`
    )

    for (const row of selected) {
      const keyword = String(row.Keywords || '').trim()
      const expectedUrl = String(row["Your URL that's ranking"] || '').trim()
      if (!keyword) continue

      try {
        const serp = await getSerpApiResult({
          apiKey: config.serpApi.apiKey,
          keyword,
          location: config.serpApi.location,
          language: config.serpApi.language,
          country: config.serpApi.country,
          numResults: config.serpApi.numResults,
          targetDomain,
        })

        row['Top ranking domain (competitor)'] =
          serp.topDomain || row['Top ranking domain (competitor)'] || ''
        row["Top result's title"] = serp.topTitle || row["Top result's title"] || ''
        row['Total search results'] = serp.totalResults || row['Total search results'] || ''
        row.Timestamp = timestamp

        if (serp.ownResult) {
          const serpPosition = Number(serp.ownResult.resolvedPosition || 0)
          const currentRank = String(row['Your actual rank (1-30+)'] || '')
          const shouldOverrideRank =
            config.serpApi.overrideRank ||
            currentRank.startsWith('Not found') ||
            currentRank === '' ||
            currentRank === 'Error'

          if (shouldOverrideRank && serpPosition > 0) {
            row['Your actual rank (1-30+)'] = serpPosition > 30 ? '30+' : String(serpPosition)
          }

          if (serp.ownResult.link) row["Your URL that's ranking"] = serp.ownResult.link
          if (serp.ownResult.title) {
            row['Your page title in search results'] = serp.ownResult.title
          }

          historyRowsToAppend.push(
            buildSerpApiHistoryRow({
              timestamp,
              startDate: config.startDate,
              endDate: config.endDate,
              keyword,
              rank: serpPosition > 0 ? (serpPosition > 30 ? '30+' : String(serpPosition)) : '',
              position: serpPosition > 0 ? serpPosition : null,
              matchedPage: serp.ownResult.link || '',
              expectedPage: expectedUrl,
              topDomain: serp.topDomain || '',
              topTitle: serp.topTitle || '',
              totalResults: serp.totalResults || '',
            })
          )
        } else {
          historyRowsToAppend.push(
            buildSerpApiHistoryRow({
              timestamp,
              startDate: config.startDate,
              endDate: config.endDate,
              keyword,
              rank: 'Not found (checked top results)',
              expectedPage: expectedUrl,
              topDomain: serp.topDomain || '',
              topTitle: serp.topTitle || '',
              totalResults: serp.totalResults || '',
            })
          )
        }

        serpSuccess += 1
      } catch (error) {
        serpFailures += 1
        logger.warn(`SerpAPI keyword failed (${keyword}): ${error.message}`)
      }
    }

    saveSerpApiCursor(fsImpl, config.serpApi.cursorFile, {
      index: nextIndex,
      lastRun: timestamp,
    })

    logger.log(`SerpAPI enrichment complete. Success: ${serpSuccess}, Failed: ${serpFailures}`)
  }

  const updatedCsv = stringifyCsv(header, rows, { withBom: true })
  ensureDir(fsImpl, config.output)
  fsImpl.writeFileSync(config.output, updatedCsv, 'utf8')

  const updatedTsv = csvToTsv(updatedCsv)
  ensureDir(fsImpl, config.tsvOutput)
  fsImpl.writeFileSync(config.tsvOutput, updatedTsv, 'utf8')

  const mergedHistoryRows = [...history.rows, ...historyRowsToAppend]
  const historyCsv = stringifyCsv(HISTORY_COLUMNS, mergedHistoryRows, { withBom: true })
  ensureDir(fsImpl, config.historyFile)
  fsImpl.writeFileSync(config.historyFile, historyCsv, 'utf8')

  const runRecord = await runDbStep({
    config,
    logger,
    stepName: 'upsertRun',
    task: async () => {
      if (!rankRepository) return null
      return rankRepository.upsertRun({
        timestamp,
        startDate: config.startDate,
        endDate: config.endDate,
        siteUrl: config.siteUrl,
        searchType: config.searchType,
        foundCount,
        notFoundCount,
        serpSuccess,
        serpFailures,
        serpConsidered,
        status: 'success',
      })
    },
    fallbackValue: null,
  })

  const dbHistoryUpserted = await runDbStep({
    config,
    logger,
    stepName: 'upsertHistoryRows',
    task: async () => {
      if (!rankRepository || !runRecord) return 0
      return rankRepository.upsertHistoryRows({
        runId: runRecord.id,
        historyRows: historyRowsToAppend,
        keywordIdByKeyword,
      })
    },
    fallbackValue: 0,
  })

  logger.log(`Updated: ${config.output}`)
  logger.log(`Updated: ${config.tsvOutput}`)
  logger.log(`Updated history: ${config.historyFile}`)
  logger.log(`Keywords found in GSC: ${foundCount}`)
  logger.log(`Keywords not found in GSC period: ${notFoundCount}`)

  return {
    timestamp,
    foundCount,
    notFoundCount,
    searchConsoleRowCount: scRows.length,
    serpSuccess,
    serpFailures,
    serpConsidered,
    historyRowsAppended: historyRowsToAppend.length,
    dbBackend: String(config?.db?.backend || DEFAULT_DB_BACKEND),
    dbKeywordsSynced: keywordIdByKeyword.size,
    dbRunId: runRecord?.id ?? null,
    dbHistoryUpserted,
  }
}
