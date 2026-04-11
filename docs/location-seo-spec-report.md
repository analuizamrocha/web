# Location SEO Spec Report

## Audit findings

- `src/app/layout.tsx` already handled global metadata, canonical, Open Graph, Twitter cards, and local geo hints.
- JSON-LD already existed in the project via `src/lib/structured-data.ts`, `src/app/page.tsx`, `src/app/sobre/page.tsx`, and treatment pages.
- The previous structured data strongly favored `Clínica Nassif` and did not model `Specta Endoscopia Digestiva` as a real location entity in the SEO graph.
- The homepage `LocationsSection` was server-rendered, so its content was crawlable in initial HTML, but the content itself was thin.
- There was no `/locais-de-atendimento` route, no dedicated location content model, and no reusable location schema helper.
- Internal linking between locations, treatments, footer, and about content was limited.
- In code, public location data was only structured for `Clínica Nassif`; `Specta` existed only as a hardcoded homepage card.

## Decision

Chosen approach: `homepage enhancement + dedicated location pages`.

Reasoning:

- There are only two locations, which keeps the architecture simple.
- Each location supports a distinct user intent:
  - `Clínica Nassif`: consultation, follow-up, treatment planning.
  - `Specta Endoscopia Digestiva`: colonoscopy when indicated.
- This supports useful standalone pages without creating doorway-style duplicates.

## What was implemented

### Shared location model

- Added `src/lib/locations.ts` as the central source for:
  - location facts
  - page copy
  - CTAs
  - related links
  - FAQ content
  - JSON-LD generation

### Structured data

- Updated `src/lib/structured-data.ts` to model the sitewide relationship as:
  - `MedicalOrganization`
  - `Physician`
  - `WebSite`
- Added homepage location graph via `getHomeLocationsStructuredData()`.
- Added dedicated location page JSON-LD with:
  - `WebPage`
  - `Physician`
  - `MedicalClinic`
  - `PostalAddress`
  - `Service`
  - `BreadcrumbList`

### New location routes

- Added `/locais-de-atendimento`
- Added:
  - `/locais-de-atendimento/clinica-nassif`
  - `/locais-de-atendimento/specta-endoscopia-digestiva`
- Added unique metadata, canonical, OG, and Twitter metadata for these pages.

### Internal linking

- Homepage locations section now links to detailed location pages while preserving the original card style.
- Added location links to:
  - footer
  - global navigation
  - homepage about section
  - `/sobre`
  - `/tratamentos`

### Sitemap

- Added the new location routes to `src/app/sitemap.ts`.

## Schema choice reasoning

- I did **not** model the clinics as if the doctor owned them.
- I preferred `MedicalClinic` for the individual places and kept the doctor's practice relationship centered on `Physician` + `MedicalOrganization`.
- I used `Service` on location pages instead of more specific medical subtypes when the site copy did not justify a narrower claim.
- I avoided review schema, unsupported ownership claims, and any facts not visible on the site.

## Files changed

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/sitemap.ts`
- `src/app/sobre/page.tsx`
- `src/app/tratamentos/page.tsx`
- `src/app/locais-de-atendimento/page.tsx`
- `src/app/locais-de-atendimento/[slug]/page.tsx`
- `src/components/sections/AboutSection.tsx`
- `src/components/sections/LocationsSection.tsx`
- `src/components/ui/Footer.tsx`
- `src/lib/constants.ts`
- `src/lib/faq-schema.ts`
- `src/lib/navigation.ts`
- `src/lib/locations.ts`
- `src/lib/structured-data.ts`

## Risks and limitations

- `Specta Endoscopia Digestiva` still has less factual detail available in code than `Clínica Nassif`.
- The site still has no dedicated contact page; contact intent is handled through WhatsApp and phone CTAs.
- If the clinic facts used on the site differ from Google Business Profile or clinic-managed listings, the entity association can remain weaker than desired.
- If future service-location relationships change, `src/lib/locations.ts` must be updated to keep visible content and schema aligned.

## Validation performed

- Ran `npm run build` successfully after implementation.
- Confirmed the new routes were statically generated:
  - `/locais-de-atendimento`
  - `/locais-de-atendimento/clinica-nassif`
  - `/locais-de-atendimento/specta-endoscopia-digestiva`

## Next manual SEO steps

1. Inspect the homepage in Google Search Console.
2. Inspect each location page in Google Search Console.
3. Test the homepage and both location pages in Rich Results Test.
4. Confirm clinic names and addresses are present in visible HTML exactly as intended.
5. Request indexing for the updated homepage and each new location page.
6. Verify consistency between website location details and Google Business Profile / clinic listings.
7. If the clinics can provide more verified public details, expand the location pages with those facts instead of generic explanatory copy.
