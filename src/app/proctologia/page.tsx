import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

import { InternalLinks } from '@/components/seo/InternalLinks'
import { SchemaMarkup } from '@/components/seo/SchemaMarkup'
import { LinkButton } from '@/components/ui/LinkButton'
import { Badge } from '@/components/ui/Badge'
import {
  CLINICA_NASSIF_UPDATED,
  DR_NAME,
  WEBSITE_URL,
  WHATSAPP_MSG_TEXT_ENCODED,
  WPP_NUMBER_NASSIF,
} from '@/lib/constants'
import { getRouteMetadata } from '@/lib/seo/meta-config'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  type FAQItem,
} from '@/lib/seo-schemas'

export const metadata: Metadata = getRouteMetadata('/proctologia')

const proctologiaFaq: FAQItem[] = [
  {
    question: 'Quando procurar um proctologista?',
    answer:
      'Sempre que houver sangramento nas fezes, dor ao evacuar, coceira que não melhora ou alteração súbita no ritmo intestinal. Sintomas persistentes por mais de uma semana merecem avaliação.',
  },
  {
    question: 'Qual a diferença entre proctologista e coloproctologista?',
    answer:
      'São termos complementares. Proctologia é o cuidado especializado do ânus e reto, enquanto coloproctologia inclui também o intestino grosso e cirurgias colorretais.',
  },
  {
    question: 'A consulta é constrangedora?',
    answer:
      'O exame é feito com respeito e explico cada passo antes de realizá-lo. Muitas condições podem ser avaliadas com equipamentos delicados e sem dor.',
  },
]

