import Image from 'next/image'
import { getMdxImageDimensions } from '@/lib/mdx-image-dimensions'

type MdxImageProps = React.ComponentPropsWithoutRef<'img'>

export const MdxImage = ({ src, alt }: MdxImageProps) => {
  if (!src || typeof src !== 'string') return null

  const { width, height } = getMdxImageDimensions(src)

  return (
    <Image
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
      sizes="(max-width: 768px) calc(100vw - 3rem), (max-width: 1024px) 80vw, 896px"
      loading="lazy"
      className="rounded-lg"
    />
  )
}
