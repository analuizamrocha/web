# Search Console and live-site SEO review

Review date: October 14, 2026, America/Sao_Paulo. Site: https://www.analuizarocha.com.br.

## What the evidence says

The site has a recent pullback within a stronger medium-term trend. Standard Web clicks increased **19.5%** over consecutive 28-day periods. The latest seven days lost **12.9%** of clicks, with almost the same decline in impressions, stable CTR, and little aggregate position movement. This does not establish that competitors are taking the site's keywords. Individual query losses can still be hidden by sitewide averages.

The most useful next work is to protect the few articles generating most traffic, improve their paths to relevant consultation/treatment pages, repair observed broken URLs, and investigate the recent decline using page/query comparisons. Increasing publishing volume is not the first priority.

This review changed research documents only. No application code, content, Search Console settings, or production deployment was changed.

## Sources and comparison limits

The supplied screenshot covers roughly April–October and shows 18.6K clicks, 2.55M impressions, 0.7% CTR, and 6.8 average position. These are rounded totals for that screenshot, not a period comparison.

The supplied CSV directories are the source of truth for the calculations below:

| Dataset | Directory under `/Users/diegovfeder/Downloads/` | Actual daily coverage | Files |
| --- | --- | --- | --- |
| Standard Search results | `analuizarocha.com.br-Performance-on-Search-2026-10-14` | July 13–October 12, 92 days | Chart, Pages, Queries, Countries, Devices, Filters, Search appearance |
| Earlier AI features | `analuizarocha.com.br-Performance-on-Search-Generative-AI-Features-2026-10-14 (1)..` | July 13–September 11, 61 days | Chart, Pages, Countries, Devices, Filters |
| Recent AI features | `analuizarocha.com.br-Performance-on-Search-Generative-AI-Features-2026-10-14` | September 15–October 12, 28 days | Chart, Pages, Countries, Devices, Filters |

All exports specify **Web (text-based)**. Standard Pages and Queries contain totals for the entire 92-day period, not separate comparison columns. Queries contains exactly 1,000 rows; it is not a complete query census. Search appearance has a header and no data rows, which is not proof that no search features appeared. Country and device totals reconcile exactly to their respective chart totals. Page totals differ because property and URL aggregation differ. Exported dates use Search Console's reporting convention, rather than the local review timezone.

The two AI exports leave September 12–14 uncovered. Do not compare their raw totals as equal periods. Do not add AI impressions to Web impressions: the AI report overlaps with the standard Web report. Google's [AI report documentation](https://support.google.com/webmasters/answer/16984139?hl=en-GB) explains its dimensions and aggregation.

Historical repository documents and the August SeuSEO portfolio are background only. They are not October ranking evidence. Source hashes, calculation results, and live observations are in `research/seo-evidence-2026-10-14.json`.

## Standard Web performance

CTR below is recomputed as total clicks / total impressions. Position is an approximate impression-weighted reconstruction from rounded daily values; it is not a directly exported period-level position.

| Metric | August 18–September 14 | September 15–October 12 | Change |
| --- | ---: | ---: | ---: |
| Clicks | 5,899 | 7,051 | +19.5% |
| Impressions | 806,573 | 980,753 | +21.6% |
| CTR | 0.731% | 0.719% | −0.012 percentage points |
| Approximate position | 6.75 | 6.52 | Improved by about 0.24 |

The recent weekly sequence deserves investigation:

| Seven-day window | Clicks | Impressions | CTR | Approximate position |
| --- | ---: | ---: | ---: | ---: |
| September 15–21 | 1,943 | 255,025 | 0.762% | 6.65 |
| September 22–28 | 1,933 | 258,906 | 0.747% | 6.55 |
| September 29–October 5 | 1,697 | 249,545 | 0.680% | 6.39 |
| October 6–12 | 1,478 | 217,277 | 0.680% | 6.46 |

The latest week lost 219 clicks (−12.9%) and 32,268 impressions (−12.9%) versus the preceding week. CTR was effectively unchanged. The preceding weekly transition did include a CTR decline, so the full recent pullback should not be reduced to a single cause. Query mix, demand, search-result presentation, and individual ranking changes remain hypotheses. A stable sitewide position does not exclude losses on important queries.

