import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/LinkButton'
import { TreatmentHeroImage } from '@/components/ui/TreatmentHeroImage'
import { RelatedBlogCard } from '@/components/ui/RelatedBlogCard'
import {
  WHATSAPP_HREF_SECRETARY,
  WEBSITE_URL,
  CRM_NUMBER,
} from '@/lib/constants'
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateOpenGraphMetadata,
  generateTwitterMetadata,
  type FAQItem,
  type BreadcrumbItem,
} from '@/lib/seo-schemas'

const pageTitle = 'Rastreio de Câncer Anal e HPV'
const pageDescription =
  'Rastreamento e prevenção do câncer de canal anal: grupos de risco, citologia anal, anuscopia de alta resolução e vacinação HPV em Curitiba.'
const pageUrl = `${WEBSITE_URL}/tratamentos/rastreio-cancer-anal`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'rastreio cancer anal curitiba',
    'prevenção cancer anal',
    'citologia anal curitiba',
    'anuscopia alta resolução curitiba',
    'HPV canal anal',
    'IANS coloproctologia',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: generateOpenGraphMetadata({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
  }),
  twitter: generateTwitterMetadata({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
  }),
}

// FAQ data for schema
const faqItems: FAQItem[] = [
  {
    question: 'O câncer de canal anal é comum?',
    answer:
      'Não. É considerado um câncer raro, mas sua incidência tem aumentado, principalmente em grupos de risco como pessoas vivendo com HIV ou imunossuprimidos.',
  },
  {
    question: 'Quem deve fazer rastreamento para câncer de canal anal?',
    answer:
      'O rastreamento é indicado para grupos de risco, como pessoas que praticam relação anal receptiva, pacientes HIV positivos, imunossuprimidos e mulheres com lesão de colo de útero associada ao HPV.',
  },
  {
    question: 'Como é feito o rastreamento do câncer de canal anal?',
    answer:
      'Pode incluir exame proctológico, citologia anal (similar ao Papanicolau) e anuscopia de alta resolução, que permite biópsia de lesões suspeitas.',
  },
  {
    question: 'A vacinação contra HPV ajuda na prevenção do câncer anal?',
    answer:
      'Sim. A vacina contra o HPV é uma das medidas mais eficazes para reduzir o risco de câncer anal, além de proteger contra outros cânceres relacionados ao vírus.',
  },
]

// Breadcrumb data for schema
const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Tratamentos', href: '/tratamentos' },
  { label: 'Rastreio do Câncer de Canal Anal' },
]

