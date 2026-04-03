import { Badge } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/LinkButton'
import { getTreatmentLinkBySlug } from '@/lib/content-relationships'

interface RelatedTreatmentsSectionProps {
  treatmentSlugs: string[]
}

export function RelatedTreatmentsSection({ treatmentSlugs }: RelatedTreatmentsSectionProps) {
  const relatedTreatments = treatmentSlugs
    .map((slug) => getTreatmentLinkBySlug(slug))
    .filter((treatment): treatment is NonNullable<typeof treatment> => Boolean(treatment))
    .slice(0, 2)

  if (relatedTreatments.length === 0) {
    return null
  }

  return (
    <aside className="not-prose my-10">
      <div className="rounded-3xl border border-secondary/20 bg-secondary/10 p-6 sm:p-8">
        <Badge variant="secondary" className="mb-4">
          Tratamentos relacionados
        </Badge>
        <div className="grid gap-4 md:grid-cols-2">
          {relatedTreatments.map((treatment) => (
            <article
              key={treatment.slug}
              className="rounded-2xl border border-secondary/15 bg-background/80 p-5"
            >
              <h3 className="text-lg sm:text-xl font-serif font-bold text-primary mb-3 leading-tight">
                {treatment.title}
              </h3>
              <p className="text-sm sm:text-base text-secondary leading-relaxed mb-5">
                {treatment.description}
              </p>
              <LinkButton href={treatment.href} variant="outline" size="default">
                Ver página de tratamento
              </LinkButton>
            </article>
          ))}
        </div>
      </div>
    </aside>
  )
}
