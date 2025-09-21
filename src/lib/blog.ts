import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Target audience enum for blog posts
 */
export enum TargetAudience {
  PATIENTS = 'patients',
  REFERRING_DOCTORS = 'referring-doctors',
  GENERAL_PUBLIC = 'general-public'
}

/**
 * Content intent enum for blog posts
 */
export enum ContentIntent {
  AWARENESS = 'awareness',
  CONSIDERATION = 'consideration',
  DECISION = 'decision'
}

/**
 * Translations for target audience
 */
const TARGET_AUDIENCE_TRANSLATIONS: Record<TargetAudience, string> = {
  [TargetAudience.PATIENTS]: 'Pacientes',
  [TargetAudience.REFERRING_DOCTORS]: 'Médicos',
  [TargetAudience.GENERAL_PUBLIC]: 'Público Geral'
}

/**
 * Translations for content intent
 */
const CONTENT_INTENT_TRANSLATIONS: Record<ContentIntent, string> = {
  [ContentIntent.AWARENESS]: 'Conscientização',
  [ContentIntent.CONSIDERATION]: 'Consideração',
  [ContentIntent.DECISION]: 'Decisão'
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

// Interface for blog post frontmatter
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
}

export interface BlogPost extends BlogPostMeta {
  content: string
  excerpt: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Get all blog posts
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

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.publishDate < b.publishDate) {
      return 1
    } else {
      return -1
    }
  })
}

// Get post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Calculate reading time (average 200 words per minute)
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    // Create excerpt from content (first 160 characters)
    const excerpt = content.replace(/^#.*$/gm, '').trim().slice(0, 160) + '...'

    return {
      slug,
      content,
      excerpt,
      readingTime,
      ...data,
    } as BlogPost
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// Get all slugs for static generation
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

// Generate medical schema markup for blog posts
export function generateBlogPostSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `https://analuizarocha.com.br/blog/${post.slug}#webpage`,
        url: `https://analuizarocha.com.br/blog/${post.slug}`,
        name: post.title,
        description: post.metaDescription,
        datePublished: post.publishDate,
        dateModified: post.lastModified,
        inLanguage: 'pt-BR',
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
          author: {
            '@type': 'Person',
            '@id': 'https://analuizarocha.com.br/#physician',
            name: 'Dra. Ana Luiza Moraes Rocha',
            jobTitle: 'Coloproctologista',
            url: 'https://analuizarocha.com.br',
          },
          publisher: {
            '@type': 'MedicalOrganization',
            '@id': 'https://analuizarocha.com.br/#organization',
            name: 'Dra. Ana Luiza Moraes Rocha - Coloproctologia',
            url: 'https://analuizarocha.com.br',
          },
          medicalAudience: post.targetAudience === 'patients' ? 'Patient' : 'MedicalAudience',
        },
      },
    ],
  }
}