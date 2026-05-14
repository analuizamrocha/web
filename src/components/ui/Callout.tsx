import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CalloutProps {
  icon: ReactNode
  label: string
  children: ReactNode
  variant?: 'terracotta' | 'sage'
  className?: string
}

const variantStyles = {
  terracotta: {
    icon: 'text-brand-primary',
    label: 'text-primary',
  },
  sage: {
    icon: 'text-accent-neutral',
    label: 'text-[var(--color-accent-sage-deep)]',
  },
} as const

export function Callout({
  icon,
  label,
  children,
  variant = 'terracotta',
  className,
}: CalloutProps) {
  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        'flex w-full max-w-[640px] items-start gap-3.5 rounded-[18px] border border-subtle bg-subtle px-[22px] py-[18px]',
        className
      )}
    >
      <div
        className={cn(
          'flex size-7 flex-shrink-0 items-center justify-center',
          styles.icon
        )}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <span
          className={cn(
            'text-xs font-bold uppercase tracking-[0.14em] leading-none',
            styles.label
          )}
        >
          {label}
        </span>
        <div className="text-[14.5px] leading-[1.55] text-body">{children}</div>
      </div>
    </div>
  )
}
