import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/LinkButton'
import { WPP_NUMBER_NASSIF, WHATSAPP_MSG_TEXT_ENCODED } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Toxina Botulínica na Coloproctologia | Dra. Ana Luiza Moraes Rocha',
  description:
    'Aplicação de toxina botulínica para tratamento de fissura anal crônica e dores anais persistentes em Curitiba. Procedimento minimamente invasivo.',
  keywords: [
    'toxina botulinica anal curitiba',
    'botox fissura anal curitiba',
    'tratamento fissura anal',
    'dor anal cronica curitiba',
    'esfíncter anal curitiba',
    'procedimento minimamente invasivo',
  ],
  alternates: {
    canonical: 'https://analuizarocha.com.br/tratamentos/toxina-botulinica',
  },
}

export default function ToxinaBotulínicaPage() {
  return (
    <>
      {/* Medical Procedure Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            '@id': 'https://analuizarocha.com.br/tratamentos/toxina-botulinica',
            name: 'Toxina Botulínica na Coloproctologia',
            description:
              'Aplicação de toxina botulínica para tratamento de fissura anal crônica e dores anais persistentes',
            procedureType: 'Botulinum Toxin Injection',
            bodyLocation: {
              '@type': 'AnatomicalStructure',
              name: 'Esfíncter Anal',
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
              'Avaliação médica especializada, análise de indicações e contraindicações',
            followup: 'Acompanhamento para avaliação da resposta terapêutica',
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
              { label: 'Toxina Botulínica' },
            ]}
          />

          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-12 animate-fade-in">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="primary">Clínico</Badge>
                <Badge variant="secondary">Minimamente Invasivo</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Toxina Botulínica na Coloproctologia
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                A aplicação de toxina botulínica é uma alternativa moderna e
                minimamente invasiva no tratamento de algumas condições
                anorretais que causam dor intensa e persistente.
              </p>
            </header>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <h2>Indicações Principais</h2>

              <h3>Fissura anal crônica</h3>
              <ul>
                <li>
                  A fissura anal é uma ferida no canal anal que, quando persiste
                  por mais de 6 a 8 semanas, costuma estar associada a espasmo
                  da musculatura anal.
                </li>
                <li>
                  A toxina botulínica promove o relaxamento temporário do
                  esfíncter, facilitando a cicatrização e reduzindo a dor.
                </li>
              </ul>

              <h3>Dores anais crônicas</h3>
              <ul>
                <li>
                  Incluem casos de espasmo persistente do esfíncter anal, dor
                  pós-operatória prolongada ou síndromes funcionais.
                </li>
                <li>
                  O objetivo é reduzir a contração muscular excessiva e melhorar
                  a qualidade de vida.
                </li>
              </ul>

              <h2>Como Funciona</h2>
              <ul>
                <li>
                  A toxina botulínica é aplicada diretamente no{' '}
                  <strong>esfíncter anal interno</strong>, em pequenas doses.
                </li>
                <li>
                  O efeito dura, em média, de <strong>2 a 4 meses</strong>,
                  período em que a cicatrização da fissura pode ocorrer.
                </li>
                <li>
                  É um procedimento rápido, que pode ser realizado em regime
                  ambulatorial.
                </li>
              </ul>

              <h2>Benefícios</h2>
              <ul>
                <li>
                  <strong>Redução significativa da dor</strong> logo nos
                  primeiros dias.
                </li>
                <li>
                  <strong>Procedimento minimamente invasivo</strong>, sem
                  necessidade de cortes.
                </li>
                <li>
                  <strong>Alternativa à cirurgia</strong> em casos selecionados,
                  especialmente quando se busca preservar a função
                  esfincteriana.
                </li>
                <li>Pode ser repetido, se necessário.</li>
              </ul>

              <h2>Limitações</h2>
              <ul>
                <li>
                  O efeito é <strong>temporário</strong>, e em alguns pacientes
                  a fissura pode recidivar.
                </li>
                <li>
                  Nem todos os casos respondem de forma satisfatória, sendo
                  necessária avaliação para definir se a cirurgia convencional é
                  a melhor opção.
                </li>
                <li>
                  Pode causar efeitos transitórios, como dificuldade leve para
                  controlar gases, em raros casos.
                </li>
              </ul>

              <h2>Considerações Finais</h2>
              <p>
                A aplicação de toxina botulínica representa uma ferramenta
                importante na coloproctologia moderna, principalmente no manejo
                de <strong>fissuras anais crônicas</strong> e{' '}
                <strong>dores anais persistentes</strong>.
              </p>
              <p>
                A escolha entre a aplicação da toxina botulínica, cirurgia ou
                outras terapias deve ser feita após avaliação médica
                individualizada, levando em conta a gravidade dos sintomas, o
                histórico do paciente e o risco de complicações.
              </p>

              <blockquote className="border-l-4 border-primary/30 pl-6 py-4 my-8 bg-primary/5 rounded-r-xl">
                <p className="text-secondary italic mb-0">
                  Cada paciente é único, e o tratamento deve ser personalizado
                  para alcançar o equilíbrio entre alívio da dor e preservação
                  da função anal.
                </p>
              </blockquote>

              <h2>Perguntas frequentes (FAQ)</h2>

              <div className="space-y-8 my-12">
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    A aplicação de toxina botulínica é dolorosa?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    O procedimento pode causar desconforto leve durante a
                    aplicação, mas é geralmente bem tolerado. Pode ser realizado
                    com anestesia local se necessário.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    Quanto tempo demora para fazer efeito?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Os primeiros sinais de melhora da dor costumam aparecer nos
                    primeiros dias após a aplicação, com efeito máximo em 1-2
                    semanas.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    Posso ter incontinência após a aplicação?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    Em raros casos pode ocorrer dificuldade leve e transitória
                    para controlar gases. A incontinência fecal é muito rara
                    quando a aplicação é feita adequadamente.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    Quantas aplicações posso fazer?
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    O procedimento pode ser repetido conforme necessário,
                    respeitando intervalos adequados entre as aplicações, sempre
                    com avaliação médica.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <CallToActionCard
              title="Sofre com dor anal persistente ou fissura crônica?"
              body={
                <p>
                  Agende uma consulta para avaliarmos se a toxina botulínica é
                  adequada para o seu caso. Tratamento personalizado para alívio
                  da dor e melhora da qualidade de vida.
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
                href="/tratamentos/rastreio-cancer-anal"
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