const clinicSchema = {
  name: `${DR_NAME} - Proctologista em Curitiba`,
  url: WEBSITE_URL,
  medicalSpecialty: ['Proctologia', 'Coloproctologia'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${CLINICA_NASSIF_UPDATED.address} - ${CLINICA_NASSIF_UPDATED.neighborhood}`,
    addressLocality: CLINICA_NASSIF_UPDATED.city,
    addressRegion: CLINICA_NASSIF_UPDATED.state,
    postalCode: CLINICA_NASSIF_UPDATED.cep,
    addressCountry: 'BR',
  },
  telephone: CLINICA_NASSIF_UPDATED.phone,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: CLINICA_NASSIF_UPDATED.coordinates.latitude,
    longitude: CLINICA_NASSIF_UPDATED.coordinates.longitude,
  },
  availableService: [
    'Consulta proctológica',
    'Tratamento de hemorroidas',
    'Tratamento de fissuras anais',
    'Tratamento de fístulas e cisto pilonidal',
  ],
  openingHours: CLINICA_NASSIF_UPDATED.openingHours,
  image: `${WEBSITE_URL}/images/og.png`,
}

const faqSchema = generateFAQSchema(proctologiaFaq)
const breadcrumbSchema = generateBreadcrumbSchema([
  { label: 'Início', href: '/' },
  { label: 'Proctologia' },
])

const sintomasComuns = [
  'Sangue vivo ou escuro misturado às fezes',
  'Coceira, ardência ou secreção na região anal',
  'Dor ao evacuar ou sensação de corte',
  'Gazes presos, distensão e intestino irregular',
  'Protuberância ou caroço próximo ao ânus',
  'Perda de muco ou secreção no dia a dia',
]

const encaminhamentos = [
  {
    label: 'Laser para hemorroidas',
    href: '/especialidades/hemorroidas-tratamento-laser',
    description:
      'Procedimento indicado para sangramentos repetitivos e sensação de peso.',
  },
  {
    label: 'Toxina botulínica para fissura anal',
    href: '/especialidades/fissura-anal-toxina-botulinica',
    description: 'Tratamento sem corte para dor intensa na evacuação.',
  },
  {
    label: 'Cirurgia de cisto pilonidal',
    href: '/especialidades/cisto-pilonidal-cirurgia',
    description:
      'Opções minimamente invasivas para tratar inflamações recorrentes.',
  },
  {
    label: 'Tratamentos completos de coloproctologia',
    href: '/tratamentos',
    description: 'Veja todos os procedimentos e doenças tratados na clínica.',
  },
]

export default function ProctologiaPage() {
  return (
    <>
      <section className="bg-background pt-24 pb-16 md:pt-28">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <span className="text-sm uppercase tracking-[0.3em] text-primary/70 font-semibold">
              Proctologia acessível
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mt-6">
              Proctologista em Curitiba
            </h1>
            <InternalLinks
              text="Atendo hemorroidas, dores anais, sangramentos e desconfortos intestinais com linguagem simples, exames delicados e opções modernas como laser e toxina botulínica."
              className="mt-6 text-lg md:text-xl text-secondary leading-relaxed"
            />
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <LinkButton
                href={`https://wa.me/${WPP_NUMBER_NASSIF}/?text=${WHATSAPP_MSG_TEXT_ENCODED}`}
                external
                newTab
                variant="primary"
                size="lg"
                className="text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Agendar consulta de proctologia"
              >
                Agendar consulta
              </LinkButton>
              <Link
                href="/tratamentos"
                className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                Conheça os tratamentos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-primary/10 bg-secondary/5 p-8">
            <p className="text-secondary text-base leading-relaxed">
              A consulta proctológica inclui conversa detalhada sobre hábitos,
              avaliação de pele e, quando necessário, anuscopia delicada. Explico
              cada etapa antes de realizar qualquer exame.
            </p>
            <div className="mt-6 grid gap-3">
              <Badge variant="primary" className="w-fit">
                CRM-PR 45351 • RQE 36221
              </Badge>
              <Badge variant="secondary" className="w-fit">
                Atendimento na Clínica Nassif • Batel
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/5">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary">
              O que faz uma proctologista?
            </h2>
            <InternalLinks
              text="A proctologia cuida especificamente do ânus e do reto, tratando hemorroidas, fissuras, fístulas, coceira anal, sangramentos e alterações do hábito intestinal."
              className="mt-4 text-secondary text-lg leading-relaxed"
            />
            <InternalLinks
              text="Utilizo tecnologias modernas (laser, exames em alta definição e toxina botulínica) para reduzir a dor e acelerar a cicatrização."
              className="mt-4 text-secondary text-lg leading-relaxed"
            />
          </div>
          <div className="rounded-3xl border border-primary/15 bg-background p-8 shadow-sm">
            <h3 className="text-xl font-serif text-primary font-semibold">
              Quando é hora de consultar?
            </h3>
            <ul className="mt-6 space-y-4 text-secondary">
              {[
                'Sangramento ou dor que persistem por mais de uma semana.',
                'Tratamentos caseiros e pomadas que não funcionam.',
                'Histórico familiar de câncer colorretal.',
                'Desconfortos que impedem atividades ou exercícios.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary text-center">
            Sintomas que acompanho no consultório
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sintomasComuns.map((sintoma) => (
              <article
                key={sintoma}
                className="border border-primary/10 rounded-3xl p-6 bg-secondary/5"
              >
                <p className="text-secondary leading-relaxed">{sintoma}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/5">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary">
            Tratamentos indicados a partir da consulta
          </h2>
          <p className="mt-4 text-secondary text-lg max-w-3xl">
            Após entender sintomas e hábitos, monto um plano que pode incluir
            ajustes alimentares, medicamentos, laser ou pequenas cirurgias.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {encaminhamentos.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border border-primary/10 rounded-3xl p-6 bg-background hover:border-primary/40 transition-colors"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-primary/70 font-semibold">
                  Tratamento
                </p>
                <h3 className="mt-3 text-xl font-semibold text-primary">
                  {item.label}
                </h3>
                <p className="mt-2 text-secondary leading-relaxed">
                  {item.description}
                </p>
                <span className="inline-flex items-center mt-4 text-primary font-semibold">
                  Saiba mais
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-[960px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary text-center">
            Perguntas frequentes sobre proctologia
          </h2>
          <div className="mt-8 space-y-4">
            {proctologiaFaq.map((faq) => (
              <details
                key={faq.question}
                className="group border border-primary/10 rounded-2xl px-6 py-4 bg-secondary/5"
              >
                <summary className="cursor-pointer text-lg font-semibold text-primary flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-sm text-primary/50 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SchemaMarkup type="MedicalClinic" data={clinicSchema} />
      <SchemaMarkup type="FAQPage" data={faqSchema} />
      <SchemaMarkup type="BreadcrumbList" data={breadcrumbSchema} />
    </>
  )
}
