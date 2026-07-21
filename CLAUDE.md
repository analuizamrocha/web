# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 project for a medical practice website (Ana Luiza M. Rocha - Coloproctologista). It features a main landing page with multiple sections and a comprehensive blog system for SEO-optimized medical content, built with React 19, TypeScript, and TailwindCSS.

**Current State:**

- ✅ Main landing page with multiple sections (Hero, About, Services, FAQ, Contact, Photo Gallery)
- ✅ Blog system with markdown posts and dynamic routing
- ✅ SEO-optimized with structured data, sitemap, and meta tags
- ✅ LGPD/GDPR-compliant cookie consent system
- ✅ Consent-based analytics integration (Vercel Analytics, Google Analytics, Google Tag Manager)
- ✅ WCAG AAA accessible color system with warm brown/beige palette
- ✅ Mobile-first responsive design with custom breakpoints
- ✅ Comprehensive Button component with 8 variants

## Package Manager

**This project uses Bun as the package manager** (not npm or yarn).

- Always use `bun` commands instead of `npm`
- Lockfile: `bun.lockb` (committed)
- Faster installs and script execution than npm

## Development Commands

### Core Development

- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run analyze` - Analyze bundle sizes with webpack-bundle-analyzer

### Testing

- `bun test` or `bun run test` - Run tests with Vitest
- `bun run test:ui` - Run tests with Vitest UI
- `bun run test:run` - Run tests once (non-watch mode)
- `bun run test:coverage` - Run tests with coverage report

### Performance Auditing

- `bun run lighthouse` - Run Lighthouse audit on local dev server
- `bun run lighthouse:prod` - Run Lighthouse audit on production URL

## Architecture

### Project Structure

```zsh
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with SEO metadata
│   ├── page.tsx        # Home page with structured sections
│   ├── sitemap.ts      # Dynamic sitemap (includes blog posts)
│   ├── blog/           # Blog system
│   │   ├── page.tsx    # Blog listing page
│   │   └── [slug]/     # Dynamic blog post pages
│   │       └── page.tsx
│   └── error.tsx       # Error boundaries
├── components/
│   ├── ui/             # Reusable UI components (Header, Footer, Button, etc.)
│   ├── sections/       # Page sections (Hero, About, Services, etc.)
│   └── icons/          # Custom icon components
├── lib/                # Utilities and configuration
│   ├── constants.ts    # App constants and configuration
│   ├── structured-data.ts # SEO structured data
│   ├── faq-schema.ts   # FAQ schema markup
│   ├── navigation.ts   # Navigation configuration
│   ├── blog.ts         # Blog utilities and content processing
│   ├── mdx-image-dimensions.ts # Intrinsic dimensions for post images
│   └── utils.ts        # Utility functions
└── hooks/              # Custom React hooks
content/
└── posts/              # Markdown blog posts
```

### Key Architectural Patterns

**Single Page Application**: The main page (`src/app/page.tsx`) renders multiple sections in sequence, creating a cohesive user experience.

**Component Architecture**:

- UI components in `src/components/ui/` for reusable elements
- Section components in `src/components/sections/` for page-specific content
- Barrel exports from `src/components/sections/index.ts` for clean imports

**SEO-First Approach**:

- Comprehensive metadata in `src/app/layout.tsx`
- Structured data generation in `src/lib/structured-data.ts`
- FAQ schema in `src/lib/faq-schema.ts`
- Dynamic sitemap generation

**Styling**: Uses TailwindCSS v4 with:

- Custom fonts: Montserrat (sans-serif), Literata (serif) via `next/font/google`
- Custom breakpoint: `xs: 450px` for fine-grained responsive control
- Extended color system with WCAG AAA compliant text hierarchy
- Custom shadows: `brand` and `brand-lg` using primary brown color
- Warm brown/beige palette throughout (no cool grays/blues)

**Analytics Integration**: LGPD-compliant consent-based system:

- `CookieConsent` component handles user consent with progressive disclosure UX
- `AnalyticsProvider` only loads GA/GTM after user explicitly accepts cookies
- Uses `@next/third-parties/google` for optimized script loading
- localStorage-based consent persistence (`lgpd-cookie-consent`)
- Mobile bottom sheet + desktop card layout with smooth animations

**Color System**: WCAG AAA compliant with CSS variables:

- Text hierarchy: `--color-text-heading` (14.8:1 contrast), `--color-text-body` (7.2:1), `--color-text-muted` (5.1:1)
- Card backgrounds: `--color-card-bg`, `--color-card-bg-hover` for stronger definition
- Utility classes: `.text-heading`, `.text-body`, `.text-muted`, `.bg-card`
- Background: `#fffbf7` (lightened for better contrast)
- Primary brown: `#663a25` for buttons, emphasis
- Brand colors: Terracotta (`#c27e5c`), beige (`#d4b7a2`), medium brown (`#b08771`)

