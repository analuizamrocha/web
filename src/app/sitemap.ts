import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://analuizarocha.com.br'
  
  // Get all blog posts
  const posts = getAllPosts()
  
  // Static pages with medical SEO priorities
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0, // Homepage - highest priority
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8, // Blog index - high priority for medical content
    },
    {
      url: `${baseUrl}/politica-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3, // Legal pages - lower priority
    },
    // Add future service pages when created
    {
      url: `${baseUrl}/servicos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9, // Services - very high priority for medical SEO
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7, // About doctor - important for trust
    },
  ]
  
  // Blog posts with medical content priority
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'monthly' as const,
    priority: 0.6, // Medical articles - good priority
  }))
  
  return [...staticPages, ...blogPages]
}