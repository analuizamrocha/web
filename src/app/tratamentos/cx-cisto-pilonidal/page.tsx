import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/LinkButton'
import { TreatmentHeroImage } from '@/components/ui/TreatmentHeroImage'
import { RelatedBlogCard } from '@/components/ui/RelatedBlogCard'
import {
  WPP_NUMBER_NASSIF,
  WHATSAPP_MSG_TEXT_ENCODED,
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

const pageTitle = 'Cisto Pilonidal: Cirurgia e Recuperação'
const pageDescription =
  'Cirurgia para cisto pilonidal: técnica convencional e laser. Tratamento definitivo com recuperação rápida e menor dor pós-operatória em Curitiba.'
const pageUrl = `${WEBSITE_URL}/tratamentos/cx-cisto-pilonidal`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'cirurgia cisto pilonidal curitiba',
    'cisto pilonidal laser curitiba',
    'cirurgia coccix curitiba',
    'cisto sacrococcigeo curitiba',
    'tratamento cisto pilonidal',
    'laser pilonidal',
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
    question: 'O cisto pilonidal pode voltar após a cirurgia?',
    answer:
      'Sim. Tanto na cirurgia convencional quanto no laser existe risco de recidiva, embora o laser possa reduzir esse risco em alguns casos.',
  },
  {
    question: 'Qual é a diferença na recuperação entre as técnicas?',
    answer:
      'A cirurgia convencional exige curativos diários e recuperação mais longa, enquanto o laser costuma permitir retorno precoce às atividades.',
  },
  {
    question: 'Toda pessoa com cisto pilonidal precisa operar?',
    answer:
      'Não. Em fase aguda, é feita drenagem do abscesso. A cirurgia definitiva é indicada quando o quadro está controlado, para prevenir recidivas.',
  },
  {
    question: 'O laser é indicado em todos os casos?',
    answer:
      'Sim. Hoje se sabe que todo cisto pilonidal pode responder ao tratamento a laser, mas é importante entender que, assim como na cirurgia convencional, ainda existe risco de recidiva.',
  },
]

// Breadcrumb data for schema
const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Tratamentos', href: '/tratamentos' },
  { label: 'Cirurgia para Cisto Pilonidal' },
]

