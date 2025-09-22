import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
  variant?: 'default' | 'treatment' | 'service'
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
        'flex flex-col rounded-3xl transition-all duration-300 h-full shadow-sm hover:shadow-md',
        variant === 'treatment' &&
          'bg-secondary/15 hover:bg-secondary/20 hover:shadow-lg text-center justify-center p-6 min-h-[140px] sm:min-h-[160px] lg:p-8 lg:min-h-[200px] xl:min-h-[220px] border border-secondary/20 hover:border-secondary/30',
        variant === 'default' &&
          'bg-neutral-50/50 hover:bg-neutral-100/50 p-6 sm:p-8 border border-neutral-200',
        variant === 'service' &&
          'bg-secondary/15 hover:bg-secondary/20 hover:shadow-lg p-6 sm:p-8 border border-primary/10 hover:border-primary/20 backdrop-blur-sm',
        className
      )}
    >
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
            'mt-4 flex-1 leading-relaxed',
            variant === 'treatment'
              ? 'text-sm sm:text-base text-accent'
              : variant === 'service'
              ? 'text-sm sm:text-base text-secondary'
              : 'text-sm sm:text-base text-accent'
          )}
        >
          {description}
        </p>
      )}

      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}
