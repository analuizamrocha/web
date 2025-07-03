import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://analuizarocha.com.br'
  const currentDate = new Date()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/404`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ]
}
