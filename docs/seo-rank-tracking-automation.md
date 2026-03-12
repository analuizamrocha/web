# SEO Rank Tracking Automation

## Goal
Build historical proof that SEO is improving over time, using:
- bulk data from Google Search Console (no per-keyword API burn)
- quota-limited SERP enrichment for competitor/top-result context
- snapshot history file for trend charts
- Supabase Postgres as canonical historical store for BI

## Data Flow
1. Read keyword table from `docs/serp-keywords-tracking-gsheets.csv`.
2. Pull query+page performance from Search Console in bulk.
3. Update rank/url/title/timestamp for all keywords.
4. Optionally enrich a rotating subset via SerpAPI (top domain, top title, total results).
5. Append run snapshot rows into `docs/serp-keywords-history.csv`.
6. Export TSV mirror for easy Google Sheets import (`docs/serp-keywords-tracking-gsheets.tsv`).
7. Upsert run + history + keyword metadata into Supabase (idempotent).

Timestamp standard:
- History and summary use ISO UTC datetime (e.g. `2026-03-10T09:15:00.000Z`) for deterministic charting and multi-run/day audits.

## Files
- Script: `scripts/update-rank-tracking-from-gsc.mjs`
- Current table: `docs/serp-keywords-tracking-gsheets.csv`
- History (time series): `docs/serp-keywords-history.csv`
- Aggregated KPI snapshots: `docs/serp-keywords-summary.csv`
- SerpAPI rotation cursor: `data/seo/serpapi-cursor.json`
- Scheduled workflow: `.github/workflows/seo-rank-tracking.yml`
- Supabase schema + views SQL: `scripts/sql/seo-rank-supabase.sql`

## Required Secrets (GitHub)
- `GSC_CLIENT_EMAIL`
- `GSC_PRIVATE_KEY`
- `SERPAPI_API_KEY` (optional; only needed for competitor enrichment)
- `SUPABASE_URL` (required when `RANK_DB_BACKEND=supabase`)
- `SUPABASE_SERVICE_ROLE_KEY` (required when `RANK_DB_BACKEND=supabase`)

## Important Security Note
- If your SerpAPI key was ever pasted in code/chat, rotate it now in SerpAPI dashboard and update the secret.

## Search Console Setup (one time)
1. Create a Google Cloud service account.
2. Generate a key pair for that service account.
3. Add the service account email as a user in Search Console property:
- `https://www.analuizarocha.com.br/`
4. Save credentials in repo secrets:
- `GSC_CLIENT_EMAIL`
- `GSC_PRIVATE_KEY` (full private key, newline-safe)

## How to Run Locally
```bash
export GSC_SITE_URL="https://www.analuizarocha.com.br/"
export GSC_CLIENT_EMAIL="service-account@project.iam.gserviceaccount.com"
export GSC_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
export SERPAPI_API_KEY="..." # optional
export SERPAPI_MAX_CALLS_PER_RUN="4" # optional
export RANK_DB_BACKEND="supabase"
export RANK_DB_REQUIRED="true"
export SUPABASE_URL="https://<project-ref>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="..."
npm run seo:rank:pipeline
```

## Key CLI/Env Controls
- `GSC_START_DATE` and `GSC_END_DATE` (defaults to last 28 days with data lag buffer)
- `SERPAPI_MAX_CALLS_PER_RUN` (defaults `0`, disabled)
- `SERPAPI_NUM_RESULTS` (default `20`)
- `SERPAPI_OVERRIDE_RANK` (`true|false`, default `false`)
- `SERPAPI_LOCATION` / `SERPAPI_LANGUAGE` / `SERPAPI_COUNTRY`
- `RANK_DB_BACKEND` (`none|supabase`, default `none`)
- `RANK_DB_REQUIRED` (`true|false`, default `true` if backend is `supabase`)
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`

## GitHub Cron
Workflow runs Mon/Wed/Fri and commits updated snapshots automatically.

Current budget setting:
- `SERPAPI_MAX_CALLS_PER_RUN=4`
- Approx monthly usage: ~48-52 calls/month (adjust as needed)
- Supabase DB persistence is enforced in workflow (`RANK_DB_REQUIRED=true`), so failed writes fail the job.

## Supabase Setup
1. Open Supabase SQL editor and run `scripts/sql/seo-rank-supabase.sql`.
2. Add repository secrets:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
3. Keep master keyword list in `docs/serp-keywords-tracking-gsheets.csv`; sync happens every run.
4. Optional: create `seo_readonly` DB user and grant view/table select access (SQL template included in migration file).

## Charting (Google Sheets / Looker Studio)
Use `docs/serp-keywords-history.csv` as your fact table, or `docs/serp-keywords-summary.csv` for pre-aggregated snapshots:
- X-axis: `Timestamp`
- Metrics: average `Rank`, `Impressions`, `Clicks`, `CTR`
- Breakdown: `Keyword`, `Source`, `Matched page`

Suggested charts:
1. Average rank over time (P1 keyword subset).
2. Total impressions over time.
3. Top 10 keyword movers (last 30 days).
4. Share of keywords in buckets: Top 3, Top 10, Top 30, >30.

OKR-ready Supabase views:
- `seo_okr_snapshots`
- `seo_okr_latest`
