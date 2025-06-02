import Head from 'next/head'
import { useRouter } from 'next/router'

interface MetadataProps {
  title?: string
  description?: string
  image?: string
}

const siteName = 'Dra Ana Luiza M. Rocha'
const defaultDescription =
  'Cuidado Clínico e Cirúrgico do Intestino, Reto e Ânus com abordagem humanizada.'
const defaultImage = '/images/og-image.png' // Placeholder, replace with real image in public/images

const Metadata: React.FC<MetadataProps> = ({ title, description, image }) => {
  const router = useRouter()
  const metaTitle = title ? `${title} | ${siteName}` : siteName
  const metaDescription = description || defaultDescription
  const metaImage = image || defaultImage
  const url = `https://your-domain.com${router.asPath}`

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  )
}

export default Metadata
