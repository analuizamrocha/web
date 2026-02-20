import { Calendar, MapPin } from 'lucide-react'
import { CLINICA_NASSIF, WHATSAPP_MSG_TEXT_ENCODED, WPP_NUMBER_NASSIF } from '@/lib/constants'
import { LinkButton } from '@/components/ui/LinkButton'

const WHATSAPP_SPECTA_NUMBER = '(41) 98773-7829'
const WHATSAPP_SPECTA_MSG_ENCODED = encodeURIComponent(
  'Olá! Gostaria de agendar minha colonoscopia com a Dra Ana Luiza'
)

const getWhatsAppHref = (phone: string, messageEncoded: string) =>
  `https://wa.me/${phone.replace(/\D/g, '')}/?text=${messageEncoded}`

const locations = [
  {
    name: CLINICA_NASSIF.name,
    address: ['Rua Bruno Filgueira, 489', 'Batel, Curitiba - PR'],
    phone: CLINICA_NASSIF.phone,
    whatsapp: CLINICA_NASSIF.wpp,
    whatsappHref: getWhatsAppHref(WPP_NUMBER_NASSIF, WHATSAPP_MSG_TEXT_ENCODED),
    buttonText: 'Agende sua consulta agora',
    ariaLabel: 'Agende sua consulta agora com a Dra. Ana Luiza Moraes Rocha por WhatsApp',
  },
  {
    name: 'Specta Endoscopia Digestiva',
    address: ['R. Dom Alberto Gonçalves, 311', 'Mercês, Curitiba - PR'],
    phone: WHATSAPP_SPECTA_NUMBER,
    whatsapp: WHATSAPP_SPECTA_NUMBER,
    whatsappHref: getWhatsAppHref(WHATSAPP_SPECTA_NUMBER, WHATSAPP_SPECTA_MSG_ENCODED),
    buttonText: 'Agende sua colonoscopia',
    ariaLabel: 'Agende sua colonoscopia com a Dra. Ana Luiza por WhatsApp',
  },
] as const

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

        {/* Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12">
          {locations.map((location) => (
            <div
              key={location.name}
              className="bg-secondary/10 rounded-3xl p-8 lg:p-10 border border-secondary/20 hover:border-secondary/30 transition-all duration-300 shadow-sm hover:shadow-md h-full flex"
            >
              <div className="flex flex-col gap-6 h-full w-full lg:pl-4 xl:pl-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-primary/10 rounded-full p-3">
                      <MapPin className="size-6 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="space-y-5 min-w-0 flex-1">
                    <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary">
                      {location.name}
                    </h3>
                    <address className="not-italic text-lg lg:text-xl text-secondary leading-relaxed font-medium">
                      {location.address[0]}
                      <br />
                      {location.address[1]}
                    </address>
                    <div className="space-y-3">
                      <div className="text-lg text-secondary font-medium">
                        <span className="text-primary font-semibold block sm:inline">Telefone:</span>
                        <span className="block sm:inline sm:ml-2">{location.phone}</span>
                      </div>
                      <div className="text-lg text-secondary font-medium">
                        <span className="text-primary font-semibold block sm:inline">WhatsApp:</span>
                        <span className="block sm:inline sm:ml-2">{location.whatsapp}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <LinkButton
                  href={location.whatsappHref}
                  external
                  newTab
                  variant="primary"
                  size="lg"
                  className="mt-auto inline-flex items-center justify-center gap-3 w-full sm:w-[22rem] whitespace-nowrap px-6 py-4 text-sm lg:text-base font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                  aria-label={location.ariaLabel}
                >
                  <Calendar className="size-5" />
                  {location.buttonText}
                </LinkButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
