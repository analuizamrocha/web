import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://analuizarocha.com.br'
  const currentDate = new Date()

  // Get all blog posts
  const posts = getAllPosts()

  // Blog post entries - High priority for educational content
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
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

  const treatmentEntries: MetadataRoute.Sitemap = treatmentPages.map(
    (slug) => ({
      url: `${baseUrl}/tratamentos/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9, // Very high priority - core service pages
    })
  )

  return [
    // Homepage - Highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // Treatments index - Very high priority
    {
      url: `${baseUrl}/tratamentos`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    // Individual treatment pages - Very high priority
    ...treatmentEntries,
    // About page - Important for trust/authority
    {
      url: `${baseUrl}/sobre`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Blog index - High priority for content hub
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Blog posts - High priority for educational content
    ...blogEntries,
    // Privacy policy - Required but lower priority
    {
      url: `${baseUrl}/politica-privacidade`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
}
