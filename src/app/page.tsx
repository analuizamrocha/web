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
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Dra. Ana Luiza M. Rocha, especialista em Coloproctologia em Curitiba. Cuidado clínico e cirúrgico do intestino, reto e ânus. Tratamento de hemorróidas, fissuras anais, HPV e doenças inflamatórias intestinais.',
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
