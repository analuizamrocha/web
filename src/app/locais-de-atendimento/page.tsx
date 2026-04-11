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
          <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Locais de atendimento' }]} />

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
                Aqui você encontra os locais relacionados ao atendimento da Dra. Ana Luiza em
                Curitiba.
              </p>
              <p>
                Um deles concentra as consultas e o acompanhamento em coloproctologia. O outro é
                usado quando a colonoscopia faz parte da investigação ou do rastreio indicado.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {locationPages.map((location) => (
              <article
                key={location.slug}
                className="rounded-3xl border border-secondary/20 bg-secondary/10 p-7 lg:p-8 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                    <MapPin className="size-5 text-primary" aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Badge variant="secondary" className="mb-3">
                      {location.badgeLabel}
                    </Badge>
                    <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-3">
                      {location.name}
                    </h2>
                    <p className="text-lg text-secondary leading-relaxed mb-4">
                      {location.visibleRelationshipText}
                    </p>
                    <address className="not-italic text-base lg:text-lg text-secondary leading-relaxed">
                      {location.addressLines[0]}
                      <br />
                      {location.addressLines[1]}
                    </address>
                  </div>
                </div>

                <p className="text-base lg:text-lg text-secondary leading-relaxed mb-5">
                  {location.cardDescription}
                </p>

                <ul className="space-y-3 text-base lg:text-lg text-secondary mb-6">
                  {location.services.slice(0, 2).map((service) => (
                    <li key={service} className="flex gap-3">
                      <span className="mt-2 size-2 rounded-full bg-primary/50 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 border-t border-secondary/10">
                  <div className="flex flex-wrap gap-4 text-sm lg:text-base font-medium">
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
                      Ver detalhes
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <LinkButton
                    href={location.whatsappHref}
                    external
                    newTab
                    variant="primary"
                    className="w-full sm:w-auto text-sm font-semibold px-5"
                  >
                    {location.primaryCtaLabel}
                  </LinkButton>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto max-w-5xl">
            <CallToActionCard
              title="Ainda em dúvida sobre qual local faz mais sentido?"
              body={
                <p>
                  Se a sua necessidade é consulta, retorno ou definição de conduta, comece pela
                  avaliação em coloproctologia. Se houver indicação de colonoscopia, a orientação
                  pode seguir para o local apropriado.
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
