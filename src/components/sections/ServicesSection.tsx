import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { getServiceTargetPath, services } from '@/lib/services'

export function ServicesSection() {
  return (
    <section id="quando-procurar-procto" className="section bg-muted/30">
      {/* Backward-compatible anchor for old links */}
      <div id="servicos" aria-hidden="true" className="sr-only" />
      {/* Beautiful Responsive Layout */}
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Header Section - Enhanced Typography */}
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
            Quando procurar uma coloproctologista?
          </h2>
          <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-secondary font-medium">
            <p>
              Reconhecer os sinais e sintomas é fundamental para buscar ajuda no
              momento adequado. Cada queixa merece atenção especializada e
              cuidadosa.
            </p>
          </div>
        </div>

        {/* Smart Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8 xl:gap-10">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={getServiceTargetPath(service.slug)}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl"
            >
              <Card
                title={service.name}
                description={service.cardDescription}
                variant="service"
                className="animate-fade-in transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
