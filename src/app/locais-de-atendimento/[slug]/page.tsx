import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
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
import { cn } from '@/lib/utils'

interface LocationPageProps {
  params: Promise<{
    slug: string
  }>
}

const locationStyles: Record<
  string,
  {
    hero: string
    badge: string
    panel: string
    eyebrow: string
    quickFactTitle: string
  }
> = {
  'clinica-nassif': {
    hero: 'border-secondary/20 bg-secondary/10',
    badge: 'bg-secondary/35 text-primary',
    panel: 'border-secondary/20 bg-secondary/10',
    eyebrow: 'Principal ponto de contato',
    quickFactTitle: 'Mais indicado para',
  },
  'specta-endoscopia-digestiva': {
    hero: 'border-primary/15 bg-primary/5',
    badge: 'bg-primary/10 text-primary',
    panel: 'border-primary/15 bg-primary/5',
    eyebrow: 'Exame quando houver indicação',
    quickFactTitle: 'Melhor contexto de uso',
  },
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

  const style = locationStyles[location.slug]

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
            <header
              className={cn(
                'mb-10 overflow-hidden rounded-[2rem] border px-6 py-8 text-center lg:mb-12 lg:px-8 lg:py-10',
                style.hero
              )}
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
                {style.eyebrow}
              </p>

              <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary" size="lg" className={style.badge}>
                  {location.badgeLabel}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                {location.pageTitle}
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary leading-relaxed font-medium max-w-3xl mx-auto">
                {location.visibleRelationshipText}
              </p>
              <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 text-left md:grid-cols-3">
                <div className="rounded-2xl border border-primary/10 bg-background/80 px-4 py-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/65">
                    {style.quickFactTitle}
                  </p>
                  <p className="text-sm leading-relaxed text-secondary">{location.summary}</p>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-background/80 px-4 py-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/65">
                    Região
                  </p>
                  <p className="text-sm leading-relaxed text-secondary">
                    {location.addressLines[1]}
                  </p>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-background/80 px-4 py-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/65">
                    Contato
                  </p>
                  <p className="text-sm leading-relaxed text-secondary">{location.phoneDisplay}</p>
                </div>
              </div>
            </header>

            <CallToActionCard
              title="Agendamento e orientações"
              body={<p>{location.schedulingDescription}</p>}
              actions={
                <>
                  <LinkButton href={location.whatsappHref} external newTab variant="primary">
                    {location.primaryCtaLabel}
                  </LinkButton>
                  <LinkButton href={location.mapUrl} external newTab variant="outline">
                    Ver mapa e rota
                  </LinkButton>
                  <LinkButton href="/locais-de-atendimento" variant="subtle">
                    Ver todos os locais
                  </LinkButton>
                </>
              }
              variant="secondary"
            />

            <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
              <main className="rounded-3xl border border-secondary/20 bg-background p-8 lg:p-10">
                <h2 className="mb-6 text-center font-serif text-3xl font-bold text-primary">
                  Como este local se encaixa no cuidado
                </h2>

                <div className="space-y-4">
                  {location.overviewParagraphs.map((paragraph) => (
                    <p key={paragraph} className="text-lg leading-relaxed text-secondary">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 px-5 py-5">
                  <h3 className="mb-4 font-serif text-2xl font-bold text-primary">
                    {location.servicesTitle}
                  </h3>
                  <ul className="space-y-3">
                    {location.services.map((service) => (
                      <li key={service} className="flex gap-3 text-lg leading-relaxed text-secondary">
                        <span className="mt-2 size-2 rounded-full bg-primary/50 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </main>

              <aside className="space-y-6">
                <div className={cn('rounded-3xl border p-8 lg:p-10', style.panel)}>
                  <h2 className="mb-5 font-serif text-2xl font-bold text-primary lg:text-3xl">
                    Endereço e contato
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <MapPin className="size-4 text-primary" aria-hidden="true" />
                      </div>
                      <address className="not-italic text-base leading-relaxed text-secondary lg:text-lg">
                        {location.addressLines[0]}
                        <br />
                        {location.addressLines[1]}
                      </address>
                    </div>

                    <a
                      href={location.phoneHref}
                      className="inline-flex items-center gap-3 text-secondary hover:text-primary transition-colors"
                    >
                      <Phone className="size-5 text-primary" aria-hidden="true" />
                      <span>{location.phoneDisplay}</span>
                    </a>
                  </div>
                </div>

                <div className="rounded-3xl border border-secondary/20 bg-secondary/10 p-8 lg:p-10">
                  <h2 className="mb-5 font-serif text-2xl font-bold text-primary lg:text-3xl">
                    Informações práticas
                  </h2>
                  <ul className="space-y-3">
                    {location.practicalInfo.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-relaxed text-secondary lg:text-lg">
                        <span className="mt-2 size-2 rounded-full bg-primary/50 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-secondary/20 bg-secondary/10 p-8 lg:p-10">
                  <h2 className="mb-5 font-serif text-2xl font-bold text-primary lg:text-3xl">
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
                        <ArrowRight className="mt-1 size-4 flex-shrink-0" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>

                {location.relatedArticles && location.relatedArticles.length > 0 && (
                  <div className="rounded-3xl border border-secondary/20 bg-secondary/10 p-8 lg:p-10">
                    <h2 className="mb-5 font-serif text-2xl font-bold text-primary lg:text-3xl">
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
                          <ArrowRight
                            className="mt-1 size-4 flex-shrink-0"
                            aria-hidden="true"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>

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
