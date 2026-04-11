import './globals.css'

import type { Metadata } from 'next'
import { Montserrat, Literata } from 'next/font/google'
import Script from 'next/script'

import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { ClientProviders } from '@/components/layout/ClientProviders'
import {
  DR_NAME,
  DR_NAME_ABBREVIATED,
  CLINICA_NASSIF,
  WEBSITE_URL,
  TAG_INSTAGRAM,
} from '@/lib/constants'
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

const SITE_BRAND = DR_NAME_ABBREVIATED
const DEFAULT_SITE_TITLE = `${SITE_BRAND} | Coloproctologista e Proctologista Curitiba`

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  title: {
    default: DEFAULT_SITE_TITLE,
    template: `%s | ${SITE_BRAND}`,
  },
  description:
    'Médica coloproctologista e proctologista em Curitiba. Consultas em coloproctologia no Batel e organização de exames quando indicados, com foco em hemorroidas, fissuras, fístulas, HPV anal e doenças inflamatórias intestinais.',
  keywords: [
    'coloproctologista curitiba',
    'coloproctologia curitiba',
    'proctologista curitiba',
    'proctologia curitiba',
    'ana luiza rocha',
    'cirurgia hemorroidas curitiba',
    'tratamento fissura anal',
    'médico proctologista curitiba',
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
    'onde atende dra ana luiza rocha',
    'batel curitiba',
    'mercês curitiba',
    'clínica nassif',
    'specta endoscopia digestiva',
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icons/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icons/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: WEBSITE_URL,
    title: DEFAULT_SITE_TITLE,
    description:
      'Dra. Ana Luiza M. Rocha, médica coloproctologista e proctologista em Curitiba. Consultas em coloproctologia e cuidado humanizado com orientação clara sobre locais de atendimento e exames quando indicados.',
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
    title: DEFAULT_SITE_TITLE,
    description:
      'Médica coloproctologista e proctologista oferecendo cuidado clínico e cirúrgico humanizado em Curitiba, com informações claras sobre locais de atendimento.',
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
  const isVercelRuntime = Boolean(process.env.VERCEL)

  return (
    <html lang="pt-BR">
      <head>
        {/* LLM content index — machine-readable, invisible to users */}
        <link rel="llms" href="/llms.txt" />
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: getStructuredData(),
          }}
        />
        {/* React Grab - development only */}
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={`${montserrat.variable} ${literata.variable} font-sans`}>
        <Header />
        {children}
        <Footer />
        <ClientProviders enableVercelSignals={isVercelRuntime} />
      </body>
    </html>
  )
}