Across the full 92 days there were 16,827 chart clicks and 2,276,748 chart impressions. This differs from the screenshot because the screenshot covers a longer period. Follow Google's [traffic-drop investigation workflow](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops) before attributing the change to competitors or an update.

## Protect the traffic leaders

These are whole-period Pages totals, **not identified recent decliners**:

| Existing article | Clicks | Impressions | CTR | Position | First action |
| --- | ---: | ---: | ---: | ---: | --- |
| `/blog/disbiose-sibo-tratamento` | 4,754 | 516,139 | 0.92% | 7.08 | Preserve URL; clinically review diagnostic/treatment claims and add current references; add a useful consultation path. |
| `/blog/plicoma-anal-vale-a-pena-retirar` | 3,715 | 371,254 | 1.00% | 5.25 | Preserve its decision intent and existing citations; add a relevant service/consultation link. |
| `/blog/coceira-anal-quando-procurar-coloproctologista-curitiba` | 2,075 | 491,722 | 0.42% | 7.23 | Review query-to-page fit and overlapping itch article; test clearer metadata after comparison data is available. |
| `/blog/hemorroida-sempre-cirurgica-tratamento` | 1,236 | 166,825 | 0.74% | 4.99 | Protect its existing visibility; differentiate from the other surgery-decision article. |
| `/blog/fases-cicatrizacao-cirurgia-hemorroida` | 1,023 | 84,384 | 1.21% | 6.79 | Compare with the newer live recovery article before adding more recovery content. |

The first three account for 10,544 page clicks, equivalent to **62.7%** of chart clicks. The first five account for 76.1%. These ratios are approximate because page and property aggregation differ. This concentration makes a modest change in a few informational topics visible in the sitewide chart.

The nine real treatment pages total only 151 direct page clicks in this export. This does not measure assisted consultations or appointment volume. The homepage and location pages may also generate consultations. Track the journey from organic landing page to consented WhatsApp/booking action and confirmed appointment before judging business impact. Repository inspection found no explicit CTA event implementation; GA/GTM configuration and enhanced measurement were not inspected, so missing account-side tracking is unconfirmed.

## Keyword and page ownership

The query table is whole-period data and is not joined to individual URLs. Target assignments below are an editorial strategy, not proof that Google currently assigns each query to that URL.

| Query | Clicks | Impressions | CTR | Position | Intended owner / action |
| --- | ---: | ---: | ---: | ---: | --- |
| proctologista curitiba | 82 | 2,132 | 3.85% | 1.48 | Homepage; protect existing local intent. |
| coloproctologista curitiba | 46 | 1,249 | 3.68% | 1.84 | Homepage; avoid an unnecessary overhaul based on aggregate CTR. |
| ana luiza moraes rocha | 28 | 143 | 19.58% | 1.01 | Homepage/about entity information. |
| disbiose intestinal | 231 | 52,090 | 0.44% | 8.20 | Existing SIBO/disbiose article; improve evidence and clarity before proposing another URL. |
| sibo sintomas | 671 | 42,066 | 1.60% | 4.56 | Existing SIBO/disbiose article; preserve its symptom coverage. |
| coceira no anus | 163 | 49,881 | 0.33% | 7.66 | Existing substantial itch guide as provisional owner; confirm actual ranking URL and overlap. |
| plicoma | 998 | 86,065 | 1.16% | 3.19 | Existing plicoma cluster; retain the successful decision article and differentiate procedural content. |
| hemorroida interna | 11 | 27,336 | 0.04% | 4.93 | Verify ranking URL and SERP format before editing; do not assume the commercial page owns this informational query. |
| hemorroida externa | 7 | 19,571 | 0.04% | 4.04 | Same investigation; a low CTR is not itself proof of poor copy. |
| colonoscopia curitiba | 1 | 245 | 0.41% | 10.69 | Specta location page, with verified procedure/location information. |

Do not create content for irrelevant queries, implied insurance coverage, emergency hours, or superiority wording merely because those strings appear in the export. The current focused SeuSEO CSV remains available in `research/seuseo-keywords-2026-08.csv`. A tracker reset is deferred until query/page comparisons establish which monitored terms matter; this is an evidence review, not an invented October rank report.

