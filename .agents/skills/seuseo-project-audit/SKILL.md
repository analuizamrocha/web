---
name: seuseo-project-audit
description: Analyze a SeuSEO keyword-ranking report against a website and its repository, then produce an evidence-based SEO study, a focused SeuSEO import CSV, a keyword-to-page strategy, and a safe coding-agent handoff. Use when a user provides a SeuSEO PDF, CSV, screenshot, pasted report, or ranking comparison and asks what to track, what changed, what to fix, or how to turn the findings into implementation work. Also use for monthly SeuSEO portfolio resets and audits where rankings must be reconciled with live pages, repository content, local SEO, conversion intent, or YMYL constraints.
---

# SeuSEO Project Audit

Turn a ranking export into a small, decision-ready keyword portfolio and a verified implementation plan. Treat the ranking report as one input, not the whole diagnosis.

## Required inputs

Identify or obtain:

- Project root.
- Public site URL.
- SeuSEO report as CSV, PDF, image, pasted table, or text summary.
- Reporting period, device, and search location when available.
- Target month and desired number of tracked keywords, if specified.

If the user omits a non-blocking input, infer it from the repository and report. Record the assumption. Do not invent ranking positions, search volume, services, products, credentials, locations, or conversion data.

## Safety and scope

- Read the project `AGENTS.md` and any nested instructions before acting.
- Read product-marketing context when present: `.agents/product-marketing.md`, `.claude/product-marketing.md`, or `product-marketing-context.md`.
- Keep analysis read-only until the user explicitly asks for implementation.
- Do not deploy, publish, request indexing, edit a live CMS, or mutate external systems without explicit authorization.
- Preserve unrelated user changes in a dirty worktree.
- For medical, financial, or legal sites, treat the work as YMYL: verify current facts, avoid unsupported efficacy or outcome claims, and flag professional/regulatory review requirements.
- Separate verified findings from crawler heuristics and hypotheses.

## Workflow

### 1. Discover project context

Use `rg --files` and `rg` first. Inspect:

- Repository instructions and handoff files.
- Analytics and prior SEO studies.
- Routes, sitemap, robots rules, canonicals, metadata, schema, and redirects.
- Content inventory, primary keywords, internal links, and conversion pages.
- Existing keyword exports and reports.

Record the platform and deployment model. Identify which files are source of truth and which are historical.

### 2. Normalize the SeuSEO report

Extract, without translating keywords:

- Keyword.
- Current position.
- Previous position.
- Change.
- Found URL.
- Report period.
- Device and location.

Treat blank or “not found” as unranked, not position zero. If a PDF, screenshot, pasted CSV, and repository file disagree, do not combine them silently. State which source becomes the baseline and why.

Summarize:

- Ranking distribution.
- Improved, declined, unchanged, new, lost, and unranked terms.
- Top movers and decliners.
- Brand versus non-brand performance.
- Commercial/local versus informational performance.
- Which URLs attract keywords intended for other pages.

### 3. Verify the live site and repository

Crawl the public site and compare it with the repository. At minimum check:

- HTTP status, final URL, indexability, canonical, title, description, and H1.
- Sitemap/robots consistency.
- Structured-data types and whether values match visible content.
- Treatment/service/category/location page depth and intent alignment.
- Internal links from supporting content to conversion pages.
- Duplicate or competing pages within each cluster.
- Mobile usability, obvious LCP/image issues, and accessibility blockers.
- Entity, author, credential, contact, and location signals.

Do not accept automated audit scores at face value. Manually verify high-impact findings and label likely false positives.

### 4. Build keyword clusters

Classify every candidate by:

- Brand or non-brand.
- Cluster/topic.
- Intent: navigational, local-commercial, commercial, or informational.
- Existing or proposed target URL.
- Business value.
- Ranking opportunity.
- Evidence that the site genuinely covers the topic.

Prefer a focused portfolio over a large noisy one. Unless the user specifies otherwise, create 50–75 tracked terms with this rough balance:

- 10–15% brand/entity health checks.
- 20–30% local acquisition terms.
- 35–45% verified treatment/service/category terms.
- 15–25% symptom/problem and supporting informational terms.
- Up to 10% location, seasonal, or strategic experiments.

Do not add keyword variants that differ only by accents, trivial stop words, or singular/plural unless the report shows materially different behavior. Do not target “best” or superiority terms for regulated professionals unless the user explicitly chooses that strategy and it is compliant.

Use ranking movements and live query suggestions as discovery signals, not proof of search volume. Clearly state when volume data is unavailable.

### 5. Assign priority

Use numeric priorities consistently:

- `1`: highest priority; direct acquisition/conversion, material decline, or page-one opportunity.
- `2`: supporting commercial or high-value informational term.
- `3`: brand health, exploratory, reputation, or longer-horizon authority term.

If the project already defines another scale, preserve it and document the scale.

### 6. Create the SeuSEO import CSV

Create a UTF-8 CSV with this exact ordered header:

```csv
keyword,cluster,intent,priority
```

Rules:

- `keyword` is required and unique after case/whitespace normalization.
- `cluster` and `intent` may be blank.
- `priority` may be blank but, when present, must be numeric.
- Do not add URL, notes, position, or volume columns to the import file.
- Keep Portuguese accents in Portuguese keywords.
- Do not include a title row, comments, or blank lines before the header.

Validate it with:

```bash
python3 .agents/skills/seuseo-project-audit/scripts/validate_seuseo_csv.py path/to/file.csv
```

### 7. Write the study

Save a dated Markdown study under `research/` or the project’s established research directory. Include:

1. Executive takeaway.
2. Source inventory and baseline caveats.
3. Ranking diagnosis.
4. Brand/non-brand and intent analysis.
5. Keyword clusters and target pages.
6. Cannibalization or wrong-URL findings.
7. Technical, on-page, structured-data, local, performance, accessibility, and E-E-A-T findings.
8. Quick wins, 30-day work, and 60–90-day strategy.
9. Measurement plan for the next report.
10. Facts or access still needed.

For every recommendation, distinguish:

- **Confirmed:** directly observed in the report, live HTML, or repository.
- **Verify:** plausible automated or search-result finding that needs manual confirmation.
- **Blocked:** requires analytics, Search Console, CMS, clinical, legal, or client input.

### 8. Write the coding-agent handoff

Create a self-contained prompt that gives another coding agent:

- Workspace and public URL.
- Files to read first.
- Report facts and primary diagnosis.
- Exact target pages and keyword clusters.
- Safe phases: read-only audit, repository changes, preview, approval, production.
- Prohibited assumptions and regulated-content constraints.
- Verification commands and acceptance criteria.
- Required final report format.

Require the coding agent to show before/after values before production changes. Do not let the prompt authorize deployment or external mutations unless the user already did.

## Output naming

Prefer:

- `research/seuseo-study-YYYY-MM-DD.md`
- `research/seuseo-keywords-YYYY-MM.csv`
- `research/prompts/seo-implementation-agent-prompt-YYYY-MM-DD.md`

Report the absolute path of the upload CSV separately so the user cannot confuse it with supplemental files.

## Completion checks

- The CSV has exactly four columns in the required order.
- The CSV validator passes.
- Every tracked service/product is verified on the live site or repository.
- Priority semantics are documented.
- No ranking, traffic, volume, or conversion number was invented.
- The study reconciles report data with repository/live evidence.
- The handoff prompt is safe, self-contained, and does not authorize production changes.
- All created files are listed with absolute paths.
