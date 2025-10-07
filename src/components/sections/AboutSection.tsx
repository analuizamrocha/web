import React from 'react'
import Image from 'next/image'
import { LinkButton } from '@/components/ui/LinkButton'

const credentials = [
  {
    title: 'Graduada em Medicina',
    institution: 'PUC-PR',
  },
  {
    title: 'Cirurgia Geral',
    institution: 'Hospital Santa Casa de Curitiba',
  },
  {
    title: 'Coloproctologista',
    institution: 'Hospital Universitário Evangélico Mackenzie',
  },
  {
    title: 'Mestranda UFPR',
    institution: 'Programa de Clínica Cirúrgica',
  },
  {
    title: 'Membro IANS',
    institution: 'International Anal Neoplasia Society',
  },
  {
    title: 'Fellow Cirurgia Colorretal',
    institution: 'Hospital Clinic Barcelona - Espanha',
  },
]

export function AboutSection() {
  return (
    <section
      id="quem-sou-eu"
      className="section bg-background"
      aria-labelledby="about-heading"
    >
      {/* Header Section - Enhanced Typography */}
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
            Quem é Dra. Ana Luiza?
          </h2>
          <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-secondary font-medium space-y-4">
            <p>Especialista em coloproctologia com formação internacional.</p>
            <p>Dedicada ao cuidado integral e humanizado de cada paciente.</p>
          </div>
        </div>

        {/* Desktop: Credentials Grid */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 xl:gap-12">
            {credentials.map((credential, index) => (
              <div
                key={index}
                className="bg-secondary/10 rounded-3xl p-8 lg:p-10 border border-secondary/20 hover:border-secondary/30 transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div className="space-y-4">
                  <h3 className="text-xl lg:text-2xl font-sans font-bold text-primary">
                    {credential.title}
                  </h3>
                  <p className="text-lg lg:text-xl text-secondary font-regular leading-relaxed">
                    {credential.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Link Button - Aligned with content */}
        <div className="text-right mb-8 lg:mb-4 lg:mt-4">
          <LinkButton href="/sobre" variant="outline" size="lg">
            Conheça minha trajetória
          </LinkButton>
        </div>
      </div>

      {/* Mobile: Full-Width Image - Edge to Edge */}
      <div className="lg:hidden w-full">
        <Image
          width={1366}
          height={768}
          src="/images/sobre-mim.webp"
          alt="Dra. Ana Luiza - Formação e qualificações profissionais em coloproctologia"
          sizes="(max-width: 1024px) 100vw, 0px"
          quality={100}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    </section>
  )
}