Keep commercial ownership on the existing treatment URLs: hemorrhoids → `/tratamentos/hemorroidas`; fistulas → `/tratamentos/cx-fistulas-anorretais`; pilonidal disease → `/tratamentos/cx-cisto-pilonidal`; HPV → `/tratamentos/hpv-anal`; anal screening → `/tratamentos/rastreio-cancer-anal`; toxin-specific fissure treatment → `/tratamentos/toxina-botulinica`; DII and SII → their respective existing treatment pages. A generic fissure question should not imply that botulinum toxin is appropriate for every patient.

## Separate AI visibility findings

The recent AI export has 180,108 property impressions. Using the earlier daily chart's final 28 days, August 15–September 11 had 125,210: recent visibility is **43.8% higher** across these equal-length, non-adjacent windows. This is not a clean adjacent-period comparison or evidence of treatment effect.

AI impressions by recent week were 47,090, 48,177, 46,500, and 38,341. The latest week declined 17.5%. Recent AI impressions were 80.3% mobile and 96.2% from Brazil. Country is not city: this does not establish a Curitiba audience or local consultation intent.

Recent exact-URL page counts include 60,816 AI impressions for the SIBO/disbiose article, 38,290 for the plicoma decision article, and 19,926 for the itch guide. Page tables have no daily split, so these totals cannot identify which page caused the October weekly decline. No AI clicks, CTR, position, or query strings were supplied. Do not infer zero-click displacement or lost rankings from these files.

## Verified technical and content findings

### Confirmed: sitemap URLs have a healthy basic crawl baseline

All **66 live sitemap URLs** returned 200, had one H1 element, self-referencing canonicals, unique titles, and no observed noindex directives in page metadata or X-Robots-Tag. Sample non-www/http homepage requests resolved to the www HTTPS homepage. A fabricated URL returned 404. Extracted page links led to known sitemap paths or the privacy page. This checks current HTML and HTTP responses, not Google's indexed canonical, historical availability, WAF behavior for Googlebot, or actual ranking eligibility.

### Confirmed: malformed URLs in the exports currently return 404

Nine checked malformed URLs accounted for **1,253 AI impressions** in the recent AI export and **10 Web clicks** in the 92-day standard export. Impressions are not visits. The scale does not explain the overall decline, but repairing these paths is useful.

The full exact-source list is recorded with live status and proposed destinations in the evidence JSON. Eight variants concern anal itch and should map to `/blog/coceira-anal-quando-procurar-coloproctologista-curitiba`. The ninth, `/blog/cirurgia-laser-hemorroida-cuando-faz-sentido`, should map to `/blog/cirurgia-laser-hemorroida-quando-faz-sentido`.

Use exact permanent redirects for verified equivalents. Preserve a genuine 404 for unrelated unknown paths. Do not blanket-redirect all missing pages to the homepage, invent a cause for these malformed URLs, or describe them as lost backlinks without evidence. Additional unknown paths exist in the exports but were not all requested or tested.

### Confirmed: contextual service links are sparse

34 of 46 local Markdown posts lack a Markdown link to a treatment detail page. The same 34 lack such links within the live article among the 50 live posts. Navigation and generic WhatsApp CTAs are present; this is specifically a contextual-link opportunity, not a claim that the pages are orphaned.

First link candidates, placed where they help the reader:

