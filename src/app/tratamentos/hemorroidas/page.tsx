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

const pageTitle = 'Hemorroidas — quando tratar e como funciona'
const pageDescription =
  'Ligadura elástica, escleroterapia, laser e THD. Entenda cada opção, quando a cirurgia é necessária e o que esperar da recuperação.'
const pageUrl = `${WEBSITE_URL}/tratamentos/hemorroidas`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'tratamento hemorroidas curitiba',
    'ligadura elástica curitiba',
    'escleroterapia hemorroidas',
    'cirurgia hemorroidas laser curitiba',
    'THD curitiba',
    'hemorroidectomia curitiba',
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
    question: 'Toda hemorroida precisa de cirurgia?',
    answer:
      'Não. Muitos casos melhoram com mudanças de hábitos, uso de fibras e tratamentos ambulatoriais, como ligadura elástica ou escleroterapia.',
  },
  {
    question: 'A ligadura elástica dói?',
    answer:
      'Pode causar desconforto leve nos primeiros dias, mas geralmente é bem tolerada e permite retorno rápido às atividades.',
  },
  {
    question: 'Qual é a diferença entre cirurgia convencional e a laser?',
    answer:
      'A convencional usa bisturi ou eletrocautério, já a laser pode causar menor trauma e recuperação mais confortável, em casos selecionados.',
  },
  {
    question: 'Existe risco de a hemorroida voltar após o tratamento?',
    answer:
      'Sim. Mesmo após cirurgia, hábitos como prisão de ventre, esforço evacuatório e dieta pobre em fibras podem favorecer a recidiva.',
  },
]

// Breadcrumb data for schema
const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Tratamentos', href: '/tratamentos' },
  { label: 'Tratamento de Hemorroidas' },
]

