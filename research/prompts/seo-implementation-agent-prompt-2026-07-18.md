# Coding-agent prompt — Ana Luiza Rocha SEO implementation

You are working on the SEO and organic-conversion implementation for the website of Dra. Ana Luiza Moraes Rocha, a coloproctologist in Curitiba.

## Workspace

`/Users/diegovfeder/workspace/jobs/analuizarocha`

## Public site

`https://www.analuizarocha.com.br/`

## Read before acting

Read these files completely and follow their instructions:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/cfm-compliance-guidelines.md`
- `docs/blog-content-playbook.md`
- `docs/location-seo-spec-report.md`
- `docs/seo-indexing-recovery-report.md`
- `docs/seo-reports/relatorio-seo-executivo-analuizarocha-2026-05.md`
- `research/seuseo-study-2026-07-18.md`
- `research/seuseo-keywords-2026-08.csv`

Inspect `git status` before editing. Existing changes belong to the user; do not overwrite or revert them.

## Primary goal

Improve non-brand local acquisition and consultation conversion by making each treatment page the clear owner of its commercial keyword cluster, while preserving the blog pages already winning informational searches.

Do not optimize merely for a higher keyword count. Optimize for the correct page ranking for the correct patient intent and leading to a clear, compliant consultation journey.

## Ranking evidence to preserve and investigate

The supplied SeuSEO report covers 2026-06-17 to 2026-07-17 and tracks 328 terms:

- 39 improved.
- 8 declined.
- 258 were unchanged.
- 23 were newly tracked.
- 66 were in the Top 3.
- Another 30 were in positions 4–10.

Top gains:

- `hemorroida é cirúrgica`: 9 → 2.
- `toda hemorroida precisa de cirurgia`: 8 → 2.
- `fissura anal laser curitiba`: 6 → 1.
- `cirurgia hemorroidas curitiba`: 6 → 2.
- `coceira anal curitiba`: 5 → 1.

Declines to inspect:

- `proctologia curitiba`: 3 → 9.
- `crm-pr 45351`: 2 → 3.
- `dra ana luiza m rocha`: 1 → 2.
- `ligadura elástica para hemorroidas curitiba`: 6 → 7.
- `médica coloproctologista curitiba`: 1 → 2.

Do not rewrite winning articles casually. Confirm their current ranking URL and preserve the intent that is working.

## Non-negotiable constraints

- This is medical/YMYL content. Accuracy, patient safety, CFM compliance, and visible evidence take priority over keyword use.
- Do not invent diagnoses, indications, outcomes, efficacy rates, recurrence rates, recovery time, pain levels, procedure availability, hospital relationships, insurance coverage, prices, schedules, credentials, or patient results.
- Do not claim that a treatment is definitive, superior, guaranteed, painless, faster, safer, or appropriate for everyone.
- Flag clinical claims for doctor review when they are not clearly supported by an approved project source.
- Do not add testimonials, ratings, aggregate reviews, or patient cases.
- Do not create doorway pages, near-duplicate location pages, or one thin page per keyword variation.
- Do not deploy to production, request indexing, modify Google Business Profile, or mutate an external CMS/analytics system without explicit approval.
- Make repository changes first, run local verification, and show before/after values.
- Preserve Brazilian Portuguese, a sober educational tone, and the existing warm/human voice.
- Use Bun commands as required by the repository.

## Work in phases

### Phase 0 — Read-only baseline

1. Confirm the production stack, canonical host, deploy configuration, and branch state.
2. Crawl the live site and inspect rendered HTML for:
   - `/`
   - `/tratamentos`
   - all nine treatment pages
   - `/blog`
   - the winning/declining article URLs
   - `/sobre`
   - `/locais-de-atendimento`
   - both location detail pages
3. For each priority URL record:
   - HTTP status and final URL.
   - indexability.
   - canonical.
   - title and character count.
   - meta description and character count.
   - H1.
   - relevant JSON-LD types and entity IDs.
   - primary internal links in and out.
4. Compare live HTML with repository metadata. Report any repository/production drift.
5. If Search Console access exists, export query + page data for the latest 28 days and previous period. Do not assume access or fabricate metrics.

Before editing, report the baseline and identify which findings are confirmed, which are crawler heuristics, and which require clinical/client input.

### Phase 1 — Define page ownership

Create a keyword-to-page map for all priority-1 terms in `research/seuseo-keywords-2026-08.csv`.

Expected primary owners:

- Homepage: `coloproctologista curitiba`, `proctologista curitiba`, `proctologia curitiba`, and consultation variants.
- `/sobre`: brand/entity and credential support; it must not compete with the homepage for the primary local-commercial query.
- `/tratamentos/hemorroidas`: hemorroidas, ligadura elástica, escleroterapia, hemorroidectomia, and hemorroida surgery intent.
- `/tratamentos/cx-laser`: laser-proctology intent; coordinate with hemorroidas and fissura pages to avoid cannibalization.
- `/tratamentos/toxina-botulinica`: fissura/toxina intent.
- `/tratamentos/cx-fistulas-anorretais`: fistula treatment/surgery intent.
- `/tratamentos/hpv-anal`: HPV/condiloma treatment intent.
- `/tratamentos/rastreio-cancer-anal`: screening, citology, and high-resolution anoscopy intent.
- `/tratamentos/cx-cisto-pilonidal`: cisto pilonidal treatment/surgery intent.
- `/tratamentos/doencas-inflamatorias-intestinais`: DII/Crohn/retocolite intent.
- `/tratamentos/sindrome-intestino-irritavel`: SII treatment intent.
- Location pages: Batel consultation and Mercês colonoscopy journeys, without pretending the doctor owns partner clinics.
- Blog posts: informational questions and symptoms, with contextual links to the appropriate treatment or consultation owner.

If current ranking evidence contradicts this map, explain the tradeoff before changing anything.

### Phase 2 — On-page and content architecture

Prepare and implement repository-safe improvements for the confirmed gaps.

#### Treatment metadata

Use one clear local-commercial intent per treatment page. Current direction, subject to length and clinical review:

- Hemorroidas: `Tratamento de hemorroidas em Curitiba | Dra. Ana`
- Laser: `Cirurgia a laser em proctologia em Curitiba`
- Fístula: `Tratamento de fístula anal em Curitiba`
- Toxina/fissura: `Toxina botulínica para fissura anal em Curitiba`
- HPV: `Tratamento de HPV anal em Curitiba`
- Cisto: `Cirurgia de cisto pilonidal em Curitiba`
- DII: `Acompanhamento de DII em Curitiba`
- SII: `Tratamento de SII em Curitiba`

Do not apply these blindly. Check the root title template to calculate the final rendered length. Keep titles distinctive and patient-readable. Make H1, opening copy, and metadata agree without repeating keywords unnaturally.

#### Treatment hub

The live crawl measured `/tratamentos` at roughly 210 words. Improve it as a decision hub, not with filler:

- Explain the role of consultation and individualized indication.
- Group clinical evaluation, outpatient procedures, surgery, screening, and follow-up clearly.
- Link to each treatment owner with descriptive anchors.
- Make uncertainty and individual assessment explicit.
- Remove or revise promotional absolutes such as `melhor resultado` and `alívio definitivo`.

#### Blog consolidation and internal linking

The repository has 44 posts. Before creating content:

- Detect overlapping primary keywords and intents.
- Review the coceira, hemorroidas, fissura, HPV, cisto, and fístula clusters.
- Keep the best-matched URL as primary for each informational query.
- Add contextual links from winning posts to the related treatment page.
- Add links from treatment pages back to a small number of useful supporting posts.
- Do not redirect or merge a ranked post without a before/after plan and approval.

New posts are allowed only when the gap is distinct, supported by Search Console/report evidence, and not already covered.

### Phase 3 — Medical/CFM copy review

Search the repository for absolute or promotional claims, including variants of:

- `definitivo`
- `melhor resultado`
- `recuperação rápida`
- `menor dor`
- `sem dor`
- `sempre precisa`
- `não cicatriza`
- `elimina`
- `reduz recidiva`
- `padrão-ouro`

Classify each occurrence:

- Acceptable educational context.
- Needs conditional wording.
- Needs a medical source.
- Needs explicit doctor/CFM review.

Do not perform a mechanical global replacement. Preserve medically meaningful distinctions and rewrite sentence by sentence.

### Phase 4 — Technical SEO and structured data

Verify and fix only confirmed issues:

1. Preserve self-referencing canonicals and the canonical `www` host.
2. Confirm the intentional indexability policy for `/politica-privacidade`; do not index it only to satisfy a crawler.
3. Verify sitemap completeness and last-modified behavior.
4. Ensure one coherent graph for `Physician`, `MedicalOrganization`, `MedicalClinic`, `WebSite`, `MedicalWebPage`, `Article`, and `BreadcrumbList`.
5. Make schema facts match visible content and stable entity IDs.
6. Do not add review/rating schema, unsupported ownership, or unsupported service/location relationships.
7. FAQ schema, if retained, must match visible FAQ text exactly. Do not promise a Google rich result.
8. Verify `og:url` for `/tratamentos` and OG image dimensions.

### Phase 5 — Accessibility and performance

Manually verify the crawler’s findings before patching:

- Add a valid `<main>` landmark and skip target on templates that lack them.
- Give the mobile-menu dialog a valid accessible name and fix broken `aria-labelledby` references.
- Resolve accessible-name/visible-label mismatches in consultation and location links.
- Keep heading order logical on `/tratamentos`.
- Review repeated generic link labels such as `Saiba mais` and `Ler artigo` in context.
- Identify the real desktop and mobile LCP elements.
- Use Next.js image priority/preload only for the actual LCP image.
- Preserve lazy loading below the fold.
- Convert/resize the seven heavy blog images where quality permits; several current responses exceed 300–600 KB.
- Verify width/height or aspect-ratio reservation and real CLS before changing `fill` images.
- Evaluate pagination or progressive rendering for the 44-card blog index, which currently exposes roughly 151 internal links.

Do not add JavaScript unless needed. Preserve the design and mobile experience.

### Phase 6 — Verification

Run at minimum:

```bash
bun run lint
bun run test:run
bun run build
```

Run relevant Playwright tests. Preview representative pages at desktop and 390 px mobile.

For every changed URL verify:

- HTTP status and final URL.
- indexability and canonical.
- rendered title/description lengths.
- one clear H1.
- heading hierarchy and `<main>` landmark.
- internal links.
- valid JSON-LD matching visible content.
- no new console errors.
- no obvious layout shift.
- consultation CTA behavior.

Validate structured data with Schema.org Validator and, where applicable, Google Rich Results Test. Treat tool eligibility as validation, not a ranking guarantee.

## Approval boundary

Repository changes and local preview are authorized by this prompt. Production deployment, Search Console indexing requests, analytics changes, and external profile changes are not.

Before any production action, provide:

- Exact files and URLs affected.
- Before/after metadata and visible copy.
- Medical claims changed and the source/approval status for each.
- Schema before/after.
- Verification evidence.
- Rollback plan.

Then ask for explicit approval.

## Git delivery — draft PR required

This task must end in a reviewable draft PR, not a deployment.

1. Inspect `git status -sb`, the current branch, remote, and any existing PR before editing.
2. Preserve the existing `.agents/` and `research/` artifacts; they are part of the SEO handoff, not disposable temporary files.
3. If the current branch already has an open draft PR for this work, update that PR rather than creating a duplicate.
4. If starting from `main`, create a branch named `agent/seo-growth-implementation` or continue the existing SEO planning branch when one has already been pushed.
5. Stage only files related to this task. Do not include caches, screenshots outside the established evidence directory, secrets, environment files, or unrelated user changes.
6. Run the full verification suite before pushing.
7. Commit with a concise message and push the branch.
8. Open or update a **draft** PR targeting `main`.
9. The PR description must include scope, keyword-to-page decisions, CFM review items, before/after evidence, tests, screenshots, blockers, rollback notes, and the statement `No production deployment was performed.`
10. Do not mark the PR ready for review, merge it, or deploy it.

## Required final report

Return:

1. Executive result.
2. Files changed.
3. URLs affected.
4. Keyword-to-page ownership decisions.
5. Before/after metadata.
6. CFM/clinical claim changes and unresolved review items.
7. Structured-data changes.
8. Accessibility/performance changes.
9. Commands/tests run and results.
10. Screenshots or other verification evidence.
11. Blocked items and required client facts.
12. Production actions still awaiting approval.

Do not deploy as part of this task.
