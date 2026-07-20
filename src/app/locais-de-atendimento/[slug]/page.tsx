import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Calendar, MapPin, Navigation, Phone } from 'lucide-react'
import { LinkButton } from '@/components/ui/LinkButton'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { MetaStrip, type MetaStripCell } from '@/components/ui/MetaStrip'
import { IndicationSection } from '@/components/ui/IndicationSection'
import { InfoCardGrid } from '@/components/ui/InfoCardGrid'
import { LinkList } from '@/components/ui/LinkList'
import { MapEmbed } from '@/components/ui/MapEmbed'
import { MediaCard } from '@/components/ui/MediaCard'
import { StickyCTABar } from '@/components/ui/StickyCTABar'
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/seo-schemas'
import {
  getLocationBySlug,
  getLocationPageStructuredData,
  getLocationPath,
  locationPages,
} from '@/lib/locations'
import { WEBSITE_URL } from '@/lib/constants'
import { getTreatmentImageBySlug } from '@/lib/treatment-images'
import { cn } from '@/lib/utils'

const TREATMENT_HREF_PREFIX = '/tratamentos/'

function getTreatmentImageFromHref(href: string) {
  if (!href.startsWith(TREATMENT_HREF_PREFIX)) return undefined
  const slug = href.slice(TREATMENT_HREF_PREFIX.length)
  return getTreatmentImageBySlug(slug)
}

interface LocationPageProps {
  params: Promise<{
    slug: string
  }>
}

const photoFrameStyles: Record<string, string> = {
  sage: 'bg-[#c7cfb8] border-accent-neutral/25',
  terracotta: 'bg-secondary/70 border-secondary/45',
}

const roleChipStyles: Record<string, string> = {
  sage: 'bg-accent-neutral/15 text-accent-sage-deep',
  terracotta: 'bg-primary/10 text-primary',
}