| Source article | Destination | Appropriate context |
| --- | --- | --- |
| `hemorroida-grau-3-tratamento` | `/tratamentos/hemorroidas` | Comparing individualized treatment options. |
| `hemorroida-quanto-tempo-dura-quando-procurar` | `/tratamentos/hemorroidas` | Persistent/recurrent symptoms and evaluation. |
| `fissura-anal-toxina-botulinica-tratamento` | `/tratamentos/toxina-botulinica` | The procedure-specific explanation. |
| `fistulas-anorretais-recidivadas-tratamento` | `/tratamentos/cx-fistulas-anorretais` | Assessment of recurrent fistulas. |
| `doencas-inflamatorias-intestinais-acompanhamento` | `/tratamentos/doencas-inflamatorias-intestinais` | Ongoing specialist follow-up. |
| `sindrome-intestino-irritavel-sintomas-diagnostico-tratamento` | `/tratamentos/sindrome-intestino-irritavel` | Individualized evaluation and care. |
| `descobri-hpv-anal-e-agora` | `/tratamentos/hpv-anal` | Evaluation and management of lesions. |
| `cancer-canal-anal-rastreio-hpv-quem-deve-se-preocupar` | `/tratamentos/rastreio-cancer-anal` | Screening assessment for appropriate patients. |
| `plicoma-anal-vale-a-pena-retirar` | `/tratamentos/cx-laser` or the Nassif location page | Explain that technique selection depends on evaluation; the laser service page explicitly mentions plicomas. |
| `disbiose-sibo-tratamento` / substantial itch guide | `/locais-de-atendimento/clinica-nassif` | Useful information about arranging an assessment; do not force a disease-specific treatment link. |

### Verify: overlapping intent needs page-specific evidence

Review the two hemorrhoid-surgery decision articles, the two itch guides, and the nutrition/fiber pair. The successful hemorrhoid decision article has 1,236 clicks versus 0 for `/blog/hemorroida-sempre-precisa-cirurgia`; the substantial itch guide has 2,075 clicks versus 5 for `/blog/coceira-anus-causas-tratamento`. These differences guide investigation, not an automatic merge decision. Compare query/URL pairs, distinct medical purpose, and external links before consolidating. Differentiation may be preferable to a redirect.

### Confirmed: local checkout does not contain all live posts

Local branch: `diegovfeder/blog-cisto-pilonidal-laser`, HEAD `fa2d32a`. There are **46 local posts and 50 live posts**. All 46 local posts are live and their titles/descriptions agree with the fetched HTML. Live-only slugs:

- `recuperacao-cirurgia-hemorroida-quanto-tempo`
- `laser-hemorroida-co2-ou-diodo`
- `laser-co2-diodo-eletrocauterio-diferenca`
- `toxina-botulinica-cirurgia-hemorroida`

Reconcile the source branch and deployed revision before implementation. Do not deploy this checkout over the live site and silently remove these posts. The newer recovery and laser articles must also be included in overlap reviews.

### Confirmed: medical copy and editorial evidence need attention

The live laser-service description promises fast recovery and less pain without qualification; the pilonidal-service description also uses definitive-treatment language. The repository's CFM baseline calls for sober, individualized wording. Proposed safer descriptions for professional review:

- Laser: “Conheça as aplicações do laser em coloproctologia, suas indicações e limitações. A escolha da técnica depende de avaliação individual em Curitiba.”
- Pilonidal: “Entenda as opções de cirurgia para cisto pilonidal, incluindo técnicas convencionais e laser, e os cuidados discutidos na avaliação em Curitiba.”

The high-traffic SIBO/disbiose article contains diagnostic and therapeutic assertions without linked external references in its Markdown body. Have the clinician review those assertions against current guidance before refreshing that article. This audit does not certify clinical accuracy or legal compliance. Preserve CRM/RQE identification, patient privacy, and the educational disclaimer.

### Confirmed: some machine-readable FAQ content differs from the visible FAQ section

For example, the grade-3 hemorrhoid page emits frontmatter questions about definition, ligation and laser, while its visible FAQ section asks about reduction, number of ligation sessions, postoperative pain and recurrence. These subjects overlap the main article, so textual difference alone is not proof of a policy violation. Review actual Q&A visibility and meaning; prefer a shared, visible source if retaining FAQ markup.

