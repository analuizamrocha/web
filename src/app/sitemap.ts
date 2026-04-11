import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { WEBSITE_URL } from '@/lib/constants'

const STATIC_ROUTE_LAST_MODIFIED: Record<string, string> = {
  '/': '2026-04-01',
  '/blog': '2026-04-01',
  '/locais-de-atendimento': '2026-04-11',
  '/locais-de-atendimento/clinica-nassif': '2026-04-11',
  '/locais-de-atendimento/specta-endoscopia-digestiva': '2026-04-11',
  '/sobre': '2026-03-20',
  '/tratamentos': '2026-03-20',
  '/tratamentos/hemorroidas': '2026-03-20',
  '/tratamentos/cx-cisto-pilonidal': '2026-03-10',
  '/tratamentos/cx-fistulas-anorretais': '2026-03-10',
  '/tratamentos/cx-laser': '2026-03-10',
  '/tratamentos/doencas-inflamatorias-intestinais': '2026-03-10',
  '/tratamentos/hpv-anal': '2026-03-10',
  '/tratamentos/rastreio-cancer-anal': '2026-03-10',
  '/tratamentos/sindrome-intestino-irritavel': '2026-03-10',
  '/tratamentos/toxina-botulinica': '2026-03-10',
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const latestBlogLastModified = posts.reduce(
    (latestDate, post) => (post.lastModified > latestDate ? post.lastModified : latestDate),
    STATIC_ROUTE_LAST_MODIFIED['/blog']
  )

  // Blog post entries
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${WEBSITE_URL}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8, // High priority - educational content drives authority
  }))

  // All 9 treatment pages - Core service pages
  const treatmentPages = [
    'hemorroidas',
    'cx-laser',
    'cx-fistulas-anorretais',
    'cx-cisto-pilonidal',
    'doencas-inflamatorias-intestinais',
    'hpv-anal',
    'rastreio-cancer-anal',
    'sindrome-intestino-irritavel',
    'toxina-botulinica',
  ]

  const treatmentEntries: MetadataRoute.Sitemap = treatmentPages.map((slug) => ({
    url: `${WEBSITE_URL}/tratamentos/${slug}`,
    lastModified: STATIC_ROUTE_LAST_MODIFIED[`/tratamentos/${slug}`],
    changeFrequency: 'monthly' as const,
    priority: 0.9, // Very high priority - core service pages
  }))

  return [
    // Homepage - Highest priority
    {
      url: WEBSITE_URL,
      lastModified: STATIC_ROUTE_LAST_MODIFIED['/'],
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // Treatments index - Very high priority
    {
      url: `${WEBSITE_URL}/tratamentos`,
      lastModified: STATIC_ROUTE_LAST_MODIFIED['/tratamentos'],
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    {
      url: `${WEBSITE_URL}/locais-de-atendimento`,
      lastModified: STATIC_ROUTE_LAST_MODIFIED['/locais-de-atendimento'],
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/locais-de-atendimento/clinica-nassif`,
      lastModified: STATIC_ROUTE_LAST_MODIFIED['/locais-de-atendimento/clinica-nassif'],
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${WEBSITE_URL}/locais-de-atendimento/specta-endoscopia-digestiva`,
      lastModified: STATIC_ROUTE_LAST_MODIFIED['/locais-de-atendimento/specta-endoscopia-digestiva'],
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Individual treatment pages - Very high priority
    ...treatmentEntries,
    // About page - Important for trust/authority
    {
      url: `${WEBSITE_URL}/sobre`,
      lastModified: STATIC_ROUTE_LAST_MODIFIED['/sobre'],
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Blog index - High priority for content hub
    {
      url: `${WEBSITE_URL}/blog`,
      lastModified: latestBlogLastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Blog posts - High priority for educational content
    ...blogEntries,
  ]
}
