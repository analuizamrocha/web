#!/usr/bin/env node

import { parseArgs } from './lib/rank-tracking-core.mjs'
import {
  DEFAULT_SUMMARY_INPUT,
  DEFAULT_SUMMARY_OUTPUT,
  runRankSummaryPipeline,
} from './lib/rank-summary-pipeline.mjs'

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const input = args.input || process.env.SEO_RANK_HISTORY_FILE || DEFAULT_SUMMARY_INPUT
  const output = args.output || process.env.SEO_RANK_SUMMARY_FILE || DEFAULT_SUMMARY_OUTPUT

  await runRankSummaryPipeline({ input, output }, { logger: console })
}

main().catch((error) => {
  console.error(`Error: ${error.message}`)
  process.exitCode = 1
})
