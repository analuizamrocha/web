import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cirurgias à Laser em Coloproctologia | Dra. Ana Luiza Moraes Rocha',
  description:
    'Cirurgias à laser para hemorróidas e fissuras anais em Curitiba. Procedimento minimamente invasivo com recuperação rápida e menos dor.',
  keywords: [
    'cirurgia laser hemorroidas curitiba',
    'fissura anal laser curitiba',
    'coloproctologia laser',
    'cirurgia minimamente invasiva curitiba',
    'proctologista laser curitiba',
  ],
  alternates: {
    canonical: 'https://analuizarocha.com.br/tratamentos/cx-laser',
  },
}

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
            '@id': 'https://analuizarocha.com.br/tratamentos/cx-laser',
            name: 'Cirurgias à Laser em Coloproctologia',
            description:
              'Procedimentos cirúrgicos minimamente invasivos utilizando tecnologia laser para tratamento de hemorróidas e fissuras anais',
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
                  identifier: 'CRM-PR 45351',
                },
              ],
            },
            preparation: 'Jejum de 8 horas, exames pré-operatórios',
            followup:
              'Consulta de retorno em 7 dias, orientações pós-operatórias detalhadas',
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
              { label: 'Cirurgias à Laser' },
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
                Cirurgias à Laser em Coloproctologia
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                A cirurgia a laser tem se consolidado como uma alternativa
                moderna e menos invasiva no tratamento de algumas doenças do
                ânus e reto. Essa tecnologia permite maior precisão, menor
                trauma tecidual e uma recuperação geralmente mais rápida.
              </p>
            </header>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <h2>Principais Indicações</h2>
              <p>
                Na coloproctologia, o laser pode ser utilizado em diferentes
                situações:
              </p>
              <ul>
                <li>
                  <strong>Hemorróidas</strong> – tratamento minimamente invasivo
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
                  <strong>Plicomas</strong> – remoção da sobra de pele com menor
                  risco de sangramento.
                </li>
                <li>
                  <strong>Cisto pilonidal</strong> – cauterização do trajeto,
                  podendo reduzir a necessidade de grandes incisões.
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
                      <strong>Importante:</strong> A indicação do laser depende
                      sempre da avaliação individual de cada paciente. Nem todos
                      os casos se beneficiam dessa tecnologia, e a decisão deve
                      ser tomada em conjunto com o coloproctologista.
                    </p>
                  </div>
                </div>
              </div>

              <h2>Benefícios do uso do Laser</h2>
              <ul>
                <li>
                  Procedimentos <strong>menos invasivos</strong>.
                </li>
                <li>
                  <strong>Menor sangramento</strong> intraoperatório.
                </li>
                <li>
                  Possibilidade de <strong>menos dor</strong> no pós-operatório.
                </li>
                <li>
                  <strong>Recuperação mais rápida</strong>, favorecendo retorno
                  precoce às atividades.
                </li>
                <li>
                  Potencial para <strong>melhor resultado estético</strong> em
                  alguns casos.
                </li>
              </ul>

              <h2>Vantagens em relação às técnicas convencionais</h2>
              <ul>
                <li>
                  Instrumento de alta precisão, que preserva estruturas
                  saudáveis.
                </li>
                <li>Pode reduzir a necessidade de curativos extensos.</li>
                <li>
                  Menor risco de complicações como infecção e edema, em
                  determinadas situações.
                </li>
                <li>Em alguns casos, menor chance de recidiva.</li>
              </ul>

              <h2>Considerações Importantes</h2>
              <p>
                Apesar dos avanços, a cirurgia a laser{' '}
                <strong>
                  não substitui todos os procedimentos tradicionais
                </strong>
                . A escolha da técnica ideal deve considerar o tipo de doença,
                sua gravidade e o perfil do paciente.
              </p>
              <p>
                O laser representa um recurso importante dentro da
                coloproctologia moderna, trazendo mais conforto e segurança em
                casos bem selecionados.
              </p>

              <h2>Perguntas Frequentes (FAQ)</h2>

              <div className="space-y-6">
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    1. Todas as doenças anorretais podem ser tratadas com laser?
                  </h3>
                  <p className="text-secondary">
                    O laser é útil em casos selecionados e a indicação depende
                    sempre da avaliação médica.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    2. A cirurgia a laser é menos dolorosa que a convencional?
                  </h3>
                  <p className="text-secondary">
                    Em muitos casos, sim. O laser pode reduzir o trauma nos
                    tecidos e, consequentemente, a dor no pós-operatório. Mas a
                    resposta varia conforme o paciente e o tipo de doença.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    3. O laser substitui totalmente a cirurgia convencional?
                  </h3>
                  <p className="text-secondary">
                    Não. O laser é uma ferramenta moderna, mas não elimina a
                    necessidade de técnicas tradicionais em determinados casos.
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">
                    4. Quanto tempo leva para se recuperar de uma cirurgia a
                    laser?
                  </h3>
                  <p className="text-secondary">
                    A recuperação costuma ser mais rápida do que na cirurgia
                    convencional, permitindo retorno precoce às atividades
                    leves. O tempo exato varia conforme o procedimento
                    realizado.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <CallToActionCard
              title="Quer saber se a cirurgia à laser é adequada para o seu caso?"
              body={
                <p>
                  Agende uma consulta para avaliarmos juntos a melhor opção de
                  tratamento para sua condição. Cada caso é único e merece
                  atenção individual.
                </p>
              }
              actions={
                <Link
                  href="/#contato"
                  className="inline-flex items-center px-6 py-3 bg-primary text-background font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Agendar Avaliação
                </Link>
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
                href="/tratamentos/hemorroidas"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Próximo: Hemorróidas →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
