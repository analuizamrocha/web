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
