# Ana Luiza M. Rocha - Coloproctologista

A modern, SEO-optimized medical practice website built with Next.js 15, featuring a comprehensive blog system for patient education and healthcare content.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Runtime**: React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Package Manager**: Bun
- **Content**: Markdown with MDX support via `next-mdx-remote`
- **Analytics**: Vercel Analytics, Google Analytics, Google Tag Manager
- **Testing**: Vitest + React Testing Library
- **Performance**: Turbopack for fast development builds

## 📋 Features

### Main Website

- 🎯 Single-page application with smooth navigation
- 🎨 Modern, accessible UI with Tailwind CSS
- 📱 Fully responsive design
- ♿ WCAG accessibility standards
- 🔒 Security headers and CSP policies
- 📊 Integrated analytics and web vitals tracking
- 🖼️ Optimized image loading (WebP, AVIF)

### Blog System

- 📝 Markdown-based content management
- 🔍 SEO-optimized with structured data (Schema.org)
- 🏥 Medical content schema markup
- 📍 Local SEO targeting (Curitiba, Brazil)
- 🎯 Content strategy by audience and intent
- 🗺️ Automatic sitemap generation
- 📖 Reading time estimation

### Performance

- ⚡ Static generation for optimal performance
- 🎯 Bundle analysis tools integrated
- 🚀 Lighthouse-ready with CI scripts
- 📦 Optimized package imports

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 22.0.0
- Bun >= 1.2.0

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
bun install
```

### Development

```bash
# Start development server with Turbopack
bun run dev

# Open http://localhost:3000
```

### Building

```bash
# Production build
bun run build

# Start production server
bun run start

# Analyze bundle sizes
bun run analyze
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with Turbopack |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run analyze` | Analyze bundle sizes |
| `bun test` | Run tests with Vitest |
| `bun run test:ui` | Run tests with UI |
| `bun run test:coverage` | Generate coverage report |
| `bun run lighthouse` | Run Lighthouse audit locally |
| `bun run lighthouse:prod` | Run Lighthouse audit on production |

## 📁 Project Structure

```zsh
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with SEO
│   │   ├── page.tsx           # Homepage
│   │   ├── blog/              # Blog system
│   │   │   ├── page.tsx       # Blog listing
│   │   │   └── [slug]/        # Dynamic blog posts
│   │   ├── sitemap.ts         # Dynamic sitemap
│   │   └── error.tsx          # Error boundaries
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── sections/          # Page sections
│   │   └── icons/             # Custom icons
│   ├── lib/                   # Utilities
│   │   ├── blog.ts           # Blog utilities
│   │   ├── constants.ts      # App constants
│   │   ├── structured-data.ts # SEO schema
│   │   └── utils.ts          # Helper functions
│   ├── hooks/                # Custom React hooks
│   └── content/
│       └── posts/            # Markdown blog posts
├── public/                   # Static assets
├── CLAUDE.md                # AI assistant instructions
└── package.json             # Dependencies and scripts
```

## 📝 Content Management

### Adding Blog Posts

Create a new markdown file in `/content/posts/`:

```markdown
---
title: "Your SEO-optimized title"
metaDescription: "Meta description under 160 characters"
slug: "url-friendly-slug"
publishDate: "2025-01-20"
lastModified: "2025-01-20"
primaryKeyword: "main keyword"
secondaryKeywords: ["keyword1", "keyword2"]
targetAudience: "patients" | "referring-doctors" | "general-public"
intent: "awareness" | "consideration" | "decision"
featured: true
---

Your content here...
```

Blog posts automatically:

- Generate medical schema markup
- Include in sitemap
- Create SEO meta tags
- Support static generation

## 🎯 SEO Strategy

### Target Keywords (Portuguese/Brazilian Market)

- "coloproctologista Curitiba"
- "cirurgia laser coloproctologia"
- "tratamento hemorróidas"
- "quando procurar proctologista"

### Content Strategy

- **Awareness**: Educational content about conditions
- **Consideration**: Treatment options and approaches
- **Decision**: Procedure information and clinic details

## 🔧 Code Standards

- ✅ Use early returns for readability
- ✅ Tailwind classes only (no inline CSS)
- ✅ Descriptive names with "handle" prefix for event handlers
- ✅ Accessibility features (ARIA labels, tabindex)
- ✅ `const` instead of `function` declarations
- ✅ TypeScript types defined
- ✅ DRY principles

## 📊 Performance Monitoring

- Vercel Speed Insights
- Vercel Analytics
- Google Analytics 4
- Bundle analysis with `@next/bundle-analyzer`

## 🚧 Planned Features

- [ ] Cookie consent banner (LGPD/GDPR compliance)
- [ ] Enhanced patient resources
- [ ] Appointment booking integration
- [ ] Multilingual support
- [ ] Lighthouse CI integration

## 📄 License

Private - All rights reserved

## 👤 Author

Developed by @diegovfeder for Dra. Ana Luiza Moraes Rocha - Coloproctologista

---

For AI assistants working with this codebase, see [CLAUDE.md](./CLAUDE.md) for detailed architectural guidance.
