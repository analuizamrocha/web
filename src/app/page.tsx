import {
  HeroSection,
  TreatmentsSection,
  LocationsSection,
  MissionSection,
  AboutSection,
} from '@/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <MissionSection />
      {/* TODO: Entire big image, also we need to update assets to better quality */}
      <TreatmentsSection />
      <LocationsSection />
    </main>
  )
}
