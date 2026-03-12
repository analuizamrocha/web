export const DEFAULT_INPUT = 'docs/serp-keywords-tracking-gsheets.csv'
export const DEFAULT_OUTPUT = 'docs/serp-keywords-tracking-gsheets.csv'
export const DEFAULT_TSV_OUTPUT = 'docs/serp-keywords-tracking-gsheets.tsv'
export const DEFAULT_HISTORY = 'docs/serp-keywords-history.csv'
export const DEFAULT_SERPAPI_CURSOR_FILE = 'data/seo/serpapi-cursor.json'
export const DEFAULT_SITE_URL = 'https://www.analuizarocha.com.br/'
export const DEFAULT_GSC_ROW_LIMIT = 25000
export const DEFAULT_GSC_SEARCH_TYPE = 'web'
export const DEFAULT_SERPAPI_LOCATION = 'Brazil'
export const DEFAULT_SERPAPI_LANGUAGE = 'pt-br'
export const DEFAULT_SERPAPI_COUNTRY = 'br'
export const DEFAULT_SERPAPI_NUM_RESULTS = 20
export const DEFAULT_SERPAPI_MAX_CALLS = 0
export const DEFAULT_SERPAPI_OVERRIDE_RANK = false
export const DEFAULT_DB_BACKEND = 'none'

export const OAUTH_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly'
export const OAUTH_AUDIENCE = 'https://oauth2.googleapis.com/token'

export const TRACKING_REQUIRED_COLUMNS = [
  'Keywords',
  'Your actual rank (1-30+)',
  "Your URL that's ranking",
  'Your page title in search results',
  'Top ranking domain (competitor)',
  "Top result's title",
  'Total search results',
  'Timestamp',
]

export const HISTORY_COLUMNS = [
  'Timestamp',
  'Start date',
  'End date',
  'Source',
  'Keyword',
  'Rank',
  'Position (avg)',
  'Impressions',
  'Clicks',
  'CTR',
  'Matched page',
  'Expected page',
  'Top domain',
  'Top title',
  'Total results',
]

export function parseBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === '') {
    return fallback
  }

  const normalized = String(value).trim().toLowerCase()
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) return true
  if (['0', 'false', 'no', 'n', 'off'].includes(normalized)) return false
  return fallback
}

export function formatISODate(date) {
  return date.toISOString().slice(0, 10)
}

export function dateWithOffset(daysOffset, now = new Date()) {
  const target = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  target.setUTCDate(target.getUTCDate() + daysOffset)
  return target
}

export function toIsoTimestamp(date = new Date()) {
  return date.toISOString()
}

export function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
}

export function normalizePath(urlValue) {
  const raw = String(urlValue || '').trim()
  if (!raw) {
    return '/'
  }

  try {
    const url =
      raw.startsWith('http://') || raw.startsWith('https://')
        ? new URL(raw)
        : new URL(raw, 'https://example.com')
    const pathname = decodeURIComponent(url.pathname || '/').replace(/\/+$/, '') || '/'
    return pathname.toLowerCase()
  } catch {
    const pathname = raw.replace(/^https?:\/\/[^/]+/i, '').replace(/\/+$/, '') || '/'
    return pathname.toLowerCase()
  }
}

