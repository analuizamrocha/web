import { Badge } from '@/components/ui/Badge'
import { TreatmentCard } from '@/components/ui/TreatmentCard'
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
            <TreatmentCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              title={post.title}
              description={post.excerpt}
              variant="detailed"
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
