import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/LinkButton'
import { WPP_NUMBER_NASSIF, WHATSAPP_MSG_TEXT_ENCODED } from '@/lib/constants'

export const metadata: Metadata = {
  title:
    'Tratamento de HPV Anal: Condilomas e Verrugas | Dra. Ana Luiza Moraes Rocha',
  description:
    'Tratamento especializado de HPV anal: remoção de condilomas e verrugas com laser, eletrocauterização e terapias tópicas em Curitiba.',
  keywords: [
    'tratamento HPV anal curitiba',
    'condiloma anal curitiba',
    'verrugas anais curitiba',
    'laser HPV anal',
    'eletrocauterização HPV',
    'imiquimode condiloma',
  ],
  alternates: {
    canonical: 'https://analuizarocha.com.br/tratamentos/tratamento-hpv-anal',
  },
}

export default function TratamentoHpvAnalPage() {
  return (
    <>
      {/* Medical Procedure Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            '@id':
              'https://analuizarocha.com.br/tratamentos/tratamento-hpv-anal',
            name: 'Tratamento de HPV Anal: Condilomas e Verrugas',
            description:
              'Tratamento especializado de lesões de HPV anal incluindo condilomas e verrugas com técnicas cirúrgicas e tópicas',
            procedureType: 'HPV Treatment',
            bodyLocation: {
              '@type': 'AnatomicalStructure',
              name: 'Região Anal',
            },
            performer: {
              '@type': 'Physician',
              name: 'Dra. Ana Luiza Moraes Rocha',
              hasCredential: [
                {
                  '@type': 'EducationalOccupationalCredential',
                  identifier: 'CRM-PR 45351',
                },
              ],
            },
            preparation:
              'Avaliação das lesões, análise de extensão e localização',
            followup:
              'Acompanhamento médico para monitoramento de recidivas e cicatrização',
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
              { label: 'Tratamento de HPV Anal' },
            ]}
          />

          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-12 animate-fade-in">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="primary">Clínico/Cirúrgico</Badge>
                <Badge variant="secondary">Especializado</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Tratamento das Lesões de HPV Anal: Condilomas e Verrugas
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                O HPV (Papilomavírus Humano) é uma das infecções sexualmente
                transmissíveis mais comuns e pode afetar a região anal, causando
                verrugas ou condilomas. O tratamento é fundamental não apenas
                para remover as lesões visíveis, mas também para reduzir
                sintomas e evitar complicações.
              </p>
            </header>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <p>
                Essas lesões podem provocar desconforto, sangramento, coceira e,
                em alguns casos, constrangimento estético.
              </p>

              <h2>Tratamento Cirúrgico</h2>
              <p>
                O tratamento cirúrgico busca a&nbsp;
                <strong>remoção direta das lesões</strong>, sendo indicado em
                condilomas maiores, múltiplos ou resistentes a terapias tópicas.
              </p>

              <h3>Laser</h3>
              <ul>
                <li>
                  O laser demonstrou <strong>maior precisão cirúrgica</strong>,
                  facilidade de manejo e&nbsp;
                  <strong>
                    redução significativa da carga viral por célula após o
                    processo de cicatrização
                  </strong>
                  , sugerindo superioridade em termos de controle viral local e
                  potencial redução de recidivas.
                </li>
                <li>
                  No contexto de lesões genitais, o&nbsp;
                  <strong>laser de diodo</strong> apresenta taxas de cura
                  elevadas e baixa recorrência, com excelente perfil de
                  segurança e mínima dor pós-operatória.
                </li>
                <li>
                  <strong>Limitação:</strong> embora seja altamente eficaz e
                  seguro, a&nbsp;
                  <strong>
                    superioridade absoluta sobre a eletrocauterização ainda não
                    está estabelecida
                  </strong>
                  , sendo ambos métodos válidos e dependentes do tipo de lesão e
                  do contexto clínico.
                </li>
              </ul>

              <h3>Eletrocauterização</h3>
              <ul>
                <li>Remove e cauteriza os condilomas por corrente elétrica.</li>
                <li>
                  <strong>Vantagens</strong>: eficaz em áreas maiores,
                  disponível em centros médicos.
                </li>
                <li>
                  <strong>Limitação</strong>:&nbsp;
                  <strong>
                    não elimina o vírus, apenas as lesões visíveis
                  </strong>
                  .
                </li>
              </ul>

              <h2>Tratamento Tópico</h2>
              <p>
                Indicado em lesões menores ou múltiplas, pode ser utilizado em
                associação com tratamento cirúrgico.
              </p>
              <ul>
                <li>
                  <strong>Podofilina</strong>: aplicada sobre as lesões, promove
                  necrose tecidual.
                </li>
                <li>
                  <strong>Imiquimode</strong>: pomada imunomoduladora que
                  estimula a defesa local contra o HPV.
                </li>
                <li>
                  <strong>Ácido tricloroacético (ATA)</strong>: utilizado em
                  áreas de mucosa, destrói o tecido da verruga por cauterização
                  química.
                </li>
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
                      ⚠️ Esses tratamentos devem ser sempre&nbsp;
                      <strong>prescritos e acompanhados por médico</strong>,
                      pois o uso inadequado pode causar queimaduras e irritações
                      na pele ao redor.
                    </p>
                  </div>
                </div>
              </div>

              <h2>Importante Saber</h2>
              <ul>
                <li>
                  O tratamento remove as lesões, mas&nbsp;
                  <strong>não elimina o HPV do organismo</strong>.
                </li>
                <li>
                  As <strong>lesões sempre podem recidivar</strong>, mesmo após
                  terapias cirúrgicas ou tópicas.
                </li>
                <li>
                  O uso de preservativo reduz o risco de transmissão, mas não
                  elimina totalmente a possibilidade de contágio.
                </li>
                <li>
                  A <strong>vacinação contra o HPV</strong> é fundamental na
                  prevenção de novos casos e deve ser incentivada em homens e
                  mulheres.
                </li>
              </ul>

              <h2>Considerações Finais</h2>
              <p>
                O tratamento das lesões de HPV anal deve ser&nbsp;
                <strong>individualizado</strong>, considerando o tamanho, a
                localização e o número de condilomas.
              </p>
              <p>
                O acompanhamento com um <strong>coloproctologista</strong> é
                essencial para escolher a melhor estratégia, garantir segurança
                no tratamento e reduzir o risco de recidivas.
              </p>

              <h2>Perguntas Frequentes (FAQ)</h2>

              <div className="space-y-6">
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    1. O HPV anal sempre precisa de tratamento?
                  </h3>
                  <p className="text-secondary mb-0">
                    Sim. Mesmo que as verrugas sejam pequenas, o tratamento é
                    indicado para evitar crescimento, sintomas e transmissão a
                    parceiros.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    2. O laser é melhor que a eletrocauterização?
                  </h3>
                  <p className="text-secondary mb-0">
                    O laser oferece maior precisão e pode reduzir recidivas
                    locais, mas a eletrocauterização também é eficaz. A escolha
                    depende do tipo de lesão e da avaliação médica.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    3. As pomadas eliminam o vírus HPV?
                  </h3>
                  <p className="text-secondary mb-0">
                    Não. Podofilina, imiquimode e ATA tratam as lesões, mas não
                    eliminam o vírus. É necessário acompanhamento médico e
                    seguimento periódico.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    4. O HPV tratado pode voltar?
                  </h3>
                  <p className="text-secondary mb-0">
                    Sim. As lesões podem recidivar em qualquer tratamento, por
                    isso o acompanhamento médico é essencial.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <CallToActionCard
              title="Identificou lesões suspeitas na região anal?"
              body={
                <p>
                  Agende uma consulta para avaliação especializada e tratamento
                  adequado. O diagnóstico precoce e tratamento correto são
                  fundamentais.
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
                href="/tratamentos/cx-cisto-pilonidal"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Próximo: Cisto Pilonidal →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
