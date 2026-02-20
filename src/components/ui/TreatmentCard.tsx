import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface TreatmentCardProps {
  title: string
  href: string
  description?: string
  category?: string
  variant?: 'compact' | 'detailed'
  className?: string
}

export function TreatmentCard({
  title,
  href,
  description,
  category,
  variant = 'compact',
  className,
}: TreatmentCardProps) {
  const isDetailed = variant === 'detailed'

  return (
    <Link
      href={href}
      aria-label={`Ver detalhes sobre ${title}`}
      className={cn(
        'group relative isolate flex items-stretch overflow-hidden rounded-[1.4rem] border border-secondary/20 bg-secondary/10 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:border-primary/35 hover:bg-secondary/15 hover:shadow-md active:translate-y-0 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/65 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isDetailed
          ? 'min-h-[230px] sm:min-h-[250px] lg:min-h-[270px]'
          : 'min-h-[125px] sm:min-h-[132px] lg:min-h-[142px]',
        className
      )}
    >
      <div
        className={cn(
          'relative z-10 flex min-w-0 flex-1 flex-col',
          isDetailed ? 'p-5 sm:p-6 lg:p-7 gap-4' : 'justify-center p-4 sm:p-5 lg:p-6 gap-2'
        )}
      >
        {isDetailed && category ? (
          <Badge variant="secondary" className="w-fit max-w-full">
            {category}
          </Badge>
        ) : null}

        <h3
          className={cn(
            '!font-sans font-semibold text-primary leading-snug break-words',
            isDetailed ? 'text-lg sm:text-xl lg:text-2xl' : 'text-base sm:text-lg lg:text-xl'
          )}
        >
          {title}
        </h3>

        {isDetailed && description ? (
          <p className="text-sm sm:text-base leading-relaxed text-body">{description}</p>
        ) : null}
      </div>

      <div
        className={cn(
          'relative z-10 flex flex-none w-14 min-w-14 sm:w-16 sm:min-w-16 items-center justify-center border-l border-primary/20 bg-background/90 transition-all duration-300 group-hover:border-primary/35 group-hover:bg-primary',
          isDetailed
            ? 'px-0'
            : 'px-0'
        )}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/15 bg-background transition-all duration-300 group-hover:translate-x-0.5">
          <ArrowRight size={16} className="text-primary" />
        </span>
      </div>
    </Link>
  )
}
