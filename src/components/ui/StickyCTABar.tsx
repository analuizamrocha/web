import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StickyCTABarProps {
  eyebrow: string
  message: string
  primaryHref: string
  primaryLabel: string
  className?: string
}

export function StickyCTABar({
  eyebrow,
  message,
  primaryHref,
  primaryLabel,
  className,
}: StickyCTABarProps) {
  return (
    <div
      className={cn(
        'sticky bottom-5 z-25 mx-auto mb-5 flex max-w-[720px] items-center justify-between gap-4',
        'rounded-full bg-primary py-3 pl-7 pr-3.5',
        'shadow-[0_12px_32px_rgba(102,58,37,0.25)]',
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <strong className="block font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">
          {eyebrow}
        </strong>
        <span className="hidden font-serif text-[17px] italic font-medium text-background/95 leading-snug truncate sm:block">
          {message}
        </span>
      </div>
      <a
        href={primaryHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex h-11 flex-shrink-0 items-center justify-center gap-2 rounded-full',
          'bg-background px-4 sm:px-5 text-sm font-semibold text-primary',
          'transition-[background-color,box-shadow,transform] duration-300 ease-out',
          'hover:bg-[#f5ebe1] hover:shadow-[0_4px_14px_rgba(0,0,0,0.15)] active:scale-[0.98]'
        )}
      >
        <span className="hidden sm:inline">{primaryLabel}</span>
        <span className="sm:hidden">Agendar</span>
        <ArrowRight className="size-3.5" strokeWidth={2.4} aria-hidden="true" />
      </a>
    </div>
  )
}
