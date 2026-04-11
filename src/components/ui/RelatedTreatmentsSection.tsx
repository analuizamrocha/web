import { Badge } from '@/components/ui/Badge'
import { TreatmentCard } from '@/components/ui/TreatmentCard'
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
            <TreatmentCard
              key={treatment.slug}
              href={treatment.href}
              title={treatment.title}
              description={treatment.description}
              variant="detailed"
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
