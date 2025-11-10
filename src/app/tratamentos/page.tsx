import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/LinkButton'
import { InternalLinks } from '@/components/seo/InternalLinks'
import { SchemaMarkup } from '@/components/seo/SchemaMarkup'
import {
  WPP_NUMBER_NASSIF,
  WHATSAPP_MSG_TEXT_ENCODED,
  WEBSITE_URL,
  DR_NAME,
} from '@/lib/constants'
import { getRouteMetadata } from '@/lib/seo/meta-config'
import { servicePageList } from '@/lib/services/data'

export const metadata: Metadata = getRouteMetadata('/tratamentos')

const treatments = [
  {
    title: 'Cirurgias a Laser',
    description:
      'Tecnologia LHP, FiLaC e ablação para hemorroidas, fístulas e plicomas com mínimo trauma tecidual.',
    slug: 'cx-laser',
    category: 'Tecnologia',
  },
  {
    title: 'Tratamento de Hemorroidas',
    description:
      'Planos combinando ligadura elástica, escleroterapia guiada e cirurgia quando necessário.',
    slug: 'hemorroidas',
    category: 'Clínico/Cirúrgico',
  },
  {
    title: 'Cirurgia de Fístulas',
    description:
      'Abordagens com retalho, laser ou seton para preservar continência e reduzir recidiva.',
    slug: 'cx-fistulas-anorretais',
    category: 'Cirúrgico',
  },
  {
    title: 'Toxina Botulínica',
    description:
      'Aplicação ambulatorial para fissura anal crônica e dor pélvica com relaxamento controlado do esfíncter.',
    slug: 'toxina-botulinica',
    category: 'Clínico',
  },
  {
    title: 'Rastreio do Câncer Anal',
    description:
      'Protocolos de HPV, anuscopia de alta resolução e tratamento precoce de lesões.',
    slug: 'rastreio-cancer-anal',
    category: 'Preventivo',
  },
  {
    title: 'Tratamento de HPV Anal',
    description:
      'Laser, radiofrequência e imunomodulação para controle das verrugas e prevenção de recidivas.',
    slug: 'hpv-anal',
    category: 'Clínico',
  },
  {
    title: 'Cirurgia de Cisto Pilonidal',
    description:
      'Técnicas abertas e endoscópicas para remover trajetos complexos e permitir retorno rápido.',
    slug: 'cx-cisto-pilonidal',
    category: 'Cirúrgico',
  },
  {
    title: 'Doenças Inflamatórias Intestinais',
    description:
      'Acompanhamento multidisciplinar de Doença de Crohn e Retocolite com vigilância de complicações.',
    slug: 'doencas-inflamatorias-intestinais',
    category: 'Clínico',
  },
  {
    title: 'Síndrome do Intestino Irritável',
    description:
      'Estratégias personalizadas com ajustes alimentares, medicamentos e suporte comportamental.',
    slug: 'sindrome-intestino-irritavel',
    category: 'Clínico',
  },
]

const specialtyHighlights = servicePageList.map((service) => ({
  title: service.hero.h1,
  description: service.description,
  href: service.route,
}))

const organizationSchema = {
  '@id': `${WEBSITE_URL}/#tratamentos-coloproctologia`,
  name: `${DR_NAME} - Coloproctologia e Cirurgia Colorretal`,
  medicalSpecialty: ['Coloproctologia', 'Proctologia', 'Cirurgia Colorretal'],
  availableService: [
    ...treatments.map((treatment) => ({
      '@type': 'MedicalProcedure',
      name: treatment.title,
      description: treatment.description,
      url: `${WEBSITE_URL}/tratamentos/${treatment.slug}`,
    })),
    ...specialtyHighlights.map((specialty) => ({
      '@type': 'MedicalProcedure',
      name: specialty.title,
      description: specialty.description,
      url: `${WEBSITE_URL}${specialty.href}`,
    })),
  ],
}

