import Image from 'next/image'

type MdxImageProps = React.ComponentPropsWithoutRef<'img'>

export const MdxImage = ({ src, alt }: MdxImageProps) => {
  if (!src || typeof src !== 'string') return null

  return (
    <Image
      src={src}
      alt={alt || ''}
      width={1200}
      height={800}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 896px"
      loading="lazy"
      className="rounded-lg"
    />
  )
}
