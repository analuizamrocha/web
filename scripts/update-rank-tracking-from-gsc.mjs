#!/usr/bin/env node

import { parseArgs } from './lib/rank-tracking-core.mjs'
import { buildRankTrackingConfig, runRankTrackingPipeline } from './lib/rank-tracking-pipeline.mjs'

const HELP_TEXT = `Usage:
  npm run seo:rank:update -- [options]

Required env:
  GSC_SITE_URL
  GSC_CLIENT_EMAIL
  GSC_PRIVATE_KEY

Optional env:
  GSC_START_DATE=YYYY-MM-DD
  GSC_END_DATE=YYYY-MM-DD
  SERPAPI_API_KEY=...
  SERPAPI_MAX_CALLS_PER_RUN=4
  SERPAPI_NUM_RESULTS=20
  SERPAPI_OVERRIDE_RANK=true|false
  RANK_DB_BACKEND=supabase|none
  RANK_DB_REQUIRED=true|false
  SUPABASE_URL=...
  SUPABASE_SERVICE_ROLE_KEY=...

CLI examples:
  npm run seo:rank:update -- --start-date 2026-02-01 --end-date 2026-02-28
  npm run seo:rank:update -- --serpapi-max-calls 8 --serpapi-location "Curitiba, Parana, Brazil"
  npm run seo:rank:update -- --db-backend supabase --db-required true
`

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.help || args.h) {
    console.log(HELP_TEXT)
    return
  }

  const config = buildRankTrackingConfig({ args, env: process.env, now: new Date() })
  await runRankTrackingPipeline(config, { logger: console })
}

main().catch((error) => {
  console.error(`Error: ${error.message}`)
  process.exitCode = 1
})