export default function CistoPilonidalPage() {
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
            name: 'Cirurgia para Cisto Pilonidal',
            description:
              'Tratamento cirúrgico do cisto pilonidal com técnicas convencionais e laser para resolução definitiva',
            procedureType: 'Pilonidal Cyst Surgery',
            bodyLocation: {
              '@type': 'AnatomicalStructure',
              name: 'Região Sacrococcígea',
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
            preparation: 'Controle de inflamação aguda, avaliação pré-operatória',
            followup: 'Acompanhamento pós-operatório para monitoramento da cicatrização',
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
              { label: 'Cirurgia para Cisto Pilonidal' },
            ]}
          />

          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-12 animate-fade-in">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="primary">Cirúrgico</Badge>
                <Badge variant="secondary">Convencional/Laser</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Cirurgia para Cisto Pilonidal
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                O cisto pilonidal é uma inflamação que ocorre na região do cóccix, geralmente
                relacionada à penetração de pelos na pele. Pode causar dor, inchaço, saída de
                secreção e formar abscessos recorrentes. Em muitos casos, a cirurgia é o tratamento
                definitivo.
              </p>
            </header>

            <TreatmentHeroImage slug="cx-cisto-pilonidal" />


            <main className="prose prose-lg max-w-none mb-12">
              <p>
                Existem duas abordagens principais: a técnica&nbsp;
                <strong>convencional</strong> e a técnica&nbsp;
                <strong>minimamente invasiva com laser</strong>.
              </p>

              <h2>Cirurgia convencional</h2>
              <p>
                A cirurgia convencional é a técnica mais tradicional no tratamento do cisto
                pilonidal.
              </p>

              <ul>
                <li>
                  <strong>Como é feita:</strong> retirada completa do trajeto fistuloso e do tecido
                  inflamado, podendo ser com fechamento primário (pontos) ou deixando a ferida
                  aberta para cicatrizar por segunda intenção.
                </li>
                <li>
                  <strong>Vantagens:</strong> tratamento consolidado, com ampla experiência na
                  literatura médica.
                </li>
              </ul>

              <p>
                <strong>Limitações:</strong>
              </p>
              <ul>
                <li>Recuperação mais longa.</li>
                <li>Necessidade de curativos diários.</li>
                <li>Dor pós-operatória mais intensa.</li>
                <li>Maior tempo afastado das atividades habituais.</li>
                <li>
                  <strong>Risco de recidiva</strong>, mesmo após a cirurgia.
                </li>
              </ul>

              <h2>Cirurgia a laser</h2>
              <p>
                O laser é uma alternativa moderna e menos invasiva para o tratamento do cisto
                pilonidal.
              </p>
              <p>
                Hoje se sabe que&nbsp;
                <strong>todo cisto pilonidal pode responder ao tratamento a laser</strong>, sendo
                válida a tentativa em praticamente todos os casos.
              </p>

              <ul>
                <li>
                  <strong>Como é feita:</strong> pequena incisão seguida da introdução da fibra de
                  laser, que cauteriza internamente o trajeto do cisto.
                </li>
              </ul>

              <p>
                <strong>Vantagens:</strong>
              </p>
              <ul>
                <li>Procedimento menos invasivo.</li>
                <li>Menor dor no pós-operatório.</li>
                <li>Recuperação mais rápida, com retorno precoce às atividades.</li>
                <li>Menor necessidade de curativos extensos.</li>
                <li>
                  Potencial para menor risco de recidiva, ao destruir seletivamente o trajeto do
                  cisto.
                </li>
              </ul>

              <p>
                <strong>Limitação:</strong> assim como na técnica convencional,&nbsp;
                <strong>também pode haver recidiva</strong>.
              </p>

              <h2>Quando operar?</h2>
              <p>
                O ideal é realizar a cirurgia&nbsp;
                <strong>quando a inflamação já estiver controlada</strong>.
              </p>
              <ul>
                <li>
                  Durante uma crise aguda com abscesso, o tratamento inicial é a&nbsp;
                  <strong>drenagem</strong>.
                </li>
                <li>
                  Após a melhora do quadro inflamatório, indica-se a cirurgia definitiva, reduzindo
                  riscos e aumentando a chance de sucesso.
                </li>
              </ul>

              <h2>Considerações finais</h2>
              <p>
                A escolha entre cirurgia convencional e laser deve ser feita junto ao
                coloproctologista.
              </p>
              <p>Ambas as técnicas são eficazes, mas nenhuma garante 100% de cura definitiva.</p>
              <p>
                Tanto na cirurgia convencional quanto no laser,&nbsp;
                <strong>pode haver recidiva</strong>, reforçando a importância de acompanhamento
                médico e cuidados locais após o tratamento.
              </p>

              <blockquote className="border-l-4 border-primary/30 pl-6 py-4 my-8 bg-primary/5 rounded-r-xl">
                <p className="text-secondary italic mb-0">
                  Cada caso deve ser avaliado individualmente, garantindo segurança e qualidade de
                  vida para o paciente.
                </p>
              </blockquote>

              <RelatedBlogCard treatmentSlug="cx-cisto-pilonidal" />

              <h2>Perguntas frequentes (FAQ)</h2>

              <div className="space-y-8 my-12">
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    O cisto pilonidal pode voltar após a cirurgia?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Sim. Tanto na cirurgia convencional quanto no laser existe risco de recidiva,
                    embora o laser possa reduzir esse risco em alguns casos.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    Qual é a diferença na recuperação entre as técnicas?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    A cirurgia convencional exige curativos diários e recuperação mais longa,
                    enquanto o laser costuma permitir retorno precoce às atividades.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    Toda pessoa com cisto pilonidal precisa operar?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Não. Em fase aguda, é feita drenagem do abscesso. A cirurgia definitiva é
                    indicada quando o quadro está controlado, para prevenir recidivas.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    O laser é indicado em todos os casos?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Sim. Hoje se sabe que todo cisto pilonidal pode responder ao tratamento a laser,
                    mas é importante entender que, assim como na cirurgia convencional, ainda existe
                    risco de recidiva.
                  </p>
                </div>
              </div>
            </main>

            <CallToActionCard
              title="Sofre com cisto pilonidal recorrente?"
              body={
                <p>
                  Agende uma consulta para avaliação especializada e definição da melhor técnica
                  cirúrgica. Tratamento definitivo com recuperação rápida e menor dor.
                </p>
              }
              actions={
                <LinkButton
                  href={`https://wa.me/${WPP_NUMBER_NASSIF}/?text=${WHATSAPP_MSG_TEXT_ENCODED}`}
                  external
                  newTab
                  variant="primary"
                  size="xl"
                  className="bg-primary hover:bg-primary/90 text-background shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold text-nowrap"
                  aria-label="Agendar consulta para tratamento de cisto pilonidal com coloproctologista em Curitiba - Dra. Ana Luiza Moraes Rocha por WhatsApp"
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
                href="/tratamentos/doencas-inflamatorias-intestinais"
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