**Blog System**: SEO-optimized markdown blog with:

- Static generation for optimal performance
- Medical schema markup (Article + MedicalWebPage)
- Comprehensive frontmatter for SEO metadata
- Automatic sitemap integration
- Curated `public/llms.txt` discovery inventory
- `next/image` rendering with tested intrinsic image dimensions
- Portuguese-focused medical content targeting

See `docs/blog-content-playbook.md` for the authoritative post, image, discovery, and
validation workflow.

## Code Standards

### General Patterns

- Use early returns for readability
- Always use Tailwind classes (no inline CSS or `<style>` tags)
- Use descriptive variable/function names with "handle" prefix for event handlers
- Implement accessibility features (tabindex, aria-label, focus-visible rings)
- Use `const` instead of `function` declarations
- Define TypeScript types when possible
- Follow DRY principles and best practices

### Design System Standards

- Use CSS variable utility classes: `.text-heading`, `.text-body`, `.text-muted`
- Maintain WCAG AAA contrast ratios (7.2:1 body, 14.8:1 headings)
- Use warm brown/beige palette - avoid cool grays or blue tints
- Card backgrounds: use `.bg-card` and `.bg-card-hover` classes

### Animation Standards

- For complex entrance animations, use CSS transitions with inline styles
- Pattern: `useState` for visibility + `setTimeout` trigger + `transition-all duration-700 ease-out`
- Check `window.innerWidth` for responsive mobile vs desktop animations
- Avoid Tailwind's `animate-in` utilities for complex animations (use CSS transitions)

### Component Standards

- All interactive elements must have `cursor-pointer` class
- Focus rings use primary color: `focus-visible:ring-primary`
- Button component has 8 variants (see Button Component section below)
- Use `variant="subtle"` for secondary/reject actions (light brown bg)

## Environment Requirements

- Node.js >= 24.0.0
- Bun >= 1.2.0 (primary package manager)

## Testing Framework

Uses Vitest with React Testing Library:

- `@testing-library/react` for component testing
- `@testing-library/jest-dom` for DOM assertions
- `@testing-library/user-event` for user interaction testing
- Coverage reports available via `@vitest/coverage-v8`

## Key Dependencies

- **Framework**: Next.js 16 with React 19
- **Package Manager**: Bun (for fast installs and script execution)
- **Styling**: TailwindCSS v4 with utility classes
- **UI Libraries**: Lucide React for icons, class-variance-authority for styling variants
- **Blog System**: next-mdx-remote, gray-matter for markdown processing
- **Analytics**: @next/third-parties/google, Vercel Analytics
- **Development**: TypeScript, ESLint, Vitest for testing
- **Performance**: @next/bundle-analyzer for bundle size analysis

## Component Documentation

### Button Component (`src/components/ui/Button.tsx`)

Comprehensive button system with 8 variants using `class-variance-authority`:

**Variants:**

- `default`: Brand primary (terracotta `#c27e5c`)
- `primary`: Dark brown (`#663a25`) - main CTAs
- `secondary`: Light beige (`#d4b7a2`) with border
- `subtle`: Very light brown (`bg-primary/5`) - for reject/cancel actions
- `outline`: 2px primary border, hollow
- `ghost`: Transparent with warm beige hover
- `link`: Underline style, no background
- `destructive`: Red for dangerous actions

**Sizes:** `sm`, `default`, `lg`, `xl`, `icon`

**Features:**

- All buttons have `cursor-pointer` by default
- Focus rings use primary brown color
- Active state: `scale-95` transform
- Disabled state: reduced opacity, no transform

**Usage:**

```tsx
<Button variant="primary" size="default">Click me</Button>
<Button variant="subtle">Cancel</Button>
```

### Cookie Consent (`src/components/layout/CookieConsent.tsx`)

LGPD/GDPR-compliant cookie consent banner with progressive disclosure UX.

**Features:**

- **Progressive disclosure**: Reject option hidden behind "Gerenciar preferências" click
- **Nudge pattern**: X button dismisses without saving (shows again next visit)
- **Responsive layouts**:
  - Mobile (<640px): Full-width bottom sheet with rounded top corners
  - Desktop (≥640px): Bottom-right card
- **Smooth animations**: CSS transitions with fade + slide effects
- **localStorage persistence**: `lgpd-cookie-consent` = 'accepted' | 'rejected'

**Integration with Analytics:**

- On accept: Sets localStorage + reloads page (triggers AnalyticsProvider)
- On reject: Sets localStorage + hides banner (no analytics loaded)
- On dismiss (X): Just closes (no localStorage = shows again next visit)

**Styling:**

- Brown shadow for lifted appearance
- Brown focus rings on all interactive elements
- Warm color palette consistent with brand

### Analytics Provider (`src/components/analytics/AnalyticsProvider.tsx`)

Consent-based analytics loader using `@next/third-parties/google`.

