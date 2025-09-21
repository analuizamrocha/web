# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 project for a medical practice website (Ana Luiza M. Rocha - Coloproctologista). It features a main landing page with multiple sections and a comprehensive blog system for SEO-optimized medical content, built with React 19, TypeScript, and TailwindCSS.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Testing
- `npm test` or `npm run test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:run` - Run tests once (non-watch mode)
- `npm run test:coverage` - Run tests with coverage report

## Architecture

### Project Structure
```
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
│   └── utils.ts        # Utility functions
├── hooks/              # Custom React hooks
└── content/            # Blog content management
    └── posts/          # Markdown blog posts
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

**Styling**: Uses TailwindCSS v4 with custom fonts (Montserrat, Literata) loaded via `next/font/google`.

**Analytics Integration**: Vercel Analytics, Google Analytics, and Google Tag Manager are integrated in the root layout.

**Blog System**: SEO-optimized markdown blog with:
- Static generation for optimal performance
- Medical schema markup (Article + MedicalWebPage)
- Comprehensive frontmatter for SEO metadata
- Automatic sitemap integration
- Portuguese-focused medical content targeting

## Code Standards (from .cursorrules)

- Use early returns for readability
- Always use Tailwind classes (no inline CSS)
- Use descriptive variable/function names with "handle" prefix for event handlers
- Implement accessibility features (tabindex, aria-label, etc.)
- Use `const` instead of `function` declarations
- Define TypeScript types when possible
- Follow DRY principles and best practices

## Environment Requirements

- Node.js >= 20.13.1
- npm >= 10.5.2
- Uses Bun for package management (bun.lockb present)

## Testing Framework

Uses Vitest with React Testing Library:
- `@testing-library/react` for component testing
- `@testing-library/jest-dom` for DOM assertions
- `@testing-library/user-event` for user interaction testing
- Coverage reports available via `@vitest/coverage-v8`

## Key Dependencies

- **Framework**: Next.js 15 with React 19
- **Styling**: TailwindCSS v4 with utility classes
- **UI Libraries**: Lucide React for icons, class-variance-authority for styling variants
- **Blog System**: next-mdx-remote, gray-matter for markdown processing
- **Analytics**: Vercel Analytics, Google Analytics/Tag Manager
- **Development**: TypeScript, ESLint, Vitest for testing

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