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
} from '@/lib/constants'
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateOpenGraphMetadata,
  generateTwitterMetadata,
  type FAQItem,
  type BreadcrumbItem,
} from '@/lib/seo-schemas'

const pageTitle = 'Tratamento e cirurgia de hemorroidas em Curitiba'
const pageDescription =
  'Entenda como é a avaliação de hemorroidas em Curitiba, quando a ligadura elástica ou a cirurgia pode ser indicada e o que considerar na recuperação.'
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

const ligationId = `${pageUrl}#ligadura-elastica`
const surgeryId = `${pageUrl}#cirurgia`
const faqItems: FAQItem[] = [
  {
    question: 'Toda hemorroida precisa de cirurgia?',
    answer:
      'Não. Muitos casos melhoram com mudanças de hábitos, uso de fibras e tratamentos ambulatoriais, como ligadura elástica ou escleroterapia.',
  },
  {
    question: 'A ligadura elástica dói?',
    answer:
      'Pode haver desconforto após a ligadura. A intensidade e o tempo de recuperação variam. Na consulta, a médica explica o que esperar e quando procurar a equipe.',
  },
  {
    question: 'Qual é a diferença entre cirurgia convencional e a laser?',
    answer:
      'A hemorroidectomia remove o tecido hemorroidário e pode usar instrumentos convencionais ou laser. A hemorroidoplastia a laser usa energia para reduzir o tecido. A indicação depende dos achados da avaliação.',
  },
  {
    question: 'Existe risco de a hemorroida voltar após o tratamento?',
    answer:
      'Sim. Os sintomas podem voltar mesmo após o tratamento. Prisão de ventre e esforço para evacuar podem contribuir. A avaliação ajuda a identificar a causa se os sintomas reaparecerem.',
  },
  {
    question: 'Que anestesia é usada na cirurgia de hemorroidas?',
    answer:
      'A anestesia depende da técnica, do local do procedimento e da avaliação da equipe. Quando há indicação de cirurgia, a equipe orienta sobre a anestesia e o preparo.',
  },
  {
    question: 'Como é a recuperação após a cirurgia?',
    answer:
      'A recuperação depende do procedimento e da cicatrização. A equipe orienta os cuidados, o retorno às atividades e os sinais que precisam de avaliação.',
  },
  {
    question: 'De quanto tempo de afastamento vou precisar?',
    answer:
      'A estimativa de afastamento é individual. Ela leva em conta a cirurgia, a recuperação e o tipo de trabalho. A médica orienta sobre o retorno e avalia a necessidade de atestado.',
  },
]

// Breadcrumb data for schema
const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Tratamentos', href: '/tratamentos' },
  { label: 'Tratamento de Hemorroidas' },
]

const contextualLinkClassName =
  'cursor-pointer rounded-sm underline decoration-primary/40 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'

