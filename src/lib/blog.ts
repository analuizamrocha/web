import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { FAQPage, Question, Answer, Thing } from 'schema-dts'
import { WEBSITE_URL, SITE_NAME, URL_INSTAGRAM, URL_LINKEDIN } from '@/lib/constants'

/**
 * Target audience enum for blog posts
 */
export enum TargetAudience {
  PATIENTS = 'patients',
  REFERRING_DOCTORS = 'referring-doctors',
  GENERAL_PUBLIC = 'general-public',
}

/**
 * Content intent enum for blog posts
 */
export enum ContentIntent {
  AWARENESS = 'awareness',
  CONSIDERATION = 'consideration',
  DECISION = 'decision',
}

/**
 * Translations for target audience
 */
const TARGET_AUDIENCE_TRANSLATIONS: Record<TargetAudience, string> = {
  [TargetAudience.PATIENTS]: 'Pacientes',
  [TargetAudience.REFERRING_DOCTORS]: 'Médicos',
  [TargetAudience.GENERAL_PUBLIC]: 'Público Geral',
}

/**
 * Translations for content intent
 */
const CONTENT_INTENT_TRANSLATIONS: Record<ContentIntent, string> = {
  [ContentIntent.AWARENESS]: 'Conscientização',
  [ContentIntent.CONSIDERATION]: 'Consideração',
  [ContentIntent.DECISION]: 'Decisão',
}

/**
 * Get translated and formatted target audience
 * @param audience - The target audience enum value
 * @returns Translated and capitalized audience string
 */
export function getTargetAudienceLabel(audience: TargetAudience): string {
  return TARGET_AUDIENCE_TRANSLATIONS[audience]
}

/**
 * Get translated and formatted content intent
 * @param intent - The content intent enum value
 * @returns Translated and capitalized intent string
 */
export function getContentIntentLabel(intent: ContentIntent): string {
  return CONTENT_INTENT_TRANSLATIONS[intent]
}

/**
 * FAQ item interface
 */
export interface FAQItem {
  question: string
  answer: string
}

/**
 * Blog card image metadata extracted from markdown body
 */
export interface BlogCardImage {
  src: string
  alt: string
}

/**
 * Blog post frontmatter metadata interface
 */
export interface BlogPostMeta {
  title: string
  metaDescription: string
  slug: string
  publishDate: string
  lastModified: string
  primaryKeyword: string
  secondaryKeywords: string[]
  targetAudience: TargetAudience
  intent: ContentIntent
  readingTime?: number
  featured?: boolean
  order?: number
  faqs?: FAQItem[]
  relatedPosts?: string[]
}

/**
 * Complete blog post with content and excerpt
 */
export interface BlogPost extends BlogPostMeta {
  content: string
  excerpt: string
  cardImage?: BlogCardImage
}

/** Posts directory path */
const postsDirectory = path.join(process.cwd(), 'content/posts')

/**
 * Get all blog posts sorted by custom order (if specified) then publish date (newest first)
 * @returns Array of blog posts
 */
export function getAllPosts(): BlogPost[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      return getPostBySlug(slug)
    })
    .filter((post): post is BlogPost => post !== null)

  // Sort posts by custom order (if specified) then by date
  return allPostsData.sort((a, b) => {
    // If both posts have order field, sort by order (ascending)
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    }

    // If only one has order, prioritize the one with order
    if (a.order !== undefined && b.order === undefined) {
      return -1
    }
    if (a.order === undefined && b.order !== undefined) {
      return 1
    }

    // If neither has order, sort by date (newest first)
    if (a.publishDate < b.publishDate) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * Calculates reading time based on word count
 * @param content - The markdown content
 * @returns Reading time in minutes (average 200 words per minute)
 */
function calculateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / 200)
}

/**
 * Extracts the italic hook text from markdown content to use as excerpt
 * @param content - The markdown content
 * @returns The italic hook text without markdown formatting
 */
function extractItalicHook(content: string): string {
  // Prefer the first non-heading paragraph as the excerpt source.
  // This avoids accidentally capturing emphasized text from the footer.
  const paragraphs = content.trim().split('\n\n')
  const firstParagraph = paragraphs.find((p) => {
    const trimmed = p.trim()
    return trimmed.length > 0 && !trimmed.startsWith('#')
  }) || ''

  const trimmedParagraph = firstParagraph.trim()

  // Match standalone italic hooks in either markdown form:
  // *text* or _text_ (but not bold **text** / __text__)
  const asteriskItalic = trimmedParagraph.match(/^\*(?!\*)(.+?)\*$/)
  if (asteriskItalic && asteriskItalic[1]) {
    return asteriskItalic[1].trim()
  }

  const underscoreItalic = trimmedParagraph.match(/^_(?!_)(.+?)_$/)
  if (underscoreItalic && underscoreItalic[1]) {
    return underscoreItalic[1].trim()
  }

  // Fallback: return first paragraph with basic markdown emphasis removed
  return trimmedParagraph
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
}

