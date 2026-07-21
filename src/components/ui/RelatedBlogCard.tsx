import { Badge } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/LinkButton'
import { getRelatedBlogByTreatmentSlug } from '@/lib/treatment-related-blog'

interface RelatedBlogCardProps {
  treatmentSlug: string
}

export function RelatedBlogCard({ treatmentSlug }: RelatedBlogCardProps) {
  const relatedBlog = getRelatedBlogByTreatmentSlug(treatmentSlug)

  if (!relatedBlog) {
    return null
  }

  return (
    <aside className="not-prose my-10">
      <div className="rounded-3xl border border-secondary/20 bg-secondary/10 p-6 sm:p-8">
        <Badge variant="secondary" className="mb-4">
          Leitura relacionada
        </Badge>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-3 leading-tight">
          {relatedBlog.title}
        </h3>
        <p className="text-base text-body leading-relaxed mb-6">{relatedBlog.description}</p>
        <LinkButton
          href={relatedBlog.href}
          variant="outline"
          size="default"
        >
          Ver artigo no blog
        </LinkButton>
      </div>
    </aside>
  )
}
