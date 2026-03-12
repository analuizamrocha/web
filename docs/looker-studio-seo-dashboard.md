# Looker Studio SEO Dashboard Setup

This guide builds a clean dashboard using your Supabase SEO tables/views:

- `seo_kpi_snapshots`
- `seo_keyword_trends`
- `seo_top_movers_30d`
- `seo_okr_snapshots`
- `seo_okr_latest`

## 1) Pre-check (Supabase)

Run first:

- [`scripts/sql/seo-rank-supabase.sql`](/Users/diegovfeder/workspace/jobs/analu-procto/scripts/sql/seo-rank-supabase.sql)

Optional read-only user (recommended for BI):

```sql
create role seo_readonly login password '<strong-password>';
grant usage on schema public to seo_readonly;
grant select on public.seo_keywords, public.seo_runs, public.seo_rank_history to seo_readonly;
grant select on public.seo_kpi_snapshots, public.seo_keyword_trends, public.seo_top_movers_30d to seo_readonly;
grant select on public.seo_okr_snapshots, public.seo_okr_latest to seo_readonly;
alter default privileges in schema public grant select on tables to seo_readonly;
```

Quick validation:

```sql
select * from public.seo_kpi_snapshots order by timestamp desc limit 5;
select * from public.seo_top_movers_30d limit 10;
```

## 2) Connect Looker Studio to Supabase

1. Open [Looker Studio](https://lookerstudio.google.com/).
2. `Create` -> `Report`.
3. Add data source -> `PostgreSQL`.
4. Use Supabase connection details:
- Host: your Supabase DB host
- Port: `5432` (or Supabase pooler port if needed)
- Database: `postgres`
- Username: `seo_readonly` (or another read-only user)
- Password: your DB password
- SSL: enabled
5. Add these three views as data sources:
- `public.seo_kpi_snapshots`
- `public.seo_keyword_trends`
- `public.seo_top_movers_30d`
- `public.seo_okr_snapshots`
- `public.seo_okr_latest`

## 3) Build the Report (Page 1: Executive)

Add controls:
- Date range control (top-right), default: last 90 days.

Top scorecards (from `seo_kpi_snapshots`):
- `Avg rank` (latest)
- `Top 3`
- `Top 10`
- `Keywords found`
- `Total impressions`
- `CTR (%)`

Charts:
1. Time series: `timestamp` vs `avg_rank`
2. Time series: `timestamp` vs `total_impressions` and `total_clicks`
3. Time series: `timestamp` vs `top_3`, `top_10`, `top_30`
4. Table: `timestamp`, `keywords_tracked`, `keywords_found`, `not_found`, `ctr_percent`

Notes:
- For rank charts, invert Y-axis (lower rank is better).
- Use `timestamp` as the date dimension.

## 4) Build the Report (Page 2: Keyword Movement)

Data source: `seo_top_movers_30d`

Table columns:
- `keyword`
- `first_rank`
- `latest_rank`
- `rank_delta`
- `latest_timestamp`

Sorting:
- Sort `rank_delta` descending (biggest improvement first).

Filters:
- Add keyword search filter.
- Optional filter: only `rank_delta > 0`.

## 5) Build the Report (Page 3: Keyword Trends)

Data source: `seo_keyword_trends`

Controls:
- Drop-down control on `keyword`
- Date range control

Charts:
1. Time series: `timestamp` vs `rank_value`
2. Time series: `timestamp` vs `impressions` and `clicks`
3. Table: `timestamp`, `rank_label`, `rank_value`, `avg_position`, `matched_page`

## 6) Build the Report (Page 4: OKR Board)

Main source: `seo_okr_latest`

Scorecards:
- `avg_rank` and `avg_rank_delta_30d`
- `top10_share_pct` and `top10_share_delta_30d_pct`
- `total_impressions` and `impressions_growth_30d_pct`
- `total_clicks` and `clicks_growth_30d_pct`
- `ctr_percent` and `ctr_delta_30d_pct_points`

Trend source: `seo_okr_snapshots`

Charts:
1. Time series: `timestamp` vs `top10_share_pct` and `top3_share_pct`
2. Time series: `timestamp` vs `found_rate_pct`
3. Time series: `timestamp` vs `avg_rank` (invert Y-axis)
4. Combo chart: `timestamp` with `total_impressions` (bar) + `ctr_percent` (line)

Suggested monthly OKR targets:
- `top10_share_pct >= 40`
- `avg_rank <= 12`
- `impressions_growth_30d_pct >= 20`
- `clicks_growth_30d_pct >= 15`
- `ctr_delta_30d_pct_points >= 0.50`

## 7) Visual style (aligned with site brand)

Use your existing design tokens from:
- [`tailwind.config.ts`](/Users/diegovfeder/workspace/jobs/analu-procto/tailwind.config.ts)
- [`src/app/globals.css`](/Users/diegovfeder/workspace/jobs/analu-procto/src/app/globals.css)

Recommended Looker theme mapping:

- Report background: `#fffbf7` (`--color-background`)
- Card background: `#f5ebe1` (`--color-card-bg`)
- Card border: `#e5d4c4` (`--color-border-subtle`)
- Primary text: `#3d1f0f` (`--color-text-heading`)
- Secondary text: `#6b4226` (`--color-text-body`)
- Accent 1 (main line/buttons): `#c27e5c` (`brand.primary`)
- Accent 2 (secondary lines): `#663a25` (`primary`)
- Accent 3 (neutral line): `#7a8b68` (`accent.neutral`)
- Positive metric: `#7a8b68` (brand-appropriate positive tone)
- Negative metric: `#b08771` (soft alert tone matching palette)

Typography:
- Headings: `Unna` (or `Georgia` fallback)
- Body/labels: `Montserrat` (or `Arial` fallback)

Widget style:
- Border radius: 8-12px
- Border weight: 1px
- Shadow: minimal or none (clean medical look)
- Keep high contrast for numbers and labels

## 8) Troubleshooting

- If PostgreSQL connector cannot connect, test with Supabase pooler host/port.
- If access denied, verify grants for your BI user on tables/views.
- If charts are empty, confirm your workflow has written rows into `seo_rank_history`.

Fallback path:
- Keep using `docs/serp-keywords-summary.csv` / `docs/serp-keywords-history.csv` in Google Sheets and connect Sheets to Looker Studio.
