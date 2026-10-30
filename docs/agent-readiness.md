# Markdown Representations

Content pages serve HTML and Markdown at the same canonical URL, in Brazilian Portuguese. The format is selected by the `Accept` header.

## Maintenance

- Pages stay in `src/app`. To extend coverage, register the path in `src/lib/markdown-page-paths.ts` and its loader in `src/lib/markdown-pages.ts`.
- `src/lib/page-markdown.ts` reuses the content of synchronous server pages. New components need an explicit adapter; do not duplicate medical copy.
- Articles use `content/posts/*.md`; location details use `src/lib/locations.ts`. Update `public/llms.txt` when publishing new articles, following the repository checklist.

## HTTP and indexing

- Negotiation honors `q` weights and exclusions. HTML is the default for a missing or wildcard Accept; incompatible formats get 406. Missing URLs return a Markdown 404 when that format is preferred. HEAD keeps status and headers, without a body.
- Markdown responses use `Content-Type: text/markdown; charset=utf-8`, `Content-Language: pt-BR`, `Vary: Accept`, and `Cache-Control: private, no-store`. Valid documents include a canonical `Link` and absolute URLs; code examples and original files are not rewritten.
- Direct access to `/conteudo-markdown` returns 404. RSC navigation, prefetches, Server Actions, static files, and discovery files keep their own protocols.
- Privacy, design routes, the helper, and social preview resources keep `noindex` and stay out of the sitemap. Social images remain accessible, and article images remain indexable. Do not block the crawling needed to read `noindex`.

## Next.js patch

Next.js 16.2.10 overwrites `Vary` on HTML pages. Bun applies `patches/next@16.2.10.patch`, which preserves `Accept` alongside the framework's required headers, both in the page handler and in the routes-manifest default that Vercel uses to serve prerendered HTML. When upgrading Next.js, remove the patch only after the HTTP regressions and the build manifest check pass.

## Verification

```sh
bun install --frozen-lockfile
bun run test:run
bun run lint
bun run build
node --test tests/build/agent-vary.mjs
bunx tsc --noEmit
PLAYWRIGHT_PRODUCTION=true bun run e2e -- tests/e2e/smoke.spec.ts tests/e2e/agent-readiness.spec.ts
```

Playwright starts the production build server; use `PLAYWRIGHT_BASE_URL` to test an already running server. After deploying, confirm status, headers, and bodies on the domain with and without `www`, alternating HTML and Markdown and including a missing URL. Repeat the audit scan only after this CDN check.
