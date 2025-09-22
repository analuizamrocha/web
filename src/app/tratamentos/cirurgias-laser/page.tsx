import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cirurgias à Laser em Coloproctologia | Dra. Ana Luiza Moraes Rocha',
  description: 'Cirurgias à laser para hemorróidas e fissuras anais em Curitiba. Procedimento minimamente invasivo com recuperação rápida e menos dor.',
  keywords: [
    'cirurgia laser hemorroidas curitiba',
    'fissura anal laser curitiba',
    'coloproctologia laser',
    'cirurgia minimamente invasiva curitiba',
    'proctologista laser curitiba'
  ],
  alternates: {
    canonical: 'https://analuizarocha.com.br/tratamentos/cirurgias-laser'
  }
}

export default function CirurgiasLaserPage() {
  return (
    <>
      {/* Medical Procedure Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "@id": "https://analuizarocha.com.br/tratamentos/cirurgias-laser",
            "name": "Cirurgias à Laser em Coloproctologia",
            "description": "Procedimentos cirúrgicos minimamente invasivos utilizando tecnologia laser para tratamento de hemorróidas e fissuras anais",
            "procedureType": "Laser Surgery",
            "bodyLocation": {
              "@type": "AnatomicalStructure",
              "name": "Região Anorretal"
            },
            "performer": {
              "@type": "Physician",
              "name": "Dra. Ana Luiza Moraes Rocha",
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "identifier": "CRM-PR 45351"
                }
              ]
            },
            "preparation": "Jejum de 8 horas, exames pré-operatórios",
            "followup": "Consulta de retorno em 7 dias, orientações pós-operatórias detalhadas"
          })
        }}
      />

      <section className="section bg-background pt-24 md:pt-28">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <span className="mx-2">›</span>
            <Link href="/tratamentos" className="hover:text-primary transition-colors">
              Tratamentos
            </Link>
            <span className="mx-2">›</span>
            <span className="text-primary">Cirurgias à Laser</span>
          </nav>

          <div className="mx-auto max-w-4xl">
            
            {/* Header */}
            <header className="mb-12 animate-fade-in">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  Cirúrgico
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/20 text-secondary">
                  Minimamente Invasivo
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Cirurgias à Laser em Coloproctologia
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                Laser para tratamento de hemorróidas e fissuras anais 
                com mais precisão, menos dor e recuperação rápida.
              </p>
            </header>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none mb-12">
              
              <h2>O que são as Cirurgias à Laser?</h2>
              <p>
                As cirurgias à laser mudaram o tratamento 
                de doenças coloproctológicas. Uso equipamentos modernos para 
                fazer procedimentos mais precisos. Causam menos trauma aos tecidos 
                e a recuperação é mais confortável.
              </p>

              <h2>Principais Indicações</h2>
              <ul>
                <li><strong>Hemorróidas internas e externas</strong> - Remoção precisa com menor sangramento</li>
                <li><strong>Fissuras anais crônicas</strong> - Cicatrização mais rápida e eficaz</li>
                <li><strong>Fístulas simples</strong> - Fechamento com preservação dos tecidos</li>
                <li><strong>Condilomas (verrugas anais)</strong> - Remoção completa com baixa recidiva</li>
                <li><strong>Pólipos anorretais</strong> - Ressecção minimamente invasiva</li>
              </ul>

              <h2>Vantagens da Tecnologia Laser</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">Precisão Cirúrgica</h3>
                  <p className="text-secondary">
                    O laser faz cortes muito precisos. Preserva 
                    tecidos saudáveis ao redor da área tratada.
                  </p>
                </div>
                
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">Menor Sangramento</h3>
                  <p className="text-secondary">
                    A energia laser cauteriza os vasos sanguíneos junto 
                    com o corte. Reduz muito o sangramento.
                  </p>
                </div>
                
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">Recuperação Rápida</h3>
                  <p className="text-secondary">
                    Menos trauma cirúrgico causa menos inflamação 
                    e tempo de recuperação menor.
                  </p>
                </div>
                
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="text-primary font-bold mb-3">Menos Dor</h3>
                  <p className="text-secondary">
                    O procedimento laser causa menos lesão aos tecidos. 
                    Resulta em menos dor depois da cirurgia.
                  </p>
                </div>
              </div>

              <h2>Como é Realizado o Procedimento</h2>
              
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 my-8">
                <h3 className="text-primary font-bold mb-4">Etapas do Procedimento:</h3>
                <ol className="space-y-3">
                  <li><strong>1. Preparação:</strong> Anestesia local ou sedação, conforme indicação médica</li>
                  <li><strong>2. Posicionamento:</strong> Posição adequada para acesso à região</li>
                  <li><strong>3. Aplicação do Laser:</strong> Uso dirigido da energia laser na área afetada</li>
                  <li><strong>4. Finalização:</strong> Verificação da hemostasia e orientações</li>
                </ol>
              </div>

              <h2>Cuidados Pós-Operatórios</h2>
              <ul>
                <li>Repouso relativo nas primeiras 24-48 horas</li>
                <li>Higiene cuidadosa da região operada</li>
                <li>Alimentação rica em fibras e hidratação adequada</li>
                <li>Uso de medicações conforme prescrição médica</li>
                <li>Retorno para avaliação em 7 dias</li>
              </ul>

              <h2>Resultados Esperados</h2>
              <p>
                A maioria dos pacientes sente alívio dos sintomas 
                nas primeiras semanas após o procedimento. A cicatrização completa 
                acontece entre 4 a 6 semanas. O retorno às atividades normais é gradual.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-secondary/10 rounded-3xl p-8 lg:p-10 border border-secondary/20 mb-8">
              <h2 className="text-xl lg:text-2xl font-serif font-bold text-primary mb-4">
                Quer saber se a cirurgia à laser é adequada para o seu caso?
              </h2>
              <p className="text-lg lg:text-xl text-secondary leading-relaxed mb-6">
                Agende uma consulta para avaliarmos juntos a melhor opção de tratamento 
                para sua condição. Cada caso é único e merece atenção individual.
              </p>
              <Link
                href="/#contato"
                className="inline-flex items-center px-6 py-3 bg-primary text-background font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Agendar Avaliação
              </Link>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between text-lg">
              <Link
                href="/tratamentos"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              >
                ← Todos os Tratamentos
              </Link>
              
              <Link
                href="/tratamentos/tratamento-hemorroidas"
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