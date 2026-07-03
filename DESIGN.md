---
version: alpha
name: analuizarocha
description: Warm, calm, editorial medical interface for a coloproctology practice in Curitiba.
sourceOfTruth:
  cssTheme: src/app/globals.css
  tailwindConfig: tailwind.config.ts
  componentInventory: docs/components.md
  note: "Tailwind v4: CSS @theme in globals.css is the primary token source at runtime; tailwind.config.ts extends with breakpoints/shadows/font families. When values disagree, CSS wins. docs/components.md is the source of truth for which components exist and which to use when."
colors:
  background: "#fffbf7"
  primary: "#663a25"
  secondary: "#d4b7a2"
  tertiary: "#b08771"
  brand-primary: "#c27e5c"
  accent-neutral: "#7a8b68"
  accent-sage-deep: "#5d6f47"
  text-heading: "#3d1f0f"
  text-body: "#6b4226"
  text-muted: "#8b5a3c"
  card-bg: "#f5ebe1"
  card-bg-hover: "#f0e3d4"
  bg-subtle: "#fef8f2"
  border-subtle: "#e5d4c4"
  neutral-50: "#faf9f7"
  neutral-100: "#f5f3f0"
  neutral-200: "#e8e4de"
  neutral-300: "#d4ccc1"
  neutral-400: "#b5a599"
  neutral-500: "#967d6f"
  neutral-600: "#7a8b68"
  neutral-700: "#5a4f47"
  neutral-800: "#463d36"
  neutral-900: "#2d2622"
typography:
  display-xl:
    fontFamily: Literata (--font-pt-serif)
    fontSize: 3.75rem
    fontWeight: 700
    lineHeight: 1
  display-lg:
    fontFamily: Literata (--font-pt-serif)
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1
  heading-lg:
    fontFamily: Literata (--font-pt-serif)
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.15
  heading-md:
    fontFamily: Literata (--font-pt-serif)
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 1.25
  title-md:
    fontFamily: Montserrat
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.35
  body-lg:
    fontFamily: Montserrat
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Montserrat
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Montserrat
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Montserrat
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.25
rounded:
  sm: 0.375rem
  md: 0.5rem
  lg: 0.75rem
  xl: 1rem
  "2xl": 1rem
  "3xl": 1.5rem
  pill: 9999px
spacing:
  xs: 0.5rem
  sm: 0.75rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  "2xl": 3rem
  section-y: 4rem
  container-x-mobile: 1.5rem
  container-x-tablet: 2rem
  container-x-desktop: 2.5rem
  container-x-wide: 3rem
layout:
  containerMax: 1760px
  contentMax: 65ch
  articleMax: 70ch
  cardGridGap: 1.5rem
shadows:
  sm: "0 1px 2px rgba(102, 58, 37, 0.08)"
  md: "0 4px 14px rgba(102, 58, 37, 0.15)"
  lg: "0 10px 25px rgba(102, 58, 37, 0.2)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
    minHeight: 2.5rem
  button-default:
    backgroundColor: "{colors.brand-primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
    minHeight: 2.5rem
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    border: "2px solid {colors.primary}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.card-bg}"
    textColor: "{colors.text-body}"
    border: "1px solid rgba(212, 183, 162, 0.2)"
    rounded: "{rounded.3xl}"
    padding: "1.5rem"
  callout:
    backgroundColor: "rgba(212, 183, 162, 0.1)"
    border: "1px solid rgba(212, 183, 162, 0.2)"
    rounded: "{rounded.3xl}"
    padding: "2rem"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    border: "1px solid {colors.neutral-300}"
    rounded: "{rounded.2xl}"
    padding: "0.75rem 1rem"
  badge:
    backgroundColor: "rgba(102, 58, 37, 0.1)"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.75rem"
---

# DESIGN.md - analuizarocha

## Overview

This project is a warm, calm medical website for Dra. Ana Luiza Moraes Rocha, a coloproctologist in Curitiba. The interface should feel professional, human, discreet, and educational. It should never feel like aggressive healthcare marketing, a beauty clinic landing page, or a generic SaaS template.

The visual language is built from:

- Warm cream page backgrounds.
- Deep brown text and navigation.
- Terracotta/brown CTAs.
- Soft beige cards and borders.
- Occasional sage accents for calm, health, and institutional trust.
- Editorial serif headings paired with readable sans-serif body text.

Use the tokens already present in `tailwind.config.ts` and `src/app/globals.css`. Do not introduce new color families unless the Tailwind theme is updated first.

## Source Of Truth

Design tokens currently live in two places:

