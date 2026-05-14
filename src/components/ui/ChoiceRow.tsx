import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ChoiceRowItem = {
  when: string
  recommendationStrong: string
  recommendationRest: string
  href: string
  variant?: 'terracotta' | 'sage'
  external?: boolean
}

interface ChoiceRowProps extends ChoiceRowItem {
  className?: string
}

export function ChoiceRow({
  when,
  recommendationStrong,
  recommendationRest,
  href,
  variant = 'terracotta',
  external = false,
  className,
}: ChoiceRowProps) {
  const dotClass = variant === 'sage' ? 'bg-accent-neutral' : 'bg-brand-primary'

  const content = (
    <>
      <div className="flex items-center gap-2.5 font-serif text-[15.5px] font-bold leading-[1.3] text-primary">
        <span
          className={cn(
            'inline-block size-[7px] flex-shrink-0 rounded-full',
            dotClass
          )}
          aria-hidden="true"
        />
        {when}
      </div>
      <div className="flex items-center gap-2.5 text-[14px] sm:text-[14.5px] text-body">
        <span>
          <strong className="font-semibold text-primary">
            {recommendationStrong}
          </strong>{' '}
          {recommendationRest}
        </span>
        <ArrowRight
          className="ml-auto size-[18px] flex-shrink-0 text-primary opacity-55 transition-[transform,opacity] duration-[550ms] ease-out group-hover/row:translate-x-1 group-hover/row:opacity-100"
          aria-hidden="true"
        />
      </div>
    </>
  )

  const baseClasses = cn(
    'group/row grid grid-cols-1 items-center gap-2 rounded-[18px] border border-primary/10 bg-background',
    'px-5 py-5 sm:grid-cols-[220px_1fr] sm:gap-6 sm:px-6 sm:py-[22px]',
    'no-underline text-inherit',
    'transition-[background-color,border-color] duration-[550ms] ease-out',
    'hover:bg-subtle hover:border-primary/20',
    className
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={baseClasses}>
      {content}
    </Link>
  )
}
