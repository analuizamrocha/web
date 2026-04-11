import { Badge } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/LinkButton'
import { getAllPosts } from '@/lib/blog'
import { getRelatedPostsForTreatment } from '@/lib/content-relationships'
import type { TreatmentSlug } from '@/lib/treatment-images'

interface RelatedBlogCardProps {
  treatmentSlug: string
}

export function RelatedBlogCard({ treatmentSlug }: RelatedBlogCardProps) {
  const relatedPosts = getRelatedPostsForTreatment(
    treatmentSlug as TreatmentSlug,
    getAllPosts(),
    4
  )

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <aside className="not-prose my-10">
      <div className="rounded-3xl border border-secondary/20 bg-secondary/10 p-6 sm:p-8">
        <Badge variant="secondary" className="mb-4">
          Leitura relacionada
        </Badge>
        <div className="grid gap-4 md:grid-cols-2">
          {relatedPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-2xl border border-secondary/15 bg-background/80 p-5"
            >
              <h3 className="text-lg sm:text-xl font-serif font-bold text-primary mb-3 leading-tight">
                {post.title}
              </h3>
              <p className="flex-1 text-sm sm:text-base text-secondary leading-relaxed mb-5">
                {post.excerpt}
              </p>
              <LinkButton href={`/blog/${post.slug}`} variant="outline" size="default">
                Ver artigo no blog
              </LinkButton>
            </article>
          ))}
        </div>
      </div>
    </aside>
  )
}
