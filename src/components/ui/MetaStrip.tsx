import { cn } from '@/lib/utils'

export type MetaStripCell = {
  label: string
  value?: string
  sub?: string
  details?: {
    label: string
    value: string
  }[]
}

interface MetaStripProps {
  cells: MetaStripCell[]
  className?: string
}

export function MetaStrip({ cells, className }: MetaStripProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 overflow-hidden rounded-2xl border border-subtle bg-subtle',
        'md:grid-cols-3 md:rounded-3xl',
        className
      )}
    >
      {cells.map((cell, index) => (
        <div
          key={cell.label}
          className={cn(
            'min-w-0 px-5 py-[18px]',
            'sm:px-6 sm:py-5',
            'md:px-6 md:py-5 md:border-r md:border-primary/10',
            'lg:px-8 lg:py-6',
            index < cells.length - 1 && 'border-b border-primary/10 md:border-b-0',
            index === cells.length - 1 && 'md:border-r-0'
          )}
        >
          <div className="min-w-0">
            <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-muted sm:text-[11.5px]">
              {cell.label}
            </div>
            {cell.details && cell.details.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-2 md:grid-cols-1">
                {cell.details.map((detail) => (
                  <div key={detail.label} className="min-w-0">
                    <div className="text-[15px] font-semibold leading-[1.3] text-primary">
                      {detail.value}
                    </div>
                    <div className="mt-0.5 text-[12.5px] font-medium leading-[1.35] text-muted">
                      {detail.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[15.5px] font-semibold leading-[1.35] text-primary sm:text-[16px]">
                {cell.value}
                {cell.sub && (
                  <small className="mt-1 block text-[13.5px] font-medium leading-[1.45] text-body">
                    {cell.sub}
                  </small>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
