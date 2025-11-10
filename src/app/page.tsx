import dynamic from "next/dynamic";
import { HeroSection, AboutSection } from "@/components/sections";
import { getFAQSchema } from "@/lib/faq-schema";

// FIXME: Really check if this is an improvement for performance
// Critical: Load immediately (above the fold)
// Non-critical: Lazy load (below the fold) with loading states
const MissionSection = dynamic(
  () =>
    import("@/components/sections/MissionSection").then(
      (mod) => mod.MissionSection
    ),
  { loading: () => <div className="min-h-screen" /> }
);
const ServicesSection = dynamic(
  () =>
    import("@/components/sections/ServicesSection").then(
      (mod) => mod.ServicesSection
    ),
  { loading: () => <div className="min-h-screen" /> }
);
const PhotoSection = dynamic(
  () =>
    import("@/components/sections/PhotoSection").then(
      (mod) => mod.PhotoSection
    ),
  { loading: () => <div className="min-h-screen" /> }
);
const TreatmentsSection = dynamic(
  () =>
    import("@/components/sections/TreatmentsSection").then(
      (mod) => mod.TreatmentsSection
    ),
  { loading: () => <div className="min-h-screen" /> }
);
const LocationsSection = dynamic(
  () =>
    import("@/components/sections/LocationsSection").then(
      (mod) => mod.LocationsSection
    ),
  { loading: () => <div className="min-h-screen" /> }
);

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
  );
}
