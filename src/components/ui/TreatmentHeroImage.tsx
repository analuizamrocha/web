import Image from 'next/image'
import { getTreatmentImageBySlug } from '@/lib/treatment-images'

interface TreatmentHeroImageProps {
  slug: string
  preload?: boolean
}

export function TreatmentHeroImage({ slug, preload = false }: TreatmentHeroImageProps) {
  const treatmentImage = getTreatmentImageBySlug(slug)

  if (!treatmentImage) {
    return null
  }

  return (
    <figure
      data-treatment-id={treatmentImage.id}
      className="mb-10 overflow-hidden rounded-2xl border border-secondary/20 bg-secondary/10 shadow-sm"
    >
      <Image
        src={treatmentImage.src}
        alt={treatmentImage.alt}
        width={1200}
        height={800}
        sizes="(min-width: 1280px) 56rem, (min-width: 768px) 80vw, 100vw"
        preload={preload}
        className="h-auto w-full object-cover"
      />
    </figure>
  )
}
