import './globals.css'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { HeaderServer } from '@/components/ui/HeaderServer'
import { HeaderClient } from '@/components/ui/HeaderClient'
import { Footer } from '@/components/ui/Footer'
import { DR_NAME, CLINICA_NASSIF_UPDATED } from '@/lib/constants'
import { getStructuredData } from '@/lib/structured-data'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://analuizarocha.com.br'),
  title: {
    default: `${DR_NAME} - Coloproctologista em Curitiba | Especialista em Intestino, Reto e Ânus`,
    template: `%s | ${DR_NAME} - Coloproctologista`,
  },
  description:
    'Dra. Ana Luiza M. Rocha, especialista em Coloproctologia em Curitiba. Cuidado clínico e cirúrgico do intestino, reto e ânus. Tratamento de hemorróidas, fissuras anais, HPV e doenças inflamatórias intestinais. Consultas humanizadas na Clínica Nassif - Batel.',
  keywords: [
    'coloproctologista curitiba',
    'coloproctologia curitiba',
    'ana luiza rocha',
    'cirurgia hemorróidas curitiba',
    'tratamento fissura anal',
    'proctologista curitiba',
    'médica intestino curitiba',
    'cirurgia ânus curitiba',
    'HPV anal tratamento',
    'botox fissura anal',
    'ligadura elástica hemorróidas',
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
    // TODO: Add Google Search Console verification when available
    // google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://analuizarocha.com.br',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://analuizarocha.com.br',
    title: `${DR_NAME} - Coloproctologista em Curitiba | Especialista em Intestino, Reto e Ânus`,
    description:
      'Dra. Ana Luiza M. Rocha, especialista em Coloproctologia em Curitiba. Cuidado clínico e cirúrgico humanizado para tratamento de hemorróidas, fissuras anais, HPV e doenças inflamatórias intestinais.',
    siteName: `${DR_NAME} - Coloproctologia`,
    images: [
      {
        url: '/images/hero.png',
        width: 1080,
        height: 1080,
        alt: `${DR_NAME} - Coloproctologista em Curitiba - Especialista em cuidado clínico e cirúrgico do intestino, reto e ânus`,
        type: 'image/png',
      },
      {
        url: '/images/sobre-mim.png',
        width: 1366,
        height: 768,
        alt: `${DR_NAME} - Formação e qualificações profissionais em coloproctologia`,
        type: 'image/png',
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
        url: '/images/hero.png',
        alt: `${DR_NAME} - Coloproctologista em Curitiba`,
      },
    ],
    creator: '@analuiza.mrocha',
    site: '@analuiza.mrocha',
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
    'geo.position': `${CLINICA_NASSIF_UPDATED.coordinates.latitude};${CLINICA_NASSIF_UPDATED.coordinates.longitude}`,
    ICBM: `${CLINICA_NASSIF_UPDATED.coordinates.latitude}, ${CLINICA_NASSIF_UPDATED.coordinates.longitude}`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: getStructuredData(),
          }}
        />
      </head>
      <body className={montserrat.className}>
        <HeaderServer />
        <HeaderClient />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
