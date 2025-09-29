import Image from 'next/image'
import { DR_NAME } from '@/lib/constants'

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
              Cada consulta é uma oportunidade de cuidar com atenção, técnica e
              carinho em um ambiente acolhedor.
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
                alt={`${DR_NAME} - Perfil profissional em consultório médico especializado em coloproctologia`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={95}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Front Image - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group">
            <div className="aspect-[4/5] relative">
              <Image
                src="/images/front.webp"
                alt={`${DR_NAME} - Atendimento profissional e humanizado em coloproctologia`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="50vw"
                quality={95}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-8 lg:mt-12 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-lg lg:text-xl text-secondary/80 font-medium leading-relaxed">
              &ldquo;A medicina vai além da técnica. É sobre criar conexões,
              oferecer esperança e cuidar de cada pessoa com a atenção que ela
              merece.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
