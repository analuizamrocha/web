import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/LinkButton'
import { getLocationPath, locationPages } from '@/lib/locations'
import { cn } from '@/lib/utils'

const locations = locationPages.map((location) => ({
  slug: location.slug,
  name: location.name,
  badgeLabel: location.badgeLabel,
  address: location.addressLines,
  phone: location.phoneDisplay,
  whatsapp: location.whatsappDisplay,
  whatsappHref: location.whatsappHref,
  buttonText: location.primaryCtaLabel,
  summary: location.summary,
  ariaLabel: `${location.primaryCtaLabel} por WhatsApp`,
}))

const locationStyles: Record<
  string,
  {
    card: string
    badge: string
    glow: string
    kicker: string
  }
> = {
  'clinica-nassif': {
    card: 'border-secondary/20 bg-secondary/10 hover:border-secondary/35',
    badge: 'bg-secondary/35 text-primary',
    glow: 'from-secondary/30 via-secondary/10 to-transparent',
    kicker: 'Ponto de partida para consulta e seguimento',
  },
  'specta-endoscopia-digestiva': {
    card: 'border-primary/15 bg-primary/5 hover:border-primary/25',
    badge: 'bg-primary/10 text-primary',
    glow: 'from-primary/15 via-primary/5 to-transparent',
    kicker: 'Quando a colonoscopia entra na jornada',
  },
}

export function LocationsSection() {
  return (
    <section id="atendimento" className="section section-deferred bg-background">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
            Locais de atendimento
          </h2>
          <div className="text-xl lg:text-2xl leading-relaxed text-secondary font-medium space-y-4">
            <p>Consulta e exame acontecem em contextos diferentes, com uma linha de cuidado clara.</p>
            <p className="text-lg lg:text-xl text-secondary/80">
              Use a consulta como ponto de partida. Quando a colonoscopia for indicada, o exame
              segue para o local apropriado.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12">
          {locations.map((location) => {
            const style = locationStyles[location.slug]

            return (
              <div
                key={location.slug}
                className={cn(
                  'relative overflow-hidden rounded-3xl p-8 lg:p-10 border transition-all duration-300 shadow-sm hover:shadow-md h-full flex',
                  style.card
                )}
              >
                <div
                  className={cn(
                    'pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b',
                    style.glow
                  )}
                />
                <div className="flex flex-col gap-6 h-full w-full lg:pl-4 xl:pl-6">
                  <div className="relative z-10 flex flex-wrap items-center gap-3">
                    <Badge variant="secondary" className={style.badge}>
                      {location.badgeLabel}
                    </Badge>
                    <span className="text-sm font-medium text-secondary/80">{style.kicker}</span>
                  </div>

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
                      <p className="text-base lg:text-lg text-primary/80 font-medium">
                        {location.summary}
                      </p>
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

                  <div className="mt-auto flex flex-col gap-4">
                    <LinkButton
                      href={location.whatsappHref}
                      external
                      newTab
                      variant="primary"
                      size="lg"
                      className="inline-flex items-center justify-center gap-3 w-full sm:w-[22rem] whitespace-nowrap px-6 py-4 text-sm lg:text-base font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                      aria-label={location.ariaLabel}
                    >
                      <Calendar className="size-5" />
                      {location.buttonText}
                    </LinkButton>

                    <LinkButton
                      href={getLocationPath(location.slug)}
                      variant="link"
                      size="default"
                      className="inline-flex items-center gap-2"
                    >
                      Ver detalhes do local
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </LinkButton>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <LinkButton href="/locais-de-atendimento" variant="outline" size="lg">
            Ver todos os detalhes dos locais
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
