# Implement the verified October SEO improvements

Workspace: `/Users/diegovfeder/workspace/jobs/analuizarocha`.
Public website: https://www.analuizarocha.com.br.

Start by reading:

1. `AGENTS.md` and any nested instructions.
2. `research/search-console-seo-review-2026-10-14.md`.
3. `research/seo-evidence-2026-10-14.json`.
4. `docs/cfm-compliance-guidelines.md` and `docs/seo-strategy-implementation.md`.
5. `next.config.ts`, `src/lib/blog.ts`, `src/app/blog/[slug]/page.tsx`, `src/lib/treatment-related-blog.ts`, `src/app/sitemap.ts`, and the targeted posts.

This prompt describes proposed implementation. It does not itself authorize deployment, publishing, external mutations, contacting people, or changing Search Console settings. Follow the user's actual implementation authorization. Preserve unrelated local changes.

## Evidence and interpretation

- Standard Web clicks: 5,899 for August 18–September 14 versus 7,051 for September 15–October 12 (+19.5%). Latest-week clicks declined 12.9%, alongside impressions, with virtually unchanged CTR and little aggregate position movement.
- Whole-period query averages are strong for `proctologista curitiba` and `coloproctologista curitiba`. They do not identify recent per-query changes.
- Three existing articles provide approximately 63% of chart clicks. Preserve their successful URLs.
- Pages and Queries CSVs contain whole-period totals; do not invent page-level losses or join queries to URLs without evidence.
- Nine export URLs are verified 404s. Exact source paths, statuses, destinations and reported counts are in the evidence JSON.
- 34 of 46 local posts lack contextual links to treatment detail pages. Add links where useful, not as a quota.
- At audit time the local checkout had 46 posts and the live site had 50. Source reconciliation is the first prerequisite.

## Phase 1: source reconciliation and read-only verification

Identify the branch/commit currently deployed and preserve all four live-only posts listed in the review. Inspect Git state before changing branches; do not reset user work, reconstruct Markdown from public HTML unnecessarily, or overwrite the deployment from the older checkout. Revalidate live facts that may have changed since the audit.

If blog content is changed, use the repository's `codex/YYYY-MM-DD-posts` naming convention with the actual work date. Do not infer that the October 14 audit date is the future implementation date.

## Phase 2: focused repository changes

1. Add exact permanent redirects from the evidence JSON to equivalent existing pages in `next.config.ts`. Do not add a wildcard catch-all or redirect unrelated 404s to the homepage. Recheck targets and avoid chains/loops.
2. Add contextual links in the posts listed in the review. Prioritize the toxin-specific fissure article, grade-3 hemorrhoids, hemorrhoid duration, recurrent fistulas, DII, SII, HPV and screening. For the traffic-leading SIBO/itch/plicoma articles, route to an appropriate verified service or consultation location without inventing a service or suggesting every symptom requires a procedure.
3. Qualify the existing laser and pilonidal descriptions consistently in page metadata and corresponding visible claims. Preserve truthful procedure information and the clinician's scope. Show exact before/after strings.
4. For SIBO/disbiose, flag diagnostic/treatment assertions for clinical review and use current primary medical sources for any substantive rewrite. Do not manufacture clinical approval, efficacy claims, references, or dates. Preserve the successful URL and question coverage.
5. Use query/page comparison data, if supplied, to select metadata experiments. Do not overhaul the homepage or merge articles solely because sitewide CTR is low. Any consolidation requires actual intent, ranking URL and link evidence.
6. If touching FAQ markup, ensure the questions/answers are meaningfully represented in visible content. Google retired FAQ rich results in May 2026; do not claim their expansion will restore traffic. Preserve the required `llms.txt` inventory without claiming a Google ranking benefit.

For each material post change, retain full frontmatter, the italic card hook, the intended first image and descriptive alt text, exact intrinsic dimensions, signature and educational disclaimer. Use honest modification dates. Do not create duplicate posts as a shortcut.

## Phase 3: verification and preview

Run the required checks after implementation:

```bash
bun run test:run -- tests/content-discovery.test.ts tests/mdx-image-dimensions.test.ts tests/seo-metadata.test.ts
bun run lint
bun run build
```

Add a focused regression check for redirect destinations and unchanged unrelated 404 behavior if changing redirects. Verify HTTP behavior against the built app; configuration inspection alone is insufficient. Confirm no redirect chains, all destinations return 200, and target canonicals are correct. Check metadata in server HTML and intended blog card image/subtitle. Check mobile/desktop rendering for affected pages. Include all reconciled posts in content discovery.

Present a preview and exact before/after values. Do not treat passing tests as evidence of ranking improvement. Production deployment and external actions require actual user authorization.

## Measurement and final report

Report implemented changes, clinical/access limitations, exact validation results, preview details and remaining work. List modified files with absolute links. Separate confirmed fixes from hypotheses. Define the comparison dates and affected URLs to monitor after the change. Do not promise search positions, traffic uplift, or appointment counts.
