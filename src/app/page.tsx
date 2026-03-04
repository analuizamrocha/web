import type { Metadata } from 'next'
import {
  HeroSection,
  ServicesSection,
  PhotoSection,
  TreatmentsSection,
  LocationsSection,
  MissionSection,
  AboutSection,
} from '@/components/sections'
import { getFAQSchema } from '@/lib/faq-schema'
import { WEBSITE_URL } from '@/lib/constants'

const HOME_PAGE_TITLE = 'Dra. Ana Luiza M. Rocha | Coloproctologista Curitiba'

export const metadata: Metadata = {
  title: {
    absolute: HOME_PAGE_TITLE,
  },
  description:
    'Dra. Ana Luiza M. Rocha, coloproctologista em Curitiba - PR. Cuidado clínico e cirúrgico do intestino, reto e ânus na Clínica Nassif, no Batel.',
  alternates: {
    canonical: WEBSITE_URL,
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getFAQSchema(),
        }}
      />
      <main id="main" className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <ServicesSection />
        <PhotoSection />
        <TreatmentsSection />
        <LocationsSection />
      </main>
    </>
  )
}
