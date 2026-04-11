import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { LinkButton } from '@/components/ui/LinkButton'
import { Badge } from '@/components/ui/Badge'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/seo-schemas'
import {
  getLocationBySlug,
  getLocationPageStructuredData,
  getLocationPath,
  locationPages,
} from '@/lib/locations'
import { WEBSITE_URL } from '@/lib/constants'

interface LocationPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return locationPages.map((location) => ({
    slug: location.slug,
  }))
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params
  const location = getLocationBySlug(slug)

  if (!location) {
    return {
      title: 'Local não encontrado',
    }
  }

  const pageUrl = `${WEBSITE_URL}${getLocationPath(location.slug)}`

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: generateOpenGraphMetadata({
      title: location.metaTitle,
      description: location.metaDescription,
      url: pageUrl,
    }),
    twitter: generateTwitterMetadata({
      title: location.metaTitle,
      description: location.metaDescription,
      url: pageUrl,
    }),
  }
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params
  const location = getLocationBySlug(slug)

  if (!location) {
    notFound()
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getLocationPageStructuredData(location),
        }}
      />

      <section className="section bg-background pt-24 md:pt-28 animate-fade-in">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          <Breadcrumb
            items={[
              { label: 'Início', href: '/' },
              { label: 'Locais de atendimento', href: '/locais-de-atendimento' },
              { label: location.name },
            ]}
          />

          <div className="mx-auto max-w-4xl">
            <header className="mb-10 lg:mb-12 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                <Badge variant="secondary" size="lg">
                  {location.badgeLabel}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                {location.pageTitle}
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary leading-relaxed font-medium max-w-3xl mx-auto">
                {location.visibleRelationshipText}
              </p>
            </header>

            <div className="rounded-3xl border border-secondary/20 bg-secondary/10 p-8 lg:p-10 mb-10">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-4">
                Endereço e contato
              </h2>

              <address className="not-italic text-lg text-secondary leading-relaxed mb-5">
                {location.addressLines[0]}
                <br />
                {location.addressLines[1]}
              </address>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-base lg:text-lg">
                <a
                  href={location.phoneHref}
                  className="inline-flex items-center gap-3 text-secondary hover:text-primary transition-colors"
                >
                  <Phone className="size-5 text-primary" aria-hidden="true" />
                  <span>{location.phoneDisplay}</span>
                </a>

                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Ver mapa e rota
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <main className="prose prose-lg max-w-none mb-10 lg:mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">
                Como este local se encaixa no cuidado
              </h2>

              {location.overviewParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg text-secondary leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}

              <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">
                {location.servicesTitle}
              </h2>
              <ul>
                {location.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>

              <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">
                Informações práticas
              </h2>
              <ul>
                {location.practicalInfo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </main>

            <CallToActionCard
              title="Agendamento"
              body={<p>{location.schedulingDescription}</p>}
              actions={
                <>
                  <LinkButton href={location.whatsappHref} external newTab variant="primary">
                    {location.primaryCtaLabel}
                  </LinkButton>
                  <LinkButton href="/locais-de-atendimento" variant="outline">
                    Ver todos os locais
                  </LinkButton>
                </>
              }
              variant="secondary"
            />

            <div className="rounded-3xl border border-secondary/20 bg-secondary/10 p-8 lg:p-10 mb-10">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-5">
                Tratamentos relacionados
              </h2>
              <div className="space-y-3">
                {location.relatedTreatments.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-secondary/15 bg-background px-4 py-4 text-secondary hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="size-4 flex-shrink-0 mt-1" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            {location.relatedArticles && location.relatedArticles.length > 0 && (
              <div className="rounded-3xl border border-secondary/20 bg-secondary/10 p-8 lg:p-10 mb-10">
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-5">
                  Leituras úteis
                </h2>
                <div className="space-y-3">
                  {location.relatedArticles.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-start justify-between gap-3 rounded-2xl border border-secondary/15 bg-background px-4 py-4 text-secondary hover:border-primary/30 hover:text-primary transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="size-4 flex-shrink-0 mt-1" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-secondary/20 bg-background p-8 lg:p-10 mb-8">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-6">
                Perguntas frequentes
              </h2>
              <div className="space-y-6">
                {location.faq.map((item) => (
                  <div key={item.question}>
                    <h3 className="text-xl font-semibold text-primary mb-2">{item.question}</h3>
                    <p className="text-lg text-secondary leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors text-lg"
              >
                ← Voltar ao início
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
