import crypto from 'node:crypto'
import { normalizeText } from './rank-tracking-core.mjs'

export const RUN_UPSERT_CONFLICT_COLUMNS = ['run_key']
export const HISTORY_UPSERT_CONFLICT_COLUMNS = [
  'timestamp',
  'source',
  'keyword',
  'start_date',
  'end_date',
]

export function toNullableNumber(value) {
  const raw = String(value ?? '').trim()
  if (!raw) return null
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : null
}

export function toNullableInteger(value) {
  const parsed = toNullableNumber(value)
  if (parsed === null) return null
  return Math.round(parsed)
}

export function parseRankLabelToValue(rankLabel) {
  const raw = String(rankLabel ?? '').trim()
  if (!raw) return null
  if (raw === '30+') return 30

  const integer = Number(raw)
  if (Number.isFinite(integer) && integer > 0) {
    return Math.round(integer)
  }

  return null
}

export function buildRunKey({ timestamp, startDate, endDate, siteUrl, searchType }) {
  const input = [
    String(timestamp || ''),
    String(startDate || ''),
    String(endDate || ''),
    String(siteUrl || '').trim().toLowerCase(),
    String(searchType || '').trim().toLowerCase(),
  ].join('|')

  const hash = crypto.createHash('sha256').update(input).digest('hex').slice(0, 16)
  return `seo-run-${hash}`
}

export function chunkArray(items, chunkSize) {
  if (!Array.isArray(items) || items.length === 0) return []
  const size = Math.max(1, Number(chunkSize) || 1)
  const chunks = []

  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size))
  }

  return chunks
}

export function buildKeywordSyncPayload(trackingRows) {
  const byKeyword = new Map()

  for (const row of trackingRows || []) {
    const keyword = String(row.Keywords || '').trim()
    const expectedUrl = String(row["Your URL that's ranking"] || '').trim()
    const expectedTitle = String(row['Your page title in search results'] || '').trim()
    const keywordKey = normalizeText(keyword)
    if (!keywordKey) continue

    const current = byKeyword.get(keywordKey)
    if (!current) {
      byKeyword.set(keywordKey, {
        keyword,
        expected_url: expectedUrl || null,
        expected_title: expectedTitle || null,
        is_active: true,
      })
      continue
    }

    if (!current.expected_url && expectedUrl) current.expected_url = expectedUrl
    if (!current.expected_title && expectedTitle) current.expected_title = expectedTitle
  }

  return [...byKeyword.values()]
}

export function buildKeywordIdLookup(rows) {
  const lookup = new Map()

  for (const row of rows || []) {
    const keyword = String(row.keyword || '').trim()
    const keywordId = Number(row.id)
    if (!keyword || !Number.isFinite(keywordId)) continue
    lookup.set(normalizeText(keyword), keywordId)
  }

  return lookup
}

export function mapHistoryRowsToDbRows({ historyRows, runId = null, keywordIdByKeyword = new Map() }) {
  const mapped = []

  for (const row of historyRows || []) {
    const keyword = String(row.Keyword || '').trim()
    const keywordKey = normalizeText(keyword)
    if (!keywordKey) continue

    const source = String(row.Source || '').trim().toLowerCase()
    const timestamp = String(row.Timestamp || '').trim()
    const startDate = String(row['Start date'] || '').trim()
    const endDate = String(row['End date'] || '').trim()

    mapped.push({
      run_id: Number.isFinite(Number(runId)) ? Number(runId) : null,
      timestamp: timestamp || null,
      start_date: startDate || null,
      end_date: endDate || null,
      source: source || null,
      keyword,
      keyword_id: keywordIdByKeyword.get(keywordKey) || null,
      rank_label: String(row.Rank || '').trim(),
      rank_value: parseRankLabelToValue(row.Rank),
      avg_position: toNullableNumber(row['Position (avg)']),
      impressions: toNullableInteger(row.Impressions),
      clicks: toNullableInteger(row.Clicks),
      ctr: toNullableNumber(row.CTR),
      matched_page: String(row['Matched page'] || '').trim() || null,
      expected_page: String(row['Expected page'] || '').trim() || null,
      top_domain: String(row['Top domain'] || '').trim() || null,
      top_title: String(row['Top title'] || '').trim() || null,
      total_results: toNullableInteger(row['Total results']),
    })
  }

  return mapped
}