/**
 * Creates excerpt from content, prioritizing italic hook text
 * @param content - The markdown content
 * @returns The excerpt text ready for display
 */
function createExcerpt(content: string): string {
  return extractItalicHook(content)
}

/**
 * Extracts the first markdown image from the post body for card previews
 * @param content - The markdown content
 * @returns First image src/alt metadata when available
 */
function extractFirstImage(content: string): BlogCardImage | undefined {
  const markdownImageRegex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/m
  const match = content.match(markdownImageRegex)

  if (!match) {
    return undefined
  }

  const altText = match[1]?.trim() || 'Imagem do artigo'
  const src = match[2]?.trim().replace(/^<|>$/g, '')

  if (!src) {
    return undefined
  }

  return {
    src,
    alt: altText,
  }
}

/**
 * Get a single blog post by its slug
 * @param slug - The post slug (filename without .md extension)
 * @returns Blog post data or null if not found
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const readingTime = calculateReadingTime(content)
    const excerpt = createExcerpt(content)
    const cardImage = extractFirstImage(content)

    return {
      slug,
      content,
      excerpt,
      readingTime,
      cardImage,
      ...data,
    } as BlogPost
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

/**
 * Get all post slugs for static generation
 * @returns Array of post slugs
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

/**
 * Generate medical schema markup for blog posts (Schema.org structured data)
 * @param post - The blog post to generate schema for
 * @returns Schema.org structured data object
 */
export function generateBlogPostSchema(post: BlogPost): {
  '@context': string
  '@graph': Thing[]
} {
  // Build FAQ schema if FAQs are present
  const faqSchema: FAQPage | null =
    post.faqs && post.faqs.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': `${WEBSITE_URL}/blog/${post.slug}#faq`,
          mainEntity: post.faqs.map(
            (faq): Question => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              } as Answer,
            })
          ),
        }
      : null

  const baseSchemaItems: Thing[] = [
    {
      '@type': 'MedicalWebPage',
      '@id': `${WEBSITE_URL}/blog/${post.slug}#webpage`,
      url: `${WEBSITE_URL}/blog/${post.slug}`,
      name: post.title,
      description: post.metaDescription,
      datePublished: post.publishDate,
      dateModified: post.lastModified,
      inLanguage: 'pt-BR',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${WEBSITE_URL}/#website`,
        url: WEBSITE_URL,
        name: SITE_NAME,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${WEBSITE_URL}/search?q={search_term_string}`,
        },
      },
      about: {
        '@type': 'MedicalCondition',
        name: post.primaryKeyword,
        alternateName: post.secondaryKeywords,
      },
      mainEntity: {
        '@type': 'Article',
        '@id': `${WEBSITE_URL}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishDate,
        dateModified: post.lastModified,
        wordCount: post.content ? post.content.split(' ').length : undefined,
        timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
        keywords: [post.primaryKeyword, ...post.secondaryKeywords],
        articleSection: 'Coloproctologia',
        author: {
          '@type': 'Person',
          '@id': `${WEBSITE_URL}/#physician`,
          name: 'Dra. Ana Luiza Moraes Rocha',
          jobTitle: 'Médica Coloproctologista',
          url: WEBSITE_URL,
          sameAs: [URL_INSTAGRAM, URL_LINKEDIN],
          knowsAbout: [
            'Coloproctologia',
            'Cirurgia Colorretal',
            'Endoscopia Digestiva',
            'Hemorroidas',
            'Câncer Colorretal',
          ],
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Medical License',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Conselho Regional de Medicina do Paraná',
              url: 'https://www.crmpr.org.br',
            },
          },
        },
        publisher: {
          '@type': 'MedicalOrganization',
          '@id': `${WEBSITE_URL}/#organization`,
          name: SITE_NAME,
          url: WEBSITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${WEBSITE_URL}/logo.png`,
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Curitiba',
            addressRegion: 'PR',
            addressCountry: 'BR',
          },
          areaServed: {
            '@type': 'City',
            name: 'Curitiba',
            sameAs: 'https://en.wikipedia.org/wiki/Curitiba',
          },
        },
        medicalAudience: {
          '@type': post.targetAudience === 'patients' ? 'Patient' : 'MedicalAudience',
          audienceType: post.targetAudience,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${WEBSITE_URL}/blog/${post.slug}#webpage`,
        },
      },
    } as Thing,
    {
      '@type': 'BreadcrumbList',
      '@id': `${WEBSITE_URL}/blog/${post.slug}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: WEBSITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${WEBSITE_URL}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `${WEBSITE_URL}/blog/${post.slug}`,
        },
      ],
    } as Thing,
  ]

  // Add FAQ schema to the graph if present
  const schemaGraph: Thing[] = faqSchema
    ? [...baseSchemaItems, faqSchema as Thing]
    : baseSchemaItems

  return {
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  }
}
