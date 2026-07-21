# Ana Luiza M. Rocha - Coloproctologista

A modern, SEO-optimized medical practice website built with Next.js 16, featuring a comprehensive blog system for patient education and healthcare content.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Runtime**: React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Package Manager**: Bun
- **Content**: Markdown with MDX support via `next-mdx-remote`
- **Analytics**: Vercel Analytics, Google Analytics, Google Tag Manager
- **Testing**: Vitest + React Testing Library + Playwright E2E
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

- Node.js >= 24.0.0
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

### Analytics configuration (consent-gated)

Optional environment variable:

```bash
# ga (default) | gtm | both | none
NEXT_PUBLIC_ANALYTICS_PROVIDER=ga
```

Notes:

- Analytics scripts are only loaded after explicit cookie consent.
- When both GA and GTM IDs exist, default behavior is `ga` to reduce third-party overhead.

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
| `bun run e2e` | Run Playwright E2E smoke tests |
| `bun run e2e:ui` | Run Playwright tests with UI |
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
│   │   ├── mdx-image-dimensions.ts # Post image dimensions
│   │   ├── seo-schemas.ts    # SEO metadata helpers
│   │   ├── structured-data.ts # Structured data helpers
│   │   └── utils.ts          # Helper functions
│   └── hooks/                # Custom React hooks
├── content/
│   └── posts/                # Markdown blog posts
├── public/                   # Static assets and llms.txt
├── CLAUDE.md                # AI assistant instructions
└── package.json             # Dependencies and scripts
```

## 📝 Content Management

### Adding Blog Posts

Create a Markdown file in `content/posts` and follow the complete metadata, subtitle,
image-dimension, discovery-file, compliance, and validation contract in
[`docs/blog-content-playbook.md`](./docs/blog-content-playbook.md).

Blog posts automatically:

- Generate medical schema markup
- Include in sitemap
- Create SEO meta tags
- Support static generation
- Use the first Markdown image for the blog card

Before opening a blog PR, update `public/llms.txt`, add non-default image dimensions to
`src/lib/mdx-image-dimensions.ts`, and run the focused content tests.

For project-specific authoring rules, see:

- [AGENTS.md](./AGENTS.md)
- [docs/blog-content-playbook.md](./docs/blog-content-playbook.md)

## 🎯 SEO Strategy

### Target Keywords (Portuguese/Brazilian Market)

- "coloproctologista Curitiba"
- "cirurgia laser coloproctologia"
- "tratamento hemorroidas"
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
