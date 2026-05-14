import { Check } from 'lucide-react'

export type IndicationItem = {
  title: string
  description: string
}

interface IndicationSectionProps {
  eyebrow: string
  heading: string
  intro: string
  items: IndicationItem[]
}

export function IndicationSection({
  eyebrow,
  heading,
  intro,
  items,
}: IndicationSectionProps) {
  return (
    <section className="bg-primary py-20 lg:py-24">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20 lg:items-start">
          <header>
            <span className="mb-4 block font-sans text-xs font-bold uppercase tracking-[0.18em] text-secondary">
              {eyebrow}
            </span>
            <h2 className="mb-[18px] max-w-[14ch] font-serif text-[28px] sm:text-[32px] lg:text-4xl font-bold leading-[1.1] tracking-[-0.01em] text-background">
              {heading}
            </h2>
            <p className="max-w-[40ch] text-[17px] leading-[1.65] text-background/80">
              {intro}
            </p>
          </header>

          <ul className="grid gap-1 list-none m-0 p-0">
            {items.map((item, index) => (
              <li
                key={item.title}
                className={
                  'grid grid-cols-[44px_1fr] gap-5 items-start py-[22px]' +
                  (index === items.length - 1
                    ? ''
                    : ' border-b border-background/[0.16]')
                }
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-background text-primary shadow-[0_2px_6px_rgba(0,0,0,0.18)]">
                  <Check className="size-[18px]" strokeWidth={2.6} />
                </span>
                <div>
                  <strong className="mb-1.5 block font-serif text-[19px] font-bold leading-tight text-background">
                    {item.title}
                  </strong>
                  <span className="block text-[15.5px] leading-[1.6] text-background/80">
                    {item.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
