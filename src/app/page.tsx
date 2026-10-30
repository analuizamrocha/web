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
import { validateTrackingUrl } from '@/lib/whatsapp-tracking'

export default function Home() {
  // Server-only pilot: tracks the hero CTA alone; empty/invalid keeps direct WhatsApp.
  const heroHref = validateTrackingUrl(process.env.WHATSAPP_HOME_TRACKING_URL) || undefined

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getFAQSchema(),
        }}
      />
      <div className="min-h-screen">
        <HeroSection ctaHref={heroHref} />
        <AboutSection />
        <MissionSection />
        <ServicesSection />
        <PhotoSection />
        <TreatmentsSection />
        <LocationsSection />
      </div>
    </>
  )
}
