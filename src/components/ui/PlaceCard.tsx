import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Calendar,
  Clock,
  Info,
  MapPin,
  Phone,
} from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/whatsapp'
import { LinkButton } from '@/components/ui/LinkButton'
import { cn } from '@/lib/utils'
import type { LocationPageData } from '@/lib/locations'
import { getLocationPath } from '@/lib/locations'

interface PlaceCardProps {
  location: LocationPageData
  className?: string
}

const variantStyles = {
  terracotta: {
    card: 'bg-card border-secondary/40 hover:border-secondary/70',
    photo: 'bg-secondary',
    photoPattern: {
      backgroundImage: [
        'linear-gradient(135deg, rgba(102,58,37,0.06) 0%, transparent 60%)',
        'repeating-linear-gradient(45deg, rgba(102,58,37,0.06) 0 16px, rgba(102,58,37,0.10) 16px 32px)',
      ].join(', '),
    },
    chip: 'text-primary',
    metaIcon: 'text-muted',
    callout: 'bg-secondary/20',
    calloutIcon: 'text-brand-primary',
    calloutLabel: 'text-primary',
  },
  sage: {
    card: 'bg-[#f0f1ea] border-accent-neutral/25 hover:border-accent-neutral/45',
    photo: 'bg-[#c7cfb8]',
    photoPattern: {
      backgroundImage: [
        'linear-gradient(135deg, rgba(122,139,104,0.10) 0%, transparent 60%)',
        'repeating-linear-gradient(45deg, rgba(122,139,104,0.10) 0 16px, rgba(122,139,104,0.18) 16px 32px)',
      ].join(', '),
    },
    chip: 'text-accent-sage-deep',
    metaIcon: 'text-accent-sage-deep',
    callout: 'bg-accent-neutral/15',
    calloutIcon: 'text-accent-neutral',
    calloutLabel: 'text-accent-sage-deep',
  },
} as const

export function PlaceCard({ location, className }: PlaceCardProps) {
  const variant = location.roleChipVariant === 'sage' ? 'sage' : 'terracotta'
  const styles = variantStyles[variant]
  const ctaVariant = location.ctaVariant === 'sage' ? 'sage' : 'primary'
  const detailPath = getLocationPath(location.slug)
  const phoneIsSameAsWhatsapp = location.phoneDisplay === location.whatsappDisplay

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-[28px] border',
        'transition-[transform,box-shadow,border-color] duration-700 ease-out',
        'hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(102,58,37,0.15)]',
        styles.card,
        className
      )}
    >
      {/* Photo header */}
      <div
        className={cn(
          'relative flex h-[200px] items-start justify-between overflow-hidden p-5',
          styles.photo
        )}
        style={styles.photoPattern}
      >
        <Image
          src={location.heroPhotoSrc}
          alt={location.heroPhotoAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: location.heroPhotoObjectPosition ?? 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-primary/5 to-transparent" />
        <span
          className={cn(
            'relative z-10 inline-flex items-center rounded-full bg-background/90 px-3.5 py-1.5',
            'text-xs font-semibold tracking-wide',
            styles.chip
          )}
        >
          {location.badgeLabel}
        </span>
        <span className="relative z-10 self-end rounded-full bg-background/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
          {location.heroPhotoTag}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-[18px] p-7 sm:px-8 sm:py-7">
        <h2 className="font-serif text-[26px] sm:text-[28px] font-bold leading-[1.08] tracking-[-0.01em] text-primary">
          {location.name}
        </h2>

        <p className="-mt-1 max-w-[38ch] font-serif text-[15.5px] italic font-normal leading-[1.45] text-body">
          {location.tagline}
        </p>

        {/* Meta strip — 3 rows */}
        <dl className="grid grid-cols-[28px_1fr] items-center gap-x-3.5 gap-y-2.5 border-y border-primary/10 py-4">
          <dt className={cn('flex w-7 justify-center', styles.metaIcon)}>
            <MapPin className="size-4" strokeWidth={2} aria-hidden="true" />
          </dt>
          <dd className="text-[13.5px] leading-[1.45] text-body">
            <strong className="font-semibold text-primary">
              {location.addressLines[0]}
            </strong>{' '}
            · {location.addressLines[1]}
          </dd>

          <dt className={cn('flex w-7 justify-center', styles.metaIcon)}>
            <Clock className="size-4" strokeWidth={2} aria-hidden="true" />
          </dt>
          <dd className="text-[13.5px] leading-[1.45] text-body">
            <strong className="font-semibold text-primary">{location.hours.display}</strong>
            <span className="block text-[12.5px] leading-[1.4] text-muted">
              {location.hours.sub}
            </span>
          </dd>

          {!phoneIsSameAsWhatsapp && (
            <>
              <dt className={cn('flex w-7 justify-center', styles.metaIcon)}>
                <Phone className="size-4" strokeWidth={2} aria-hidden="true" />
              </dt>
              <dd className="text-[13.5px] leading-[1.45] text-body">
                <strong className="font-semibold text-primary">
                  {location.phoneDisplay}
                </strong>
                <span className="block text-[12.5px] leading-[1.4] text-muted">
                  Telefone
                </span>
              </dd>
            </>
          )}

          <dt className={cn('flex w-7 justify-center', styles.metaIcon)}>
            <WhatsAppIcon className="size-4" />
          </dt>
          <dd className="text-[13.5px] leading-[1.45] text-body">
            <strong className="font-semibold text-primary">
              {location.whatsappDisplay}
            </strong>
            <span className="block text-[12.5px] leading-[1.4] text-muted">
              WhatsApp
            </span>
          </dd>
        </dl>

        {/* Callout — tint-only, no border */}
        <div className={cn('flex items-start gap-3 rounded-2xl px-[18px] py-3.5', styles.callout)}>
          <div
            className={cn(
              'flex size-6 flex-shrink-0 items-center justify-center',
              styles.calloutIcon
            )}
          >
            <Info className="size-[18px]" strokeWidth={2} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div
              className={cn(
                'mb-0.5 text-[11px] font-bold uppercase tracking-[0.14em]',
                styles.calloutLabel
              )}
            >
              {location.placeCalloutLabel}
            </div>
            <p className="text-[13.5px] leading-[1.55] text-body">
              {location.cardDescription}
            </p>
          </div>
        </div>

        {/* CTA stack */}
        <div className="mt-auto flex flex-col items-center gap-3 pt-1">
          <LinkButton
            href={location.whatsappHref}
            external
            newTab
            variant={ctaVariant}
            className="h-12 w-full gap-2.5 rounded-full px-5 text-[14.5px] font-semibold"
            aria-label={`${location.primaryCtaLabel} — ${location.shortName}`}
          >
            <Calendar className="size-4" aria-hidden="true" />
            {location.primaryCtaLabel}
          </LinkButton>
          <Link
            href={detailPath}
            className="group/link inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary transition-[gap,color] duration-[550ms] ease-out hover:gap-2.5 hover:text-primary/80"
          >
            Ver detalhes da {location.shortName}
            <ArrowRight
              className="size-[13px] transition-transform duration-[550ms] ease-out group-hover/link:translate-x-0.5"
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  )
}
