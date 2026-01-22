import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { LinkButton } from '@/components/ui/LinkButton'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOpenGraphMetadata,
  generateTwitterMetadata,
} from '@/lib/seo-schemas'
import {
  WEBSITE_URL,
  CRM_NUMBER,
  WPP_NUMBER_NASSIF,
  WHATSAPP_MSG_TEXT_ENCODED,
} from '@/lib/constants'
import { getServiceTargetPath, services } from '@/lib/services'

export const dynamicParams = false

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)

  if (!service) {
    return {
      title: 'Serviço não encontrado | Dra. Ana Luiza Moraes Rocha',
    }
  }

  const title = `${service.name} em Curitiba | Proctologia`
  const pageUrl = `${WEBSITE_URL}${getServiceTargetPath(service.slug)}`

  return {
    title,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: generateOpenGraphMetadata({
      title,
      description: service.metaDescription,
      url: pageUrl,
    }),
    twitter: generateTwitterMetadata({
      title,
      description: service.metaDescription,
      url: pageUrl,
    }),
  }
}

export default async function ServicoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)

  if (!service) {
    notFound()
  }

  permanentRedirect(getServiceTargetPath(service.slug))

  const pageUrl = `${WEBSITE_URL}/servicos/${service.slug}`
  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Serviços', href: '/servicos' },
    { label: service.name },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            '@id': `${pageUrl}#procedure`,
            name: service.name,
            description: service.metaDescription,
            procedureType: service.category,
            areaServed: 'Curitiba',
            provider: {
              '@type': 'Physician',
              name: 'Dra. Ana Luiza Moraes Rocha',
              hasCredential: [
                {
                  '@type': 'EducationalOccupationalCredential',
                  identifier: CRM_NUMBER,
                },
              ],
            },
            url: pageUrl,
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(service.faqs)),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      <section className="section bg-background pt-24 md:pt-28">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          <Breadcrumb items={breadcrumbItems} />

          <div className="mx-auto max-w-4xl">
            <header className="mb-12 animate-fade-in">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="primary">Proctologia Curitiba</Badge>
                <Badge variant="secondary">{service.category}</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                {service.name}
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                {service.heroDescription}
              </p>
            </header>

            <main className="prose prose-lg max-w-none mb-12">
              <h2>Quando procurar a proctologia em Curitiba</h2>
              <ul>
                {service.symptoms.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>Como cuidamos de você</h2>
              <ul>
                {service.approaches.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>Diferenciais do cuidado</h2>
              <ul>
                {service.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </main>

            <div className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-6">
                Perguntas frequentes
              </h2>
              <div className="space-y-6">
                {service.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="border border-secondary/20 rounded-2xl p-6 bg-secondary/5"
                  >
                    <h3 className="text-xl font-semibold text-primary mb-2">{faq.question}</h3>
                    <p className="text-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <CallToActionCard
              title="Pronta para cuidar da sua saúde com acolhimento e precisão?"
              body={
                <>
                  Atendimento focado em conforto, linguagem clara e decisões compartilhadas. Agende
                  sua consulta e fale diretamente com a proctologista em Curitiba.
                </>
              }
              actions={
                <>
                  <LinkButton
                    href={`https://wa.me/${WPP_NUMBER_NASSIF}/?text=${WHATSAPP_MSG_TEXT_ENCODED}`}
                    external
                    newTab
                    variant="primary"
                    size="lg"
                    className="text-nowrap"
                    aria-label="Enviar mensagem para Dra. Ana Luiza Moraes Rocha por WhatsApp"
                  >
                    Falar no WhatsApp
                  </LinkButton>
                  <LinkButton href="/blog" variant="outline" size="lg" className="text-nowrap">
                    Ver conteúdos
                  </LinkButton>
                </>
              }
            />

            <div className="mt-10">
              <Link
                href="/servicos"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors text-lg"
              >
                ← Voltar para serviços
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
