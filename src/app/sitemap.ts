import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { WEBSITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // Get all blog posts
  const posts = getAllPosts()

  // Blog post entries
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${WEBSITE_URL}/blog/${post.slug}`,
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

  const treatmentEntries: MetadataRoute.Sitemap = treatmentPages.map((slug) => ({
    url: `${WEBSITE_URL}/tratamentos/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9, // Very high priority - core service pages
  }))

  return [
    // Homepage - Highest priority
    {
      url: WEBSITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // Treatments index - Very high priority
    {
      url: `${WEBSITE_URL}/tratamentos`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    // Individual treatment pages - Very high priority
    ...treatmentEntries,
    // About page - Important for trust/authority
    {
      url: `${WEBSITE_URL}/sobre`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Blog index - High priority for content hub
    {
      url: `${WEBSITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Blog posts - High priority for educational content
    ...blogEntries,
    // Privacy policy - Required but lower priority
    {
      url: `${WEBSITE_URL}/politica-privacidade`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
}
