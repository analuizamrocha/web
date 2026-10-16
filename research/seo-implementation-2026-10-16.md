# SEO implementation — October 16, 2026

Implements the confirmed redirect and internal-link opportunities from the [October review](https://github.com/analuizamrocha/web/pull/64) and the [earlier SEO handoff](https://github.com/analuizamrocha/web/pull/58). Their original research remains available in those PRs.

## Scope

- Nine known article URL variants permanently redirect to their existing canonical articles. Exact mappings are covered independently in `tests/e2e/seo-recovery.spec.ts`.
- Normal trailing-slash removal runs after the exact redirects, avoiding an intermediate hop for the nested itch URL. Unrelated unknown URLs retain their 404 responses.
- Eleven existing articles gain contextual treatment or consultation links. Titles, descriptions, slugs, images, card hooks, FAQ frontmatter and professional footers are preserved. Modification dates reflect the editorial link changes, not a clinical review.
- The treatment hub retains its original copy except for three substitutions: “alívio definitivo” → “alívio dos sintomas”; “baixa recidiva” → “indicação individualizada”; “a mais alta qualidade técnica” → “qualidade técnica”.
- The laser and pilonidal detail pages are unchanged from main, including metadata, schema, FAQs and CTAs. Their sitemap dates are unchanged.
- CI includes the SEO regressions alongside the existing production smoke and agent-readiness checks. CI uses its installed Chromium; local runs retain system Chrome.

## Source and HTTP checks

The initial live checks confirmed the malformed URLs were broken, with the nested itch URL first removing its trailing slash. The production-app tests verify one-hop 308 redirects, 200 destinations, correct canonicals, preserved query strings, HTML/Markdown negotiation, pre-existing aliases and unrelated 404s.

The final live sitemap recheck on October 16 found **71 URLs and 54 articles**. All 54 article slugs match both main and the implementation branch; no live article is missing and no additional article is introduced by this PR. This supersedes the earlier 50-live/54-source inventory discrepancy.

The one-off JSON audit snapshot is excluded from this implementation. The relevant inventory result is retained here, and the original October evidence remains available in the linked research PR.

## Validation

- 65 unit tests and 39 production browser tests passed.
- ESLint, production build, standalone TypeScript and diff checks passed.
- Representative mobile/desktop rendering and all 11 edited article card contracts were checked. Restored service pages were confirmed identical to main.

```sh
bun run test:run
bun run lint
bun run build
bunx tsc --noEmit
PLAYWRIGHT_PRODUCTION=true bun run e2e -- tests/e2e/smoke.spec.ts tests/e2e/agent-readiness.spec.ts tests/e2e/seo-recovery.spec.ts
```

## Follow-up work

- Clinician-led review of SIBO/disbiose diagnostic and treatment assertions, preserving the successful URL and question coverage.
- Current Search Console page/query comparisons before title experiments or article consolidation. The original comparison windows are documented in the October review; use fresh complete periods for subsequent decisions.
- Focused accessibility, field Core Web Vitals, image-weight and broader entity/schema reviews. These are investigation items, not confirmed defects.
- Verify consent-aware consultation tracking separately; this PR does not add tracking.

After release, recheck the public redirect URLs and compare complete seven-day and 28-day Search Console windows. Keep standard Web clicks/impressions separate from AI visibility. Passing checks establishes behavior, not ranking or appointment gains.

The reporting PRs can be closed as superseded once this implementation is accepted, with these follow-ups retained. Rollback is to revert the implementation commits and recheck HTTP behavior, the treatment hub and article links. No production deployment or merge was performed as part of preparing this PR.