Google [retired FAQ rich results on May 7, 2026](https://developers.google.com/search/updates). It also clarifies that `llms.txt` does not improve Google visibility. Keep useful FAQs for patients and preserve repository discovery contracts, but do not prioritize extra FAQ markup or AI text files as ranking recovery tactics. Google's [AI guidance](https://developers.google.com/search/docs/appearance/ai-features) focuses on the existing search fundamentals.

### Not measured: mobile experience and field performance

All crawled image elements had nonempty alt text. Some fill-layout images omit HTML width/height attributes; this is not automatically a layout-shift defect because their containers can reserve space. No mobile interaction test, field Core Web Vitals analysis, accessibility audit, backlink comparison, or Google Business Profile account audit was performed. Prioritize mobile checks because the standard export attributes 89.1% of clicks to mobile. Do not claim an LCP/INP/CLS defect without measurement.

## Priorities and acceptance criteria

| When | Priority / evidence | Work | Acceptance |
| --- | --- | --- | --- |
| Before source changes | 1 / Confirmed | Reconcile local branch with the deployment's four additional posts. | No live article disappears from the implementation branch, sitemap or discovery files. |
| First batch | 1 / Confirmed | Add the nine exact equivalent redirects. | Each source permanently redirects in one hop to a 200 page with the correct canonical; unknown unrelated paths still 404. |
| First batch | 1 / Confirmed | Add useful links in the most relevant existing posts; prioritize traffic leaders and treatment-specific articles. | Reader-relevant anchors, valid destination URLs, no implied diagnosis or universal procedure recommendation. |
| First batch | 1 / Confirmed | Qualify promotional laser/pilonidal descriptions; review the SIBO article's medical evidence. | Consistent visible copy/metadata, references for reviewed medical claims, retained identification/disclaimer. |
| Next 30 days | 1 / Blocked on comparison export | Rank actual losing page/query pairs, then refresh the few material losses. | Same-period clicks, impressions, CTR and position available per target; one documented hypothesis per change. |
| Next 30 days | 2 / Verify | Test the itch guide's title/snippet against its actual queries and SERP presentation. | Preserve URL and medical accuracy; record before/after metadata and outcome rather than assuming uplift. |
| Next 30 days | 2 / Verify | Differentiate overlapping articles and review the newer live recovery/laser posts. | Distinct intent documented; no blind consolidation of successful URLs. |
| Next 30 days | 2 / Verify | Verify consent-aware consultation event tracking and mobile usability. | Organic landing → CTA action can be measured appropriately; mobile completion checked. |
| 60–90 days | 2 / Verify | Expand only a proven content gap; strengthen legitimate professional/location references. | Distinct patient need, verified scope/location, measured acquisition value; no repetitive location pages. |

Do not promise that changing a title will produce a fixed CTR or click increase. Do not update modification dates unless the corresponding content materially changes.

## Measurement and next export

The current data is sufficient to establish sitewide growth and the recent dip. To identify **which pages/queries declined recently**, export standard **Performance → Search results** with comparison enabled for **September 15–October 12 vs August 18–September 14**, plus **October 6–12 vs September 29–October 5** if the aim is the latest-week decline. Include Pages and Queries with clicks, impressions, CTR and position for both periods; retain the same Web (text-based) filter. Filter the main losing pages individually and export Queries to establish actual query/page pairs. Use the same dates for Brazil/mobile segments if testing those hypotheses.

The current Pages/Queries files cannot reconstruct these comparisons. No volume, competitor gains, lost-query position changes, appointment totals, or conversion rates were invented.

Review weekly with complete seven-day windows and monthly with consecutive 28-day windows. Track clicks and impressions separately from AI visibility, plus actual consultation actions when available. Annotate changes and evaluate affected URLs against comparable unchanged content after sufficient data accumulates, usually at least 28 days. Protect what already works rather than repeatedly rewriting high-ranking pages.

## Verification performed

- Read all 17 supplied CSVs without altering them; recorded SHA-256 source fingerprints.
- Recomputed period totals, CTR and changes; reconciled chart, device and country totals; documented page/query aggregation limits.
- Fetched all 66 live sitemap URLs and checked HTTP, metadata, canonicals, H1s, image alt text, structured data and extracted internal paths.
- Checked nine malformed URLs returning 404 and one working http/non-www homepage variant.
- Compared 46 local post titles/descriptions and contextual service links to live HTML.
- Baseline repository checks: `bun run test:run -- tests/content-discovery.test.ts tests/mdx-image-dimensions.test.ts tests/seo-metadata.test.ts` passed: 3 files, 5 tests.
- Lint/build were not run for this research-only change. The implementation handoff requires both after code/content changes.
