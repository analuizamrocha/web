import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type FAQAccordionItem = {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQAccordionItem[]
  className?: string
  defaultOpenIndex?: number
}

export function FAQAccordion({
  items,
  className,
  defaultOpenIndex,
}: FAQAccordionProps) {
  return (
    <div className={cn('mx-auto max-w-[820px]', className)}>
      {items.map((item, index) => (
        <details
          key={item.question}
          open={defaultOpenIndex === index}
          className={cn(
            'group border-b border-primary/10 py-1.5',
            index === 0 && 'border-t border-primary/10'
          )}
        >
          <summary
            className={cn(
              'flex cursor-pointer select-none list-none items-center justify-between gap-6 py-[22px] pr-2',
              'font-serif text-[19px] font-bold leading-snug text-primary',
              '[&::-webkit-details-marker]:hidden',
              'group-open:pb-3'
            )}
          >
            <span>{item.question}</span>
            <span
              className={cn(
                'flex size-9 flex-shrink-0 items-center justify-center rounded-full',
                'border-[1.5px] border-primary text-primary',
                'transition-all duration-300 ease-out',
                'group-open:rotate-180 group-open:bg-primary group-open:text-background'
              )}
              aria-hidden="true"
            >
              <ChevronDown className="size-4 transition-transform duration-300 ease-out" strokeWidth={2.4} />
            </span>
          </summary>
          <div className="max-w-[64ch] select-none pb-6 pl-1 text-[15.5px] leading-[1.7] text-body">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}
