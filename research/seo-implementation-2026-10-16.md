# October SEO implementation — first batch

Work date: October 16, 2026 (America/Sao_Paulo). Branch: `codex/2026-10-16-posts`.

This implements the first repository changes supported by [PR #64](https://github.com/analuizamrocha/web/pull/64) and the shared priorities in [PR #58](https://github.com/analuizamrocha/web/pull/58). It is delivered as a separate draft implementation PR against main. No production deployment was performed.

## Source reconciliation

The initial inventory was taken from `321f99ab7df065fd53adf14b07917992dfd279e6`. Before opening the implementation PR, the branch was rebased onto `65f4e831bc499800b9049d3ff489f1787e4a3650`, which includes the merged agent-readiness work (#65). Contact routes, shared Markdown rendering, indexing rules, and their CI checks are preserved. The live sitemap contains 66 URLs, including 50 articles. All 50 have source files in this branch, including the four previously missing recovery/laser/toxin posts. No article was reconstructed from HTML or removed.

Main has 54 posts. Four source-only articles already exist in the baseline: `drenei-abscesso-anal-e-agora`, `fistula-anal-depois-de-abscesso`, `hemorroida-ou-plicoma-diferenca`, and `plicoma-anal-por-que-aparece`. A deployment of this branch would include those existing main-branch changes too. These additions are not part of this batch's diff.

The production commit remains unconfirmed: the domain was unavailable through the connected Vercel teams and the explicitly scoped CLI inspection; GitHub's deployment records do not establish the current production revision. Content inventory reconciliation is complete, but deployment provenance must be confirmed before release. Details and read-only HTTP observations are recorded in `seo-implementation-baseline-2026-10-16.json`.

## Implemented

- Nine exact equivalent URL redirects, retaining the two pre-existing legacy redirects. Each audited source resolves directly to its canonical article with HTTP 308. The nested itch URL supports its observed trailing slash and its normalized form.
- Next's normal trailing-slash removal now runs after the explicit mappings, preventing an intermediate redirect to another broken URL. Unrelated missing pages still return 404. Tests cover query preservation and representative slash normalization.
- Eleven contextual links: grade-3 hemorrhoids and duration → hemorrhoid treatment; toxin-specific fissure → botulinum toxin; recurrent fistulas → fistula surgery; DII and SII → their respective care pages; HPV → HPV treatment; screening → anal cancer screening; plicoma → laser indications/limitations; SIBO and the substantial itch guide → Clínica Nassif consultation information.
- Narrowed service-copy edits to the specific statements listed below. The original introductions, benefits, comparisons, procedure explanations, page structure, FAQ rendering and most answers are retained. This batch does not claim that broad changes of voice improve SEO.
- Updated modification dates for the edited posts and three treatment routes. The SIBO date records an editorial consultation-link change, not clinical approval or a medical-evidence refresh.

All article titles, descriptions, slugs, hook lines, first images, existing FAQ frontmatter, signatures and educational disclaimers are preserved. Assets and image dimensions are unchanged. No new article, homepage title experiment, consolidation, or tracking integration is included.

## Conservative copy scope and rationale

The first draft rewrote entire benefit sections and several FAQ answers without ranking, usability or clinician-review evidence for those rewrites. Those edits have been removed. Copy changes are now small corrections to specific wording; they are not presented as demonstrated traffic gains.

| Page | Retained change | Reason |
| --- | --- | --- |
| `/tratamentos` | “alívio definitivo” → “alívio dos sintomas” | Avoid promising a permanent result while keeping the original service description. |
| `/tratamentos` | “baixa recidiva” → “indicação individualizada” | Remove an unquantified outcome claim from the pilonidal card. |
| `/tratamentos` | “a mais alta qualidade técnica” → “qualidade técnica” | Remove the superlative while keeping the original CTA and voice. |
| `/tratamentos/cx-laser` | Only the second sentence of the description changes. | Keep the treatment topics and Curitiba; describe indications and recovery without promising fast recovery or less pain to every reader. The visible body and FAQ answers are unchanged. |
| `/tratamentos/cx-cisto-pilonidal` | Revise the universal laser-indication paragraph and its matching FAQ answer. | Replace “todo cisto” / “praticamente todos os casos” with individual case selection; keep recurrence information. |
| `/tratamentos/cx-cisto-pilonidal` | Remove definitive-result wording from metadata/schema and the CTA's second sentence. | Keep the original procedure terms and consultation invitation without an outcome guarantee. |

`/tratamentos/cx-laser` description:

Before: “Cirurgias a laser para hemorroidas e fissuras anais em Curitiba. Procedimento minimamente invasivo com recuperação rápida e menos dor.”

After: “Cirurgias a laser para hemorroidas e fissuras anais em Curitiba. Entenda as indicações, benefícios e cuidados na recuperação.”

`/tratamentos/cx-cisto-pilonidal` description:

Before: “Cirurgia para cisto pilonidal: técnica convencional e laser. Tratamento definitivo com recuperação rápida e menor dor pós-operatória em Curitiba.”

After: “Cirurgia para cisto pilonidal: técnica convencional e laser. Conheça as indicações e os cuidados na recuperação em Curitiba.”

Pilonidal FAQ, “O laser é indicado em todos os casos?”:

Before: “Sim. Hoje se sabe que todo cisto pilonidal pode responder ao tratamento a laser, mas é importante entender que, assim como na cirurgia convencional, ainda existe risco de recidiva.”

After: “Não. A indicação depende da avaliação individual de cada paciente. Assim como na cirurgia convencional, ainda existe risco de recidiva.”

The shared FAQ-rendering refactor and the added on-page guideline citation were removed from this PR to keep its scope narrow. Existing clinical comparisons are preserved for clinician review; restoring them does not assert a fresh clinical or legal certification. The FAQ regression still checks that visible answers match their structured data.

References: [ESCP pilonidal guideline (2024)](https://pubmed.ncbi.nlm.nih.gov/39397672/), [Google's descriptive-snippet guidance](https://developers.google.com/search/docs/appearance/snippet), and [permanent redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects). These support the specific decisions; they do not establish a ranking benefit for this wording.

## Remaining clinical review: SIBO/disbiose

The article's diagnostic/treatment assertions were not rewritten or certified. Preserve its URL and symptom/question coverage while a clinician reviews:

1. The simplified “good/bad bacteria” definition and the table's claims about location, severity and association with SIBO.
2. “Disbiose intestinal não tratada” as a cause and the assertion that colonic bacteria migration commonly initiates SIBO.
3. Nonspecific symptoms presented as indicators of SIBO, interpretation/limitations of breath tests, and what stool microbiota testing can establish.
4. Routine-sounding recommendations for antimicrobials, herbal products and probiotics, and durable restoration/prevention language.

Useful primary professional sources for that review: [ACG patient information, published April 2024](https://gi.org/topics/small-intestinal-bacterial-overgrowth-sibo/), [ACG guideline listing](https://gi.org/guidelines-test/), and [AGA expert review on bloating/distention (2023)](https://www.gastrojournal.org/article/S0016508523008235/pdf). These are references for review, not evidence that the current article has been approved.

## Validation and preview

- All unit tests on the rebased branch: 6 files, 65 tests passed, including content discovery, intrinsic image dimensions, SEO metadata, consent handling and shared Markdown content.
- ESLint passed.
- Production build and standalone TypeScript check passed, generating all 54 article routes. The first sandboxed attempt could not download the existing Google Fonts; the network-enabled build passed without application changes.
- Final production browser suite: 39 tests passed, including all nine single-hop 308s, 200 destinations, correct canonicals, preserved query strings, unrelated 404s, HTML/Markdown clients, FAQ visibility, existing navigation, cookie consent and crawl signals. This includes the existing agent-readiness and mobile-menu coverage.
- All 14 affected routes checked at 390px and 1440px: 28 page/viewport checks passed with one H1, HTTP 200 and no horizontal overflow. Contextual destinations returned 200; both service descriptions matched server metadata. All 11 edited article cards retained their original subtitles and first images, and their remaining frontmatter and footer contracts were checked against the baseline. Representative service/article screenshots were captured for visual inspection.

Local preview: http://localhost:3100. Start a fresh production preview with `bun run build` followed by `bun run start --port 3100`.

```sh
bun run test:run -- tests/content-discovery.test.ts tests/mdx-image-dimensions.test.ts tests/seo-metadata.test.ts
bun run lint
bun run build
PLAYWRIGHT_BASE_URL=http://localhost:3100 PLAYWRIGHT_PRODUCTION=true bun run e2e -- --headed --workers=2
```

## Relationship to PR #58

[PR #58](https://github.com/analuizamrocha/web/pull/58) is also documentation only: a July second-pass agent prompt, based on PR #55 and the historical SeuSEO portfolio. It proposes a broad independent audit, then at most five selected improvements. PR #64 adds the October Search Console evidence and exact URL/content findings that drive this batch.

The shared priorities are protecting successful URLs, preserving commercial page ownership, useful editorial links, qualified medical copy, consistent visible FAQs/schema, and mobile verification. This batch covers the confirmed redirect/link opportunities, narrowly scoped wording corrections and responsive checks. Main already has a main landmark, skip link and keyboard/menu regression coverage; their presence is not a fresh complete accessibility audit.

Keep the additional #58 work as an evidence-driven backlog: a focused accessibility audit, measured field LCP/INP/CLS, image-weight/index-rendering investigation, and a wider entity/schema/NAP review. Query ownership, overlap decisions and metadata experiments still require current page/query evidence. Do not label these unmeasured areas as defects.

The July counts (44 articles, 328 historical tracked terms and a 67-route build) are historical. Current source has 54 articles, the live sitemap has 50, and Vitest coverage now exists. Several research paths required by #58 are absent from current main. Reconcile those references before reusing its prompt. The user subsequently authorized a new implementation PR.

CI now runs the SEO regression suite with the existing production smoke/agent checks. CI uses its installed Chromium; local runs retain system Chrome.

## Replacing the reporting PRs

After the implementation PR is merged, #58 and #64 can be closed as superseded reporting/handoff PRs, with a link to the implementation and this retained backlog. Their original evidence remains available in those PRs. Closing them should not imply that the clinical, analytics, accessibility or performance follow-ups below have been completed. Until the implementation is accepted, keep both reference PRs open.

The rollback is to revert the implementation commits, restoring previous redirect ordering, service copy and article links. Recheck the affected HTTP paths and page metadata after any rollback. Existing successful article URLs are preserved throughout.

## Next evidence and measurement

Obtain the comparison exports specified in PR #64: September 15–October 12 versus August 18–September 14, plus October 6–12 versus September 29–October 5; export both Pages and Queries and filter material pages individually to establish actual query/page pairs. These support the next title/snippet and overlap decisions; aggregate CTR alone does not select an experiment.

After an authorized release, record its actual date and recheck the redirect paths on the public hostname. Compare the first 28 complete Search Console reporting days after release with the preceding 28 days, and review complete seven-day windows in parallel. Monitor the eleven edited article URLs, the two destination articles and the linked treatment/location pages. Keep AI impressions separate from standard Web clicks and impressions. Use unchanged articles as context and inspect consent-aware consultation tracking before attributing bookings. Passing checks establishes behavior, not ranking or traffic gains.
