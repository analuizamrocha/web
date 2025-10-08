import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/LinkButton'
import { WPP_NUMBER_NASSIF, WHATSAPP_MSG_TEXT_ENCODED } from '@/lib/constants'

export const metadata: Metadata = {
  title:
    'Doenças Inflamatórias Intestinais (DII) | Dra. Ana Luiza Moraes Rocha',
  description:
    'Diagnóstico e tratamento de Doenças Inflamatórias Intestinais: Doença de Crohn e Retocolite Ulcerativa. Acompanhamento especializado em Curitiba.',
  keywords: [
    'doenças inflamatórias intestinais curitiba',
    'doença de crohn curitiba',
    'retocolite ulcerativa curitiba',
    'DII curitiba',
    'coloproctologista DII',
    'tratamento crohn curitiba',
  ],
  alternates: {
    canonical:
      'https://analuizarocha.com.br/tratamentos/doencas-inflamatorias-intestinais',
  },
}

export default function DoencasInflamatoriasIntestinaisPage() {
  return (
    <>
      {/* Medical Condition Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalCondition',
            '@id':
              'https://analuizarocha.com.br/tratamentos/doencas-inflamatorias-intestinais',
            name: 'Doenças Inflamatórias Intestinais',
            alternateName: ['DII', 'Doença de Crohn', 'Retocolite Ulcerativa'],
            description:
              'Diagnóstico e tratamento especializado de Doenças Inflamatórias Intestinais incluindo Doença de Crohn e Retocolite Ulcerativa',
            associatedAnatomy: {
              '@type': 'AnatomicalStructure',
              name: 'Trato Gastrointestinal',
            },
            possibleTreatment: [
              {
                '@type': 'MedicalTherapy',
                name: 'Terapia Medicamentosa',
              },
              {
                '@type': 'MedicalTherapy',
                name: 'Terapias Biológicas',
              },
              {
                '@type': 'MedicalProcedure',
                name: 'Acompanhamento Coloproctológico',
              },
            ],
            signOrSymptom: [
              'Dor abdominal',
              'Diarreia',
              'Sangramento intestinal',
              'Perda de peso',
              'Fadiga',
            ],
          }),
        }}
      />

      <section className="section bg-background pt-24 md:pt-28">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Início', href: '/' },
              { label: 'Tratamentos', href: '/tratamentos' },
              { label: 'Doenças Inflamatórias Intestinais' },
            ]}
          />

          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-12 animate-fade-in">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="primary">Clínico</Badge>
                <Badge variant="secondary">Crônico</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Doenças Inflamatórias Intestinais (DII): Diagnóstico e
                Tratamento
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                As Doenças Inflamatórias Intestinais (DII) englobam
                principalmente a Doença de Crohn e a Retocolite Ulcerativa. São
                doenças crônicas que afetam o trato gastrointestinal, provocando
                inflamação persistente e impactando a qualidade de vida dos
                pacientes.
              </p>
            </header>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <p>
                Com acompanhamento adequado em <strong>coloproctologia</strong>,
                é possível controlar os sintomas, prevenir complicações e manter
                o bem-estar.
              </p>
              <p>
                Se você busca tratamento de&nbsp;
                <strong>Doenças Inflamatórias Intestinais em Curitiba</strong>,
                o coloproctologista é o especialista indicado para sua
                avaliação.
              </p>

              <h2>Sintomas das Doenças Inflamatórias Intestinais</h2>
              <p>
                Os sintomas variam conforme o tipo e a gravidade da doença, mas
                os mais comuns incluem:
              </p>
              <ul>
                <li>Dor ou cólicas abdominais.</li>
                <li>Diarreia frequente, com ou sem sangue.</li>
                <li>Sangramento nas evacuações.</li>
                <li>Perda de peso não intencional.</li>
                <li>Cansaço ou fadiga persistente.</li>
                <li>Urgência para evacuar.</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      ⚠️ Em alguns casos, também podem ocorrer manifestações
                      fora do intestino, como alterações na pele, olhos e
                      articulações.
                    </p>
                  </div>
                </div>
              </div>

              <h2>Doença de Crohn x Retocolite Ulcerativa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                  <h3 className="text-primary font-bold mb-3">
                    Doença de Crohn
                  </h3>
                  <p className="text-secondary">
                    Pode afetar qualquer parte do tubo digestivo, da boca ao
                    ânus, atingindo todas as camadas da parede intestinal.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    Retocolite Ulcerativa
                  </h3>
                  <p className="text-secondary">
                    Afeta apenas o intestino grosso (cólon e reto), com
                    inflamação restrita à camada interna da mucosa.
                  </p>
                </div>
              </div>

              <p>
                Apesar de diferentes, ambas exigem acompanhamento contínuo
                com&nbsp;
                <strong>coloproctologista</strong>.
              </p>

              <h2>Diagnóstico</h2>
              <p>
                O diagnóstico das Doenças Inflamatórias Intestinais envolve:
              </p>
              <ul>
                <li>Avaliação clínica detalhada.</li>
                <li>
                  Exames laboratoriais (anemia, inflamação, deficiências
                  nutricionais).
                </li>
                <li>
                  <strong>Colonoscopia com biópsia</strong>: exame fundamental
                  para confirmar o diagnóstico e diferenciar Crohn de
                  retocolite.
                </li>
                <li>
                  Exames de imagem (ressonância magnética, tomografia) em casos
                  selecionados.
                </li>
              </ul>

              <h2>Tratamento das Doenças Inflamatórias Intestinais</h2>
              <p>
                O tratamento é <strong>individualizado</strong>, dependendo do
                tipo, extensão e gravidade da doença.
              </p>
              <p>Entre as opções estão:</p>
              <ul>
                <li>
                  <strong>Corticoides</strong>: usados em fases de crise para
                  reduzir inflamação.
                </li>
                <li>
                  <strong>Imunossupressores</strong>: ajudam a controlar a
                  resposta inflamatória.
                </li>
                <li>
                  <strong>Terapias biológicas (imunobiológicos)</strong>:
                  indicadas em casos moderados a graves, bloqueiam mecanismos
                  específicos da inflamação.
                </li>
                <li>
                  <strong>Acompanhamento nutricional</strong>: essencial para
                  corrigir deficiências e melhorar a resposta ao tratamento.
                </li>
                <li>
                  <strong>Cirurgia</strong>: pode ser necessária em complicações
                  como estenoses, fístulas ou sangramentos importantes.
                </li>
              </ul>

              <p>
                O objetivo principal é alcançar e manter a&nbsp;
                <strong>remissão</strong>, reduzindo crises e proporcionando
                qualidade de vida.
              </p>

              <h2>Importância do Coloproctologista</h2>
              <p>
                O <strong>coloproctologista</strong> tem papel fundamental no
                diagnóstico e acompanhamento das Doenças Inflamatórias
                Intestinais.
              </p>
              <p>
                Em <strong>Curitiba</strong>, há centros de referência em
                coloproctologia que permitem integrar diagnóstico, tratamento
                clínico e, quando necessário, opções cirúrgicas.
              </p>

              <h2>Considerações Finais</h2>
              <p>
                As Doenças Inflamatórias Intestinais exigem cuidado contínuo e
                acompanhamento especializado.
              </p>
              <p>
                O diagnóstico precoce e o tratamento individualizado com&nbsp;
                <strong>coloproctologista em Curitiba</strong> são fundamentais
                para reduzir sintomas e melhorar a qualidade de vida.
              </p>

              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 my-8">
                <p className="text-primary mb-0">
                  👉 Se você apresenta sintomas sugestivos de Doença de Crohn ou
                  Retocolite Ulcerativa, agende sua avaliação em
                  coloproctologia.
                </p>
              </div>

              <h2>Perguntas Frequentes (FAQ)</h2>

              <div className="space-y-6">
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    1. Doença de Crohn e retocolite ulcerativa são a mesma
                    coisa?
                  </h3>
                  <p className="text-secondary mb-0">
                    Não. Ambas são Doenças Inflamatórias Intestinais, mas têm
                    características diferentes. O diagnóstico correto é feito
                    pelo coloproctologista.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    2. Existe cura para as Doenças Inflamatórias Intestinais?
                  </h3>
                  <p className="text-secondary mb-0">
                    Atualmente, não existe cura definitiva. Com tratamento
                    adequado, é possível controlar os sintomas e viver com
                    qualidade.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    3. Preciso de acompanhamento contínuo mesmo sem sintomas?
                  </h3>
                  <p className="text-secondary mb-0">
                    Sim. Mesmo em períodos de remissão, é essencial o
                    acompanhamento com coloproctologia para prevenir
                    complicações e ajustar o tratamento.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    4. Quando devo procurar um coloproctologista em Curitiba?
                  </h3>
                  <p className="text-secondary mb-0">
                    Se você apresenta dor abdominal frequente, diarreia
                    persistente, sangramento nas fezes ou perda de peso sem
                    causa aparente, deve procurar avaliação com um especialista
                    em coloproctologia.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <CallToActionCard
              title="Suspeita de Doença Inflamatória Intestinal?"
              body={
                <p>
                  Agende uma consulta para avaliação especializada e diagnóstico
                  preciso. O acompanhamento adequado é fundamental para
                  controlar os sintomas e manter sua qualidade de vida.
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
                  aria-label="Enviar mensagem para Dra. Ana Luiza Moraes Rocha por WhatsApp"
                >
                  Agendar consulta
                </LinkButton>
              }
              variant="secondary"
            />

            {/* Navigation */}
            <div className="flex items-center justify-between text-lg">
              <Link
                href="/tratamentos"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                ← Todos os Tratamentos
              </Link>

              <Link
                href="/tratamentos/sindrome-intestino-irritavel"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Próximo: Sindrome do Intestino Irritavel →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
