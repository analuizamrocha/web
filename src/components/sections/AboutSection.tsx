import React from 'react'
import Image from 'next/image'
import { LinkButton } from '@/components/ui/LinkButton'
import {
  PUC_PR,
  HOSPITAL_SANTA_CASA,
  HOSPITAL_MACKENZIE,
  HOSPITAL_CLINIC_BARCELONA,
} from '@/lib/constants'

const credentials: {
  eyebrow: string
  title: string
  institution: string
}[] = [
  {
    eyebrow: 'Formação',
    title: 'Graduada em Medicina',
    institution: PUC_PR,
  },
  {
    eyebrow: 'Residência',
    title: 'Cirurgia Geral',
    institution: HOSPITAL_SANTA_CASA,
  },
  {
    eyebrow: 'Residência',
    title: 'Coloproctologista',
    institution: HOSPITAL_MACKENZIE,
  },
  {
    eyebrow: 'Fellowship internacional',
    title: 'Fellow em Cirurgia Colorretal',
    institution: `${HOSPITAL_CLINIC_BARCELONA} — Espanha`,
  },
  {
    eyebrow: 'Mestrado',
    title: 'Mestre em Clínica Cirúrgica',
    institution: 'Universidade Federal do Paraná (UFPR)',
  },
  {
    eyebrow: 'Membro',
    title: 'Membro IANS',
    institution: 'International Anal Neoplasia Society',
  },
]

export function AboutSection() {
  return (
    <section
      id="quem-sou-eu"
      className="section section-deferred bg-background"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-4xl text-center mb-12 lg:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
            Quem é Dra. Ana Luiza?
          </h2>
          <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-body font-medium space-y-4">
            <p>Especialista em coloproctologia com formação internacional.</p>
            <p>Dedicada ao cuidado integral e humanizado de cada paciente.</p>
          </div>
        </div>

        {/* Desktop: Credentials Grid */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {credentials.map((credential, index) => (
              <div
                key={index}
                className="rounded-3xl bg-card border border-secondary/20 p-6 lg:p-7 shadow-brand transition-all duration-300 hover:bg-card-hover hover:border-secondary/30 hover:shadow-brand-lg"
              >
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-strong">
                  {credential.eyebrow}
                </div>
                <h3 className="mt-2 text-lg lg:text-xl font-sans font-bold text-primary leading-snug">
                  {credential.title}
                </h3>
                <p className="mt-1 text-sm lg:text-base text-muted leading-relaxed">
                  {credential.institution}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mb-8 lg:mb-4 mt-4 lg:mt-8">
          <LinkButton href="/sobre" variant="outline" size="lg">
            Conheça minha trajetória
          </LinkButton>
        </div>
      </div>

      {/* Mobile: Full-Width Image  */}
      <div className="lg:hidden w-full">
        <Image
          width={960}
          height={1200}
          src="/images/sobre-mim.webp"
          alt="Dra. Ana Luiza Moraes Rocha CRM-PR 45351, formação internacional em coloproctologia, Hospital Clinic Barcelona, especialista em cirurgia colorretal"
          sizes="(max-width: 1024px) 100vw, 0px"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    </section>
  )
}
