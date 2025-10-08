import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/LinkButton'
import { WPP_NUMBER_NASSIF, WHATSAPP_MSG_TEXT_ENCODED } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Síndrome do Intestino Irritável (SII) | Dra. Ana Luiza Moraes Rocha',
  description:
    'Diagnóstico e tratamento personalizado da Síndrome do Intestino Irritável (SII). Acompanhamento especializado em coloproctologia em Curitiba.',
  keywords: [
    'sindrome intestino irritavel curitiba',
    'SII curitiba',
    'intestino irritavel tratamento',
    'coloproctologista SII curitiba',
    'dor abdominal cronica',
    'disturbio funcional intestinal',
  ],
  alternates: {
    canonical:
      'https://analuizarocha.com.br/tratamentos/sindrome-intestino-irritavel',
  },
}

export default function SindromeIntestinoIrritavelPage() {
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
              'https://analuizarocha.com.br/tratamentos/sindrome-intestino-irritavel',
            name: 'Síndrome do Intestino Irritável',
            alternateName: ['SII', 'Intestino Irritável', 'IBS'],
            description:
              'Diagnóstico e tratamento personalizado da Síndrome do Intestino Irritável com acompanhamento especializado',
            associatedAnatomy: {
              '@type': 'AnatomicalStructure',
              name: 'Intestino',
            },
            possibleTreatment: [
              {
                '@type': 'MedicalTherapy',
                name: 'Mudanças Alimentares',
              },
              {
                '@type': 'MedicalTherapy',
                name: 'Terapia Medicamentosa',
              },
              {
                '@type': 'MedicalTherapy',
                name: 'Acompanhamento Psicológico',
              },
            ],
            signOrSymptom: [
              'Dor abdominal',
              'Alterações intestinais',
              'Inchaço abdominal',
              'Sensação de evacuação incompleta',
              'Excesso de gases',
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
              { label: 'Síndrome do Intestino Irritável' },
            ]}
          />

          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-12 animate-fade-in">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="primary">Funcional</Badge>
                <Badge variant="secondary">Personalizado</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Síndrome do Intestino Irritável (SII): Diagnóstico e Tratamento
                Personalizado
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                A Síndrome do Intestino Irritável (SII) é um distúrbio funcional
                do intestino que afeta milhões de pessoas em todo o mundo.
                Embora não seja uma doença grave, pode causar grande impacto na
                qualidade de vida, com sintomas que variam de desconforto
                abdominal a alterações importantes no hábito intestinal.
              </p>
            </header>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <p>
                O diagnóstico correto e o acompanhamento com&nbsp;
                <strong>coloproctologista</strong> são fundamentais para
                diferenciar a SII de outras doenças intestinais e garantir um
                tratamento eficaz.
              </p>

              <h2>Principais Sintomas da Síndrome do Intestino Irritável</h2>
              <p>
                Os sintomas da SII podem variar de pessoa para pessoa, mas os
                mais comuns incluem:
              </p>
              <ul>
                <li>Dor ou desconforto abdominal recorrente.</li>
                <li>
                  Alterações no hábito intestinal: diarreia, constipação ou
                  alternância entre ambos.
                </li>
                <li>Sensação de evacuação incompleta.</li>
                <li>Inchaço abdominal e excesso de gases.</li>
                <li>Muco nas fezes.</li>
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
                      ⚠️ É importante ressaltar que sintomas como&nbsp;
                      <strong>
                        sangramento intestinal, febre ou perda de peso não
                        explicada
                      </strong>
                      &nbsp; não são típicos da SII e devem sempre ser
                      investigados pelo coloproctologista.
                    </p>
                  </div>
                </div>
              </div>

              <h2>Diagnóstico da Síndrome do Intestino Irritável</h2>
              <p>
                O diagnóstico é clínico, baseado nos sintomas e na exclusão de
                outras doenças, como:
              </p>
              <ul>
                <li>
                  Doenças Inflamatórias Intestinais (Doença de Crohn e
                  Retocolite Ulcerativa).
                </li>
                <li>Intolerâncias alimentares.</li>
                <li>Neoplasias do cólon e reto.</li>
              </ul>

              <p>
                O coloproctologista pode solicitar exames complementares,
                como&nbsp;
                <strong>
                  colonoscopia, exames de sangue e testes de intolerância
                  alimentar
                </strong>
                , para confirmar o diagnóstico e afastar condições mais graves.
              </p>

              <h2>Tratamento da Síndrome do Intestino Irritável</h2>
              <p>
                O tratamento da SII é <strong>individualizado</strong>, adaptado
                à gravidade dos sintomas e ao perfil de cada paciente. Entre as
                abordagens estão:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                  <h3 className="text-primary font-bold mb-3">
                    Mudanças Alimentares
                  </h3>
                  <p className="text-secondary">
                    Ajuste na dieta, aumento de fibras (quando indicado) ou
                    redução de alimentos que desencadeiam sintomas.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">Medicamentos</h3>
                  <p className="text-secondary">
                    Podem ser usados para controle da dor abdominal, diarreia ou
                    constipação, de acordo com a necessidade.
                  </p>
                </div>

                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                  <h3 className="text-primary font-bold mb-3">Probióticos</h3>
                  <p className="text-secondary">
                    Em alguns casos, auxiliam na melhora dos sintomas e
                    equilíbrio da flora intestinal.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    Acompanhamento Psicológico
                  </h3>
                  <p className="text-secondary">
                    Técnicas de manejo do estresse e ansiedade podem ser
                    recomendadas, já que fatores emocionais influenciam os
                    sintomas da SII.
                  </p>
                </div>
              </div>

              <h2>Acompanhamento Personalizado</h2>
              <p>
                Cada paciente com SII apresenta sintomas e gatilhos diferentes.
              </p>
              <p>
                Por isso, o acompanhamento deve ser&nbsp;
                <strong>personalizado</strong>, envolvendo:
              </p>
              <ul>
                <li>Consulta detalhada em coloproctologia.</li>
                <li>
                  Planejamento de tratamento adaptado ao estilo de vida do
                  paciente.
                </li>
                <li>
                  Monitoramento contínuo para ajustes nas condutas, conforme a
                  evolução clínica.
                </li>
              </ul>

              <h2>Considerações Finais</h2>
              <p>
                A <strong>Síndrome do Intestino Irritável</strong> exige
                acompanhamento contínuo e um plano de tratamento adaptado às
                necessidades de cada paciente.
              </p>
              <p>
                O <strong>coloproctologista em Curitiba</strong> é o
                profissional indicado para diagnóstico, acompanhamento e
                tratamento personalizado, sempre visando melhorar sua qualidade
                de vida.
              </p>

              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 my-8">
                <p className="text-primary mb-0">
                  👉 Se você sofre com sintomas de SII, agende sua avaliação em
                  coloproctologia e descubra as melhores estratégias para o seu
                  caso.
                </p>
              </div>

              <h2>Perguntas Frequentes (FAQ)</h2>

              <div className="space-y-6">
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    1. A Síndrome do Intestino Irritável tem cura?
                  </h3>
                  <p className="text-secondary mb-0">
                    Não existe cura definitiva, mas com tratamento adequado os
                    sintomas podem ser controlados, proporcionando qualidade de
                    vida.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    2. Preciso fazer colonoscopia para diagnosticar SII?
                  </h3>
                  <p className="text-secondary mb-0">
                    Nem sempre. A colonoscopia pode ser indicada para excluir
                    outras doenças, especialmente em pacientes acima de 45 anos
                    ou com sintomas de alarme.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    3. Quais alimentos pioram a SII?
                  </h3>
                  <p className="text-secondary mb-0">
                    Os gatilhos variam, mas alimentos ricos em gordura, cafeína,
                    lactose e dietas com excesso de FODMAPs podem intensificar
                    os sintomas.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    4. Quando procurar um coloproctologista em Curitiba?
                  </h3>
                  <p className="text-secondary mb-0">
                    Se você apresenta dor abdominal recorrente, diarreia ou
                    constipação frequentes, ou suspeita de Síndrome do Intestino
                    Irritável, é indicado buscar avaliação com um especialista.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <CallToActionCard
              title="Sofre com sintomas de Intestino Irritável?"
              body={
                <p>
                  Agende uma consulta para avaliação especializada e
                  desenvolvimento de um plano de tratamento personalizado. Cada
                  caso é único e merece atenção individualizada.
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
                href="/tratamentos"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Ver Todos os Tratamentos →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
