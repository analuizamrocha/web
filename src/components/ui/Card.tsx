import Link from 'next/link'
import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CardProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
  variant?: 'default' | 'treatment' | 'service'
  href?: string
  ctaLabel?: string
  external?: boolean
}

interface CardActionLinkProps {
  href: string
  external: boolean
  className?: string
  ariaLabel: string
  children?: ReactNode
}

function CardActionLink({ href, external, className, ariaLabel, children }: CardActionLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {children}
    </Link>
  )
}

export function Card({
  title,
  description,
  children,
  className,
  variant = 'default',
  href,
  ctaLabel = 'Saiba mais',
  external = false,
}: CardProps) {
  const isServiceSelectiveMobileLink = variant === 'service' && Boolean(href)
  const cardAriaLabel = `${title} - ${ctaLabel}`

  const content = (
    <div className="flex h-full flex-col">
      <h3
        className={cn(
          '!font-sans',
          variant === 'treatment'
            ? 'text-lg sm:text-xl lg:text-xl xl:text-2xl text-primary font-bold leading-tight'
            : variant === 'service'
            ? 'text-xl sm:text-2xl text-primary font-bold leading-tight'
            : 'text-lg sm:text-xl text-primary font-bold'
        )}
      >
        {isServiceSelectiveMobileLink ? (
          <>
            <CardActionLink
              href={href!}
              external={external}
              className="inline sm:hidden focus-visible:outline-none focus-visible:underline"
              ariaLabel={cardAriaLabel}
            >
              {title}
            </CardActionLink>
            <span className="hidden sm:inline">{title}</span>
          </>
        ) : (
          title
        )}
      </h3>

      {description && (
        <p
          className={cn(
            'mt-4 leading-relaxed',
            variant === 'treatment'
              ? 'text-sm sm:text-base text-body'
              : variant === 'service'
              ? 'text-sm sm:text-base text-body flex-1 pb-4'
              : 'text-sm sm:text-base text-accent'
          )}
        >
          {description}
        </p>
      )}

      {children && <div className={cn(variant === 'service' ? 'mt-auto pt-6' : 'mt-6')}>{children}</div>}

      {href && variant === 'service' && (
        <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-primary/10">
          <CardActionLink
            href={href!}
            external={external}
            className="inline-flex sm:hidden text-primary font-semibold text-sm lg:text-base focus-visible:outline-none focus-visible:underline"
            ariaLabel={cardAriaLabel}
          >
            {ctaLabel}
          </CardActionLink>
          <span className="hidden sm:inline-flex text-primary font-semibold text-sm lg:text-base">
            {ctaLabel}
          </span>
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary/20 bg-background text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-primary group-hover:bg-primary group-hover:text-background"
          >
            <ArrowRight size={16} />
          </span>
        </div>
      )}

      {href && variant !== 'service' && (
        <div className="mt-6">
          <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm lg:text-base">
            <span>{ctaLabel}</span>
            <span aria-hidden="true">→</span>
          </span>
        </div>
      )}
    </div>
  )

  const baseClasses = cn(
    'group relative isolate flex flex-col rounded-3xl transition-all duration-300 h-full shadow-sm hover:shadow-md block focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-primary',
    href &&
      (variant === 'service'
        ? 'sm:cursor-pointer transform hover:-translate-y-[2px] hover:shadow-lg'
        : 'cursor-pointer transform hover:-translate-y-[2px] hover:shadow-lg'),
    variant === 'treatment' &&
      'bg-card hover:bg-card-hover text-center justify-center p-6 min-h-[140px] sm:min-h-[160px] lg:p-8 lg:min-h-[200px] xl:min-h-[220px] border border-secondary/20 hover:border-secondary/30',
    variant === 'default' &&
      'bg-neutral-50/50 hover:bg-neutral-100/50 p-6 sm:p-8 border border-neutral-200',
    variant === 'service' &&
      'bg-secondary/10 hover:bg-card-hover p-6 sm:p-8 border border-primary/10 hover:border-primary/20 backdrop-blur-sm min-h-[300px] sm:min-h-[320px]',
    className
  )

  if (href && variant === 'service') {
    return (
      <div className={baseClasses}>
        <CardActionLink
          href={href}
          external={external}
          className="absolute inset-0 z-30 hidden rounded-3xl sm:block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          ariaLabel={cardAriaLabel}
        />
        <div className="relative z-20 h-full">{content}</div>
      </div>
    )
  }

  if (href) {
    return (
      <CardActionLink
        href={href}
        external={external}
        className={baseClasses}
        ariaLabel={cardAriaLabel}
      >
        {content}
      </CardActionLink>
    )
  }

  return <div className={baseClasses}>{content}</div>
}
