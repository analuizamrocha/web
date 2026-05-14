import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { LinkButton } from '@/components/ui/LinkButton'
import { Badge } from '@/components/ui/Badge'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/seo-schemas'
import {
  LOCATIONS_BASE_PATH,
  getLocationPath,
  getLocationsIndexStructuredData,
  locationPages,
} from '@/lib/locations'
import { WEBSITE_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

const pageTitle = 'Locais de atendimento em Curitiba'
const pageDescription =
  'Veja onde a Dra. Ana Luiza Rocha atende em Curitiba, com informações sobre consulta em coloproctologia, colonoscopia, endereços e agendamento.'
const pageUrl = `${WEBSITE_URL}${LOCATIONS_BASE_PATH}`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: generateOpenGraphMetadata({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
  }),
  twitter: generateTwitterMetadata({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
  }),
}

const locationStyles: Record<
  string,
  {
    card: string
    badge: string
    glow: string
    hint: string
  }
> = {
  'clinica-nassif': {
    card: 'border-secondary/20 bg-secondary/10',
    badge: 'bg-secondary/35 text-primary',
    glow: 'from-secondary/25 via-secondary/10 to-transparent',
    hint: 'Melhor ponto de partida para avaliação, retorno e organização do cuidado.',
  },
  'specta-endoscopia-digestiva': {
    card: 'border-primary/15 bg-primary/5',
    badge: 'bg-primary/10 text-primary',
    glow: 'from-primary/15 via-primary/5 to-transparent',
    hint: 'Faz mais sentido quando a colonoscopia já entrou no plano definido em consulta.',
  },
}

export default function LocationsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getLocationsIndexStructuredData(),
        }}
      />

      <section className="section bg-background pt-24 md:pt-28 animate-fade-in">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          <Breadcrumb
            items={[{ label: 'Início', href: '/' }, { label: 'Locais de atendimento' }]}
          />

          <div className="mx-auto max-w-4xl text-center mb-12 lg:mb-16">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
              <Badge variant="secondary" size="lg">
                Consulta em coloproctologia
              </Badge>
              <Badge variant="secondary" size="lg">
                Colonoscopia quando indicada
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6">
              Locais de atendimento da Dra. Ana Luiza Rocha
            </h1>

            <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-secondary font-medium space-y-4">
              <p>
                Aqui você encontra onde a consulta e o exame costumam acontecer no cuidado com a
                Dra. Ana Luiza em Curitiba.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {locationPages.map((location) =>
              (() => {
                const style = locationStyles[location.slug]

                return (
                  <article
                    key={location.slug}
                    className={cn(
                      'relative overflow-hidden rounded-3xl border p-7 shadow-sm lg:p-8',
                      style.card
                    )}
                  >
                    <div
                      className={cn(
                        'pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b',
                        style.glow
                      )}
                    />

                    <div className="relative">
                      <div className="mb-5 flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                          <MapPin className="size-5 text-primary" aria-hidden="true" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <Badge variant="secondary" className={cn('mb-3', style.badge)}>
                            {location.badgeLabel}
                          </Badge>
                          <h2 className="mb-2 text-2xl font-serif font-bold text-primary lg:text-3xl">
                            {location.name}
                          </h2>
                          <p className="mb-4 text-lg font-medium text-primary/80">
                            {location.summary}
                          </p>
                          <address className="not-italic text-base leading-relaxed text-secondary lg:text-lg">
                            {location.addressLines[0]}
                            <br />
                            {location.addressLines[1]}
                          </address>
                        </div>
                      </div>

                      <div className="mb-5 rounded-2xl border border-primary/10 bg-background/80 px-4 py-4">
                        <p className="mb-1 text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
                          Melhor para
                        </p>
                        <p className="text-base leading-relaxed text-secondary">{style.hint}</p>
                      </div>

                      <p className="mb-5 text-base leading-relaxed text-secondary lg:text-lg">
                        {location.cardDescription}
                      </p>

                      <ul className="mb-6 space-y-3 text-base text-secondary lg:text-lg">
                        {location.services.slice(0, 2).map((service) => (
                          <li key={service} className="flex gap-3">
                            <span className="mt-2 size-2 rounded-full bg-primary/50 flex-shrink-0" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-col gap-4 border-t border-secondary/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap gap-4 text-sm font-medium lg:text-base">
                          <a
                            href={location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            Ver mapa
                          </a>
                          <Link
                            href={getLocationPath(location.slug)}
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                          >
                            Ver detalhes do local
                            <ArrowRight className="size-4" aria-hidden="true" />
                          </Link>
                        </div>

                        <LinkButton
                          href={location.whatsappHref}
                          external
                          newTab
                          variant="primary"
                          className="w-full px-5 text-sm font-semibold sm:w-auto"
                        >
                          {location.primaryCtaLabel}
                        </LinkButton>
                      </div>
                    </div>
                  </article>
                )
              })()
            )}
          </div>

          <div className="mx-auto max-w-5xl">
            <CallToActionCard
              title="Ainda em dúvida sobre qual local faz mais sentido?"
              body={
                <p>
                  Se a sua necessidade é consulta, retorno ou definição de conduta, comece pela
                  avaliação em coloproctologia. Quando a colonoscopia fizer parte do plano, a equipe
                  orienta o local e os próximos passos.
                </p>
              }
              actions={
                <>
                  <LinkButton href="/tratamentos" variant="outline">
                    Ver tratamentos
                  </LinkButton>
                  <LinkButton href="/sobre" variant="subtle">
                    Conhecer a trajetória da Dra. Ana
                  </LinkButton>
                </>
              }
              variant="secondary"
            />
          </div>

          <div className="mt-2 text-center">
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
