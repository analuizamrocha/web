import './globals.css'

import type { Metadata } from 'next'
import { Montserrat, Literata } from 'next/font/google'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { ClientProviders } from '@/components/layout/ClientProviders'
import { DR_NAME, CLINICA_NASSIF, WEBSITE_URL, TAG_INSTAGRAM } from '@/lib/constants'
import { getStructuredData } from '@/lib/structured-data'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

const literata = Literata({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-serif',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  title: {
    default: `${DR_NAME} - Coloproctologista em Curitiba | Especialista em Intestino, Reto e Ânus`,
    template: `%s | ${DR_NAME} - Coloproctologista`,
  },
  description:
    'Dra. Ana Luiza M. Rocha, especialista em Coloproctologia em Curitiba. Cuidado clínico e cirúrgico do intestino, reto e ânus. Tratamento de hemorroidas, fissuras anais, HPV e doenças inflamatórias intestinais. Consultas humanizadas na Clínica Nassif - Batel.',
  keywords: [
    'coloproctologista curitiba',
    'coloproctologia curitiba',
    'ana luiza rocha',
    'cirurgia hemorroidas curitiba',
    'tratamento fissura anal',
    'proctologista curitiba',
    'médica intestino curitiba',
    'cirurgia ânus curitiba',
    'HPV anal tratamento',
    'botox fissura anal',
    'ligadura elástica hemorroidas',
    'colonoscopia curitiba',
    'síndrome intestino irritável',
    'doenças inflamatórias intestinais',
    'cisto pilonidal cirurgia',
    'fístula anorretal',
    'câncer canal anal',
    'batel curitiba',
    'clínica nassif',
    'crm pr 45351',
  ],
  authors: [{ name: DR_NAME }],
  creator: DR_NAME,
  publisher: DR_NAME,
  classification: 'Medical Professional Services',
  category: 'Healthcare',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
  },
  alternates: {
    canonical: WEBSITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: WEBSITE_URL,
    title: `${DR_NAME} - Coloproctologista em Curitiba | Especialista em Intestino, Reto e Ânus`,
    description:
      'Dra. Ana Luiza M. Rocha, especialista em Coloproctologia em Curitiba. Cuidado clínico e cirúrgico humanizado para tratamento de hemorroidas, fissuras anais, HPV e doenças inflamatórias intestinais.',
    siteName: `${DR_NAME} - Coloproctologia`,
    images: [
      {
        url: `${WEBSITE_URL}/images/og.png`,
        width: 547,
        height: 684,
        alt: `${DR_NAME} - Coloproctologista em Curitiba - Especialista em cuidado clínico e cirúrgico do intestino, reto e ânus`,
        type: 'image/png',
      },
      {
        url: `${WEBSITE_URL}/images/sobre-mim.webp`,
        width: 1080,
        height: 1350,
        alt: `${DR_NAME} - Formação e qualificações profissionais em coloproctologia`,
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${DR_NAME} - Coloproctologista em Curitiba`,
    description:
      'Especialista em Coloproctologia oferecendo cuidado clínico e cirúrgico humanizado do intestino, reto e ânus em Curitiba.',
    images: [
      {
        url: `${WEBSITE_URL}/images/og.png`,
        alt: `${DR_NAME} - Coloproctologista em Curitiba`,
      },
    ],
    creator: TAG_INSTAGRAM,
    site: TAG_INSTAGRAM,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'BR-PR',
    'geo.placename': 'Curitiba',
    'geo.position': `${CLINICA_NASSIF.coordinates.latitude};${CLINICA_NASSIF.coordinates.longitude}`,
    ICBM: `${CLINICA_NASSIF.coordinates.latitude}, ${CLINICA_NASSIF.coordinates.longitude}`,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isVercelRuntime = Boolean(
    process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV
  )

  return (
    <html lang="pt-BR">
      <head>
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: getStructuredData(),
          }}
        />
      </head>
      <body className={`${montserrat.variable} ${literata.variable} font-sans`}>
        <Header />
        {children}
        <Footer />
        <ClientProviders />
        {isVercelRuntime && (
          <>
            <VercelAnalytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}
