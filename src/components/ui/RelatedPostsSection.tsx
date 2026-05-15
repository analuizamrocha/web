import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'

interface RelatedPostsSectionProps {
  posts: BlogPost[]
}

export function RelatedPostsSection({ posts }: RelatedPostsSectionProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <aside className="not-prose mt-10 border-t border-secondary/20 pt-8">
      <h2 className="mb-5 text-2xl font-serif font-bold text-primary">Continue lendo</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex min-h-[150px] flex-col rounded-2xl border border-secondary/20 bg-secondary/10 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-secondary/15"
          >
            <h3 className="mb-3 text-lg font-semibold leading-snug text-primary">{post.title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-body">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Ler artigo
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
