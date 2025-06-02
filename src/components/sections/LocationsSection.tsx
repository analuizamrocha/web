import { Calendar, MapPin } from 'lucide-react'
import { CLINICA_NASSIF, WPP_NUMBER } from '@/lib/constants'
import { LinkButton } from '@/components/ui/LinkButton'

export function LocationsSection() {
  return (
    <section id="atendimento" className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="max-w-container mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="text-center lg:text-left">
          <h2 className="text-primary mb-12 sm:mb-16 lg:mb-20">
            Locais de atendimento
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-end">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <MapPin className="h-6 w-6 text-tertiary" aria-hidden="true" />
              </div>
              <div className="space-y-4">
                <h3 className="text-primary">Clínica Nassif</h3>
                <address className="not-italic text-base text-secondary leading-relaxed">
                  Rua Bruno Filgueira, 489
                  <br />
                  Batel, Curitiba - PR
                </address>
                <p className="text-base text-secondary">
                  Telefone: {CLINICA_NASSIF.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <LinkButton
              href={`https://wa.me/${WPP_NUMBER}`}
              external
              newTab
              className="bg-secondary hover:bg-secondary/90 text-background inline-flex items-center gap-3 px-8 py-6 text-base font-medium"
            >
              <Calendar className="h-5 w-5" />
              Agende sua consulta agora
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
