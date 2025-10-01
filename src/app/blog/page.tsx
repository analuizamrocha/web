import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Badge } from '@/components/ui/Badge'
import {
  getAllPosts,
  getTargetAudienceLabel,
  getContentIntentLabel,
} from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Dra. Ana Luiza Moraes Rocha - Coloproctologista',
  description:
    'Artigos especializados sobre coloproctologia, tratamentos e prevenção. Informações confiáveis sobre saúde intestinal em Curitiba.',
  keywords: [
    'blog coloproctologia',
    'artigos coloproctologista curitiba',
    'saúde intestinal',
    'tratamento hemorróidas',
    'prevenção câncer colorretal',
  ],
}

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
                Aqui compartilho conhecimentos, dicas práticas e orientações
                sobre coloproctologia para ajudar você a entender melhor sua
                saúde intestinal
              </p>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg lg:text-xl text-secondary">
                Em breve estarei compartilhando artigos e dicas valiosas sobre
                saúde intestinal.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-8 lg:space-y-12">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-secondary/10 rounded-3xl p-8 lg:p-10 border border-secondary/20 hover:border-secondary/30 transition-all duration-300 shadow-sm hover:shadow-md group"
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-4 text-sm text-secondary mb-4">
                      <time dateTime={post.publishDate}>
                        {new Date(post.publishDate).toLocaleDateString('pt-BR')}
                      </time>
                      {post.readingTime && (
                        <span>{post.readingTime} min de leitura</span>
                      )}
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-4 group-hover:text-primary/90 transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <div className="prose prose-lg max-w-none mb-6">
                      <MDXRemote source={post.excerpt} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2 mr-4">
                        <Badge variant="primary">
                          {getContentIntentLabel(post.intent)}
                        </Badge>
                        <Badge variant="secondary">
                          {getTargetAudienceLabel(post.targetAudience)}
                        </Badge>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-primary hover:text-primary/80 font-medium transition-colors text-lg text-nowrap ms-4 ps-4 pl-4"
                      >
                        Ler artigo →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
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
