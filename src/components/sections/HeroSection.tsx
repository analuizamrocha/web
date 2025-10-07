import Image from 'next/image'
import { LinkButton } from '@/components/ui/LinkButton'
import { WPP_NUMBER_NASSIF } from '@/lib/constants'

export function HeroSection() {
  return (
    <section
      className="section relative isolate bg-background pt-16 md:pt-18"
      id="hero"
    >
      {/* Beautiful Hero Layout - Connected to header and edges */}
      <div className="mx-auto max-w-container">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 xl:gap-12">
          {/* Image First on Mobile, Second on Desktop - Edge to edge */}
          <div className="order-1 lg:order-2 lg:flex-1 w-full">
            <Image
              src="/images/hero.webp"
              alt="Dra. Ana Luiza Moraes Rocha, coloproctologista, em seu consultório médico moderno, sorrindo profissionalmente para pacientes"
              width={960}
              height={1200}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              quality={100}
              className="w-full h-auto object-contain lg:shadow-2xl"
              priority
              fetchPriority="high"
            />
          </div>

          {/* Text Content - Beautifully spaced */}
          <div className="order-2 lg:order-1 flex-shrink-0 text-center lg:text-left lg:flex-1 animate-fade-in px-6 pt-16 lg:pt-28 sm:px-8 lg:px-10 xl:px-12">
            <h1 className="text-hero text-secondary animate-slide-up mb-6 lg:max-w-xl">
              Cada paciente uma história,
              <br />
              cada história um cuidado único
            </h1>

            {/* Enhanced Subtitle - Bigger and Better */}
            <div className="mt-8 mb-12 space-y-4">
              <p className="text-2xl lg:text-3xl xl:text-4xl font-serif font-medium text-secondary leading-relaxed lg:max-w-xl">
                Cuidado Clínico e Cirúrgico do Intestino, Reto e Ânus
              </p>
            </div>

            {/* Elegant CTA Section */}
            <div className="mt-8">
              <LinkButton
                href={`https://wa.me/${WPP_NUMBER_NASSIF}`}
                external
                newTab
                variant="primary"
                size="xl"
                className="group bg-primary hover:bg-primary/90 text-background shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold text-nowrap"
                aria-label="Agendar consulta com Dra. Ana Luiza Moraes Rocha por WhatsApp"
              >
                Agende sua consulta agora
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