export default function RastreioCancerAnalPage() {
  return (
    <>
      {/* Medical Procedure Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            '@id': pageUrl,
            name: 'Rastreio e Prevenção do Câncer de Canal Anal',
            description:
              'Rastreamento especializado para detecção precoce do câncer de canal anal em grupos de risco',
            procedureType: 'Cancer Screening',
            bodyLocation: {
              '@type': 'AnatomicalStructure',
              name: 'Canal Anal',
            },
            performer: {
              '@type': 'Physician',
              name: 'Dra. Ana Luiza Moraes Rocha',
              hasCredential: [
                {
                  '@type': 'EducationalOccupationalCredential',
                  identifier: CRM_NUMBER,
                },
              ],
            },
            preparation: 'Avaliação de fatores de risco, anamnese detalhada',
            followup: 'Acompanhamento conforme protocolo de rastreamento para grupos de risco',
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqItems)),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      <section className="section bg-background pt-24 md:pt-28">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          <Breadcrumb
            items={[
              { label: 'Início', href: '/' },
              { label: 'Tratamentos', href: '/tratamentos' },
              { label: 'Rastreio do Câncer de Canal Anal' },
            ]}
          />

          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-12 animate-fade-in">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="primary">Preventivo</Badge>
                <Badge variant="secondary">Rastreamento</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Rastreio e Prevenção do Câncer de Canal Anal
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                O câncer de canal anal é uma doença rara em comparação ao câncer colorretal, mas sua
                incidência tem aumentado, especialmente em grupos de risco. A prevenção e o
                rastreamento precoce são fundamentais para o diagnóstico inicial e melhores
                resultados no tratamento.
              </p>
            </header>

            <TreatmentHeroImage slug="rastreio-cancer-anal" preload />


            <div className="prose prose-lg max-w-none mb-12">
              <h2>Fatores de risco</h2>
              <p>Alguns fatores aumentam a probabilidade de desenvolver câncer de canal anal:</p>
              <ul>
                <li>
                  Infecção persistente pelo&nbsp;
                  <strong>HPV (Papilomavírus Humano)</strong>.
                </li>
                <li>
                  História de&nbsp;
                  <strong>condilomas (verrugas genitais/anais)</strong>.
                </li>
                <li>
                  <strong>Imunossupressão</strong>, como em pessoas vivendo com HIV,{' '}
                  <strong>pós-transplantados de órgãos sólidos</strong> ou portadores de&nbsp;
                  <strong>doenças autoimunes em uso de imunossupressores</strong>.
                </li>
                <li>Tabagismo.</li>
                <li>
                  Mulheres que tiveram diagnóstico de&nbsp;
                  <strong>NIC (neoplasia intraepitelial cervical)</strong> ou câncer de colo do
                  útero associado ao HPV.
                </li>
              </ul>

              <h2>Importância da prevenção</h2>
              <p>
                A prevenção do câncer anal passa principalmente pelo&nbsp;
                <strong>controle do HPV</strong>.
              </p>
              <ul>
                <li>
                  O uso do <strong>preservativo</strong> reduz o risco de transmissão.
                </li>
                <li>
                  A <strong>vacinação contra o HPV</strong> é uma das medidas mais eficazes e está
                  disponível pelo SUS para adolescentes e alguns grupos de risco.
                </li>
                <li>
                  O diagnóstico e tratamento precoce de lesões precursoras, como a{' '}
                  <strong>neoplasia intraepitelial anal (NIA)</strong>, podem evitar a evolução para
                  o câncer.
                </li>
              </ul>

              <h2>Rastreio: quando e como fazer?</h2>
              <p>
                O rastreamento não é indicado para toda a população, mas sim para{' '}
                <strong>grupos de maior risco</strong>:
              </p>
              <ul>
                <li>Pessoas vivendo com HIV.</li>
                <li>
                  Pessoas que praticam <strong>relação anal receptiva</strong>.
                </li>
                <li>
                  Pacientes com lesão de colo de útero ou que já tiveram diagnóstico de câncer
                  associado ao HPV.
                </li>
                <li>
                  Pessoas com imunossupressão prolongada (pós-transplante ou doenças autoimunes em
                  uso de imunossupressores).
                </li>
              </ul>

              <h3>Métodos utilizados no rastreamento:</h3>
              <ul>
                <li>
                  <strong>Exame proctológico</strong>: inclui inspeção anal e toque retal, avaliando
                  alterações locais.
                </li>
                <li>
                  <strong>Citologia anal</strong>: exame semelhante ao Papanicolau, que detecta
                  alterações celulares sugestivas de lesões precursoras.
                </li>
                <li>
                  <strong>Anuscopia de Alta Resolução (AAR)</strong>: permite visualizar a mucosa
                  anal de forma detalhada e realizar biópsias de áreas suspeitas.
                </li>
              </ul>

              <h2>Sintomas de alerta</h2>
              <p>Procure avaliação médica caso apresente:</p>
              <ul>
                <li>Sangramento anal persistente.</li>
                <li>Dor ou desconforto na região anal.</li>
                <li>Presença de nódulo ou massa anal.</li>
                <li>Coceira anal persistente.</li>
                <li>Secreção anormal na região.</li>
              </ul>

              <h2>Considerações finais</h2>
              <p>
                O rastreamento do câncer de canal anal deve ser direcionado a&nbsp;
                <strong>grupos de risco específicos</strong>, utilizando métodos como&nbsp;
                <strong>citologia anal e anuscopia de alta resolução</strong>.
              </p>
              <p>
                A prevenção continua sendo a forma mais eficaz de reduzir casos, especialmente com a{' '}
                <strong>vacinação contra o HPV</strong> e a adoção de hábitos de vida saudáveis.
              </p>

              <blockquote className="border-l-4 border-primary/30 pl-6 py-4 my-8 bg-primary/5 rounded-r-xl">
                <div className="space-y-4">
                  <p className="text-secondary italic mb-0">
                    Um dos maiores estudos já publicados sobre o tema, o&nbsp;
                    <strong>
                      <a
                        href="https://www.anchorstudy.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline"
                      >
                        ANCHOR Study
                      </a>
                    </strong>
                    , demonstrou que tratar lesões precursoras em pacientes vivendo com HIV reduziu
                    significativamente a progressão para câncer anal.
                  </p>
                  <p className="text-secondary italic mb-0">
                    Para mais informações, acesse também a&nbsp;
                    <strong>
                      <a
                        href="https://iansoc.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline"
                      >
                        International Anal Neoplasia Society (IANS)
                      </a>
                    </strong>
                    , referência mundial em prevenção e rastreio do câncer anal.
                  </p>
                </div>
              </blockquote>

              <blockquote className="border-l-4 border-primary/30 pl-6 py-4 my-8 bg-primary/5 rounded-r-xl">
                <p className="text-secondary italic mb-0">
                  Se você faz parte de um grupo de risco ou tem dúvidas, procure avaliação com um
                  coloproctologista para definir a melhor estratégia de acompanhamento.
                </p>
              </blockquote>

              <RelatedBlogCard treatmentSlug="rastreio-cancer-anal" />

              <h2>Perguntas frequentes (FAQ)</h2>

              <div className="space-y-8 my-12">
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    O câncer de canal anal é comum?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Não. É considerado um câncer raro, mas sua incidência tem aumentado,
                    principalmente em grupos de risco como pessoas vivendo com HIV ou
                    imunossuprimidos.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    Quem deve fazer rastreamento para câncer de canal anal?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    O rastreamento é indicado para grupos de risco, como pessoas que praticam
                    relação anal receptiva, pacientes HIV positivos, imunossuprimidos e mulheres com
                    lesão de colo de útero associada ao HPV.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    Como é feito o rastreamento do câncer de canal anal?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Pode incluir exame proctológico, citologia anal (similar ao Papanicolau) e
                    anuscopia de alta resolução, que permite biópsia de lesões suspeitas.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    A vacinação contra HPV ajuda na prevenção do câncer anal?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Sim. A vacina contra o HPV é uma das medidas mais eficazes para reduzir o risco
                    de câncer anal, além de proteger contra outros cânceres relacionados ao vírus.
                  </p>
                </div>
              </div>
            </div>

            <CallToActionCard
              title="Faz parte de algum grupo de risco para câncer anal?"
              body={
                <p>
                  Agende uma consulta para avaliação especializada e definição da melhor estratégia
                  de rastreamento. A detecção precoce pode fazer toda a diferença.
                </p>
              }
              actions={
                <LinkButton
                  href={WHATSAPP_HREF_SECRETARY}
                  external
                  newTab
                  variant="primary"
                  size="xl"
                  className="group bg-primary hover:bg-primary/90 text-background shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold text-nowrap"
                  aria-label="Agendar consulta para rastreio de câncer anal com coloproctologista em Curitiba - Dra. Ana Luiza Moraes Rocha por WhatsApp"
                >
                  Agendar consulta
                </LinkButton>
              }
              variant="secondary"
            />

            <div className="flex items-center justify-between text-lg">
              <Link
                href="/tratamentos"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                ← Todos os Tratamentos
              </Link>

              <Link
                href="/tratamentos/hpv-anal"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Próximo →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
