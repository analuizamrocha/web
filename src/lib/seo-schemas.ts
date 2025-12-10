import { WEBSITE_URL, SITE_NAME } from './constants'

/**
 * FAQ item interface for FAQPage schema
 */
export interface FAQItem {
  question: string
  answer: string
}

/**
 * Breadcrumb item interface for BreadcrumbList schema
 */
export interface BreadcrumbItem {
  label: string
  href?: string
}

/**
 * Generates FAQPage schema for Google rich snippets
 * @param faqs Array of FAQ items with question and answer
 * @returns JSON-LD FAQPage schema object
 */
export const generateFAQSchema = (faqs: FAQItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generates BreadcrumbList schema for search results
 * @param items Array of breadcrumb items
 * @returns JSON-LD BreadcrumbList schema object
 */
export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${WEBSITE_URL}${item.href}` }),
    })),
  }
}

/**
 * Generates LocalBusiness schema for local SEO
 * @param businessData Business information
 * @returns JSON-LD LocalBusiness schema object
 */
export interface LocalBusinessData {
  name: string
  description: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  telephone: string
  url: string
  image: string
  priceRange: string
  openingHours: string
}

export const generateLocalBusinessSchema = (data: LocalBusinessData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    description: data.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    },
    telephone: data.telephone,
    url: data.url,
    image: data.image,
    priceRange: data.priceRange,
    openingHours: data.openingHours,
  }
}

/**
 * Helper to extend Next.js Metadata with OpenGraph tags
 */
export interface OpenGraphData {
  title: string
  description: string
  url: string
  image?: string
  type?: 'website' | 'article'
}

export const generateOpenGraphMetadata = (data: OpenGraphData) => {
  return {
    title: data.title,
    description: data.description,
    url: data.url,
    siteName: SITE_NAME,
    images: [
      {
        url: data.image || `${WEBSITE_URL}/images/og.png`,
        width: 1200,
        height: 630,
        alt: data.title,
      },
    ],
    locale: 'pt_BR',
    type: data.type || 'website',
  }
}

/**
 * Helper to generate Twitter Card metadata
 */
export const generateTwitterMetadata = (data: OpenGraphData) => {
  return {
    card: 'summary_large_image',
    title: data.title,
    description: data.description,
    images: [data.image || `${WEBSITE_URL}/images/og.png`],
  }
}
