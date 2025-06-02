import './globals.css'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dra. Ana Luiza M. Rocha - Coloproctologista',
  description: 'Cuidado Clínico e Cirúrgico do Intestino, Reto e Ânus',
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
      </body>
    </html>
  )
}
