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
      <TreatmentsSection />
      <LocationsSection />
    </main>
  )
}
