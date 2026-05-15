import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import {
  getPostBySlug,
  getAllPosts,
  getAllPostSlugs,
  generateBlogPostSchema,
  getTargetAudienceLabel,
  getContentIntentLabel,
} from '@/lib/blog'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import {
  WHATSAPP_MSG_TEXT_ENCODED,
  WPP_NUMBER_NASSIF,
  WEBSITE_URL,
  SITE_NAME,
  TAG_INSTAGRAM,
} from '@/lib/constants'
import { LinkButton } from '@/components/ui/LinkButton'
import { MdxImage } from '@/components/ui/MdxImage'
import { RelatedPostsSection } from '@/components/ui/RelatedPostsSection'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }

  const blogPostTitle = post.title

  return {
    title: blogPostTitle,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    openGraph: {
      title: blogPostTitle,
      description: post.metaDescription,
      type: 'article',
      locale: 'pt_BR',
      siteName: SITE_NAME,
      publishedTime: post.publishDate,
      modifiedTime: post.lastModified,
      authors: ['Dra. Ana Luiza Moraes Rocha'],
      url: `${WEBSITE_URL}/blog/${post.slug}`,
      images: [
        {
          url: `${WEBSITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${post.title} - Dra. Ana Luiza Moraes Rocha`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blogPostTitle,
      description: post.metaDescription,
      creator: TAG_INSTAGRAM,
      site: TAG_INSTAGRAM,
      images: [`${WEBSITE_URL}/og-image.jpg`],
    },
    alternates: {
      canonical: `${WEBSITE_URL}/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:author': 'Dra. Ana Luiza Moraes Rocha',
      'article:publisher': WEBSITE_URL,
      'article:section': 'Coloproctologia',
      'article:tag': post.primaryKeyword,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const schema = generateBlogPostSchema(post)
  const allPosts = getAllPosts()
  const relatedPosts = post.relatedPosts?.length
    ? post.relatedPosts
        .map((relatedSlug) => allPosts.find((candidate) => candidate.slug === relatedSlug))
        .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate))
        .slice(0, 2)
    : []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <section className="section bg-background pt-24 md:pt-28">
        <article className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          <Breadcrumb
            items={[
              { label: 'Início', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />

          {/* Article Header */}
          <header className="mx-auto max-w-4xl mb-12 pb-8 border-b border-secondary/20 animate-fade-in">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                {getContentIntentLabel(post.intent)}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/20 text-secondary">
                {getTargetAudienceLabel(post.targetAudience)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
              {post.metaDescription}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-secondary">
              <div className="flex items-center gap-2">
                <span>Por</span>
                <span className="font-medium text-primary">Dra. Ana Luiza Moraes Rocha</span>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <time dateTime={post.publishDate} className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-secondary/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(post.publishDate).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })}
                </time>
                {post.readingTime && (
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-secondary/60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {post.readingTime} min de leitura
                  </span>
                )}
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <MDXRemote
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
                components={{ img: MdxImage }}
              />
            </div>
            <RelatedPostsSection posts={relatedPosts} />
          </div>

          {/* Article Footer */}
          <footer className="mx-auto max-w-4xl pt-8">
            <CallToActionCard
              title="Precisa de acompanhamento especializado?"
              body={
                <p>
                  Agende uma consulta com a Dra. Ana Luiza Moraes Rocha para receber cuidado
                  especializado em proctologia.
                </p>
              }
              actions={
                <LinkButton
                  href={`https://wa.me/${WPP_NUMBER_NASSIF}/?text=${WHATSAPP_MSG_TEXT_ENCODED}`}
                  external
                  newTab
                  variant="primary"
                  size="xl"
                  className="bg-primary hover:bg-primary/90 text-background shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold text-nowrap"
                  aria-label="Agendar consulta com coloproctologista em Curitiba - Dra. Ana Luiza Moraes Rocha por WhatsApp"
                >
                  Agendar consulta
                </LinkButton>
              }
              variant="secondary"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 sm:mt-8 gap-2">
              <Link
                href="/blog"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors text-lg text-nowrap"
              >
                ← Voltar
              </Link>
              <div className="text-sm text-secondary">
                Última atualização:&nbsp;
                {new Date(post.lastModified).toLocaleDateString('pt-BR', {
                  timeZone: 'UTC',
                })}
              </div>
            </div>
          </footer>
        </article>
      </section>
    </>
  )
}
