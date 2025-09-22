import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Dra. Ana Luiza Moraes Rocha | Coloproctologista Curitiba',
  description: 'Conheça a trajetória da Dra. Ana Luiza Moraes Rocha, especialista em Coloproctologia com formação internacional e experiência em cirurgias minimamente invasivas.',
  keywords: [
    'coloproctologista curitiba',
    'dra ana luiza moraes rocha',
    'crm pr 45351',
    'proctologista curitiba',
    'medica coloproctologista',
    'cirurgia colorretal curitiba'
  ],
  alternates: {
    canonical: 'https://analuizarocha.com.br/sobre'
  }
}

const credentials = [
  {
    title: 'Graduação em Medicina',
    institution: 'PUC-PR',
    description: 'Formação médica com excelência acadêmica na Pontifícia Universidade Católica do Paraná.'
  },
  {
    title: 'Especialização em Cirurgia Geral',
    institution: 'Hospital Santa Casa de Curitiba',
    description: 'Residência médica em Cirurgia Geral, base fundamental para a especialização em Coloproctologia.'
  },
  {
    title: 'Especialização em Coloproctologia',
    institution: 'Hospital Universitário Evangélico Mackenzie',
    description: 'Formação especializada em diagnóstico e tratamento de doenças coloproctológicas.'
  },
  {
    title: 'Fellow em Cirurgia Colorretal',
    institution: 'Hospital Clinic Barcelona',
    description: 'Experiência internacional em técnicas avançadas de cirurgia colorretal e oncologia.'
  }
]

const memberships = [
  'International Anal Neoplasia Society (IANS)',
  'Sociedade Brasileira de Coloproctologia (SBCP)',
  'Colégio Brasileiro de Cirurgiões (CBC)',
  'Associação Médica Brasileira (AMB)'
]

export default function SobrePage() {
  return (
    <>
      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://analuizarocha.com.br/#physician",
            "name": "Dra. Ana Luiza Moraes Rocha",
            "jobTitle": "Médica Coloproctologista",
            "description": "Especialista em Coloproctologia com formação internacional, dedicada ao cuidado integral e humanizado de cada paciente",
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "identifier": "CRM-PR 45351",
                "credentialCategory": "Registro Profissional"
              },
              {
                "@type": "EducationalOccupationalCredential", 
                "identifier": "RQE 36221",
                "credentialCategory": "Qualificação de Especialista"
              }
            ],
            "alumniOf": credentials.map(cred => ({
              "@type": "EducationalOrganization",
              "name": cred.institution,
              "description": cred.title
            })),
            "memberOf": memberships.map(org => ({
              "@type": "Organization",
              "name": org
            })),
            "url": "https://analuizarocha.com.br",
            "sameAs": ["https://www.instagram.com/analuiza.mrocha/"],
            "workLocation": {
              "@type": "MedicalClinic",
              "addressLocality": "Curitiba",
              "addressRegion": "Paraná",
              "addressCountry": "BR"
            }
          })
        }}
      />

      <section className="section bg-background pt-24 md:pt-28 animate-fade-in">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <span className="mx-2">›</span>
            <span className="text-primary">Sobre</span>
          </nav>

          <div className="mx-auto max-w-4xl">
            
            {/* Header */}
            <header className="mb-12 text-center">
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  CRM-PR 45351
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/20 text-secondary">
                  RQE 36221
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Dra. Ana Luiza Moraes Rocha
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium">
                Especialista em Coloproctologia com formação internacional, 
                dedicada ao cuidado integral e humanizado de cada paciente.
              </p>
            </header>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none mb-12">
              
              <h2>Minha Trajetória Profissional</h2>
              <p>
                Minha jornada na medicina começou com a certeza de que queria cuidar de pessoas 
                de forma integral. Durante a graduação na PUC-PR, descobri minha vocação para 
                a cirurgia e, posteriormente, para a coloproctologia - uma especialidade que 
                une conhecimento técnico avançado com o cuidado humanizado que sempre busquei 
                oferecer aos meus pacientes.
              </p>

              <p>
                A experiência internacional no Hospital Clinic de Barcelona foi transformadora, 
                permitindo-me aprender técnicas avançadas em cirurgia colorretal e oncologia. 
                Essa vivência enriqueceu minha prática clínica e reforçou meu compromisso com 
                a excelência no atendimento.
              </p>

              <h2>Formação e Especialização</h2>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {credentials.map((credential, index) => (
                <Card
                  key={index}
                  title={credential.title}
                  description={credential.description}
                  variant="service"
                >
                  <div className="mt-4">
                    <span className="text-sm font-medium text-primary">
                      {credential.institution}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              
              <h2>Filosofia de Atendimento</h2>
              <p>
                Acredito que cada paciente é único e merece atenção individualizada. 
                Minha consulta é sempre detalhada e busca um entendimento completo 
                sobre você e seu problema. Para mim, diagnosticar e tratar não é o suficiente - 
                é fundamental adequar os melhores tratamentos ao seu estilo de vida.
              </p>

              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 my-8">
                <h3 className="text-primary font-bold mb-4">Meus Princípios:</h3>
                <ul className="space-y-2 mb-0">
                  <li><strong>Humanização:</strong> Cada paciente recebe atenção integral e respeitosa</li>
                  <li><strong>Excelência Técnica:</strong> Uso das mais modernas técnicas e tecnologias</li>
                  <li><strong>Comunicação Clara:</strong> Explicações detalhadas sobre diagnósticos e tratamentos</li>
                  <li><strong>Cuidado Continuado:</strong> Acompanhamento próximo em todo o processo</li>
                </ul>
              </div>

              <h2>Associações e Membros</h2>
              <p>
                Mantenho-me sempre atualizada através da participação ativa em sociedades médicas 
                nacionais e internacionais:
              </p>
            </div>

            {/* Memberships */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {memberships.map((membership, index) => (
                <div 
                  key={index}
                  className="flex items-center p-4 bg-secondary/10 rounded-xl border border-secondary/20"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 shrink-0"></div>
                  <span className="text-secondary font-medium">{membership}</span>
                </div>
              ))}
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              
              <h2>Compromisso com a Educação</h2>
              <p>
                Além da prática clínica, dedico parte do meu tempo à educação médica continuada 
                e à divulgação de informações confiáveis sobre saúde coloproctológica. 
                Acredito que o conhecimento compartilhado é uma ferramenta poderosa na 
                prevenção e no tratamento precoce de doenças.
              </p>

            </div>

            {/* Contact CTA */}
            <div className="bg-secondary/10 rounded-3xl p-8 lg:p-10 border border-secondary/20 mb-8 text-center">
              <h2 className="text-xl lg:text-2xl font-serif font-bold text-primary mb-4">
                Vamos cuidar da sua saúde juntos?
              </h2>
              <p className="text-lg lg:text-xl text-secondary leading-relaxed mb-6">
                Estou aqui para oferecer o cuidado especializado que você merece, 
                com atenção humanizada e a mais alta qualidade técnica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contato"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-background font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Agendar Consulta
                </Link>
                <Link
                  href="/servicos"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-2xl hover:bg-primary hover:text-background transition-all duration-300"
                >
                  Conhecer Serviços
                </Link>
              </div>
            </div>

            {/* Navigation */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors text-lg"
              >
                ← Voltar ao início
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}