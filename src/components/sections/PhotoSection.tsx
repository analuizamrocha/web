import Image from 'next/image'
import { LinkButton } from '../ui/LinkButton'
import { WHATSAPP_MSG_TEXT_ENCODED, WPP_NUMBER_NASSIF } from '@/lib/constants'
import { MessageCircle } from 'lucide-react'

export function PhotoSection() {
  return (
    <section className="section bg-gradient-to-b from-muted/20 to-background">
      {/* Beautiful Responsive Layout */}
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Header Section - Enhanced Typography */}
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-8">
            Cuidado humanizado e especializado
          </h2>
          <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-secondary font-medium">
            <p>
              Cada consulta é uma oportunidade de cuidar com atenção, técnica e carinho em um
              ambiente acolhedor.
            </p>
          </div>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Side Image - Always visible */}
          <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group">
            <div className="aspect-[3/4] lg:aspect-[4/5] relative">
              <Image
                src="/images/side.webp"
                alt="Dra. Ana Luiza Moraes Rocha, coloproctologista Curitiba, consultório médico especializado em cirurgia colorretal e proctologia"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={100}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Front Image - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group">
            <div className="aspect-[4/5] relative">
              <Image
                src="/images/front.webp"
                alt="Dra. Ana Luiza Moraes Rocha, proctologista Curitiba, atendimento humanizado em tratamentos minimamente invasivos e cirurgia laser"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="50vw"
                quality={100}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-8 lg:mt-12 text-center">
          <div className="mx-auto max-w-3xl">
            <blockquote className="text-lg lg:text-xl text-body font-medium leading-relaxed italic border-l-4 border-primary/30 pl-6 pt-4 pb-4 bg-primary/5 rounded-r-xl">
              <p className="text-start">
                &ldquo;A medicina vai além da técnica. É sobre criar conexões, oferecer esperança e
                cuidar de cada pessoa com a atenção que ela merece.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        {/* Standout CTA Section */}
        <div className="mt-16 lg:mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-background to-card-hover border-2 border-primary/20 p-8 lg:p-12 shadow-xl">
            {/* Decorative gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-primary via-primary to-brand-primary" />

            {/* Content */}
            <div className="relative text-center space-y-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-primary">
                Está pronto para cuidar da sua saúde?
              </h3>
              <p className="text-lg sm:text-xl text-body max-w-2xl mx-auto leading-relaxed">
                Entre em contato agora mesmo via WhatsApp e agende sua consulta com atendimento personalizado e humanizado.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <LinkButton
                  href={`https://wa.me/${WPP_NUMBER_NASSIF}/?text=${WHATSAPP_MSG_TEXT_ENCODED}`}
                  external
                  newTab
                  variant="primary"
                  size="xl"
                  className="inline-flex items-center gap-3 px-8 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl font-bold rounded-full shadow-2xl hover:shadow-2xl hover:shadow-primary/20 transform hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90"
                  aria-label="Fale comigo agora pelo WhatsApp e agende sua consulta"
                >
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                  <span>Fale comigo agora pelo WhatsApp</span>
                </LinkButton>
              </div>

              {/* Trust indicator */}
              <p className="text-sm sm:text-base text-muted pt-2">
                Respondo pessoalmente • Atendimento rápido e acolhedor
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