export default function ServicosPage() {
  return (
    <>
      <section className="section bg-background pt-24 md:pt-28 animate-fade-in">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20">
            <span className="text-sm uppercase tracking-[0.3em] text-primary/70 font-semibold">
              Coloproctologia avançada
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
              Tratamentos de Coloproctologia e Cirurgia Colorretal
            </h1>
            <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-secondary font-medium space-y-4">
              <InternalLinks text="Integro cirurgia minimamente invasiva, laser, toxina botulínica e protocolos clínicos completos para tratar hemorroidas, fissuras, fístulas, doenças inflamatórias intestinais e tumores colorretais." />
              <p>
                Cada plano considera exames atualizados, histórico clínico e
                expectativas do paciente para definir a melhor estratégia.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              {['laser coloproctologia', 'cirurgia minimamente invasiva', 'toxina botulínica', 'monitoramento DII'].map((keyword) => (
                <span
                  key={keyword}
                  className="border border-primary/20 rounded-full px-4 py-1 text-sm text-primary bg-primary/5"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8 xl:gap-10 mb-16">
            {treatments.map((treatment) => (
              <Link
                className="group"
                key={treatment.slug}
                href={`/tratamentos/${treatment.slug}`}
              >
                <Card
                  title={treatment.title}
                  description={treatment.description}
                  variant="service"
                  className="h-full transition-transform duration-300 cursor-pointer"
                >
                  <div className="flex mt-auto pt-4 justify-between">
                    <Badge variant="primary">{treatment.category}</Badge>
                    <span className="inline-flex items-center justify-center text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-300">
                      Saiba mais&nbsp;
                      <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mb-16">
            <div className="max-w-3xl">
              <span className="text-sm uppercase tracking-[0.35em] text-primary/70 font-semibold">
                Especialidades e procedimentos
              </span>
              <h2 className="mt-4 text-2xl md:text-4xl font-serif font-bold text-primary">
                Rotas clínicas dedicadas
              </h2>
              <p className="mt-3 text-secondary text-lg">
                Aprofunde-se em cada condição com conteúdos específicos,
                sintomas guiados e FAQ detalhado.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {specialtyHighlights.map((specialty) => (
                <Link
                  key={specialty.href}
                  href={specialty.href}
                  className="rounded-3xl border border-primary/10 p-6 bg-secondary/5 hover:border-primary/40 transition-colors"
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-primary/70 font-semibold">
                    Guia completo
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-primary">
                    {specialty.title}
                  </h3>
                  <p className="mt-3 text-secondary leading-relaxed">
                    {specialty.description}
                  </p>
                  <span className="inline-flex items-center mt-4 text-primary font-semibold">
                    Explorar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="bg-secondary/10 rounded-3xl p-8 lg:p-10 border border-secondary/20 text-center">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-4">
                Precisa de um diagnóstico especializado?
              </h2>
              <InternalLinks
                text="Agende sua consulta e receba um plano estruturado que pode incluir proctologia, coloproctologia e cirurgia colorretal com tecnologia avançada."
                className="text-lg lg:text-xl text-secondary leading-relaxed mb-6"
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LinkButton
                  href={`https://wa.me/${WPP_NUMBER_NASSIF}/?text=${WHATSAPP_MSG_TEXT_ENCODED}`}
                  external
                  newTab
                  variant="primary"
                  size="xl"
                  className="bg-primary hover:bg-primary/90 text-background shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold text-nowrap"
                  aria-label="Enviar mensagem para Dra. Ana Luiza Moraes Rocha por WhatsApp"
                >
                  Agendar consulta
                </LinkButton>
                <LinkButton
                  href="/proctologia"
                  size="xl"
                  variant="outline"
                  className="text-lg px-8 py-4 font-semibold text-nowrap shadow-lg hover:shadow-xl transform transition-all duration-300"
                >
                  Ver consulta de proctologia
                </LinkButton>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors text-lg"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </section>

      <SchemaMarkup type="MedicalOrganization" data={organizationSchema} />
    </>
  )
}
