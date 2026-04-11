# SEO Indexing Recovery Report

**Site:** https://www.analuizarocha.com.br  
**Date:** 2026-04-10  
**Canonical host:** `https://www.analuizarocha.com.br` (www, https)

---

## 1. Summary

Google Search Console reported six categories of indexing problems across `/blog/*` and `/tratamentos/*` pages. After a full audit of routing, sitemap, canonicals, robots, and internal linking, **two genuine code bugs** were found and fixed. All other GSC warnings are either expected behavior or stale data that will resolve after Google re-crawls with the corrected sitemap.

---

## 2. Root Cause Analysis by GSC Bucket

### Discovered – currently not indexed (25 URLs)

**Cause:** Pages were recently added to the sitemap in PR #38. Google has queued these URLs but has not yet crawled and rendered them. This is normal for newly submitted content.

**Status:** No code bug. Will resolve as Google works through its crawl queue. Use "Request Indexing" in GSC to accelerate priority pages.

---

### Crawled – currently not indexed (non-www URLs)

**URLs flagged:**
- `https://analuizarocha.com.br/tratamentos/toxina-botulinica`
- `https://analuizarocha.com.br/tratamentos/sindrome-intestino-irritavel`
- `https://analuizarocha.com.br/tratamentos/hpv-anal`
- `https://analuizarocha.com.br/blog/constipacao-intestinal-cronica-causas-tratamento`

**Cause:** The non-www domain `analuizarocha.com.br` issues a 301 redirect to the www equivalent (configured at Vercel platform level). Google crawled the non-www version, followed the redirect, and correctly chose the www version as canonical. GSC shows the non-www URL as "crawled not indexed" because it is the redirect source, not the indexed target.

**Status:** Expected behavior. The www equivalents are correctly indexed or will be indexed. No action needed.

---

### 404 – Not Found

**`https://analuizarocha.com.br/tratamentos/tratamento-hpv-anal`** — **REAL BUG (fixed)**

The HPV treatment page was at some point linked or discovered under the slug `tratamento-hpv-anal`. The page actually lives at `/tratamentos/hpv-anal`. No redirect existed, so any traffic to the old URL landed on a 404.

**Fix applied:** Added permanent 301 redirect in `next.config.ts`:
```
/tratamentos/tratamento-hpv-anal → /tratamentos/hpv-anal
```

**`https://analuizarocha.com.br/blog/coceira-anal-quando-procurar-coloproctologista-curitiba`** — stale record

The blog post at this slug exists and is valid at the www version. This non-www 404 entry in GSC is a stale record from before the current sitemap configuration. The www version resolves correctly.

---

### Soft 404

**`https://analuizarocha.com.br/tratamentos/doencas-inflamatorias-intestinais`**

**Cause:** This is the non-www URL. Vercel redirects it to the www version. The www page (`/tratamentos/doencas-inflamatorias-intestinais`) has full content: proper metadata, 4 FAQ items, breadcrumbs, a hero image, and a CTA. It is not a soft 404.

The soft 404 flag was likely recorded during a crawl that happened before the page content was complete or before the www redirect was fully propagated.

**Status:** No code fix needed. The page is substantive. After Google re-crawls the www version, this should clear.

---

### Alternate page with proper canonical tag

**URLs flagged (all www):**
- `/tratamentos/toxina-botulinica`
- `/tratamentos/sindrome-intestino-irritavel`
- `/tratamentos/hemorroidas`
- `/tratamentos/hpv-anal`
- `/tratamentos/doencas-inflamatorias-intestinais`
- `/blog/sangue-nas-fezes-quando-procurar-coloproctologista`

**Cause:** All of these pages have explicit self-referencing canonical tags in the current code (verified by reading each page file). The "alternate canonical" status is stale GSC data from before canonical tags were properly set in the codebase.

