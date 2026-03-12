# SEO Rank Project Handoff (Execution Plan + Finish Checklist)
**Project:** SEO Rank Tracking + Evidence Dashboard  
**Website:** https://www.analuizarocha.com.br/  
**Last Updated:** 2026-03-12

## 1) Objective
Build a reliable SEO measurement system that proves improvement over time using:
- Google Search Console (bulk truth source)
- SerpAPI (quota-limited competitor enrichment)
- Supabase (canonical historical database)
- Looker Studio (visual OKR dashboard)
- CSV/TSV exports (Google Sheets compatibility)

## 2) Current Status
### Implemented in code
- Modular rank pipeline with unit-tested core/pipeline/summary logic.
- Hybrid persistence model:
- CSV/TSV/history files still generated.
- Supabase repository added (`syncKeywords`, `upsertRun`, `upsertHistoryRows`).
- DB config contract added:
- `RANK_DB_BACKEND=supabase|none`
- `RANK_DB_REQUIRED=true|false`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- GitHub cron workflow set to run Mon/Wed/Fri and configured to persist to DB.
- SQL schema + BI views created:
- `seo_keywords`
- `seo_runs`
- `seo_rank_history`
- `seo_kpi_snapshots`
- `seo_keyword_trends`
- `seo_top_movers_30d`
- `seo_okr_snapshots`
- `seo_okr_latest`
- Looker dashboard setup guide created with branding aligned to app design tokens.

### Test status
- `npm run test:run` passing.
- 5 test files, 26 tests, 0 failures.

## 3) What Is Still Missing (External Setup)
These are not code tasks, they are setup/ops tasks to complete:

1. Apply Supabase SQL migration.
2. Add/update GitHub secrets:
- `GSC_CLIENT_EMAIL`
- `GSC_PRIVATE_KEY`
- `SERPAPI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
3. Trigger workflow once manually (`workflow_dispatch`) and verify first successful DB write.
4. Create the Looker Studio report and connect it to Supabase views.
5. Define initial OKR targets and review cadence.
6. Rotate SerpAPI key if any old key was exposed in chat/code history.

## 4) Step-by-Step Finish Checklist
### Step A: Database setup
1. Open Supabase SQL editor.
2. Run:
- `scripts/sql/seo-rank-supabase.sql`
3. Verify:
```sql
select count(*) from public.seo_keywords;
select count(*) from public.seo_runs;
select count(*) from public.seo_rank_history;
```

### Step B: Automation setup
1. In GitHub repo settings, add required secrets.
2. Run workflow:
- `.github/workflows/seo-rank-tracking.yml` via `workflow_dispatch`.
3. Confirm workflow success and expected commit of updated files.

### Step C: Data validation
Run these checks in Supabase:
```sql
select * from public.seo_runs order by run_timestamp desc limit 5;
select * from public.seo_kpi_snapshots order by timestamp desc limit 10;
select * from public.seo_okr_latest;
```

Expected:
- New run row exists.
- History rows increase each run.
- KPI/OKR views return non-empty data.

### Step D: Dashboard setup
1. Follow:
- `docs/looker-studio-seo-dashboard.md`
2. Build pages:
- Executive
- Keyword Movement
- Keyword Trends
- OKR Board
3. Set default date range to last 90 days.

## 5) What You Can Accomplish Once Fully Finished
If all missing steps are completed, you will have:

- Automated evidence of SEO progress (time series, not snapshots only).
- Reliable ranking trend KPIs:
- Top 3 / Top 10 / Top 30 share
- Avg rank
- Impressions, clicks, CTR
- 30-day deltas for OKR tracking
- Competitor context from SerpAPI without burning API quota.
- A stakeholder-ready dashboard with branded visual language.
- An operational loop:
- pipeline runs automatically
- data lands in DB
- dashboard updates with no manual spreadsheet work

## 6) Suggested First 30-Day OKR Targets (Starter)
- `top10_share_pct >= 40`
- `avg_rank <= 12`
- `impressions_growth_30d_pct >= 20`
- `clicks_growth_30d_pct >= 15`
- `ctr_delta_30d_pct_points >= 0.50`

## 7) Risks And Mitigations
- Risk: DB not reachable from workflow.
- Mitigation: verify `SUPABASE_URL` and service role key; test with one manual run.
- Risk: Empty charts in Looker.
- Mitigation: confirm workflow has inserted rows into `seo_rank_history`.
- Risk: API spend spikes.
- Mitigation: keep `SERPAPI_MAX_CALLS_PER_RUN` low (current setup is budget-safe).
- Risk: secret leakage.
- Mitigation: rotate keys and keep all credentials only in GitHub/Supabase secrets.

## 8) Source Documents
- Runbook: `docs/seo-rank-tracking-automation.md`
- Looker setup: `docs/looker-studio-seo-dashboard.md`
- SQL schema/views: `scripts/sql/seo-rank-supabase.sql`
- Pipeline entrypoint: `scripts/update-rank-tracking-from-gsc.mjs`