export function extractDomain(urlValue) {
  const raw = String(urlValue || '').trim()
  if (!raw) return ''

  try {
    const url =
      raw.startsWith('http://') || raw.startsWith('https://')
        ? new URL(raw)
        : new URL(`https://${raw}`)
    return url.hostname.replace(/^www\./i, '').toLowerCase()
  } catch {
    return raw
      .replace(/^https?:\/\//i, '')
      .replace(/^www\./i, '')
      .split('/')[0]
      .toLowerCase()
  }
}

export function domainMatches(resultDomain, targetDomain) {
  const result = String(resultDomain || '').replace(/^www\./i, '').toLowerCase()
  const target = String(targetDomain || '').replace(/^www\./i, '').toLowerCase()

  if (!result || !target) return false
  if (result === target) return true
  if (result.endsWith(`.${target}`)) return true
  if (target.endsWith(`.${result}`)) return true
  return false
}

export function formatRank(position) {
  if (!Number.isFinite(position) || position <= 0) {
    return 'Not found (GSC period)'
  }

  if (position > 30) {
    return '30+'
  }

  return String(Math.max(1, Math.round(position)))
}

export function pickBestCandidate(candidates, targetUrl) {
  if (!candidates || candidates.length === 0) {
    return null
  }

  const targetPath = normalizePath(targetUrl)
  const samePath = candidates.filter((item) => normalizePath(item.page) === targetPath)
  const pool = samePath.length > 0 ? samePath : candidates

  const ranked = [...pool].sort((a, b) => {
    if (b.impressions !== a.impressions) return b.impressions - a.impressions
    if (b.clicks !== a.clicks) return b.clicks - a.clicks
    return a.position - b.position
  })

  return ranked[0]
}

export function chooseRowsForSerpApi(rows, maxCalls, startIndex) {
  const keywordRows = rows.filter((row) => String(row.Keywords || '').trim().length > 0)
  if (keywordRows.length === 0 || maxCalls <= 0) {
    return { selected: [], nextIndex: startIndex || 0, totalRows: keywordRows.length }
  }

  const selected = []
  const totalRows = keywordRows.length
  let pointer = ((startIndex % totalRows) + totalRows) % totalRows

  const calls = Math.min(maxCalls, totalRows)
  for (let i = 0; i < calls; i += 1) {
    selected.push(keywordRows[pointer])
    pointer = (pointer + 1) % totalRows
  }

  return { selected, nextIndex: pointer, totalRows }
}

export function buildGscHistoryRow({
  timestamp,
  startDate,
  endDate,
  keyword,
  rank,
  position,
  impressions,
  clicks,
  ctr,
  matchedPage = '',
  expectedPage = '',
}) {
  return {
    Timestamp: timestamp,
    'Start date': startDate,
    'End date': endDate,
    Source: 'gsc',
    Keyword: keyword,
    Rank: rank,
    'Position (avg)': Number.isFinite(position) ? position.toFixed(2) : '',
    Impressions: Number.isFinite(impressions) ? String(impressions) : '',
    Clicks: Number.isFinite(clicks) ? String(clicks) : '',
    CTR: Number.isFinite(ctr) ? ctr.toFixed(4) : '',
    'Matched page': matchedPage,
    'Expected page': expectedPage,
    'Top domain': '',
    'Top title': '',
    'Total results': '',
  }
}

export function buildSerpApiHistoryRow({
  timestamp,
  startDate,
  endDate,
  keyword,
  rank = '',
  position = null,
  matchedPage = '',
  expectedPage = '',
  topDomain = '',
  topTitle = '',
  totalResults = '',
}) {
  return {
    Timestamp: timestamp,
    'Start date': startDate,
    'End date': endDate,
    Source: 'serpapi',
    Keyword: keyword,
    Rank: rank,
    'Position (avg)': Number.isFinite(position) ? position.toFixed(2) : '',
    Impressions: '',
    Clicks: '',
    CTR: '',
    'Matched page': matchedPage,
    'Expected page': expectedPage,
    'Top domain': topDomain,
    'Top title': topTitle,
    'Total results': totalResults,
  }
}

export function mergeHistoryRowSchema(row) {
  const merged = {}
  for (const key of HISTORY_COLUMNS) {
    merged[key] = row[key] ?? ''
  }
  return merged
}

export function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]

    if (!token.startsWith('--')) continue
    const key = token.slice(2)
    const next = argv[i + 1]

    if (!next || next.startsWith('--')) {
      args[key] = true
      continue
    }

    args[key] = next
    i += 1
  }

  return args
}
