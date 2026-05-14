import Link from 'next/link'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { LinkButton } from '@/components/ui/LinkButton'
import { getLocationPath, locationPages } from '@/lib/locations'

const locations = locationPages.map((location) => ({
  slug: location.slug,
  name: location.name,
  address: location.addressLines,
  phone: location.phoneDisplay,
  whatsapp: location.whatsappDisplay,
  whatsappHref: location.whatsappHref,
  buttonText: location.primaryCtaLabel,
  ariaLabel: `${location.primaryCtaLabel} por WhatsApp`,
  sameNumber: location.phoneDisplay === location.whatsappDisplay,
}))

export function LocationsSection() {
  return (
    <section id="atendimento" className="section section-deferred bg-background">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
            Locais de atendimento
          </h2>
          <div className="text-xl lg:text-2xl leading-relaxed text-body font-medium space-y-4">
            <p>Atendimento personalizado em ambiente acolhedor e moderno.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12">
          {locations.map((location) => (
            <div
              key={location.slug}
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
                    <address className="not-italic text-lg lg:text-xl text-body leading-relaxed font-medium">
                      {location.address[0]}
                      <br />
                      {location.address[1]}
                    </address>
                    <div className="space-y-3">
                      {location.sameNumber ? (
                        <div className="text-lg text-body font-medium">
                          <span className="text-primary font-semibold block sm:inline">
                            Telefone / WhatsApp:
                          </span>
                          <span className="block sm:inline sm:ml-2">{location.phone}</span>
                        </div>
                      ) : (
                        <>
                          <div className="text-lg text-body font-medium">
                            <span className="text-primary font-semibold block sm:inline">
                              Telefone:
                            </span>
                            <span className="block sm:inline sm:ml-2">{location.phone}</span>
                          </div>
                          <div className="text-lg text-body font-medium">
                            <span className="text-primary font-semibold block sm:inline">
                              WhatsApp:
                            </span>
                            <span className="block sm:inline sm:ml-2">{location.whatsapp}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA Stack — design system: centered button + ghost link */}
                <div className="mt-auto pt-6 border-t border-secondary/20 flex flex-col items-center gap-4">
                  <LinkButton
                    href={location.whatsappHref}
                    external
                    newTab
                    variant="primary"
                    size="lg"
                    className="h-14 w-full max-w-[420px] gap-3 rounded-full text-base font-semibold shadow-sm hover:shadow-md"
                    aria-label={location.ariaLabel}
                  >
                    <Calendar className="size-5" aria-hidden="true" />
                    {location.buttonText}
                  </LinkButton>

                  <Link
                    href={getLocationPath(location.slug)}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-200 hover:gap-2.5 hover:text-primary/80"
                  >
                    Ver detalhes
                    <ArrowRight
                      className="size-3 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
