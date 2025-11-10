import './globals.css'

import type { Metadata } from 'next'
import { Montserrat, Literata } from 'next/font/google'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import CookieConsent from '@/components/layout/CookieConsent'
import { AnalyticsProvider } from '@/components/analytics'
import { DR_NAME, CLINICA_NASSIF_UPDATED, WEBSITE_URL } from '@/lib/constants'
import { getStructuredData } from '@/lib/structured-data'
import { metaConfig } from '@/lib/seo/meta-config'

const homeMeta = metaConfig['/']

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
    default: homeMeta.title,
    template: `%s | ${DR_NAME} - Coloproctologista`,
  },
  description: homeMeta.description,
  keywords: homeMeta.keywords,
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
    title: homeMeta.title,
    description: homeMeta.description,
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
    title: homeMeta.title,
    description: homeMeta.description,
    images: [
      {
        url: `${WEBSITE_URL}/images/og.png`,
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
        {/* Preconnect to optimize font and analytics loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" />

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
        <CookieConsent />
        <AnalyticsProvider />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
