import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/LinkButton'
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

const pageTitle = 'Fístula Anal: Cirurgia Especializada'
const pageDescription =
  'Tratamentos cirúrgicos especializados para fístulas anorretais: fistulotomia, retalho mucoso, LIFT, laser e técnicas combinadas em Curitiba.'
const pageUrl = `${WEBSITE_URL}/tratamentos/cx-fistulas-anorretais`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'cirurgia fistula anal curitiba',
    'fistulotomia curitiba',
    'retalho mucoso fistula',
    'LIFT cirurgia curitiba',
    'laser fistula anal',
    'seton fistula anal curitiba',
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
    question: 'A fístula anal pode fechar sozinha?',
    answer:
      'Não. Diferente de um abscesso, a fístula geralmente não cicatriza espontaneamente e requer avaliação cirúrgica.',
  },
  {
    question: 'Qual é o melhor tipo de cirurgia para fístula anal?',
    answer:
      'Não existe uma única técnica ideal. A escolha depende do tipo de fístula, sua relação com o esfíncter e o histórico do paciente.',
  },
  {
    question: 'Toda cirurgia de fístula anal causa incontinência?',
    answer:
      'Não. Muitas técnicas modernas buscam preservar o esfíncter. O risco de incontinência depende da complexidade da fístula e do procedimento escolhido.',
  },
  {
    question: 'O laser pode ser usado no tratamento da fístula?',
    answer:
      'Sim. Existem técnicas a laser que cauterizam o trajeto, com menos dano tecidual. Contudo, o sucesso depende do tamanho e da posição da fístula.',
  },
  {
    question: 'O que acontece se eu não operar uma fístula anal?',
    answer:
      'A fístula pode causar infecções recorrentes, dor, secreção crônica e formar novos trajetos, tornando o tratamento mais complexo no futuro.',
  },
]

// Breadcrumb data for schema
const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Tratamentos', href: '/tratamentos' },
  { label: 'Cirurgias para Fístulas Anorretais' },
]

