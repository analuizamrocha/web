import fs from 'node:fs'
import path from 'node:path'
import { parseCsv, stringifyCsv } from './csv-utils.mjs'
import { SUMMARY_COLUMNS, buildSummaryRows } from './rank-summary-core.mjs'

export const DEFAULT_SUMMARY_INPUT = 'docs/serp-keywords-history.csv'
export const DEFAULT_SUMMARY_OUTPUT = 'docs/serp-keywords-summary.csv'

export function ensureDir(fsImpl, filePath) {
  const dir = path.dirname(filePath)
  if (!fsImpl.existsSync(dir)) {
    fsImpl.mkdirSync(dir, { recursive: true })
  }
}

export async function runRankSummaryPipeline(
  {
    input = DEFAULT_SUMMARY_INPUT,
    output = DEFAULT_SUMMARY_OUTPUT,
  } = {},
  deps = {}
) {
  const fsImpl = deps.fsImpl || fs
  const logger = deps.logger || console

  if (!fsImpl.existsSync(input)) {
    const emptyCsv = stringifyCsv(SUMMARY_COLUMNS, [], { withBom: true })
    ensureDir(fsImpl, output)
    fsImpl.writeFileSync(output, emptyCsv, 'utf8')
    logger.log(`History not found (${input}). Wrote empty summary header to ${output}`)
    return { output, rowCount: 0, missingHistory: true }
  }

  const content = fsImpl.readFileSync(input, 'utf8')
  const { rows } = parseCsv(content)
  const summaryRows = buildSummaryRows(rows)
  const summaryCsv = stringifyCsv(SUMMARY_COLUMNS, summaryRows, { withBom: true })

  ensureDir(fsImpl, output)
  fsImpl.writeFileSync(output, summaryCsv, 'utf8')
  logger.log(`Wrote ${summaryRows.length} summary snapshot rows to ${output}`)
  return { output, rowCount: summaryRows.length, missingHistory: false }
}
