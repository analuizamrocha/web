import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Badge } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/LinkButton'
import { getAllPosts, getTargetAudienceLabel, getContentIntentLabel } from '@/lib/blog'
import type { Metadata } from 'next'
import {
  WEBSITE_URL,
  SITE_NAME,
  TAG_INSTAGRAM,
  WHATSAPP_HREF_SECRETARY,
} from '@/lib/constants'

const BLOG_PAGE_TITLE = 'Blog — Saúde intestinal sem tabu'

export const metadata: Metadata = {
  title: BLOG_PAGE_TITLE,
  description:
    'Orientações práticas sobre hemorroidas, fissuras, intestino preso, HPV anal e mais. Conteúdo direto, sem jargão, escrito por quem trata.',
  keywords: [
    'blog coloproctologia',
    'artigos proctologista curitiba',
    'saúde intestinal',
    'tratamento hemorroidas',
    'prevenção câncer colorretal',
    'proctologia',
    'cisto pilonidal',
    'plicoma anal',
  ],
  openGraph: {
    title: BLOG_PAGE_TITLE,
    description:
      'Orientações práticas sobre hemorroidas, fissuras, intestino preso, HPV anal e mais. Conteúdo direto, sem jargão, escrito por quem trata.',
    type: 'website',
    locale: 'pt_BR',
    url: `${WEBSITE_URL}/blog`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${WEBSITE_URL}/images/og.png`,
        width: 547,
        height: 684,
        alt: 'Blog de Coloproctologia - Dra. Ana Luiza Moraes Rocha',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BLOG_PAGE_TITLE,
    description:
      'Orientações práticas sobre hemorroidas, fissuras, intestino preso, HPV anal e mais. Conteúdo direto, sem jargão, escrito por quem trata.',
    creator: TAG_INSTAGRAM,
    site: TAG_INSTAGRAM,
    images: [`${WEBSITE_URL}/images/og.png`],
  },
  alternates: {
    canonical: `${WEBSITE_URL}/blog`,
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
}

// DECISION: Keep title as main link for better accessibility and UX clarity
export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <section className="section bg-background pt-24 md:pt-28 animate-fade-in">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
              Cuidando da sua saúde intestinal
            </h1>
            <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-secondary font-medium">
              <p>
                Aqui compartilho conhecimentos, dicas práticas e orientações sobre proctologia
                para ajudar você a entender melhor sua saúde intestinal
              </p>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg lg:text-xl text-secondary">
                Em breve estarei compartilhando artigos e dicas valiosas sobre saúde intestinal.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-secondary/20 bg-card-bg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary/15">
                    {post.cardImage ? (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="absolute inset-0 block"
                        aria-label={`Abrir artigo: ${post.title}`}
                      >
                        <Image
                          src={post.cardImage.src}
                          alt={post.cardImage.alt}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          sizes="(min-width: 1280px) 36rem, (min-width: 768px) 50vw, 100vw"
                          // index < 2 is a heuristic — desktop shows 2 columns so both above-the-fold cards get priority; mobile shows 1 column so only index 0 truly needs it, but the extra preload on index 1 is harmless
                          priority={index < 2}
                          fetchPriority={index === 0 ? 'high' : undefined}
                        />
                      </Link>
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-secondary/35 via-background to-secondary/5" />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5 lg:p-6">
                    <div className="mb-3 flex items-center gap-4 text-sm text-text-muted">
                      <time dateTime={post.publishDate}>
                        {new Date(post.publishDate).toLocaleDateString('pt-BR', {
                          timeZone: 'UTC',
                        })}
                      </time>
                      {post.readingTime && <span>{post.readingTime} min de leitura</span>}
                    </div>

                    <h2 className="mb-3 text-2xl font-serif font-bold text-primary transition-colors group-hover:text-primary/90">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <div className="prose prose-sm mb-5 max-w-none text-text-body [&_p]:mb-0">
                      <MDXRemote source={post.excerpt} />
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-4">
                      <div className="mr-4 flex flex-wrap gap-2">
                        <Badge variant="primary">{getContentIntentLabel(post.intent)}</Badge>
                        <Badge variant="secondary">
                          {getTargetAudienceLabel(post.targetAudience)}
                        </Badge>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-nowrap font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        Ler artigo →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* CTA block — routes reader to /sobre for internal link value */}
          <div className="mx-auto max-w-6xl mt-16 lg:mt-20">
            <div className="bg-secondary/10 rounded-3xl p-8 lg:p-10 border border-secondary/20 text-center">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-4">
                Conheça a formação, os valores e a abordagem da Dra. Ana Luiza.
              </h2>
              <p className="text-lg lg:text-xl text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Atendimento humanizado com a mais alta qualidade técnica em proctologia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LinkButton
                  href={WHATSAPP_HREF_SECRETARY}
                  size="lg"
                  variant="primary"
                  external
                  newTab
                  className="font-semibold text-nowrap shadow-lg hover:shadow-xl hover:scale-105"
                  aria-label="Agendar consulta com a Dra. Ana Luiza Moraes Rocha pelo WhatsApp"
                >
                  Agendar consulta
                </LinkButton>
                <LinkButton
                  href="/sobre"
                  size="lg"
                  variant="outline"
                  className="font-semibold text-nowrap shadow-lg hover:shadow-xl"
                >
                  Saber mais
                </LinkButton>
              </div>
            </div>
          </div>

          <div className="pt-8 lg:pt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors text-lg"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
