# Component Inventory

Single source of truth for every component under `src/components/`. When you need a UI primitive, look here first before grepping or inventing one.

**Status legend**

- `active` — used in multiple places, treat as a stable primitive.
- `niche` — used once or in one feature area, leave as-is.
- `composition` — a page section, not a reusable primitive (don't import outside `app/`).
- `dead` — no usage, slated for removal.

Usage counts are number of files that import the component. Re-exports from a barrel (`index.ts`) count as one each.

---

## Buttons & Controls — `src/components/ui/`

| Component | File | Variants | Used in | Status |
|---|---|---|---|---|
| **Button** | `Button.tsx` | `primary`, `secondary`, `outline`, `ghost`, `sage`, `destructive` × sizes `sm`, `default`, `lg`, `xl`, `icon` | 1 file directly; most usage flows through `LinkButton` | active |
| **LinkButton** | `LinkButton.tsx` | Inherits `Button` variants/sizes; props `href`, `external`, `newTab` | 22 files | active |

The Button system is the most-used primitive. Hierarchy on cards/CTAs:

```
primary (solid)   → the one main action (Agendar consulta)
outline           → important alternative (Locais de atendimento)
ghost (text)      → optional / nav link (Ler o blog →)
```

`secondary` is a warmer beige fill used in `CallToActionCard` and a few section CTAs where neither primary nor outline reads right. `sage` and `destructive` are reserved palette slots — kept for future use but currently unused at the call site.

---

## Cards — `src/components/ui/`

| Component | File | Variants | Used in | Status |
|---|---|---|---|---|
| **Card** | `Card.tsx` | `default`, `treatment`, `service` (3, hardcoded) | 1 file | niche |
| **TreatmentCard** | `TreatmentCard.tsx` | `compact`, `detailed` | 2 files | active |
| **PlaceCard** | `PlaceCard.tsx` | Theme: `terracotta`, `sage` (hardcoded) | 1 file | niche |
| **CallToActionCard** | `CallToActionCard.tsx` | `primary`, `secondary` (background tone) | 11 files | active |
| **MediaCard** | `MediaCard.tsx` | Thumb: `terracotta`, `sage` | 1 file | niche |
| **RelatedBlogCard** | `RelatedBlogCard.tsx` | None | 9 files | active |

### Which card to use when

- **Treatment grids with images** → `TreatmentCard` (compact for cards in 3-up grids, detailed for hero/feature placement).
- **Body-of-page CTA blocks** (the "Precisa de um diagnóstico" pattern) → `CallToActionCard`.
- **Location pages** → `PlaceCard` (deeply specialized for clinic data — addresses, hours, meta strip, WhatsApp).
- **Blog "Related posts" lists** → `RelatedBlogCard`.
- **Horizontal media tiles** (one-off blog widget) → `MediaCard`.
- **`Card` itself** is the generic three-variant primitive used in one place and overlaps `TreatmentCard`. Consolidation candidate — see follow-ups below.

---

## Layout & Shell — `src/components/ui/` + `src/components/layout/`

| Component | File | Variants | Used in | Status |
|---|---|---|---|---|
| **Header** | `ui/Header.tsx` | — | 1 (root layout) | active |
| **Footer** | `ui/Footer.tsx` | — | 1 (root layout) | active |
| **StickyCTABar** | `ui/StickyCTABar.tsx` | — | 2 files | niche |
| **Divider** | `ui/Divider.tsx` | `horizontal`, `vertical` × `sm`, `md`, `lg` | 1 (Header) | niche |
| **ClientProviders** | `layout/ClientProviders.tsx` | — | root layout | active |
| **CookieConsent** | `layout/CookieConsent.tsx` | — | root layout | active |

---

## Navigation — `src/components/ui/`

| Component | File | Variants | Used in | Status |
|---|---|---|---|---|
| **Breadcrumb** | `Breadcrumb.tsx` | — | 11 files | active |

---

## Data Display & Content — `src/components/ui/`

| Component | File | Variants | Used in | Status |
|---|---|---|---|---|
| **Badge** | `Badge.tsx` | `primary`, `secondary`, `success`, `warning`, `error`, `info` × `sm`, `md`, `lg` | 13 files | active |
| **TreatmentHeroImage** | `TreatmentHeroImage.tsx` | — | 9 files | active |
| **MetaStrip** | `MetaStrip.tsx` | — | 1 file | niche |
| **MdxImage** | `MdxImage.tsx` | — | 1 file | niche |
| **MapEmbed** | `MapEmbed.tsx` | — | 1 file | niche |
| **LinkList** | `LinkList.tsx` | `dark`, `light` (surface adaptation) | 1 file | niche |
| **InfoCardGrid** | `InfoCardGrid.tsx` | — | 1 file | niche |
| **IndicationSection** | `IndicationSection.tsx` | — | 1 file | niche |
| **RelatedPostsSection** | `RelatedPostsSection.tsx` | — | 1 file | niche |

`Badge` is heavily used in card metadata (intent, audience, category). Only `primary` and `secondary` are visible at the call sites — the four state variants (`success`/`warning`/`error`/`info`) are reserved.

---

## Forms & Interactive — `src/components/ui/`

| Component | File | Variants | Used in | Status |
|---|---|---|---|---|
| **FAQAccordion** | `FAQAccordion.tsx` | — | 2 files | active |
| **ChoiceRow** | `ChoiceRow.tsx` | Theme: `terracotta`, `sage` | 1 file | niche |

---

## Page Sections — `src/components/sections/`

Compositions, not primitives. **Do not import these outside `src/app/` page files.**

| Component | File | Used in |
|---|---|---|
| `HeroSection` | `sections/HeroSection.tsx` | homepage |
| `AboutSection` | `sections/AboutSection.tsx` | homepage |
| `MissionSection` | `sections/MissionSection.tsx` | homepage |
| `ServicesSection` | `sections/ServicesSection.tsx` | homepage |
| `TreatmentsSection` | `sections/TreatmentsSection.tsx` | homepage |
| `PhotoSection` | `sections/PhotoSection.tsx` | homepage |
| `LocationsSection` | `sections/LocationsSection.tsx` | homepage |

Status: `composition` for all.

---

## Icons & Analytics

| Component | File | Used in | Status |
|---|---|---|---|
| `InstagramIcon` | `icons/instagram.tsx` | `Footer` | active |
| `WhatsAppIcon` | `icons/whatsapp.tsx` | `PlaceCard` | active |
| `AnalyticsProvider` | `analytics/AnalyticsProvider.tsx` | root layout | active |

---

## Findings & follow-ups

### Dead code (removed in this PR)

- **`Callout.tsx`** — 0 imports anywhere. The string `placeCalloutLabel` in `lib/locations.ts` and a comment in `PlaceCard.tsx` reference the *concept*, but nothing uses the component.
- **`Button` variants `default`, `tertiary`, `subtle`, `link`** — zero call-site usage. `default` and `tertiary` are byte-identical (both `bg-brand-primary`); `subtle` was demoted in PR #51 (replaced with `ghost`); `link` is a styled text link, easily done inline.

After this PR the Button variant list shrinks from 10 → 6.

### Consolidation candidates (future PRs)

- **`Card` ↔ `TreatmentCard`** — `Card` exposes `treatment` and `service` variants, but the only "treatment card" call site uses `TreatmentCard` directly. Three options for the follow-up PR: (1) delete `Card`'s `treatment` variant, (2) merge the polymorphic `Card` into `TreatmentCard` + a new `ServiceCard`, or (3) keep both and document them as deliberately different surfaces. Decision deferred.
- **Hardcoded theme dialects** (`terracotta` / `sage`) appear in `PlaceCard`, `MediaCard`, `ChoiceRow`. Each rolls its own `cn` switch. Worth extracting a shared `useCardTheme` helper or a single `theme` prop on `cva`.

### CSS-layer drift (not addressed here)

`src/app/globals.css` defines `.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`, `.btn-secondary`, `.btn-sm`, `.btn-lg` in `@layer components` (lines 431–449). These are CSS doubles of the React `Button` variants and **are not used by any component**. Grep confirms zero `className=".*btn-(primary|outline|ghost|secondary|sm|lg)"` in `src/`. Candidate for deletion in a separate cleanup PR.

### Components that don't exist (referenced elsewhere)

`DESIGN.md`'s Iteration Guide previously listed `CallToActionCard` as a primitive — it does exist (`ui/CallToActionCard.tsx`), confirmed active in 11 files. No "missing" components were found.
