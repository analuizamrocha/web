# Agent readiness

The [Is Agentic report](https://is-agentic.com/scan/www.analuizarocha.com.br), scanned at 2026-10-15 00:35 UTC (October 14 in Curitiba), scored production 77/100. This change addresses its five reported gaps. A new production score requires deployment and a fresh scan.

## Public behavior

| Request | Result |
| --- | --- |
| `GET /`, `Accept: text/markdown` | 200, useful Portuguese Markdown, `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept` |
| `GET /`, HTML, wildcard, or absent Accept | Existing HTML page; `Vary` retains Accept and Next.js routing headers |
| `GET /`, unsupported representations only | 406, available representations listed |
| Missing page, Markdown preferred | 404 Markdown with links to the homepage, llms.txt, and sitemap |
| Missing blog/location slug, Markdown preferred | Same recoverable Markdown 404 |
| Published blog/location detail, Markdown preferred | Markdown from existing content/data; renamed URLs still redirect first |
| `HEAD` on negotiated resources | Same status and headers, no response body |
| `/about` | Full existing `/sobre` page, HTTP 200, canonical remains `/sobre` |
| `/privacy` | Full existing privacy policy, HTTP 200, original canonical and noindex retained |
| `/contact` | Portuguese contact page with published scheduling details, location contacts, and public privacy email |
| `/llms.txt` | Markdown file lists with explicit when-to-use guidance and request instructions |
| `/sitemap.xml` | Existing canonical URLs plus `/contact`; aliases and internal Markdown routes are excluded |

RSC requests, server actions, static assets, robots.txt, sitemap.xml, and llms.txt retain their normal protocols. Existing static pages beyond the homepage keep serving HTML. Markdown variants and errors use `private, no-store` and `X-Robots-Tag: noindex`; they do not populate shared HTML cache entries. Organization JSON-LD retains the existing PostalAddress and adds a ContactPoint with the published scheduling phone, public email, language, and contact URL.

The new content uses the existing medical identification, service descriptions, and contact details. It introduces no patient data, pricing, availability, or treatment guarantees. About and Privacy share their existing implementations to prevent policy or credential drift.

## Next.js Vary compatibility patch

Next.js 16.2.10 overwrites Proxy's `Vary` header when rendering App Router HTML pages ([upstream issue](https://github.com/vercel/next.js/issues/85852)). `patches/next@16.2.10.patch` changes the CommonJS and ESM page-entry templates to merge existing Vary tokens with Next.js's required routing tokens. Bun applies this version-pinned patch during installation. Keep it until an upgraded Next.js passes the HTTP regression without the patch. The end-to-end suite asserts the final headers on both representations.

## Verification

```sh
bun install --frozen-lockfile
bun run test:run
bun run lint
bunx tsc --noEmit
bun run build
bun run start -- --hostname localhost --port 3127
# In a second terminal:
PLAYWRIGHT_BASE_URL=http://localhost:3127 bun run e2e -- tests/e2e/smoke.spec.ts tests/e2e/agent-readiness.spec.ts
```

The HTTP regression follows redirects, checks the response bodies as well as status and media type, exercises Accept quality values and exclusions, checks trust-page content length and canonicals, and requests every canonical sitemap URL and first-party llms.txt link. Browser checks cover existing homepage behavior, contact navigation, and published contact links.

After deployment, repeat against both the apex and www hosts, alternating representations to detect cache contamination:

```sh
curl -sS -L -i -H 'Accept: text/markdown' https://www.analuizarocha.com.br/
curl -sS -L -i -H 'Accept: text/html' https://www.analuizarocha.com.br/
curl -sS -L -i -H 'Accept: text/markdown' https://www.analuizarocha.com.br/some-path-that-does-not-exist
curl -sS -L -i -H 'Accept: text/markdown' https://analuizarocha.com.br/
curl -sS -L -i -H 'Accept: text/html' https://analuizarocha.com.br/
curl -sS -L -i -H 'Accept: text/markdown' https://analuizarocha.com.br/some-path-that-does-not-exist
```

Then rescan Is Agentic and confirm `scanned_at` is newer than the deployment. Its stored report does not prove the deployed changes passed. No new account credentials or booking API are needed for these fixes.

Protocol references: [Accept: text/markdown](https://acceptmarkdown.com/), [quality values](https://acceptmarkdown.com/guides/accept-parsing), [llms.txt format](https://llmstxt.org/), and [Schema.org ContactPoint](https://schema.org/ContactPoint).
