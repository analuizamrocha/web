import { Calendar, MapPin } from 'lucide-react'
import {
  CLINICA_NASSIF,
  WHATSAPP_MSG_TEXT_ENCODED,
  WPP_NUMBER_NASSIF,
} from '@/lib/constants'
import { LinkButton } from '@/components/ui/LinkButton'

export function LocationsSection() {
  return (
    <section id="atendimento" className="section bg-background">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Header Section - Enhanced Typography */}
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
            Locais de atendimento
          </h2>
          <div className="text-xl lg:text-2xl leading-relaxed text-secondary font-medium space-y-4">
            <p>Atendimento personalizado em ambiente acolhedor e moderno.</p>
          </div>
        </div>

        {/* Location Content - Beautiful Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Location Details */}
          <div className="space-y-8 lg:space-y-10">
            <div className="bg-secondary/10 rounded-3xl p-8 lg:p-10 border border-secondary/20 hover:border-secondary/30 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-primary/10 rounded-full p-3">
                    <MapPin
                      className="size-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="space-y-6 min-w-0 flex-1">
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary">
                    Clínica Nassif
                  </h3>
                  <address className="not-italic text-lg lg:text-xl text-secondary leading-relaxed font-medium">
                    Rua Bruno Filgueira, 489
                    <br />
                    Batel, Curitiba - PR
                  </address>
                  <div className="space-y-3">
                    <div className="text-lg text-secondary font-medium">
                      <span className="text-primary font-semibold block sm:inline">
                        Telefone:
                      </span>
                      <span className="block sm:inline sm:ml-2">
                        {CLINICA_NASSIF.phone}
                      </span>
                    </div>
                    <div className="text-lg text-secondary font-medium">
                      <span className="text-primary font-semibold block sm:inline">
                        WhatsApp:
                      </span>
                      <span className="block sm:inline sm:ml-2">
                        {CLINICA_NASSIF.wpp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center lg:justify-center">
            <LinkButton
              href={`https://wa.me/${WPP_NUMBER_NASSIF}/?text=${WHATSAPP_MSG_TEXT_ENCODED}`}
              external
              newTab
              variant="primary"
              size="xl"
              className="inline-flex items-center gap-4 px-10 py-6 text-md lg:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-nowrap"
              aria-label="Agendar consulta com Dra. Ana Luiza Moraes Rocha por WhatsApp"
            >
              <Calendar className="size-0 sm:size-6" />
              Agende sua consulta agora
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