export default function TratamentoHemorroidasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Physician',
                '@id': `${WEBSITE_URL}/#physician`,
                availableService: [{ '@id': ligationId }, { '@id': surgeryId }],
              },
              {
                '@type': 'MedicalProcedure',
                '@id': ligationId,
                name: 'Ligadura elástica para hemorroidas',
                bodyLocation: 'Região anal',
              },
              {
                '@type': 'SurgicalProcedure',
                '@id': surgeryId,
                name: 'Cirurgia de hemorroidas',
                bodyLocation: 'Região anal',
              },
            ],
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
                {pageTitle}
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                A consulta com a Dra. Ana Luiza em Curitiba ajuda a entender a
                causa dos sintomas e a decidir se o cuidado envolve mudanças
                de hábitos, um procedimento ambulatorial ou cirurgia.
              </p>
            </header>

            <TreatmentHeroImage slug="hemorroidas" preload />

            <div className="prose prose-lg max-w-none mb-12">
              <h2>Como é a avaliação de hemorroidas?</h2>
              <p>
                Na consulta, a médica conversa sobre sintomas como sangramento,
                dor ou coceira, hábitos intestinais, medicamentos e tratamentos
                anteriores. O exame clínico ajuda a identificar a origem dos
                sintomas e a verificar se é preciso investigar outras causas.
                A partir dessa avaliação, vocês conversam sobre as opções e o
                acompanhamento.
              </p>
              <p>
                A consulta é na{' '}
                <Link
                  href="/locais-de-atendimento/clinica-nassif"
                  className={contextualLinkClassName}
                >
                  Clínica Nassif, no Batel
                </Link>
                . Quando há indicação de cirurgia, o procedimento é organizado
                em hospital parceiro, com orientação da equipe.
              </p>

              <h2>Tratamento clínico e procedimentos ambulatoriais</h2>
              <p>
                Cuidados com o hábito intestinal e medidas para aliviar os
                sintomas podem fazer parte do tratamento. Em alguns casos de
                hemorroidas internas, a avaliação pode indicar um procedimento
                ambulatorial.
              </p>

              <h3 id="ligadura-elastica">Ligadura elástica</h3>
              <p>
                A ligadura coloca um pequeno anel elástico na base da
                hemorroida interna para interromper seu suprimento de sangue.
                A indicação depende do tipo de hemorroida e dos sintomas.
                Pode haver desconforto após o procedimento, e alguns casos
                precisam de mais de uma sessão.
              </p>
              <p>
                Saiba em quais situações se considera{' '}
                <Link
                  href="/blog/ligadura-elastica-ou-cirurgia-hemorroida"
                  className={contextualLinkClassName}
                >
                  ligadura elástica ou cirurgia para hemorroida
                </Link>
                .
              </p>

              <h3>Escleroterapia</h3>
              <p>
                A escleroterapia é uma opção ambulatorial para casos
                selecionados de hemorroidas internas. O procedimento envolve
                a aplicação de uma substância que reduz o fluxo de sangue
                no tecido tratado.
              </p>

              <h2 id="cirurgia">Quando a cirurgia pode ser indicada?</h2>
              <p>
                A cirurgia pode ser considerada quando os sintomas persistem
                após outras medidas ou quando o exame identifica alterações
                que se beneficiariam de uma abordagem cirúrgica. A decisão
                considera o tipo de hemorroida, o histórico de saúde, os
                possíveis benefícios e os riscos.
              </p>

              <h3>Hemorroidectomia e cirurgia a laser</h3>
              <p>
                A hemorroidectomia remove o tecido hemorroidário e pode usar
                instrumentos convencionais ou laser. Na hemorroidoplastia a
                laser, a energia é aplicada dentro do tecido para reduzi-lo.
                A indicação depende do exame e do procedimento discutido na
                consulta.
              </p>
              <p>
                O artigo sobre{' '}
                <Link
                  href="/blog/cirurgia-laser-hemorroida-quando-faz-sentido"
                  className={contextualLinkClassName}
                >
                  quando a cirurgia a laser para hemorroida faz sentido
                </Link>{' '}
                explica essas diferenças. Veja também a página de{' '}
                <Link
                  href="/tratamentos/cx-laser"
                  className={contextualLinkClassName}
                >
                  cirurgia a laser em proctologia
                </Link>
                .
              </p>

              <h3>Desarterialização hemorroidária transanal (THD)</h3>
              <p>
                A THD usa Doppler para localizar e ligar vasos que irrigam
                as hemorroidas. A escolha da técnica e a disponibilidade
                são discutidas após a avaliação.
              </p>

              <h2>Recuperação e retorno ao trabalho</h2>
              <p>
                O retorno às atividades depende do procedimento, da
                cicatrização e do esforço exigido no trabalho. Se a cirurgia
                for indicada, converse com a equipe sobre os cuidados depois
                da alta e sobre o acompanhamento.
              </p>
              <p>
                Veja mais sobre a{' '}
                <Link
                  href="/blog/recuperacao-cirurgia-hemorroida-quanto-tempo"
                  className={contextualLinkClassName}
                >
                  recuperação da cirurgia de hemorroida
                </Link>
                .
              </p>

              <RelatedBlogCard treatmentSlug="hemorroidas" />

              <h2>Perguntas frequentes</h2>
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
              title="Precisa de avaliação para tratamento de hemorroidas?"
              body={
                <p>
                  A equipe pode informar o valor atual da consulta, o que ela
                  inclui e como confirmar as condições de atendimento
                  particular ou cobertura do seu plano. Se houver indicação
                  de cirurgia, os custos do procedimento são discutidos
                  individualmente após a avaliação.
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