GSC definition: a page shows "alternate canonical" when its canonical tag points to a *different* URL. The current code sets `alternates: { canonical: pageUrl }` on every page where `pageUrl` equals the page's own URL — correct by definition.

**Status:** Stale data. Will clear on next Google crawl. No code fix needed.

---

### Page with redirect

**URLs flagged:**
- `http://analuizarocha.com.br/` → http + non-www redirects to https://www (Vercel)
- `https://analuizarocha.com.br/` → non-www redirects to www (Vercel)
- `https://analuizarocha.com.br/sobre`, `/tratamentos`, `/blog` → non-www → www (Vercel)
- `https://analuizarocha.com.br/blog/hemorroida-sempre-cirurgica-tratamento` → non-www → www, www page exists ✓
- `https://analuizarocha.com.br/blog/plicoma-anal-cirurgia-laser` → non-www → www, www page exists ✓
- `https://analuizarocha.com.br/tratamentos/rastreio-cancer-anal` etc. → non-www → www ✓
- **`https://analuizarocha.com.br/blog/cisto-pilonidal-cirurgia-laser`** — **REAL BUG (fixed)**

The short slug `cisto-pilonidal-cirurgia-laser` does not match any blog post file. The file is `cisto-pilonidal-cirurgia-laser-quando-operar`. The non-www URL redirected to www, but the www version returned a 404 on the short slug. This old short slug was previously referenced in some context (likely external link or an old internal reference).

**Fix applied:** Added permanent 301 redirect in `next.config.ts`:
```
/blog/cisto-pilonidal-cirurgia-laser → /blog/cisto-pilonidal-cirurgia-laser-quando-operar
```

All other "page with redirect" entries are expected behavior from the Vercel non-www→www platform redirect. No code fix needed.

---

## 3. Changes Made

### `next.config.ts`

Added `redirects()` async function with two permanent 301 rules:

```typescript
redirects: async () => [
  {
    source: '/tratamentos/tratamento-hpv-anal',
    destination: '/tratamentos/hpv-anal',
    permanent: true,
  },
  {
    source: '/blog/cisto-pilonidal-cirurgia-laser',
    destination: '/blog/cisto-pilonidal-cirurgia-laser-quando-operar',
    permanent: true,
  },
],
```

### No other code changes required

| Component | Status | Notes |
|---|---|---|
| `sitemap.ts` | ✅ Correct | All 9 tratamentos + 34 blog posts + static routes, all www |
| `robots.txt` | ✅ Correct | Points to correct sitemap, allows all crawlers |
| Treatment page canonicals | ✅ Correct | All pages have self-referencing canonical |
| Blog post canonicals | ✅ Correct | Dynamically generated from post slug |
| Root layout `metadataBase` | ✅ Correct | `new URL('https://www.analuizarocha.com.br')` |
| `robots` meta on all pages | ✅ Correct | `index: true, follow: true` everywhere |
| Internal links (ServicesSection) | ✅ Correct | All 12 hrefs point to valid, current slugs |
| Duplicate-looking blog posts | ✅ Distinct | Verified: different primary keywords and publish dates |

---

## 4. What Is NOT Fixed (and Why)

- **"Discovered not indexed" pages** — Not a code bug. Google found these via sitemap, queued them, hasn't crawled yet. Use "Request Indexing" in GSC.
- **Non-www redirects** — Handled at Vercel platform level. Next.js `redirects()` only operates on the same host; cross-domain redirects must stay in Vercel settings.
- **"Alternate canonical" stale data** — Canonicals are correct in code. GSC will update after next crawl.

---

## 5. Vercel Platform Check Required

Verify in the Vercel dashboard that:
1. Custom domain `analuizarocha.com.br` has **"Redirect to www"** enabled
2. The redirect type is **301 (permanent)**, not 302

If this redirect is missing, all non-www URLs will serve content instead of redirecting, causing Google to see two separate versions of every page (canonical conflict).

---

## 6. Validation Checklist (Post-Deploy)

