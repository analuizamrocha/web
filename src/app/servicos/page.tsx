import Link from 'next/link'
import { permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/LinkButton'
import { services, servicesIndexUrl } from '@/lib/services'
import { WEBSITE_URL, WPP_NUMBER_NASSIF, WHATSAPP_MSG_TEXT_ENCODED } from '@/lib/constants'
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/seo-schemas'

const pageTitle = 'Serviços de Proctologia em Curitiba | Dra. Ana Luiza Moraes Rocha'
const pageDescription =
  'Avaliação e tratamentos de proctologia em Curitiba com foco em hemorroidas, fissuras, fístulas, HPV anal e saúde intestinal completa.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'proctologia curitiba',
    'proctologista curitiba',
    'hemorroidas curitiba',
    'fissura anal curitiba',
    'fistula anal curitiba',
    'hpv anal curitiba',
    'cisto pilonidal curitiba',
  ],
  alternates: {
    canonical: `${WEBSITE_URL}/tratamentos`,
  },
  openGraph: generateOpenGraphMetadata({
    title: pageTitle,
    description: pageDescription,
    url: `${WEBSITE_URL}/tratamentos`,
  }),
  twitter: generateTwitterMetadata({
    title: pageTitle,
    description: pageDescription,
    url: `${WEBSITE_URL}/tratamentos`,
  }),
}

export default function ServicosPage() {
  permanentRedirect('/tratamentos')
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalOrganization',
            '@id': `${WEBSITE_URL}/#organization-servicos`,
            name: 'Serviços de Proctologia - Dra. Ana Luiza Moraes Rocha',
            medicalSpecialty: ['Proctologia', 'Coloproctologia'],
            availableService: services.map((service) => ({
              '@type': 'MedicalProcedure',
              name: service.name,
              description: service.metaDescription,
              procedureType: service.category,
              url: `${WEBSITE_URL}/servicos/${service.slug}`,
            })),
          }),
        }}
      />

      <section className="section bg-background pt-24 md:pt-28 animate-fade-in">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
              Serviços de Proctologia em Curitiba
            </h1>
            <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-secondary font-medium space-y-4">
              <p>
                Cuidado especializado e humanizado para sintomas anorretais, saúde sexual e saúde
                intestinal, com foco em recuperação rápida e segura.
              </p>
              <p>
                Conte com uma proctologista em Curitiba para avaliar, tratar e orientar cada quadro
                com clareza e conforto.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8 xl:gap-10 mb-16">
            {services.map((service) => (
              <Link
                className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl"
                key={service.slug}
                href={`/servicos/${service.slug}`}
              >
                <Card
                  title={service.name}
                  description={service.cardDescription}
                  variant="service"
                  className="h-full transition-transform duration-300 cursor-pointer hover:-translate-y-1"
                >
                  <div className="flex mt-auto pt-4 justify-between items-center">
                    <Badge variant="primary">{service.category}</Badge>
                    <span className="inline-flex items-center justify-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors duration-300">
                      Saiba mais&nbsp;
                      <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="bg-secondary/10 rounded-3xl p-8 lg:p-10 border border-secondary/20 text-center">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-4">
                Proctologia em Curitiba com atenção completa
              </h2>
              <p className="text-lg lg:text-xl text-secondary leading-relaxed mb-6">
                Agenda flexível, orientação clara e tratamentos que equilibram ciência e acolhimento
                para cada sintoma ou diagnóstico.
              </p>
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
                  Falar no WhatsApp
                </LinkButton>
                <LinkButton
                  href="/blog"
                  size="xl"
                  variant="outline"
                  className="text-lg px-8 py-4 font-semibold text-nowrap shadow-lg hover:shadow-xl transform transition-all duration-300"
                >
                  Ler artigos
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
    </>
  )
}
