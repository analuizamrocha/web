import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type LinkListItem = {
  href: string
  label: string
  external?: boolean
}

interface LinkListProps {
  title?: string
  items: LinkListItem[]
  variant?: 'primary' | 'subtle'
  className?: string
}

const variantStyles = {
  primary: {
    panel: 'bg-primary shadow-[0_4px_14px_rgba(102,58,37,0.18)]',
    title: 'text-background',
    rowText: 'text-background',
    rowDivider: 'border-[rgba(255,251,247,0.18)]',
    arrow: 'text-background',
  },
  subtle: {
    panel: 'bg-subtle border border-subtle shadow-[0_1px_2px_rgba(102,58,37,0.08)]',
    title: 'text-heading',
    rowText: 'text-body group-hover:text-primary transition-colors',
    rowDivider: 'border-subtle',
    arrow: 'text-primary',
  },
} as const

export function LinkList({ title, items, variant = 'primary', className }: LinkListProps) {
  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        'w-full max-w-[520px] rounded-[28px] px-9',
        title ? 'pt-9 pb-[30px]' : 'py-3',
        styles.panel,
        className
      )}
    >
      {title && (
        <h3
          className={cn(
            'mb-[22px] font-serif text-[22px] font-bold leading-tight',
            styles.title
          )}
        >
          {title}
        </h3>
      )}

      <ul className="list-none p-0 m-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const rowClasses = cn(
            'group flex items-center justify-between gap-4 py-[18px] text-[15px] font-medium transition-[padding] duration-200 hover:pr-1.5',
            styles.rowText,
            !isLast && cn('border-b', styles.rowDivider),
            isLast && title && 'pb-1'
          )
          const arrowClasses = cn(
            'size-5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1',
            styles.arrow
          )

          if (item.external) {
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClasses}
                >
                  <span>{item.label}</span>
                  <ArrowRight className={arrowClasses} aria-hidden="true" />
                </a>
              </li>
            )
          }

          return (
            <li key={item.href}>
              <Link href={item.href} className={rowClasses}>
                <span>{item.label}</span>
                <ArrowRight className={arrowClasses} aria-hidden="true" />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
