import { cn } from '@/lib/utils'

export type InfoCardItem = {
  eyebrow: string
  title: string
  description: string
}

interface InfoCardGridProps {
  items: InfoCardItem[]
  className?: string
}

export function InfoCardGrid({ items, className }: InfoCardGridProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-5 md:grid-cols-3', className)}>
      {items.map((item) => (
        <article
          key={item.title}
          className={cn(
            'group flex flex-col gap-3.5 rounded-3xl bg-card p-7',
            'border border-secondary/40',
            'transition-[transform,box-shadow] duration-[400ms] ease-out',
            'hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(102,58,37,0.12)]'
          )}
        >
          <span className="font-serif text-sm font-medium italic tracking-wide text-brand-primary">
            {item.eyebrow}
          </span>
          <h3 className="font-serif text-[22px] font-bold leading-tight text-primary">
            {item.title}
          </h3>
          <p className="text-[15.5px] leading-[1.65] text-body">{item.description}</p>
        </article>
      ))}
    </div>
  )
}