- `tailwind.config.ts` defines the Tailwind extension: brand colors, neutral scale, fonts, shadows, radii, container widths, and breakpoints.
- `src/app/globals.css` defines the active Tailwind v4 `@theme` CSS variables and shared component utility classes.

When building UI, use semantic Tailwind classes such as `bg-background`, `text-primary`, `text-secondary`, `bg-card`, `text-heading`, `text-body`, `border-secondary/20`, and `bg-brand-primary`. Avoid hard-coded hex values in components.

If a token value must change, update both token sources in the same change and keep this file in sync.

## Colors

### Core Palette

- **Background** (`{colors.background}` / `bg-background`): warm cream page canvas. Use for body, nav, mobile menus, and article surfaces.
- **Primary** (`{colors.primary}` / `text-primary`, `bg-primary`): deep brown. Use for main headings, primary text emphasis, footer background, key links, and high-emphasis CTAs.
- **Brand Primary** (`{colors.brand-primary}` / `bg-brand-primary`): terracotta. Use for warmer primary buttons and small brand accents.
- **Secondary** (`{colors.secondary}` / `text-secondary`, `bg-secondary`): light beige/brown. Use for supporting copy, soft panels, borders, and muted visual structure. Do not rely on it for small low-contrast text unless already validated.
- **Tertiary** (`{colors.tertiary}`): medium brown. Use rarely for intermediate accent states.
- **Accent Neutral** (`{colors.accent-neutral}`): sage green. Use sparingly for mission, values, and calming health-related accents.

### Text Palette

- **Text Heading** (`{colors.text-heading}` / `.text-heading`): highest contrast heading color for content-heavy areas.
- **Text Body** (`{colors.text-body}` / `.text-body`): long-form body text, prose paragraphs, card descriptions.
- **Text Muted** (`{colors.text-muted}` / `.text-muted`): dates, captions, metadata, and helper text.

### Surface Palette

- **Card Background** (`{colors.card-bg}` / `bg-card`): warm beige cards for treatments, blog cards, and repeated content.
- **Card Hover** (`{colors.card-bg-hover}` / `bg-card-hover`): subtle hover surface for cards.
- **Subtle Background** (`{colors.bg-subtle}`): prose blockquotes and low-emphasis information boxes.
- **Subtle Border** (`{colors.border-subtle}`): prose blockquotes, tables, dividers, and soft card outlines.
- **Neutral Scale** (`neutral-50` through `neutral-900`): use only when a semantic token does not exist.

## Typography

### Font Families

- **Headings:** Literata from `next/font/google`, exposed via the CSS variable `--font-pt-serif` (the variable name is legacy from when PT Serif was used; the loaded font today is Literata). Reach it with `font-serif` or `font-family: var(--font-pt-serif)`.
- **Body/UI:** Montserrat from `next/font/google`, exposed as `--font-montserrat`. Reach it with `font-sans`.
- Both fonts are loaded in `src/app/layout.tsx` via `next/font/google` with `display: 'swap'` and fallback fonts configured.

### Hierarchy

| Token | Tailwind Pattern | Use |
| --- | --- | --- |
| `display-xl` | `text-6xl font-serif font-bold` | Desktop homepage and major landing headings |
| `display-lg` | `text-5xl font-serif font-bold` | Page heroes and section titles |
| `heading-lg` | `text-4xl font-serif font-bold` | Section headings |
| `heading-md` | `text-3xl font-serif font-bold` | Article and treatment headings |
| `title-md` | `text-xl font-sans font-bold` | Card titles and compact treatment cards |
| `body-lg` | `text-lg leading-relaxed` | Intro paragraphs and page subtitles |
| `body-md` | `text-base leading-relaxed` | Default body and card descriptions |
| `body-sm` | `text-sm leading-relaxed` | Metadata, footer, helper copy |

Headings should feel editorial and composed. Do not use oversized all-caps headings, compressed display type, or negative tracking. Body text should prioritize readability and calm pacing.

## Layout

### Containers

- Use the project container rhythm: `max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12`.
- Use `max-w-4xl` for centered section intros.
- Use `max-w-6xl` for blog grids and medium-width CTA blocks.
- Keep prose line length around `65ch` for regular content and `70ch` for larger prose.

### Section Rhythm

- Default sections use `.section`: `pt-8 pb-16`.
- First page sections compensate for the fixed header with `pt-24 md:pt-28` or equivalent.
- Main homepage bands should breathe with `mb-16 lg:mb-20` between heading blocks and grids.
- Avoid placing cards inside cards. Use full-width sections with constrained inner content, then cards only for repeated items, callouts, or framed tools.

### Grids

