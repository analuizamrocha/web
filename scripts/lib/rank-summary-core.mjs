export const SUMMARY_COLUMNS = [
  'Timestamp',
  'Keywords tracked',
  'Keywords found',
  'Top 3',
  'Top 10',
  'Top 30',
  'Not found',
  'Avg rank',
  'Avg position',
  'Total impressions',
  'Total clicks',
  'CTR (%)',
]

export function toNumber(value) {
  const raw = String(value || '').trim()
  if (!raw) return null
  const num = Number(raw)
  return Number.isFinite(num) ? num : null
}

export function parseRank(rankValue) {
  const raw = String(rankValue || '').trim()
  if (!raw) return null
  if (raw === '30+') return 30
  if (/^\d+$/.test(raw)) return Number(raw)
  return null
}

export function average(values) {
  if (!values.length) return null
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

export function buildSummaryRows(historyRows) {
  const gscRows = historyRows.filter((row) => String(row.Source || '').toLowerCase() === 'gsc')
  const byTimestamp = new Map()

  for (const row of gscRows) {
    const timestamp = String(row.Timestamp || '').trim()
    const keyword = String(row.Keyword || '').trim()
    if (!timestamp || !keyword) continue

    if (!byTimestamp.has(timestamp)) {
      byTimestamp.set(timestamp, new Map())
    }

    // Keep latest row per keyword for each timestamp.
    byTimestamp.get(timestamp).set(keyword, row)
  }

  const summaryRows = []

  for (const [timestamp, keywordMap] of byTimestamp.entries()) {
    const snapshotRows = [...keywordMap.values()]

    const ranks = snapshotRows.map((row) => parseRank(row.Rank)).filter((value) => value !== null)
    const positions = snapshotRows
      .map((row) => toNumber(row['Position (avg)']))
      .filter((value) => value !== null)
    const impressions = snapshotRows
      .map((row) => toNumber(row.Impressions))
      .filter((value) => value !== null)
    const clicks = snapshotRows.map((row) => toNumber(row.Clicks)).filter((value) => value !== null)

    const tracked = snapshotRows.length
    const found = ranks.length
    const top3 = ranks.filter((value) => value <= 3).length
    const top10 = ranks.filter((value) => value <= 10).length
    const top30 = ranks.filter((value) => value <= 30).length
    const notFound = tracked - found

    const totalImpressions = impressions.reduce((sum, value) => sum + value, 0)
    const totalClicks = clicks.reduce((sum, value) => sum + value, 0)
    const weightedCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0

    summaryRows.push({
      Timestamp: timestamp,
      'Keywords tracked': String(tracked),
      'Keywords found': String(found),
      'Top 3': String(top3),
      'Top 10': String(top10),
      'Top 30': String(top30),
      'Not found': String(notFound),
      'Avg rank': average(ranks)?.toFixed(2) || '',
      'Avg position': average(positions)?.toFixed(2) || '',
      'Total impressions': String(totalImpressions),
      'Total clicks': String(totalClicks),
      'CTR (%)': weightedCtr.toFixed(2),
    })
  }

  summaryRows.sort((a, b) => {
    const dateA = new Date(a.Timestamp).getTime()
    const dateB = new Date(b.Timestamp).getTime()
    return dateA - dateB
  })

  return summaryRows
}
