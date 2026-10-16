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

const pageTitle = 'Cisto Pilonidal: Cirurgia e Recuperação'
const pageDescription =
  'Entenda as opções de cirurgia para cisto pilonidal, incluindo técnicas convencionais e laser, e os cuidados discutidos na avaliação em Curitiba.'
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
      'Sim. Pode haver recidiva após diferentes técnicas, inclusive o laser. O acompanhamento considera a cicatrização e a evolução de cada paciente.',
  },
  {
    question: 'Qual é a diferença na recuperação entre as técnicas?',
    answer:
      'Os cuidados e o tempo de recuperação dependem da técnica, da extensão da doença e da cicatrização. O laser não garante retorno mais rápido às atividades.',
  },
  {
    question: 'Toda pessoa com cisto pilonidal precisa operar?',
    answer:
      'Não. A necessidade e o momento de uma intervenção dependem dos sintomas e da avaliação clínica. Quando há abscesso, a drenagem pode fazer parte do tratamento inicial.',
  },
  {
    question: 'O laser é indicado em todos os casos?',
    answer:
      'Não há uma técnica indicada para todos. A escolha depende da extensão da doença, de inflamação ativa e de tratamentos anteriores; outras abordagens podem ser mais adequadas.',
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
            description: pageDescription,
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
                secreção e formar abscessos recorrentes. A indicação de cirurgia e a escolha da
                técnica dependem dos sintomas e da avaliação individual.
              </p>
            </header>

            <TreatmentHeroImage slug="cx-cisto-pilonidal" preload />


            <div className="prose prose-lg max-w-none mb-12">
              <p>
                As opções incluem técnicas <strong>convencionais</strong> e abordagens
                <strong> minimamente invasivas, como o laser</strong>. Cada uma tem
                indicações e limitações que precisam ser discutidas na consulta.
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
                <li>Cuidados com a ferida conforme a técnica e a cicatrização.</li>
                <li>Possível necessidade de curativos frequentes.</li>
                <li>Dor pós-operatória que exige orientação e acompanhamento.</li>
                <li>Afastamento das atividades definido individualmente.</li>
                <li>
                  <strong>Risco de recidiva</strong>, mesmo após a cirurgia.
                </li>
              </ul>

              <h2>Cirurgia a laser</h2>
              <p>
                O laser é uma das opções minimamente invasivas para o tratamento do cisto
                pilonidal, conforme a avaliação clínica.
              </p>
              <p>
                A indicação depende da extensão dos trajetos, da presença de inflamação
                e do histórico de tratamentos. Outras técnicas podem ser mais adequadas
                para determinados pacientes.
              </p>

              <ul>
                <li>
                  <strong>Como é feita:</strong> pequena incisão seguida da introdução da fibra de
                  laser, que cauteriza internamente o trajeto do cisto.
                </li>
              </ul>

              <p>
                <strong>Aspectos a discutir na consulta:</strong>
              </p>
              <ul>
                <li>Adequação da técnica à extensão dos trajetos.</li>
                <li>Cuidados locais e controle da dor após o procedimento.</li>
                <li>Tempo de retorno às atividades conforme a evolução.</li>
                <li>Possibilidade de persistência, recidiva ou nova intervenção.</li>
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
                  Após o controle da inflamação, a necessidade de cirurgia e a técnica são
                  discutidas conforme os sintomas e a evolução.
                </li>
              </ul>

              <h2>Considerações finais</h2>
              <p>
                A escolha entre cirurgia convencional e laser deve ser feita junto ao
                coloproctologista.
              </p>
              <p>Nenhuma técnica garante cura definitiva ou ausência de recidiva.</p>
              <p>
                Tanto na cirurgia convencional quanto no laser,&nbsp;
                <strong>pode haver recidiva</strong>, reforçando a importância de acompanhamento
                médico e cuidados locais após o tratamento.
              </p>

              <blockquote className="border-l-4 border-primary/30 pl-6 py-4 my-8 bg-primary/5 rounded-r-xl">
                <p className="text-secondary italic mb-0">
                  Cada caso deve ser avaliado individualmente, considerando benefícios,
                  limitações e riscos do tratamento.
                </p>
              </blockquote>

              <p>
                Referência: <a href="https://doi.org/10.1093/bjs/znae237">diretriz da
                European Society of Coloproctology sobre doença pilonidal (2024)</a>.
              </p>

              <RelatedBlogCard treatmentSlug="cx-cisto-pilonidal" />

              <h2>Perguntas frequentes (FAQ)</h2>

              <div className="space-y-8 my-12">
                {faqItems.map(({ question, answer }) => (
                  <div key={question}>
                    <h3 className="text-xl font-serif font-bold text-primary mb-3">
                      {question}
                    </h3>
                    <p className="text-secondary leading-relaxed">{answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <CallToActionCard
              title="Sofre com cisto pilonidal recorrente?"
              body={
                <p>
                  Agende uma consulta para discutir as opções de tratamento, suas limitações
                  e os cuidados de recuperação conforme o seu caso.
                </p>
              }
              actions={
                <LinkButton
                  href={WHATSAPP_HREF_SECRETARY}
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