export default function TratamentoHemorroidasPage() {
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
            name: 'Tratamento de Hemorroidas',
            description:
              'Tratamentos especializados para hemorroidas incluindo ligadura elástica, escleroterapia, cirurgia laser e THD',
            procedureType: 'Proctological Treatment',
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
            preparation:
              'Avaliação médica detalhada, exames complementares quando necessário',
            followup: 'Acompanhamento médico conforme procedimento realizado',
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
              { label: 'Tratamento de Hemorroidas' },
            ]}
          />

          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-12 animate-fade-in">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="primary">Clínico/Cirúrgico</Badge>
                <Badge variant="secondary">Ambulatorial</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Tratamento de Hemorroidas
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                As hemorroidas são dilatações das veias do reto e ânus que podem
                causar sintomas como sangramento, dor, coceira e desconforto. O
                tratamento varia de acordo com o grau da doença, a intensidade
                dos sintomas e a resposta às medidas clínicas iniciais.
              </p>
            </header>

            <TreatmentHeroImage slug="hemorroidas" priority />


            <div className="prose prose-lg max-w-none mb-12">
              <p>
                Na coloproctologia moderna, diferentes técnicas podem ser
                utilizadas:
              </p>

              <h2>Ligadura elástica</h2>
              <p>
                A ligadura elástica é um&nbsp;
                <strong>procedimento ambulatorial</strong>.
              </p>
              <ul>
                <li>
                  Consiste em aplicar pequenas borrachinhas na base da
                  hemorroida, interrompendo seu suprimento de sangue.
                </li>
                <li>
                  Indicado principalmente para&nbsp;
                  <strong>hemorroidas internas de grau II e III</strong>.
                </li>
                <li>
                  Procedimento rápido, geralmente bem tolerado, com retorno
                  precoce às atividades.
                </li>
              </ul>

              <blockquote className="border-l-4 border-primary/30 pl-6 py-4 my-6 bg-primary/5 rounded-r-xl">
                <p className="text-secondary italic mb-0">
                  Pode haver desconforto leve após o procedimento, e em alguns
                  casos são necessárias mais de uma sessão.
                </p>
              </blockquote>

              <h2>Escleroterapia</h2>
              <p>
                A escleroterapia é feita pela aplicação de uma substância
                esclerosante dentro da hemorroida.
              </p>
              <ul>
                <li>Promove a retração dos vasos e melhora dos sintomas.</li>
                <li>
                  Indicado para <strong>hemorroidas internas menores</strong> ou
                  em pacientes que não podem se submeter a procedimentos
                  cirúrgicos.
                </li>
                <li>
                  Também pode ser usada em associação com a ligadura elástica.
                </li>
              </ul>

              <blockquote className="border-l-4 border-primary/30 pl-6 py-4 my-6 bg-primary/5 rounded-r-xl">
                <p className="text-secondary italic mb-0">
                  É um procedimento ambulatorial, minimamente invasivo e de
                  recuperação rápida.
                </p>
              </blockquote>

              <h2>Cirurgia convencional</h2>
              <p>
                A cirurgia convencional (hemorroidectomia) é indicada para casos
                mais avançados ou quando outros métodos não foram eficazes.
              </p>
              <ul>
                <li>
                  Consiste na remoção das hemorroidas com&nbsp;
                  <strong>
                    bisturi, eletrocautério ou grampeador cirúrgico
                  </strong>
                  .
                </li>
                <li>
                  Geralmente indicada para&nbsp;
                  <strong>hemorroidas de grau III volumosas ou grau IV</strong>.
                </li>
                <li>
                  Apresenta maior tempo de recuperação e pode estar associada a
                  dor pós-operatória.
                </li>
              </ul>

              <blockquote className="border-l-4 border-primary/30 pl-6 py-4 my-6 bg-primary/5 rounded-r-xl">
                <p className="text-secondary italic mb-0">
                  Apesar disso, continua sendo uma técnica eficaz para casos
                  selecionados.
                </p>
              </blockquote>

              <h2>Cirurgia a laser</h2>
              <p>
                O laser é uma tecnologia que pode ser utilizada de diferentes
                formas no tratamento das hemorroidas.
              </p>

              <h3>Hemorroidoplastia a laser</h3>
              <ul>
                <li>
                  Procedimento sem cortes, que utiliza energia laser para
                  reduzir o tecido hemorroidário.
                </li>
                <li>Pode proporcionar menos dor e recuperação rápida.</li>
                <li>
                  Indicada apenas em <strong>casos bem selecionados</strong>.
                </li>
                <li>
                  Possui risco de recidiva considerável, o que limita sua
                  indicação.
                </li>
              </ul>

              <h3>Hemorroidectomia a laser</h3>
              <ul>
                <li>
                  Similar à cirurgia convencional, mas o laser substitui bisturi
                  e eletrocautério.
                </li>
                <li>
                  Gera <strong>menor dano tecidual e térmico</strong>, o que
                  pode resultar em recuperação mais confortável.
                </li>
                <li>
                  Indicada em casos nos quais se deseja associação de eficácia e
                  redução de trauma cirúrgico.
                </li>
              </ul>

              <h2>THD – Desarterialização Hemorroidária Transanal</h2>
              <p>
                A&nbsp;
                <strong>THD (Transanal Hemorrhoidal Dearterialization)</strong>
                &nbsp; é uma técnica minimamente invasiva.
              </p>
              <ul>
                <li>
                  Utiliza doppler para identificar e ligar as artérias
                  hemorroidárias.
                </li>
                <li>
                  Pode ser associada a um lifting da mucosa, reduzindo o
                  prolapso.
                </li>
                <li>
                  Indicada principalmente para hemorroidas internas de grau II e
                  III.
                </li>
                <li>
                  Apresenta como vantagem o menor trauma e menor dor em
                  comparação à cirurgia convencional.
                </li>
              </ul>

              <blockquote className="border-l-4 border-primary/30 pl-6 py-4 my-6 bg-primary/5 rounded-r-xl">
                <p className="text-secondary italic mb-0">
                  A escolha dessa técnica depende da avaliação médica e da
                  disponibilidade do método.
                </p>
              </blockquote>

              <h2>Considerações finais</h2>
              <p>
                O tratamento ideal das hemorroidas deve ser definido após
                avaliação médica, levando em conta o&nbsp;
                <strong>
                  grau da doença, sintomas, histórico clínico e expectativas do
                  paciente
                </strong>
                .
              </p>
              <p>
                A coloproctologia dispõe de várias técnicas, desde procedimentos
                ambulatoriais até cirurgias minimamente invasivas, sempre com o
                objetivo de oferecer segurança e qualidade de vida ao paciente.
              </p>

              <RelatedBlogCard treatmentSlug="hemorroidas" />

              <h2>Perguntas frequentes (FAQ)</h2>

              <div className="space-y-8 my-12">
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    Toda hemorroida precisa de cirurgia?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Não. Muitos casos melhoram com mudanças de hábitos, uso de
                    fibras e tratamentos ambulatoriais, como ligadura elástica
                    ou escleroterapia.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    A ligadura elástica dói?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Pode causar desconforto leve nos primeiros dias, mas
                    geralmente é bem tolerada e permite retorno rápido às
                    atividades.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    Qual é a diferença entre cirurgia convencional e a laser?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    A convencional usa bisturi ou eletrocautério, já a laser
                    pode causar menor trauma e recuperação mais confortável, em
                    casos selecionados.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    Existe risco de a hemorroida voltar após o tratamento?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Sim. Mesmo após cirurgia, hábitos como prisão de ventre,
                    esforço evacuatório e dieta pobre em fibras podem favorecer
                    a recidiva.
                  </p>
                </div>
              </div>
            </div>

            <CallToActionCard
              title="Precisa de avaliação para tratamento de hemorroidas?"
              body={
                <p>
                  Agende uma consulta para avaliarmos o melhor tratamento para o
                  seu caso. Cada situação é única e merece atenção
                  especializada.
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
                  aria-label="Agendar consulta para tratamento de hemorroidas com coloproctologista em Curitiba - Dra. Ana Luiza Moraes Rocha por WhatsApp"
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
                href="/tratamentos/cx-fistulas-anorretais"
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
