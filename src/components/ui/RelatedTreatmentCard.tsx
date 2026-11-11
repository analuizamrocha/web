import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { RelatedTreatment } from '@/lib/blog-related-treatment'

interface RelatedTreatmentCardProps {
  treatment: RelatedTreatment | null
}

export const RelatedTreatmentCard = ({ treatment }: RelatedTreatmentCardProps) => {
  if (!treatment) return null

  return (
    <aside
      aria-labelledby="related-treatment-heading"
      className="not-prose mt-10 rounded-2xl border border-secondary/30 bg-card p-6"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        Tratamento relacionado
      </p>
      <h2
        id="related-treatment-heading"
        className="mt-2 text-2xl font-serif font-bold text-primary"
      >
        {treatment.title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-body">{treatment.description}</p>
      <Link
        href={treatment.href}
        className="group mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Conhecer o tratamento
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </aside>
  )
}
