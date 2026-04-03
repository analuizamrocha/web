import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import type { BlogPost } from '@/lib/blog'

interface RelatedPostsSectionProps {
  posts: BlogPost[]
}

export function RelatedPostsSection({ posts }: RelatedPostsSectionProps) {
  const relatedPosts = posts.slice(0, 2)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <aside className="not-prose my-10">
      <div className="rounded-3xl border border-secondary/20 bg-primary/5 p-6 sm:p-8">
        <Badge variant="primary" className="mb-4">
          Continue lendo
        </Badge>
        <div className="grid gap-4 md:grid-cols-2">
          {relatedPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-secondary/15 bg-background/80 p-5"
            >
              <h3 className="text-lg sm:text-xl font-serif font-bold text-primary mb-3 leading-tight">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary/80 transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="text-sm sm:text-base text-secondary leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                Ler artigo
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </aside>
  )
}
