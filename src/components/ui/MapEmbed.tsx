import { cn } from '@/lib/utils'

interface MapEmbedProps {
  /** Full address string used to query Google Maps. */
  address: string
  /** Used for the iframe's accessible title. */
  placeName: string
  /** Optional zoom level (1-21). Defaults to 16. */
  zoom?: number
  /** Optional override className for the wrapper. */
  className?: string
}

export function MapEmbed({
  address,
  placeName,
  zoom = 16,
  className,
}: MapEmbedProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&hl=pt-BR&z=${zoom}&output=embed`

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <iframe
        src={src}
        title={`Mapa — ${placeName}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  )
}