- Service and treatment grids collapse from 3 columns on desktop to 2 on tablet to 1 on mobile.
- Blog cards use 2 columns on desktop/tablet and 1 column on mobile.
- Keep grid gaps in the `gap-5` to `gap-10` range depending on density.

### Below-the-fold rendering

Page sections below the first viewport carry `class="section section-deferred"`. The `.section-deferred` utility (`src/app/globals.css`) uses `content-visibility: auto` with `contain-intrinsic-size: 1px 900px` so the browser can skip layout and paint for off-screen sections — improves LCP on the homepage.

**Gotcha:** a smooth `window.scrollTo` (or `element.scrollIntoView({behavior:'smooth'})`) into a deferred section drifts as placeholders are swapped for real content mid-scroll. `useActiveSection.scrollToSection` pins all deferred sections to `content-visibility: visible` before the scroll begins; do the same if you write a new programmatic scroll. See PR #51 for the diagnosis.

## Elevation And Depth

Depth should be subtle. The site mostly uses warm surface changes, hairline borders, and modest shadows.

- Default card: soft beige surface, `border-secondary/20`, `shadow-sm`.
- Hover card: slight upward translate, stronger border, `shadow-md` or `shadow-lg`.
- Hero photography may use stronger shadows on desktop, but avoid dramatic glow effects.
- Do not add heavy drop shadows, glassmorphism, neon effects, gradient orbs, or decorative bokeh.

## Shapes

- Buttons and badges are rounded pills.
- Cards, callouts, image containers, and panels use `rounded-3xl`.
- Inputs use `rounded-2xl`.
- Small menu/link focus surfaces may use `rounded-md`.
- Keep radius consistent within a view. Do not mix sharp cards with pill-heavy controls unless matching an existing pattern.

## Components

### Header

Use a fixed header with `bg-background/90`, backdrop blur, `border-primary/10`, and a small shadow. The brand lockup stays text-based: doctor name in serif primary, specialty in small secondary text.

Desktop nav links are small, semibold, and underline through an animated bottom border. Mobile nav opens as a cream sheet below the header with large tap targets and restrained active states.

### Buttons

`Button` and `LinkButton` share the same variant system (see `src/components/ui/Button.tsx`). Six variants, all pill-shaped, all with focus rings and `active:scale-95` press feedback.

The active design hierarchy on CTA blocks is **primary → outline → ghost** (recently adopted on `/tratamentos` and `/sobre`):

- **`primary`:** `bg-primary text-background`. The one main action — appointment scheduling, highest-emphasis CTAs.
- **`secondary`:** `bg-secondary text-primary` with a thin border. Warmer beige fill used in `CallToActionCard` and a few section CTAs where neither primary nor outline reads right.
- **`outline`:** `border-2 border-primary text-primary`. Important alternative to the primary action (e.g. "Locais de atendimento" next to "Agendar consulta").
- **`ghost`:** `text-muted` with hover transition to `text-primary`, no fill. Quiet third-tier action — optional/discovery links. Pair with a `group-hover:translate-x-0.5` arrow span (`→`) when the action is a "read more" or "see also".
- **`sage`:** `bg-accent-neutral text-background`. Reserved palette slot for sage-themed institutional content. Not currently used at the call site but kept in the system.
- **`destructive`:** red action button. Reserved for genuinely destructive actions (delete, cancel-with-consequences). Not currently used.

Sizes: `sm`, `default`, `lg`, `xl`, `icon`.

Use `LinkButton` (not `Button`) whenever the action navigates — it accepts `href`, `external`, and `newTab` props and renders an `<a>` or Next `<Link>` as appropriate. Use raw `Button` only for actions that are not navigation (form submission, modal trigger).

Keep labels direct and action-oriented. Avoid urgency language that feels coercive.

### Cards

Multiple card primitives coexist today — see `docs/components.md` for the "which card to use when" matrix. Briefly:

- **`TreatmentCard`** — treatment grid items, with image background and optional category badge. Two variants: `compact` for 3-up grids, `detailed` for hero placement.
- **`CallToActionCard`** — body-of-page CTA blocks (the "Precisa de um diagnóstico" pattern). Two tone variants: `primary` and `secondary`.
- **`PlaceCard`** — location pages only. Deeply specialized for clinic data (address, hours, phone, WhatsApp, photo). Not reusable.
- **`RelatedBlogCard`** — blog "Related posts" lists.
- **`MediaCard`** — horizontal media tiles (one-off blog widget).
- **`Card`** — generic three-variant primitive (`default` / `treatment` / `service`). Overlaps `TreatmentCard`; consolidation is a known follow-up.

