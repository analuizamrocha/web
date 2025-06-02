import './globals.css'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { DR_NAME } from '@/lib/constants'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: `${DR_NAME} - Coloproctologista em Curitiba`,
    template: `%s | ${DR_NAME}`,
  },
  description:
    'Especialista em Coloproctologia oferecendo cuidado clínico e cirúrgico do intestino, reto e ânus. Transformando tabus em cuidado humanizado em Curitiba, PR.',
  keywords: [
    'coloproctologista',
    'coloproctologia',
    'cirurgia intestinal',
    'hemorróidas',
    'fissuras anais',
    'câncer colorretal',
    'proctologia',
    'Ana Luiza Rocha',
    'Curitiba',
    'médica especialista',
    'intestino',
    'reto',
    'ânus',
    'cirurgia proctológica',
    'tratamento hemorróidas',
    'colonoscopia',
    'anuscopia',
  ],
  authors: [{ name: DR_NAME }],
  creator: DR_NAME,
  publisher: DR_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: `${DR_NAME} - Coloproctologista`,
    description:
      'Especialista em Coloproctologia oferecendo cuidado clínico e cirúrgico do intestino, reto e ânus. Transformando tabus em cuidado humanizado.',
    siteName: `${DR_NAME} - Coloproctologia`,
    images: [
      {
        url: '/images/sobre-mim.png',
        width: 1200,
        height: 630,
        alt: `${DR_NAME} - Coloproctologista em Curitiba`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${DR_NAME} - Coloproctologista`,
    description:
      'Especialista em Coloproctologia oferecendo cuidado clínico e cirúrgico do intestino, reto e ânus.',
    images: ['/images/sobre-mim.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
