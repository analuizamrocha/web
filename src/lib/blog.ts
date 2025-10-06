import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type {
  WithContext,
  Graph,
  FAQPage,
  Question,
  Answer,
  Thing,
} from 'schema-dts'

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
}

/**
 * Complete blog post with content and excerpt
 */
export interface BlogPost extends BlogPostMeta {
  content: string
  excerpt: string
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
 * Extracts the first non-heading paragraph from markdown content
 * @param content - The markdown content
 * @returns The first paragraph text
 */
function getFirstParagraph(content: string): string {
  const paragraphs = content.replace(/^#.*$/gm, '').trim().split('\n\n')
  return paragraphs.find((p) => p.trim().length > 0) || ''
}

/**
 * Truncates text at word boundaries to avoid cutting words mid-sentence
 * @param text - The text to truncate
 * @param maxLength - Maximum character length
 * @returns Truncated text
 */
function truncateAtWordBoundary(text: string, maxLength: number): string {
  const words = text.split(' ')
  let result = ''

  for (const word of words) {
    const testLength = result ? result.length + 1 + word.length : word.length
    if (testLength > maxLength) break
    result += (result ? ' ' : '') + word
  }

  return result
}

/**
 * Creates a smart excerpt from content, prioritizing natural sentence breaks
 * @param content - The markdown content
 * @returns A well-formed excerpt with ellipsis if truncated
 */
function createExcerpt(content: string): string {
  const firstParagraph = getFirstParagraph(content)
  if (!firstParagraph) return ''

  // Strategy 1: Use first two complete sentences
  const sentences = firstParagraph.split('. ')
  if (sentences.length >= 2) {
    return sentences[0] + '. ' + sentences[1] + '.'
  }

  // Strategy 2: If single long sentence, truncate at word boundary
  if (sentences.length === 1 && firstParagraph.length > 200) {
    const truncated = truncateAtWordBoundary(firstParagraph, 180)
    return truncated + '...'
  }

  // Strategy 3: Use full paragraph if short enough
  return firstParagraph
}

/**
 * Ensures excerpt ends with ellipsis if it was truncated from original content
 * @param excerpt - The generated excerpt
 * @param originalParagraph - The original paragraph text
 * @returns Excerpt with proper ellipsis ending
 */
function addEllipsisIfTruncated(
  excerpt: string,
  originalParagraph: string
): string {
  const wasTruncated = excerpt !== originalParagraph
  const alreadyHasEllipsis = excerpt.endsWith('...')

  if (wasTruncated && !alreadyHasEllipsis) {
    // Remove any trailing periods before adding ellipsis to avoid multiple dots
    const cleanExcerpt = excerpt.replace(/\.+$/, '')
    return cleanExcerpt + '...'
  }

  return excerpt
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
    const firstParagraph = getFirstParagraph(content)
    const excerpt = createExcerpt(content)
    const finalExcerpt = addEllipsisIfTruncated(excerpt, firstParagraph)

    return {
      slug,
      content,
      excerpt: finalExcerpt,
      readingTime,
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
          '@id': `https://analuizarocha.com.br/blog/${post.slug}#faq`,
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
      '@id': `https://analuizarocha.com.br/blog/${post.slug}#webpage`,
      url: `https://analuizarocha.com.br/blog/${post.slug}`,
      name: post.title,
      description: post.metaDescription,
      datePublished: post.publishDate,
      dateModified: post.lastModified,
      inLanguage: 'pt-BR',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://analuizarocha.com.br/#website',
        url: 'https://analuizarocha.com.br',
        name: 'Dra. Ana Luiza Moraes Rocha - Coloproctologia',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://analuizarocha.com.br/search?q={search_term_string}',
        },
      },
      about: {
        '@type': 'MedicalCondition',
        name: post.primaryKeyword,
        alternateName: post.secondaryKeywords,
      },
      mainEntity: {
        '@type': 'Article',
        '@id': `https://analuizarocha.com.br/blog/${post.slug}#article`,
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
          '@id': 'https://analuizarocha.com.br/#physician',
          name: 'Dra. Ana Luiza Moraes Rocha',
          jobTitle: 'Médica Coloproctologista',
          url: 'https://analuizarocha.com.br',
          sameAs: [
            'https://instagram.com/draanaluizamrocha',
            'https://linkedin.com/in/ana-luiza-moraes-rocha',
          ],
          knowsAbout: [
            'Coloproctologia',
            'Cirurgia Colorretal',
            'Endoscopia Digestiva',
            'Hemorróidas',
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
          '@id': 'https://analuizarocha.com.br/#organization',
          name: 'Dra. Ana Luiza Moraes Rocha - Coloproctologia',
          url: 'https://analuizarocha.com.br',
          logo: {
            '@type': 'ImageObject',
            url: 'https://analuizarocha.com.br/logo.png',
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
          '@type':
            post.targetAudience === 'patients' ? 'Patient' : 'MedicalAudience',
          audienceType: post.targetAudience,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://analuizarocha.com.br/blog/${post.slug}#webpage`,
        },
      },
    } as Thing,
    {
      '@type': 'BreadcrumbList',
      '@id': `https://analuizarocha.com.br/blog/${post.slug}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: 'https://analuizarocha.com.br',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://analuizarocha.com.br/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `https://analuizarocha.com.br/blog/${post.slug}`,
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