export default function CirurgiaFistulasPage() {
  return (
    <>
      {/* Medical Procedure Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            '@id': `${WEBSITE_URL}/tratamentos/cx-fistulas-anorretais`,
            name: 'Cirurgias para Fístulas Anorretais',
            description:
              'Tratamentos cirúrgicos especializados para fístulas anorretais incluindo fistulotomia, retalho mucoso, LIFT e técnicas a laser',
            procedureType: 'Anorectal Fistula Surgery',
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
            preparation: 'Avaliação pré-operatória detalhada, exames de imagem quando necessário',
            followup: 'Acompanhamento médico especializado conforme técnica cirúrgica utilizada',
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
              { label: 'Cirurgias para Fístulas Anorretais' },
            ]}
          />

          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-12 animate-fade-in">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="primary">Cirúrgico</Badge>
                <Badge variant="secondary">Especializado</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Cirurgias para Fístulas Anorretais
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                As fístulas anorretais são comunicações anormais entre o canal anal e a pele ao
                redor do ânus. O tratamento geralmente é cirúrgico, e a escolha da técnica depende
                do trajeto da fístula, da sua relação com o esfíncter anal e das características
                individuais de cada paciente.
              </p>
            </header>

            <main className="prose prose-lg max-w-none mb-12">
              <p>
                Costumam surgir após abscessos anorretais e podem provocar secreção, dor e
                desconforto.
              </p>

              <h2>Fistulotomia</h2>
              <ul>
                <li>Técnica mais tradicional e eficaz em fístulas simples, de baixo trajeto.</li>
                <li>
                  Consiste em abrir o trajeto fistuloso, permitindo cicatrização de dentro para
                  fora.
                </li>
                <li>
                  <strong>Vantagem:</strong> altas taxas de cura.
                </li>
                <li>
                  <strong>Limitação:</strong> risco de incontinência em fístulas que envolvem parte
                  significativa do esfíncter.
                </li>
              </ul>

              <h2>Retalho mucoso de avanço</h2>
              <ul>
                <li>
                  Indicado para fístulas complexas, especialmente as que comprometem grande parte do
                  esfíncter.
                </li>
                <li>
                  Consiste em fechar o orifício interno com um retalho de tecido da própria mucosa.
                </li>
                <li>
                  <strong>Vantagem:</strong> preserva a continência anal.
                </li>
                <li>
                  <strong>Limitação:</strong> pode ter taxas de recidiva e requer maior experiência
                  cirúrgica.
                </li>
              </ul>

              <h2>Seton</h2>
              <ul>
                <li>Fio cirúrgico ou dreno colocado no trajeto da fístula.</li>
                <li>
                  Pode ser <strong>frouxo</strong>, para manter a drenagem e evitar abscessos, ou{' '}
                  <strong>cortante</strong>, usado de forma progressiva em alguns casos.
                </li>
                <li>
                  <strong>Vantagem:</strong> útil em fístulas complexas e em casos de infecção
                  ativa.
                </li>
                <li>
                  <strong>Limitação:</strong> pode ser desconfortável e exigir múltiplos
                  procedimentos.
                </li>
              </ul>

              <h2>LIFT (Ligation of Intersphincteric Fistula Tract)</h2>
              <ul>
                <li>Técnica minimamente invasiva para fístulas transesfincterianas.</li>
                <li>O trajeto é identificado no espaço interesfincteriano e ligado/cortado.</li>
                <li>
                  <strong>Vantagem:</strong> preserva o esfíncter, com menor risco de incontinência.
                </li>
                <li>
                  <strong>Limitação:</strong> não indicada para todos os tipos de fístula.
                </li>
              </ul>

              <h2>Aplicação de fibrina ou PRF</h2>
              <ul>
                <li>
                  Consiste no preenchimento do trajeto fistuloso com colas biológicas ou derivados
                  de sangue autólogo.
                </li>
                <li>
                  O <strong>PRF (Plasma Rico em Fibrina)</strong> utiliza fatores de crescimento
                  para estimular a cicatrização.
                </li>
              </ul>

              <blockquote className="border-l-4 border-primary/30 pl-6 py-4 my-8 bg-primary/5 rounded-r-xl">
                <p className="text-secondary italic mb-0">
                  <strong>Importante:</strong> no Brasil, o uso de PRF não possui aprovação da
                  Anvisa para cirurgias coloproctológicas fora do âmbito da pesquisa científica.
                </p>
              </blockquote>

              <h2>Técnicas com laser</h2>
              <ul>
                <li>
                  O laser pode ser utilizado para cauterizar o trajeto fistuloso (FiLaC –
                  Fistula-tract Laser Closure).
                </li>
                <li>
                  <strong>Vantagem:</strong> técnica minimamente invasiva, preserva o esfíncter.
                </li>
                <li>
                  <strong>Limitação:</strong> a taxa de sucesso varia de acordo com o tamanho e a
                  espessura do trajeto, bem como a relação do trajeto com a musculatura.
                </li>
              </ul>

              <h2>Técnicas combinadas</h2>
              <ul>
                <li>
                  Algumas vezes, técnicas podem ser <strong>associadas</strong>
                  &nbsp; para aumentar a chance de cicatrização e reduzir o risco de incontinência.
                </li>
                <li>
                  Exemplos: <strong>LIFT + laser</strong> ou&nbsp;
                  <strong>retalho mucoso + laser</strong>.
                </li>
                <li>
                  A escolha depende das características da fístula e da experiência do cirurgião.
                </li>
              </ul>

              <h2>Importância do Seton em fístulas complexas</h2>
              <p>
                Em casos de&nbsp;
                <strong>
                  fístulas complexas, extensas ou com trajeto espesso, muitas vezes a primeira etapa
                  do tratamento é a colocação de um seton (sedenho)
                </strong>
                .
              </p>
              <ul>
                <li>
                  Essa estratégia permite manter a fístula drenada, reduzir a inflamação local e
                  preparar o trajeto para uma cirurgia definitiva em segundo tempo.
                </li>
              </ul>

              <h2>Considerações finais</h2>
              <p>Cada fístula é única e a decisão do tratamento também deve ser.</p>
              <p>
                O objetivo sempre é equilibrar a&nbsp;
                <strong>cura da fístula</strong> com a&nbsp;
                <strong>preservação da função esfincteriana</strong> e a&nbsp;
                <strong>qualidade de vida do paciente</strong>.
              </p>

              <blockquote className="border-l-4 border-primary/30 pl-6 py-4 my-8 bg-primary/5 rounded-r-xl">
                <p className="text-secondary italic mb-0">
                  Procure sempre avaliação individualizada com um coloproctologista para definição
                  da melhor estratégia de tratamento.
                </p>
              </blockquote>

              <h2>Perguntas frequentes (FAQ)</h2>

              <div className="space-y-8 my-12">
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    A fístula anal pode fechar sozinha?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Não. Diferente de um abscesso, a fístula geralmente não cicatriza
                    espontaneamente e requer avaliação cirúrgica.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    Qual é o melhor tipo de cirurgia para fístula anal?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Não existe uma única técnica ideal. A escolha depende do tipo de fístula, sua
                    relação com o esfíncter e o histórico do paciente.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    Toda cirurgia de fístula anal causa incontinência?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Não. Muitas técnicas modernas buscam preservar o esfíncter. O risco de
                    incontinência depende da complexidade da fístula e do procedimento escolhido.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    O laser pode ser usado no tratamento da fístula?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Sim. Existem técnicas a laser que cauterizam o trajeto, com menos dano tecidual.
                    Contudo, o sucesso depende do tamanho e da posição da fístula.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    O que acontece se eu não operar uma fístula anal?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    A fístula pode causar infecções recorrentes, dor, secreção crônica e formar
                    novos trajetos, tornando o tratamento mais complexo no futuro.
                  </p>
                </div>
              </div>
            </main>

            <CallToActionCard
              title="Precisa de avaliação para tratamento de fístula anorretal?"
              body={
                <p>
                  Agende uma consulta para avaliarmos a melhor estratégia cirúrgica para o seu caso.
                  Cada fístula é única e requer atenção especializada.
                </p>
              }
              actions={
                <LinkButton
                  href={`https://wa.me/${WPP_NUMBER_NASSIF}/?text=${WHATSAPP_MSG_TEXT_ENCODED}`}
                  external
                  newTab
                  variant="primary"
                  size="xl"
                  className="group bg-primary hover:bg-primary/90 text-background shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold text-nowrap"
                  aria-label="Agendar consulta para tratamento de fístulas anorretais com coloproctologista em Curitiba - Dra. Ana Luiza Moraes Rocha por WhatsApp"
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
                href="/tratamentos/toxina-botulinica"
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