Run these locally or in a terminal after the next Vercel deployment:

```bash
# Verify tratamentos/tratamento-hpv-anal redirect
curl -I https://www.analuizarocha.com.br/tratamentos/tratamento-hpv-anal
# Expected: HTTP/2 301, Location: /tratamentos/hpv-anal

# Verify blog/cisto-pilonidal-cirurgia-laser redirect
curl -I https://www.analuizarocha.com.br/blog/cisto-pilonidal-cirurgia-laser
# Expected: HTTP/2 301, Location: /blog/cisto-pilonidal-cirurgia-laser-quando-operar

# Verify destination pages resolve
curl -I https://www.analuizarocha.com.br/tratamentos/hpv-anal
# Expected: HTTP/2 200

curl -I https://www.analuizarocha.com.br/blog/cisto-pilonidal-cirurgia-laser-quando-operar
# Expected: HTTP/2 200

# Verify sitemap is clean (check for non-www or old slugs)
curl https://www.analuizarocha.com.br/sitemap.xml | grep -E "analuizarocha\.com\.br(?!/)" || echo "No non-www URLs found"
curl https://www.analuizarocha.com.br/sitemap.xml | grep "tratamento-hpv-anal" || echo "No old treatment slug in sitemap"
curl https://www.analuizarocha.com.br/sitemap.xml | grep "cisto-pilonidal-cirurgia-laser\"" || echo "No short cisto slug in sitemap"
```

---

## 7. Manual Steps in Google Search Console

Complete in this order after deploy:

### Immediate (same day as deploy)

1. **Resubmit sitemap**
   - Sitemaps → Delete existing → Add `https://www.analuizarocha.com.br/sitemap.xml` → Submit

2. **URL Inspection — fixed URLs** (request indexing on each):
   - `https://www.analuizarocha.com.br/tratamentos/hpv-anal`
   - `https://www.analuizarocha.com.br/tratamentos/doencas-inflamatorias-intestinais`
   - `https://www.analuizarocha.com.br/tratamentos/toxina-botulinica`
   - `https://www.analuizarocha.com.br/tratamentos/sindrome-intestino-irritavel`
   - `https://www.analuizarocha.com.br/tratamentos/hemorroidas`

3. **URL Inspection — priority blog posts** (request indexing):
   - `https://www.analuizarocha.com.br/blog/quando-procurar-coloproctologista-curitiba`
   - `https://www.analuizarocha.com.br/blog/hemorroida-sempre-precisa-cirurgia`
   - `https://www.analuizarocha.com.br/blog/fissura-anal-tratamento`
   - `https://www.analuizarocha.com.br/blog/cancer-colorretal-rastreio-prevencao-diagnostico-precoce`
   - `https://www.analuizarocha.com.br/blog/hpv-anal-condilomas-riscos-tratamento-rastreio`

### Within 2 weeks

4. **Monitor these GSC reports** (check for improvement):
   - Coverage → "Discovered – currently not indexed" — count should drop as Google indexes pages
   - Coverage → "Alternate page with proper canonical tag" — should clear entirely
   - Coverage → "Page with redirect" — old entries should disappear; only non-www redirects remain
   - Coverage → "Not found (404)" — `tratamento-hpv-anal` should disappear
   - Coverage → "Soft 404" — DII page should clear after re-crawl

5. **Inspect homepage, /blog, and /tratamentos** via URL Inspection to confirm they are indexed and using the correct canonical.

---

## 8. Open Questions

- **Vercel non-www redirect type:** Confirm it is a 301 (permanent), not a 302. A 302 wastes link equity.
- **`http://analuizarocha.com.br/`:** GSC flags this as a redirect. Confirm Vercel also enforces https (not just www). Check that HSTS is active in production response headers.
- **Crawl budget:** With 34 blog posts + 9 treatment pages + static routes, total is ~50 pages. Crawl budget is not a concern at this scale. No further action needed.
