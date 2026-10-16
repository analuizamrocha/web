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

const pageTitle = 'Cirurgia a Laser Proctológica'
const pageDescription =
  'Conheça as aplicações do laser em coloproctologia, suas indicações e limitações. A escolha da técnica depende de avaliação individual em Curitiba.'
const pageUrl = `${WEBSITE_URL}/tratamentos/cx-laser`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'cirurgia laser hemorroidas curitiba',
    'fissura anal laser curitiba',
    'proctologia laser',
    'cirurgia minimamente invasiva curitiba',
    'proctologista laser curitiba',
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
    question: 'Todas as doenças anorretais podem ser tratadas com laser?',
    answer:
      'O laser é útil em casos selecionados e a indicação depende sempre da avaliação médica.',
  },
  {
    question: 'A cirurgia a laser é menos dolorosa que a convencional?',
    answer:
      'A dor depende do procedimento, da extensão do tratamento e da resposta individual. O uso do laser não garante um pós-operatório menos doloroso.',
  },
  {
    question: 'O laser substitui totalmente a cirurgia convencional?',
    answer:
      'Não. O laser é uma ferramenta moderna, mas não elimina a necessidade de técnicas tradicionais em determinados casos.',
  },
  {
    question: 'Quanto tempo leva para se recuperar de uma cirurgia a laser?',
    answer:
      'O prazo varia conforme o procedimento e a cicatrização individual. O retorno às atividades deve seguir as orientações da equipe responsável.',
  },
]

// Breadcrumb data for schema
const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Tratamentos', href: '/tratamentos' },
  { label: 'Cirurgias a Laser' },
]

export default function CirurgiasLaserPage() {
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
            name: 'Cirurgias a Laser em Proctologia',
            description: pageDescription,
            procedureType: 'Laser Surgery',
            bodyLocation: {
              '@type': 'AnatomicalStructure',
              name: 'Região Anorretal',
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
            preparation: 'Jejum de 8 horas, exames pré-operatórios',
            followup:
              'Consulta de retorno em 7 dias, orientações pós-operatórias detalhadas',
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
              { label: 'Cirurgias a Laser' },
            ]}
          />

          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-12 animate-fade-in">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="primary">Cirúrgico</Badge>
                <Badge variant="secondary">Minimamente Invasivo</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Cirurgias a Laser em Proctologia
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                O laser pode ser utilizado em procedimentos para algumas doenças
                anorretais. As indicações, limitações e alternativas precisam ser
                discutidas na avaliação individual. Dor, cicatrização e retorno
                às atividades variam conforme o procedimento e o paciente.
              </p>
            </header>

            <TreatmentHeroImage slug="cx-laser" preload />


            <div className="prose prose-lg max-w-none mb-12">
              <h2>Principais indicações</h2>
              <p>
                Na proctologia, o laser pode ser utilizado em diferentes
                situações:
              </p>
              <ul>
                <li>
                  <strong>Hemorroidas</strong> – tratamento minimamente invasivo
                  em casos selecionados.
                </li>
                <li>
                  <strong>Fissura anal</strong> – remoção de tecido crônico e
                  estímulo à cicatrização.
                </li>
                <li>
                  <strong>Fístulas anorretais</strong> – fechamento do trajeto
                  fistuloso em casos específicos.
                </li>
                <li>
                  <strong>Plicomas</strong> – remoção da sobra de pele quando
                  indicada após avaliação.
                </li>
                <li>
                  <strong>Cisto pilonidal</strong> – cauterização do trajeto,
                  podendo reduzir a necessidade de grandes incisões.
                </li>
              </ul>

              <blockquote className="border-l-4 border-primary/30 pl-6 py-4 my-8 bg-primary/5 rounded-r-xl">
                <p className="text-secondary italic mb-0">
                  <strong>Importante:</strong> A indicação do laser depende
                  sempre da avaliação individual de cada paciente. Nem todos os
                  casos se beneficiam dessa tecnologia, e a decisão deve ser
                  tomada em conjunto com o proctologista.
                </p>
              </blockquote>

              <h2>O que discutir antes de escolher a técnica</h2>
              <ul>
                <li>Qual procedimento será realizado e quais são as alternativas.</li>
                <li>A extensão do tratamento e os cuidados com a ferida.</li>
                <li>Como serão planejados o controle da dor e os retornos.</li>
                <li>Os riscos e a possibilidade de persistência ou recorrência.</li>
              </ul>
              <p>
                O uso do laser não garante ausência de dor, recuperação mais rápida
                ou menor chance de recidiva. A comparação depende da doença e da
                técnica específica, além das condições de cada paciente.
              </p>

              <h2>Considerações importantes</h2>
              <p>
                Apesar dos avanços, a cirurgia a laser&nbsp;
                <strong>
                  não substitui todos os procedimentos tradicionais
                </strong>
                . A escolha da técnica ideal deve considerar o tipo de doença,
                sua gravidade e o perfil do paciente.
              </p>
              <p>
                A decisão deve considerar os benefícios esperados, as limitações
                e os riscos de cada alternativa, sem prometer um resultado específico.
              </p>

              <RelatedBlogCard treatmentSlug="cx-laser" />

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
              title="Quer saber se a cirurgia a laser é adequada para o seu caso?"
              body={
                <p>
                  Agende uma consulta para avaliarmos juntos a melhor opção de
                  tratamento para sua condição. Cada caso é único e merece
                  atenção individual.
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
                  aria-label="Agendar consulta para cirurgia a laser com coloproctologista em Curitiba - Dra. Ana Luiza Moraes Rocha por WhatsApp"
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
                href="/tratamentos/hemorroidas"
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