Common rules across all card types: rounded surfaces, soft borders, no nested cards, no decorative-only cards. Functional surfaces only.

### Forms And Inputs

Inputs use `bg-background`, `text-primary`, `border-neutral-300`, `rounded-2xl`, and a brand-primary focus ring. Labels use small semibold primary text. Placeholder text should be muted and readable.

### Badges

Badges are rounded pills. Use primary badges for content intent/status and secondary badges for audience/category labels. Keep badge language short.

### Prose And Blog Content

Blog/article pages use `.prose` overrides:

- Headings use serif, bold, primary.
- Paragraphs use `text-body`, large readable sizing, and `line-height: 1.7`.
- Blockquotes use subtle warm backgrounds and a left border.
- Tables use warm borders and card-like styling.

For blog content, follow the root `AGENTS.md` content contract. The first italic paragraph after frontmatter controls the blog card subtitle.

### Footer

The footer is the strongest dark surface: `bg-primary` with cream text. Keep it simple, credential-forward, and link-focused. Do not introduce a separate black or navy footer.

## Imagery

Use real, respectful practice imagery and approved site assets. Images should support trust and orientation: doctor portrait, clinic/location, treatment-category context, or educational article imagery.

Avoid:

- Graphic medical imagery that may alarm patients.
- Before/after framing.
- Identifiable patient situations.
- Stock photos that imply guarantees or staged distress.
- Sensational or fear-inducing visuals.

All image alt text should be descriptive, sober, and specific enough for accessibility and SEO without keyword stuffing.

## Medical And CFM-Sensitive Design Rules

This is a medical professional website. Visual and copy decisions must follow the compliance baseline in `docs/cfm-compliance-guidelines.md`.

Do:

- Keep tone educational, sober, welcoming, and precise.
- Make professional identification visible where relevant.
- Present treatments as options that require medical evaluation.
- Use CTAs for appointment booking and learning more without pressure tactics.
- Protect patient privacy in all imagery and content.

Do not:

- Use fear, shame, urgency, countdowns, or exaggerated pain framing.
- Promise outcomes, recovery speed, cure, or superiority.
- Create "best doctor", "exclusive technique", or "guaranteed result" claims.
- Use before/after patterns, testimonial-heavy layouts, or sensational procedure visuals.
- Make CTAs sound coercive, such as "resolve this now" or "do not wait until it gets worse".

## Responsive Behavior

- Mobile first. Keep text readable without viewport-based font scaling.
- Header collapses below `lg` into the existing mobile menu pattern.
- Hero layouts stack vertically on mobile, with imagery and text ordered intentionally per page.
- Grids reduce columns rather than shrinking content below readable sizes.
- Cards keep stable dimensions and do not change size on hover except for existing subtle translate effects.
- Touch targets should be at least 40px high, with 44px preferred where layout allows.

## Accessibility

- Preserve the current strong text contrast tokens.
- Use visible focus states on buttons, links, cards, and menu controls.
- Do not put long text over busy images.
- Maintain semantic headings in order.
- Use descriptive link labels and `aria-label` only when needed to clarify repeated links.
- Keep reduced-motion support intact.

## Do's And Don'ts

### Do

- Use semantic Tailwind tokens instead of raw hex values.
- Keep the cream, brown, terracotta, beige, and sage system coherent.
- Use serif headings for editorial warmth and Montserrat for UI clarity.
- Keep medical content calm, specific, and professionally identified.
- Use rounded cards, soft borders, and modest shadow to create depth.
- Prefer real site imagery over abstract decoration.

### Don't

- Do not introduce blue, purple, neon, black, or cool-gray dominant themes.
- Do not create marketing-style hero pages with oversized decorative gradients.
- Do not use decorative orbs, bokeh blobs, or glass panels.
- Do not make cards look like ads or lead magnets.
- Do not use all-caps urgency banners.
- Do not hard-code design values in new components when a token exists.

## Iteration Guide

1. Before changing UI, inspect `docs/components.md` (the inventory), `src/app/globals.css` (the active design tokens), `tailwind.config.ts` (the extension), and the nearest existing component.
2. Reuse `Button`, `LinkButton`, `Badge`, `Card`, `TreatmentCard`, `CallToActionCard`, `RelatedBlogCard`, `Breadcrumb`, or `FAQAccordion` before creating new primitives. The kitchen-sink page at `/design` (dev only — returns 404 in production builds) shows every variant.
3. If a new component is needed, define it using existing semantic tokens and document any reusable pattern here.
4. Keep changes scoped. Do not redesign unrelated pages as part of a single component task.
5. After UI changes, verify desktop and mobile layouts for text overflow, focus states, and coherent spacing.
