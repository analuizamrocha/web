# Next.js 16 + Lighthouse Improvement Plan

## Current baseline (after migration)

- Audit date: 2026-02-24
- Local URL: `http://127.0.0.1:3000`
- Performance: 89
- Accessibility: 96
- Best Practices: 96
- SEO: 100
- Core metrics:
  - FCP: 0.9s
  - LCP: 3.7s
  - TBT: 90ms
  - CLS: 0
  - SI: 1.7s

## Latest re-audit (after optimization batch)

- Audit date: 2026-02-25
- Local URL: `http://127.0.0.1:3000`
- Performance: 95
- Accessibility: 96
- Best Practices: 100
- SEO: 100
- Core metrics:
  - FCP: 0.9s
  - LCP: 3.0s
  - TBT: 24ms
  - CLS: 0
  - SI: 0.9s
- Confirmed deltas vs current baseline:
  - Performance: +6
  - Best Practices: +4
  - LCP: -0.7s
  - TBT: -66ms
  - SI: -0.8s

### What changed in this batch

1. Deferred non-critical client islands by introducing `ClientProviders` and rendering cookie/analytics logic client-side only after initial render.
2. Gated `@vercel/analytics` and `@vercel/speed-insights` to Vercel runtime, removing local 404/script MIME errors and lifting Best Practices.
3. Optimized `useMobileMenu` to avoid expensive DOM querying/inert cleanup during initial load when menu is closed.

## Priority 1: Keep Best Practices high in production

1. Audit GTM container tags and remove non-essential ad/remarketing tags.
2. Prefer one analytics path:
   - Keep GTM only and configure GA inside GTM, or
   - Keep GA only and remove GTM if not needed.
3. Re-run Lighthouse in production after consent acceptance to confirm third-party cookie warnings are reduced.

## Priority 2: Improve LCP

1. Keep only one above-the-fold `priority` image (hero) and avoid extra preloads.
2. Generate a smaller hero source variant and compare LCP impact under Slow 4G.
3. Re-check render tree and keep header/hero server-rendered with minimal client JS.

## Priority 3: Reduce JS overhead

1. Track and reduce `unused-javascript` and `legacy-javascript` findings.
2. Keep `@next/third-parties` gated by consent (already in place).
3. Use bundle analysis (`npm run analyze`) and remove/replace heavy client dependencies where possible.

## Quality gates

1. `npm run lint`
2. `npm run build`
3. `npm run e2e`
4. Lighthouse target:
   - Performance >= 92
   - Accessibility >= 96
   - Best Practices >= 90
   - SEO = 100

## Re-audit workflow

1. Build and start app:
   - `npm run build`
   - `npm run start -- --port 3000 --hostname 127.0.0.1`
2. Run Lighthouse:
   - `mkdir -p reports/lighthouse && npx lighthouse http://127.0.0.1:3000 --output=json --output-path=./reports/lighthouse/next16 --chrome-flags='--headless --no-sandbox'`
3. Repeat after each optimization batch and track trend in a single report table.
