import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
  variant?: 'default' | 'treatment'
}

export function Card({
  title,
  description,
  children,
  className,
  variant = 'default',
}: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-3xl transition-all duration-200',
        variant === 'treatment' &&
          'bg-secondary/15 hover:bg-secondary/20 text-center justify-center p-6 min-h-[120px] lg:p-8 lg:min-h-[180px]',
        variant === 'default' && 'bg-neutral/10 hover:bg-neutral/15 p-8',
        className
      )}
    >
      <h3
        className={cn(
          'font-serif font-medium',
          variant === 'treatment'
            ? 'text-lg lg:text-xl text-secondary leading-relaxed'
            : 'text-lg text-secondary'
        )}
      >
        {title}
      </h3>

      {description && (
        <p
          className={cn(
            'mt-4 flex-1 text-accent leading-relaxed',
            variant === 'treatment' ? 'text-base' : 'text-base'
          )}
        >
          {description}
        </p>
      )}

      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}
