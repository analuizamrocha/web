import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

import { InternalLinks } from '@/components/seo/InternalLinks'
import { SchemaMarkup } from '@/components/seo/SchemaMarkup'
import { LinkButton } from '@/components/ui/LinkButton'
import {
  WHATSAPP_MSG_TEXT_ENCODED,
  WPP_NUMBER_NASSIF,
} from '@/lib/constants'
import type { FAQItem } from '@/lib/seo-schemas'
import { cn } from '@/lib/utils'

export interface TreatmentOption {
  title: string
  description: string
}

export interface RelatedArticle {
  label: string
  href: string
  description: string
}

export interface ServicePageSchema {
  medicalProcedure: Record<string, unknown>
  faqSchema: Record<string, unknown>
  breadcrumbs: Record<string, unknown>
}

export interface ServicePageProps {
  title: string
  description: string
  keywords: string[]
  hero: {
    h1: string
    subtitle: string
    eyebrow?: string
    highlights?: string[]
  }
  schema: ServicePageSchema
  symptomsList: string[]
  treatmentOptions: TreatmentOption[]
  faq: FAQItem[]
  relatedArticles: RelatedArticle[]
}

/**
 * Generic page builder for specialty and procedure routes.
 * Keeps consistent UX across different SEO landing pages.
 */
export function ServicePage({
  title,
  description,
  keywords,
  hero,
  schema,
  symptomsList,
  treatmentOptions,
  faq,
  relatedArticles,
}: ServicePageProps) {
  const heroTitle = hero.h1 || title
  const heroHighlights = hero.highlights ?? []
  const keywordBadges = keywords.slice(0, 4)

  return (
    <>
      <section className="bg-background pt-24 pb-16 md:pt-28">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            {hero.eyebrow ? (
              <span className="text-sm uppercase tracking-[0.3em] text-primary/70 font-semibold">
                {hero.eyebrow}
              </span>
            ) : null}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mt-6">
              {heroTitle}
            </h1>
            <InternalLinks
              text={hero.subtitle || description}
              className="mt-6 text-lg md:text-xl lg:text-2xl leading-relaxed text-secondary"
            />
            {heroHighlights.length ? (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {heroHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-base text-secondary"
                  >
                    <CheckCircle2
                      className="mt-1 text-primary"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {keywordBadges.length ? (
              <div className="flex flex-wrap gap-3 mt-8">
                {keywordBadges.map((keyword) => (
                  <span
                    key={keyword}
                    className="border border-primary/30 rounded-full px-4 py-1 text-sm text-primary bg-primary/5"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
              <LinkButton
                href={`https://wa.me/${WPP_NUMBER_NASSIF}/?text=${WHATSAPP_MSG_TEXT_ENCODED}`}
                external
                newTab
                variant="primary"
                size="lg"
                className="text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Agendar consulta pelo WhatsApp"
              >
                Agendar consulta
              </LinkButton>
              <Link
                href="/tratamentos"
                className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                Ver outros tratamentos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/5">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
              Quando indicar avaliação especializada
            </h2>
            <p className="mt-4 text-secondary text-lg leading-relaxed">
              Sintomas que persistem por mais de alguns dias, pioram ao longo do
              tempo ou afetam a rotina precisam de investigação coloproctológica.
            </p>
            <ul className="mt-8 grid gap-4">
              {symptomsList.map((symptom) => (
                <li
                  key={symptom}
                  className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-background/80 p-4"
                >
                  <CheckCircle2
                    className="mt-1 text-primary flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-secondary text-base leading-relaxed">
                    {symptom}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-primary/15 bg-background p-8 shadow-sm">
            <h3 className="text-xl font-serif text-primary font-semibold">
              Por que antecipar o cuidado?
            </h3>
            <p className="mt-4 text-secondary leading-relaxed">
              Condições proctológicas tratadas precocemente tendem a evitar
              cirurgia de urgência, reduzem dor crônica e permitem tratamentos
              menos invasivos.
            </p>
            <ul className="mt-6 space-y-3 text-secondary">
              <li>• Recuperação mais rápida e com menos dor.</li>
              <li>• Protocolos personalizados para cada paciente.</li>
              <li>• Monitoramento pós-procedimento e prevenção de recidivas.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-primary/70 font-semibold">
              Planos terapêuticos
            </p>
            <h2 className="mt-4 text-2xl md:text-4xl font-serif font-bold text-primary">
              Protocolos baseados em evidências
            </h2>
            <p className="mt-4 text-secondary text-lg">
              Cada plano considera histórico clínico, estilo de vida e exames
              complementares para definir o tratamento ideal.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {treatmentOptions.map((option) => (
              <article
                key={option.title}
                className="border border-primary/10 rounded-3xl p-6 hover:border-primary/30 transition-colors"
              >
                <h3 className="text-xl font-semibold text-primary">
                  {option.title}
                </h3>
                <p className="mt-3 text-secondary leading-relaxed">
                  {option.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/5">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
              Perguntas frequentes
            </h2>
            <div className="mt-6 space-y-4">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group border border-primary/10 rounded-2xl bg-background px-6 py-4"
                >
                  <summary className="cursor-pointer text-lg font-semibold text-primary flex items-center justify-between gap-4">
                    {item.question}
                    <span className="text-sm text-primary/50 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
              Conteúdos relacionados
            </h2>
            <p className="mt-4 text-secondary">
              Continue lendo para aprofundar o conhecimento e entender quando
              cada terapia é indicada.
            </p>
            <div className="mt-6 space-y-4">
              {relatedArticles.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className={cn(
                    'block border border-primary/10 rounded-2xl p-5 hover:border-primary/40 transition-colors',
                    'bg-background'
                  )}
                >
                  <p className="text-sm uppercase tracking-[0.25em] text-primary/70 font-semibold">
                    Artigo recomendado
                  </p>
                  <p className="mt-2 text-lg font-semibold text-primary">
                    {article.label}
                  </p>
                  <p className="mt-2 text-secondary text-sm leading-relaxed">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SchemaMarkup type="MedicalProcedure" data={schema.medicalProcedure} />
      <SchemaMarkup type="FAQPage" data={schema.faqSchema} />
      <SchemaMarkup type="BreadcrumbList" data={schema.breadcrumbs} />
    </>
  )
}
