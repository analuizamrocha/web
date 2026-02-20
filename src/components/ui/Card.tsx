import Link from 'next/link'
import { ReactNode } from 'react'
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
  const content = (
    <div className="flex h-full flex-col">
      <h3
        className={cn(
          '!font-sans',
          variant === 'treatment'
            ? 'text-lg sm:text-xl lg:text-xl xl:text-2xl text-primary font-bold leading-tight'
            : variant === 'service'
            ? 'text-xl sm:text-2xl text-primary font-bold leading-tight'
            : 'text-lg sm:text-xl text-secondary font-bold'
        )}
      >
        {title}
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

      {href && (
        <div
          className={cn(
            variant === 'service'
              ? 'mt-auto pt-3 border-t border-primary/10'
              : 'mt-6'
          )}
        >
          <span
            className={cn(
              'inline-flex items-center gap-1 text-primary font-semibold text-sm lg:text-base',
              variant === 'service' &&
                'transition-transform duration-300 group-hover:translate-x-0.5'
            )}
          >
            <span>{ctaLabel}</span>
            <span aria-hidden="true">→</span>
          </span>
        </div>
      )}
    </div>
  )

  const baseClasses = cn(
    'group flex flex-col rounded-3xl transition-all duration-300 h-full shadow-sm hover:shadow-md block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
    href && 'cursor-pointer transform hover:-translate-y-[2px] hover:shadow-lg',
    variant === 'treatment' &&
      'bg-card hover:bg-card-hover text-center justify-center p-6 min-h-[140px] sm:min-h-[160px] lg:p-8 lg:min-h-[200px] xl:min-h-[220px] border border-secondary/20 hover:border-secondary/30',
    variant === 'default' &&
      'bg-neutral-50/50 hover:bg-neutral-100/50 p-6 sm:p-8 border border-neutral-200',
    variant === 'service' &&
      'bg-secondary/10 hover:bg-card-hover p-6 sm:p-8 border border-primary/10 hover:border-primary/20 backdrop-blur-sm min-h-[300px] sm:min-h-[320px]',
    className
  )

  if (href) {
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={baseClasses}
        aria-label={`${title} - ${ctaLabel}`}
      >
        {content}
      </a>
    ) : (
      <Link href={href} className={baseClasses} aria-label={`${title} - ${ctaLabel}`}>
        {content}
      </Link>
    )
  }

  return <div className={baseClasses}>{content}</div>
}