**Features:**

- Only renders GA/GTM components after user consent
- Checks `localStorage.getItem('lgpd-cookie-consent')` on mount
- Prevents third-party cookies until explicit acceptance
- Server-side rendering safe (isolated client component)

**Environment variables needed:**

- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID

**How it works:**

1. Component mounts, checks localStorage
2. If consent === 'accepted', renders GoogleAnalytics + GoogleTagManager
3. If consent !== 'accepted', renders nothing (no scripts loaded)
4. Uses Next.js Script component optimizations automatically

## Blog Content Management

### Adding New Blog Posts

1. Create markdown file in `/content/posts/` with frontmatter:

    ```markdown
    ---
    title: "SEO-optimized title"
    metaDescription: "Meta description under 160 chars"
    slug: "url-friendly-slug"
    publishDate: "2025-01-20"
    lastModified: "2025-01-20"
    primaryKeyword: "main target keyword"
    secondaryKeywords: ["keyword1", "keyword2"]
    targetAudience: "patients" | "referring-doctors" | "general-public"
    intent: "awareness" | "consideration" | "decision"
    featured: true
    ---
    ```

2. Blog posts automatically:
   - Generate medical schema markup
   - Include in sitemap
   - Create SEO meta tags
   - Support static generation

### Content Strategy for Brazilian Proctology

Target medical keywords in Portuguese with local focus:

- Use "coloproctologista Curitiba" for local SEO
- Include long-tail keywords like "quando procurar proctologista"
- Focus on patient education and awareness content
- Implement intent-based content (awareness → consideration → decision)

## Tailwind Configuration

### Custom Breakpoints (`tailwind.config.ts`)

```ts
screens: {
  xs: '450px',    // Custom - for fine mobile control
  sm: '640px',    // Default
  md: '768px',    // Default
  lg: '1024px',   // Default
  xl: '1280px',   // Default
  '2xl': '1536px', // Extended
  '3xl': '1920px', // Extended
}
```

**Usage:** Cookie consent uses `xs` breakpoint for mobile/desktop layout switch.

### Extended Colors

```ts
colors: {
  brand: {
    primary: '#c27e5c',   // Terracotta
    secondary: '#d4b7a2', // Beige
    tertiary: '#b08771',  // Medium brown
  },
  primary: '#663a25',     // Dark brown
  secondary: '#d4b7a2',   // Beige
  background: '#fff9f3',  // Warm cream
  neutral: {
    50: '#faf9f7',  100: '#f5f3f0',  200: '#e8e4de',
    300: '#d4ccc1', 400: '#b5a599',  500: '#967d6f',
    700: '#5a4f47', 800: '#463d36',  900: '#2d2622',
  },
}
```

### Custom Shadows

```ts
boxShadow: {
  brand: '0 4px 14px 0 rgba(102, 58, 37, 0.15)',
  'brand-lg': '0 10px 25px 0 rgba(102, 58, 37, 0.2)',
}
```

**Usage:** Cookie consent uses custom shadow values for brown lifted appearance.

### Extended Spacing & Border Radius

```ts
spacing: {
  '18': '4.5rem',
  '88': '22rem',
  '100': '25rem',
  '112': '28rem',
  '128': '32rem',
}

borderRadius: {
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
}
```

## Global CSS Variables (`src/app/globals.css`)

### Text Hierarchy (WCAG AAA Compliant)

```css
--color-text-heading: #3d1f0f;  /* 14.8:1 contrast */
--color-text-body: #6b4226;     /* 7.2:1 contrast */
--color-text-muted: #8b5a3c;    /* 5.1:1 contrast */
```

### Card Backgrounds

```css
--color-card-bg: #f5ebe1;       /* Warm beige */
--color-card-bg-hover: #f0e3d4; /* Darker on hover */
```

### Utility Classes

- `.text-heading` - Very dark brown for H1-H6
- `.text-body` - Dark-medium brown for paragraphs
- `.text-muted` - Muted brown for metadata/captions
- `.bg-card` - Warm beige card background
- `.bg-card-hover` - Slightly darker hover state

## Performance & Optimization

### Bundle Analysis

- Use `bun run analyze` to monitor bundle sizes with `@next/bundle-analyzer`
- Regular updates to `caniuse-lite` via `npx update-browserslist-db`

### Dependency Review

- Consider if both `@next/mdx` and `next-mdx-remote` are needed (they serve similar purposes)
- Move build-time-only packages to devDependencies if applicable

### Accessibility Audits

- Maintain WCAG AAA compliance (current: 14.8:1 headings, 7.2:1 body text)
- Regular keyboard navigation testing
- Screen reader compatibility testing
- Focus-visible state consistency across all interactive elements

### Lighthouse Targets

- Performance: 90+
- Accessibility: 100
- Best Practices: 100 (achieved with consent-based analytics)
- SEO: 100