const photoTagStyles: Record<string, string> = {
  sage: 'text-accent-sage-deep',
  terracotta: 'text-primary',
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
    return { title: 'Local não encontrado' }
  }

  const pageUrl = `${WEBSITE_URL}${getLocationPath(location.slug)}`

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: { canonical: pageUrl },
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

  const photoFrameClass = photoFrameStyles[location.roleChipVariant] ?? photoFrameStyles.terracotta
  const roleChipClass = roleChipStyles[location.roleChipVariant] ?? roleChipStyles.terracotta
  const photoTagClass = photoTagStyles[location.roleChipVariant] ?? photoTagStyles.terracotta

  const ctaVariant = location.ctaVariant === 'sage' ? 'sage' : 'primary'
  const phoneIsSameAsWhatsapp = location.phoneDisplay === location.whatsappDisplay
  const contactDetails = phoneIsSameAsWhatsapp
    ? [
        {
          label: 'WhatsApp',
          value: location.whatsappDisplay,
        },
      ]
    : [
        {
          label: 'Telefone',
          value: location.phoneDisplay,
        },
        {
          label: 'WhatsApp',
          value: location.whatsappDisplay,
        },
      ]

  const metaCells: MetaStripCell[] = [
    {
      label: 'Endereço',
      value: location.addressLines[0],
      sub: location.addressLines[1],
    },
    {
      label: 'Horários',
      value: location.hours.display,
      sub: location.hours.sub,
    },
    {
      label: 'Contato',
      details: contactDetails,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getLocationPageStructuredData(location),
        }}
      />

      {/* ── HERO ── */}
      <section className="bg-background pt-24 pb-16 md:pt-28 lg:pb-20 animate-fade-in">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14">
          <nav className="mb-7 flex items-center gap-2.5 overflow-hidden whitespace-nowrap text-[13px] text-muted">
            <Link href="/" className="flex-shrink-0 hover:text-primary transition-colors">
              Início
            </Link>
            <span className="flex-shrink-0 opacity-50">›</span>
            <Link
              href="/locais-de-atendimento"
              className="flex-shrink-0 hover:text-primary transition-colors"
            >
              Locais de atendimento
            </Link>
            <span className="flex-shrink-0 opacity-50">›</span>
            <span className="min-w-0 truncate font-medium text-primary">{location.name}</span>
          </nav>

          <div className="mb-12 lg:mb-14 grid grid-cols-1 gap-9 lg:grid-cols-[7fr_5fr] lg:gap-14 lg:items-end">
            <div>
              <span
                className={cn(
                  'mb-5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide',
                  roleChipClass
                )}
              >
                <MapPin className="size-[13px]" strokeWidth={2.4} aria-hidden="true" />
                {location.badgeLabel}
              </span>
              <h1 className="mb-6 max-w-[12ch] font-serif text-[40px] sm:text-5xl lg:text-[64px] font-bold leading-[1.02] tracking-[-0.01em] text-primary">
                {location.pageTitle}
              </h1>
              <p className="mb-8 max-w-[44ch] font-serif text-[20px] italic font-normal leading-[1.5] text-body">
                {location.heroLead}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <LinkButton
                  href={location.whatsappHref}
                  external
                  newTab
                  variant={ctaVariant}
                  className="h-[52px] gap-2.5 px-6 text-[15px] font-semibold"
                >
                  <Calendar className="size-[18px]" aria-hidden="true" />
                  {location.primaryCtaLabel}
                </LinkButton>
                <LinkButton
                  href={location.mapUrl}
                  external
                  newTab
                  variant="outline"
                  className="h-[52px] gap-2.5 px-6 text-[15px] font-semibold"
                >
                  <Navigation className="size-4" aria-hidden="true" />
                  Ver mapa
                </LinkButton>
              </div>
            </div>

            <div
              className={cn(
                'relative flex aspect-[5/4] items-end overflow-hidden rounded-[28px] border p-5 shadow-sm',
                photoFrameClass
              )}
            >
              <Image
                src={location.heroPhotoSrc}
                alt={location.heroPhotoAlt}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                style={{ objectPosition: location.heroPhotoObjectPosition ?? 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-primary/5 to-transparent" />
              <span
                className={cn(
                  'relative z-10 rounded-full border border-subtle bg-background/90 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em]',
                  photoTagClass
                )}
              >
                {location.heroPhotoTag}
              </span>
            </div>
          </div>

          <MetaStrip cells={metaCells} />
        </div>
      </section>

      {/* ── NARRATIVE (bg-subtle) ── */}
      <section className="bg-subtle py-20">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:items-start">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
                {location.narrative.eyebrow}
              </span>
              <h2 className="mb-7 max-w-[18ch] font-serif text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.01em] text-primary">
                {location.narrative.heading}
              </h2>
              {location.narrative.paragraphs.slice(0, 1).map((paragraph) => (
                <p key={paragraph} className="mb-5 text-[17px] leading-[1.7] text-body">
                  {paragraph}
                </p>
              ))}
              <div className="my-9 max-w-[36ch] border-l-[3px] border-accent-neutral py-1 pl-6 font-serif text-2xl italic font-normal leading-[1.45] text-primary">
                {location.narrative.pullQuote}
              </div>
              {location.narrative.paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph} className="mb-5 text-[17px] leading-[1.7] text-body">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex justify-center lg:pt-12">
              <LinkList items={location.narrativeSideLinks.items} variant="primary" />
            </div>
          </div>
        </div>
      </section>

      {/* ── INDICATION (dark brown) ── */}
      <IndicationSection
        eyebrow={location.indication.eyebrow}
        heading={location.indication.heading}
        intro={location.indication.intro}
        items={location.indication.items}
      />

      {/* ── BEFORE YOU COME ── */}
      <section className="bg-background py-20">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14">
          <div className="mb-8 max-w-[720px]">
            <span className="mb-3.5 block text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
              {location.beforeYouCome.eyebrow}
            </span>
            <h2 className="mb-4 max-w-[22ch] font-serif text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.01em] text-primary">
              {location.beforeYouCome.heading}
            </h2>
            <p className="max-w-[54ch] text-[17px] leading-[1.65] text-body">
              {location.beforeYouCome.intro}
            </p>
          </div>

          <InfoCardGrid items={location.beforeYouCome.cards} />
        </div>
      </section>

      {/* ── MAP STRIP (bg-subtle) ── */}
      <section id="mapa" className="bg-subtle py-20">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14">
          <div className="mb-8 max-w-[720px]">
            <span className="mb-3.5 block text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
              {location.mapStrip.eyebrow}
            </span>
            <h2 className="mb-4 max-w-[22ch] font-serif text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.01em] text-primary">
              {location.mapStrip.heading}
            </h2>
            <p className="max-w-[54ch] text-[17px] leading-[1.65] text-body">
              {location.mapStrip.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-[28px] border border-subtle bg-background lg:grid-cols-[7fr_5fr] min-h-[360px]">
            <MapEmbed
              address={`${location.streetAddress}, ${location.neighborhood}, ${location.city} - ${location.state}`}
              placeName={location.shortName}
              className="min-h-[280px] lg:min-h-full"
            />

            {/* Map side panel */}
            <div className="flex flex-col gap-5 p-8">
              <div>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                  Endereço completo
                </div>
                <div className="font-serif text-xl font-bold leading-[1.25] text-primary">
                  {location.addressLines[0]}
                </div>
                <div className="mt-1 text-[15.5px] text-body">{location.addressLines[1]}</div>
              </div>

              <div className="flex flex-col gap-2.5 border-y border-primary/10 py-4 text-[14.5px] leading-[1.55] text-body">
                {location.mapStrip.references.map((ref) => (
                  <div key={ref} className="flex items-start gap-2.5">
                    <ArrowRight
                      className="mt-1 size-4 flex-shrink-0 text-accent-neutral"
                      aria-hidden="true"
                    />
                    <span>{ref}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-2.5">
                <LinkButton
                  href={location.mapUrl}
                  external
                  newTab
                  variant="outline"
                  className="h-11 gap-2 px-4 text-[14px] font-semibold"
                >
                  <Navigation className="size-4" aria-hidden="true" />
                  Abrir no Google Maps
                </LinkButton>
                <LinkButton
                  href={location.whatsappHref}
                  external
                  newTab
                  variant="outline"
                  className="h-11 gap-2 px-4 text-[14px] font-semibold"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Falar com a equipe
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      <section className="bg-background py-20">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14">
          <div className="mb-8 max-w-[720px]">
            <h2 className="mb-4 max-w-[22ch] font-serif text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.01em] text-primary">
              {location.relatedSection.heading}
            </h2>
            <p className="max-w-[54ch] text-[17px] leading-[1.65] text-body">
              {location.relatedSection.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[13fr_10fr] lg:gap-12">
            <div>
              <h3 className="mb-5 font-serif text-2xl font-bold text-primary">
                {location.relatedSection.treatmentsHeading}
              </h3>
              <div className="grid gap-3">
                {location.relatedTreatments.map((item) => {
                  const treatmentImage = getTreatmentImageFromHref(item.href)
                  return (
                    <MediaCard
                      key={item.href}
                      href={item.href}
                      title={item.label}
                      subtitle={item.subtitle}
                      thumbVariant={item.thumbVariant}
                      imageSrc={treatmentImage?.src}
                      imageAlt={treatmentImage?.alt}
                    />
                  )
                })}
              </div>
            </div>

            {location.relatedArticles && location.relatedArticles.length > 0 && (
              <div>
                <h3 className="mb-5 font-serif text-2xl font-bold text-primary">
                  {location.relatedSection.articlesHeading}
                </h3>
                <div className="rounded-3xl border border-secondary/40 bg-card py-2">
                  {location.relatedArticles.map((article, index, all) => (
                    <Link
                      key={article.href}
                      href={article.href}
                      className={cn(
                        'group flex items-center justify-between gap-4 px-6 py-[18px] no-underline text-inherit',
                        'transition-[background-color,padding-left] duration-200',
                        'hover:bg-background/60 hover:pl-7',
                        index < all.length - 1 && 'border-b border-primary/[0.08]'
                      )}
                    >
                      <span className="max-w-[32ch] text-[15.5px] font-semibold leading-snug text-primary">
                        {article.label}
                      </span>
                      <ArrowRight
                        className="size-[18px] flex-shrink-0 text-primary opacity-55 transition-[transform,opacity] duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ (bg-subtle) ── */}
      <section className="bg-subtle py-20">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
              {location.faqSection.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.01em] text-primary">
              {location.faqSection.heading}
            </h2>
          </div>
          <FAQAccordion items={location.faq} defaultOpenIndex={0} />
        </div>
      </section>

      {/* ── STICKY CTA ── */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14 -mt-10 pb-16">
        <StickyCTABar
          eyebrow={location.stickyBar.eyebrow}
          message={location.stickyBar.message}
          primaryHref={location.whatsappHref}
          primaryLabel={location.primaryCtaLabel}
        />
      </div>
    </>
  )
}
