# SEO Strategy and Implementation

**Website:** Dra. Ana Luiza Moraes Rocha — Coloproctologia

**Last updated:** 2026-07-21

**Scope:** Durable strategy and repository implementation notes after PR #55

## Current Baseline

The July 2026 SeuSEO review found a strong existing local and topical footprint:

- 328 tracked queries.
- 66 queries in the Top 3.
- 96 queries in the Top 10.
- 44 published Markdown posts.
- Strong gains for several high-intent treatment and informational queries.

These figures are a point-in-time baseline, not a ranking promise. The underlying
focused tracking portfolio remains in `research/seuseo-keywords-2026-08.csv`. Search
volume, Search Console, analytics, leads, and booked consultations were not available
for that review and must be considered before attributing business impact.

## Strategic Priorities

1. Protect queries and pages already on page one.
2. Move relevant queries in positions 4–10 toward the Top 3 before expanding content
   indiscriminately.
3. Assign one owner URL to each commercial or local-intent cluster.
4. Keep blog posts focused on informational questions and link them naturally to the
   owner treatment or location page.
5. Consolidate overlapping posts before creating another URL for the same intent.
6. Publish only when a new article answers a distinct, useful patient question.
7. Measure organic consultation journeys, not only the number of ranking keywords.

No page should promise outcomes, imply superiority, or use fear to earn clicks. All
medical content remains subject to `docs/cfm-compliance-guidelines.md`.

## Page Ownership Model

| Cluster | Owner URL | Supporting content role |
| --- | --- | --- |
| Broad local coloproctology | `/` | Explain the practice and route users to the right service. |
| Treatment discovery | `/tratamentos` | Organize the service portfolio without competing with detail pages. |
| Hemorrhoids | `/tratamentos/hemorroidas` | Own consultation/treatment intent; blog answers symptom and comparison questions. |
| Proctology laser procedures | `/tratamentos/cx-laser` | Own verified laser-service intent without universal claims. |
| Anal fistulas | `/tratamentos/cx-fistulas-anorretais` | Own specialist treatment intent. |
| Pilonidal disease | `/tratamentos/cx-cisto-pilonidal` | Own evaluation and surgery intent. |
| Anal HPV | `/tratamentos/hpv-anal` | Own HPV assessment/treatment intent. |
| Anal cancer screening | `/tratamentos/rastreio-cancer-anal` | Own screening intent for appropriate patients. |
| Inflammatory bowel disease | `/tratamentos/doencas-inflamatorias-intestinais` | Own local follow-up intent. |
| Irritable bowel syndrome | `/tratamentos/sindrome-intestino-irritavel` | Own local evaluation/treatment intent. |
| Botulinum toxin | `/tratamentos/toxina-botulinica` | Own verified procedure intent. |

Treat this table as an architectural default. Change ownership only after checking
current Search Console queries, ranking URLs, and the clinical/service scope.

## Blog Expansion Rules

The blog is already substantial, so content quality and differentiation matter more
than raw volume.

Before adding a post:

1. Search titles, primary keywords, headings, and patient intent across
   `content/posts`.
2. Decide whether the need is best met by updating, differentiating, consolidating,
   or creating content.
3. Define the one primary query, the distinct reader question, and the owner service
   page the article should support.
4. Use reliable medical sources and a sober, patient-friendly explanation.
5. Add contextual internal links based on reader usefulness rather than a fixed link
   quota.

Known overlap areas that deserve extra review include hemorrhoid surgery, anal itch,
intestinal nutrition/fiber, and pilonidal disease. Similar wording alone is not enough
to consolidate; compare the actual intent and clinical purpose.

The complete post schema, subtitle behavior, image workflow, footer, and validation
steps live in `docs/blog-content-playbook.md`.

## Repository SEO Safeguards

The implementation now makes several SEO/content assumptions executable:

- `src/lib/blog.ts` parses frontmatter, creates card excerpts, and uses the first
  Markdown image for the blog card.
- `src/app/sitemap.ts` discovers all published Markdown posts automatically.
- `public/llms.txt` is the curated machine-readable inventory of key routes and posts.
- `tests/content-discovery.test.ts` verifies that every post appears in both the
  sitemap and `llms.txt`.
- `src/components/ui/MdxImage.tsx` renders Markdown images through `next/image`.
- `src/lib/mdx-image-dimensions.ts` stores exact intrinsic dimensions so image space
  is reserved before loading.
- `tests/mdx-image-dimensions.test.ts` compares every referenced post image with its
  real Sharp metadata.
- `tests/seo-metadata.test.ts` protects Open Graph and Twitter image behavior.

The dimension resolver defaults to `1200x800`. Add an exact registry entry whenever a
referenced asset has different intrinsic dimensions; the focused test verifies the
resolved dimensions against the real file.

## Measurement Loop

Review performance monthly with a focused portfolio instead of treating every query
variant as a separate content mandate.

- **SeuSEO:** position, landing URL, movement, and cannibalization for the focused
  portfolio.
- **Search Console:** query/page pairs, impressions, CTR, position, and unexpected
  ranking URLs.
- **Analytics:** organic landing pages, CTA/WhatsApp clicks, and consultation funnel
  events when available.
- **Technical:** indexing, Core Web Vitals, image weight, metadata, structured data,
  and mobile behavior.

After enough data has accumulated (normally at least 28 days), use these rules:

- High impressions and low CTR: test title and description while preserving medical
  accuracy.
- Positions 4–10: improve intent match, content depth, and internal links.
- Wrong URL ranking: resolve page ownership and cannibalization.
- Rankings without consultation actions: improve the journey and CTA relevance.
- No meaningful demand: do not publish solely because a tracker contains a keyword.

## Validation

For blog and SEO changes, run:

```bash
bun run test:run -- \
  tests/content-discovery.test.ts \
  tests/mdx-image-dimensions.test.ts \
  tests/seo-metadata.test.ts
bun run lint
bun run build
```

For changes to navigation, responsive layouts, or rendered blog behavior, also run the
relevant Playwright tests and manually inspect the riskiest page at mobile and desktop
sizes.
