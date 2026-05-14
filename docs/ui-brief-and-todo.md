# UI Brief and Quick TODO

Last updated: 2026-04-26

## Purpose

Keep a short, practical record of:

- what UI work already exists in code or on GitHub
- what still needs polish before this SEO/content batch feels finished

## GitHub sync status

Checked with `gh` on 2026-04-26.

### Already merged remotely

- PR #43: `feat(seo): replace LocalBusiness schema with Physician + MedicalOrganization`
- PR #39: `fix: next config`
- PR #38: `fix(seo): reduce crawl waste and normalize sitemap signals`

### Still open

- PR #42: `feat(locations): add location pages for Clínica Nassif and Specta`
- PR #44: `feat(nav): wire location pages into navigation, footer, and sections`
- PR #45: `feat(seo): add proctologista keyword coverage across metadata and copy`
- PR #46: `feat(blog): add related content sections and five new posts`

### Closed, not merged

- PR #41: `fix(config): add canonical host redirects for apex and http`
- PR #40: `[codex] add location pages and physician location schema`
- PR #37: `[codex] Strengthen proctologista coverage and internal linking`

### Current check status worth noting

- PR #44: `e2e` failing
- PR #46: Vercel deployment failing, `e2e` passing

## What we have now

### In the current local branch

- Dedicated locations hub page
- Dedicated location detail pages
- Location links added to header/footer/homepage sections
- Existing visual language is consistent with the rest of the site
- Build passes locally with `bun run build`

### In the broader GitHub plan

- Structured data refactor already merged remotely in PR #43
- Proctologista keyword expansion exists as a separate PR (#45)
- Related-content UI for blog posts exists as a separate PR (#46)

## UI brief

The site already has the right structural pieces for SEO and navigation. What is missing now is mostly presentation polish, consistency, and a cleaner reading flow.

The next UI pass should stay light:

- keep the current brand language and spacing rhythm
- improve hierarchy and scannability before adding new design patterns
- prioritize changes that help long pages feel lighter and more intentional

## Quick TODO

### 1. Location pages polish

- Tighten hero copy and reduce repeated explanatory text between the hub page and detail pages
- Make CTA hierarchy more obvious on location detail pages
- Review spacing between content blocks so the pages feel less stacked
- Consider adding a stronger visual distinction between:
  - consultation/follow-up location
  - colonoscopy location

### 2. Homepage location section polish

- Recheck card balance on mobile and desktop
- Keep WhatsApp as primary action, but make the secondary “details” action feel more deliberate
- Review equal-height behavior and vertical rhythm across the two cards

### 3. Blog related-content UI

- Simplify the visual weight of related-content cards
- Avoid two heavy stacked sections at the end of long articles
- Normalize card heights, excerpt length, and CTA alignment
- Decide whether “related posts” and “related treatments” should remain separate blocks or be visually grouped

### 4. Cross-page CTA consistency

- Standardize labels for `Ver locais`, `Ver detalhes`, `Ver tratamentos`, and consultation CTAs
- Check button weight and visual priority across `/sobre`, `/tratamentos`, `/blog`, and location pages
- Reduce small copy variations that create unnecessary decision friction

### 5. Mobile cleanup pass

- Recheck long headings on location pages
- Recheck list spacing in practical info and FAQ blocks
- Recheck tap targets for secondary text links inside cards

## Suggested order

1. Sync the location stack with what is already merged remotely
2. Finish merge decisions for PRs #42, #44, #45, and #46
3. Do one focused UI polish pass after merge conflicts are resolved
4. Run build and preview review

## Important note

Local `git fetch` was blocked in this workspace by `.git/FETCH_HEAD` permissions, so GitHub state above was verified with `gh` rather than refreshed local refs.
