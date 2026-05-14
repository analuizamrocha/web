import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type MediaCardItem = {
  href: string
  title: string
  subtitle?: string
  thumbVariant?: 'terracotta' | 'sage'
}

interface MediaCardProps extends MediaCardItem {
  className?: string
}

export function MediaCard({
  href,
  title,
  subtitle,
  thumbVariant = 'terracotta',
  className,
}: MediaCardProps) {
  const thumbBg =
    thumbVariant === 'sage' ? 'bg-[#c9d2bb]' : 'bg-secondary/70'

  return (
    <Link
      href={href}
      className={cn(
        'group grid grid-cols-[84px_1fr_auto] items-center gap-5 rounded-[18px] border border-primary/10 bg-background p-3',
        'no-underline text-inherit',
        'transition-[transform,box-shadow,border-color] duration-[550ms] ease-out',
        'hover:translate-x-0.5 hover:shadow-[0_1px_2px_rgba(102,58,37,0.08)] hover:border-primary/25',
        className
      )}
    >
      <div className={cn('h-16 w-[84px] flex-shrink-0 rounded-xl', thumbBg)} />
      <div className="min-w-0">
        <strong className="block font-serif text-[17px] font-bold leading-[1.25] text-primary">
          {title}
        </strong>
        {subtitle && (
          <span className="mt-1 block text-[14px] leading-[1.5] text-muted">{subtitle}</span>
        )}
      </div>
      <ArrowRight
        className="size-5 flex-shrink-0 pr-2 text-primary opacity-60 transition-[transform,opacity] duration-[550ms] ease-out group-hover:translate-x-1 group-hover:opacity-100"
        aria-hidden="true"
      />
    </Link>
  )
}
