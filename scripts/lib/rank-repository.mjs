import {
  RUN_UPSERT_CONFLICT_COLUMNS,
  HISTORY_UPSERT_CONFLICT_COLUMNS,
  buildRunKey,
  chunkArray,
  buildKeywordSyncPayload,
  buildKeywordIdLookup,
  mapHistoryRowsToDbRows,
} from './rank-repository-core.mjs'

const DEFAULT_BATCH_SIZE = 500

function normalizeBackend(value) {
  return String(value || 'none').trim().toLowerCase()
}

function buildSupabaseErrorDetails(payload) {
  if (!payload || typeof payload !== 'object') return ''
  const details = [payload.message, payload.hint, payload.details, payload.code]
    .filter(Boolean)
    .join(' | ')
  return details || JSON.stringify(payload)
}

export function createNoopRankRepository() {
  return {
    async syncKeywords() {
      return new Map()
    },
    async upsertRun() {
      return { id: null, runKey: '' }
    },
    async upsertHistoryRows() {
      return 0
    },
  }
}

export function createSupabaseRankRepository({
  supabaseUrl,
  serviceRoleKey,
  fetchImpl = fetch,
  logger = console,
  batchSize = DEFAULT_BATCH_SIZE,
}) {
  const baseUrl = String(supabaseUrl || '').replace(/\/+$/, '')
  const token = String(serviceRoleKey || '').trim()

  if (!baseUrl) {
    throw new Error('Missing SUPABASE_URL for supabase DB backend.')
  }
  if (!token) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY for supabase DB backend.')
  }

  const request = async (path, { method = 'GET', body, prefer } = {}) => {
    const endpoint = `${baseUrl}${path}`
    const response = await fetchImpl(endpoint, {
      method,
      headers: {
        apikey: token,
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        ...(prefer ? { Prefer: prefer } : {}),
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    })

    const contentType = response.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')
    const payload = isJson ? await response.json() : await response.text()

    if (!response.ok) {
      const details =
        typeof payload === 'string' ? payload : buildSupabaseErrorDetails(payload)
      throw new Error(`Supabase request failed (${response.status}): ${details}`)
    }

    return payload
  }

  return {
    async syncKeywords({ trackingRows }) {
      const payload = buildKeywordSyncPayload(trackingRows)
      if (payload.length === 0) {
        return new Map()
      }

      const data = await request(
        `/rest/v1/seo_keywords?on_conflict=${encodeURIComponent('keyword')}&select=id,keyword`,
        {
          method: 'POST',
          body: payload,
          prefer: 'resolution=merge-duplicates,return=representation',
        }
      )

      const lookup = buildKeywordIdLookup(Array.isArray(data) ? data : [])
      logger.log(`Supabase keyword sync complete: ${lookup.size} keyword(s).`)
      return lookup
    },

    async upsertRun({
      timestamp,
      startDate,
      endDate,
      siteUrl,
      searchType,
      foundCount,
      notFoundCount,
      serpSuccess,
      serpFailures,
      serpConsidered,
      status = 'success',
    }) {
      const runKey = buildRunKey({
        timestamp,
        startDate,
        endDate,
        siteUrl,
        searchType,
      })

      const payload = [
        {
          run_key: runKey,
          run_timestamp: timestamp,
          start_date: startDate,
          end_date: endDate,
          site_url: siteUrl,
          found_count: Number(foundCount || 0),
          not_found_count: Number(notFoundCount || 0),
          serp_success: Number(serpSuccess || 0),
          serp_failures: Number(serpFailures || 0),
          serp_considered: Number(serpConsidered || 0),
          status,
        },
      ]

      const onConflict = encodeURIComponent(RUN_UPSERT_CONFLICT_COLUMNS.join(','))
      const data = await request(`/rest/v1/seo_runs?on_conflict=${onConflict}&select=id,run_key`, {
        method: 'POST',
        body: payload,
        prefer: 'resolution=merge-duplicates,return=representation',
      })

      const run = Array.isArray(data) ? data[0] : null
      const runId = Number(run?.id)
      if (!Number.isFinite(runId)) {
        throw new Error('Supabase run upsert did not return a valid run id.')
      }

      return { id: runId, runKey: String(run?.run_key || runKey) }
    },

    async upsertHistoryRows({ runId, historyRows, keywordIdByKeyword }) {
      const payload = mapHistoryRowsToDbRows({
        historyRows,
        runId,
        keywordIdByKeyword,
      })

      if (payload.length === 0) {
        return 0
      }

      const onConflict = encodeURIComponent(HISTORY_UPSERT_CONFLICT_COLUMNS.join(','))
      const chunks = chunkArray(payload, batchSize)

      for (const batch of chunks) {
        await request(`/rest/v1/seo_rank_history?on_conflict=${onConflict}`, {
          method: 'POST',
          body: batch,
          prefer: 'resolution=merge-duplicates,return=minimal',
        })
      }

      return payload.length
    },
  }
}

export function createRankRepository(config, deps = {}) {
  const backend = normalizeBackend(config?.db?.backend)
  if (backend === 'none' || !backend) {
    return null
  }

  if (backend === 'supabase') {
    return createSupabaseRankRepository({
      supabaseUrl: config.db.supabaseUrl,
      serviceRoleKey: config.db.supabaseServiceRoleKey,
      fetchImpl: deps.fetchImpl,
      logger: deps.logger,
    })
  }

  throw new Error(`Unsupported RANK_DB_BACKEND: ${backend}`)
}
