import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { Badge } from '@/components/ui/Badge'
import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Sobre Dra. Ana Luiza Moraes Rocha | Coloproctologista Curitiba',
  description:
    'Conheça a trajetória da Dra. Ana Luiza Moraes Rocha, especialista em Coloproctologia com formação internacional e experiência em cirurgias minimamente invasivas.',
  keywords: [
    'coloproctologista curitiba',
    'dra ana luiza moraes rocha',
    'crm pr 45351',
    'proctologista curitiba',
    'medica coloproctologista',
    'cirurgia colorretal curitiba',
  ],
  alternates: {
    canonical: 'https://analuizarocha.com.br/sobre',
  },
}

const credentials = [
  {
    title: 'Graduação em Medicina',
    institution: 'Pontifícia Universidade Católica do Paraná (PUC-PR)',
    description:
      'Formação médica sólida e base fundamental para toda trajetória profissional.',
  },
  {
    title: 'Residência em Cirurgia Geral',
    institution: 'Hospital Santa Casa de Curitiba',
    description: 'Formação especializada em técnicas cirúrgicas fundamentais.',
  },
  {
    title: 'Residência em Coloproctologia',
    institution: 'Hospital Universitário Evangélico Mackenzie',
    description: 'Especialização focada em doenças do intestino, reto e ânus.',
  },
  {
    title: 'Fellow em Cirurgia Colorretal',
    institution: 'Hospital Clinic de Barcelona',
    description:
      'Experiência em oncologia, doenças inflamatórias intestinais e cirurgias orificiais minimamente invasivas.',
  },
  {
    title: 'Cursos de Anuscopia de Alta Resolução',
    institution: 'International Anal Neoplasia Society (IANS)',
    description:
      'Capacitação em técnicas avançadas de diagnóstico e prevenção.',
  },
]

const memberships = ['International Anal Neoplasia Society (IANS)']

export default function SobrePage() {
  return (
    <>
      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://analuizarocha.com.br/#physician',
            name: 'Dra. Ana Luiza Moraes Rocha',
            jobTitle: 'Médica Coloproctologista',
            description:
              'Especialista em Coloproctologia com formação internacional, dedicada ao cuidado integral e humanizado de cada paciente',
            hasCredential: [
              {
                '@type': 'EducationalOccupationalCredential',
                identifier: 'CRM-PR 45351',
                credentialCategory: 'Registro Profissional',
              },
              {
                '@type': 'EducationalOccupationalCredential',
                identifier: 'RQE 36221',
                credentialCategory: 'Qualificação de Especialista',
              },
            ],
            alumniOf: credentials.map((cred) => ({
              '@type': 'EducationalOrganization',
              name: cred.institution,
              description: cred.title,
            })),
            memberOf: memberships.map((org) => ({
              '@type': 'Organization',
              name: org,
            })),
            url: 'https://analuizarocha.com.br',
            sameAs: ['https://www.instagram.com/analuiza.mrocha/'],
            workLocation: {
              '@type': 'MedicalClinic',
              addressLocality: 'Curitiba',
              addressRegion: 'Paraná',
              addressCountry: 'BR',
            },
          }),
        }}
      />

      <section className="section bg-background pt-24 md:pt-28 animate-fade-in">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[{ label: 'Início', href: '/' }, { label: 'Sobre' }]}
          />
          {/* <nav className="mb-8 text-sm text-secondary">
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
              <Badge variant="primary" size="lg">
                CRM-PR 45351
              </Badge>
              <Badge variant="secondary" size="lg">
                RQE 36221
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
              Dra. Ana Luiza Moraes Rocha
            </h1>

            <h2 className="text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium w-full flex flex-col items-center justify-center">
              Especialista em Coloproctologia com formação internacional,
              dedicada ao cuidado integral e humanizado de cada paciente.
            </h2>
          </header>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2>Minha Trajetória Profissional</h2>
            <p>
              Minha jornada na medicina começou com a certeza de que queria
              cuidar de pessoas de forma integral. Durante a graduação em
              Medicina na <strong>PUC-PR</strong>, desenvolvi a base sólida da
              minha formação. Foi durante a{' '}
              <strong>
                residência em Cirurgia Geral, no Hospital Santa Casa de Curitiba
              </strong>
              , que descobri meu amor pela <strong>coloproctologia</strong> —
              especialidade que une conhecimento técnico avançado com o cuidado
              humanizado que sempre busquei oferecer aos meus pacientes.
            </p>

            <p>
              A experiência internacional no{' '}
              <strong>Hospital Clinic de Barcelona</strong> foi transformadora.
              Lá tive contato com técnicas avançadas em{' '}
              <strong>
                cirurgia colorretal na área oncológica e de doenças
                inflamatórias intestinais
              </strong>
              , além de experiência prática em{' '}
              <strong>
                cirurgias orificiais com abordagem minimamente invasiva
              </strong>
              . Essa vivência ampliou minha visão da especialidade e reforçou
              meu compromisso em oferecer tratamentos modernos, seguros e
              individualizados aos pacientes.
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
              Acredito que cada paciente é único e merece atenção
              individualizada. Minhas consultas são detalhadas, buscando
              compreender a história, os sintomas e o estilo de vida de cada
              pessoa. Para mim, diagnosticar e tratar não é suficiente — é
              fundamental{' '}
              <strong>
                adequar o tratamento às necessidades reais do paciente
              </strong>
              , garantindo segurança e qualidade de vida.
            </p>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 my-8">
              <h3 className="text-primary font-bold mb-4">
                Meus princípios de atuação:
              </h3>
              <ul className="space-y-2 mb-0">
                <li>
                  <strong>Humanização:</strong> cada paciente recebe atenção
                  integral e respeitosa.
                </li>
                <li>
                  <strong>Excelência Técnica:</strong> utilização de técnicas
                  atualizadas e seguras.
                </li>
                <li>
                  <strong>Comunicação Clara:</strong> explicações detalhadas
                  sobre diagnósticos e tratamentos.
                </li>
                <li>
                  <strong>Cuidado Continuado:</strong> acompanhamento próximo em
                  todo o processo de tratamento.
                </li>
              </ul>
            </div>

            <h2>Participações Profissionais</h2>
            <p>
              Sou membro da{' '}
              <strong>International Anal Neoplasia Society (IANS)</strong>, o
              que me permite estar sempre atualizada sobre as mais recentes
              pesquisas e práticas internacionais em prevenção, diagnóstico e
              tratamento de doenças anorretais.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <h2>Compromisso com a Educação</h2>
            <p>
              Além da prática clínica, dedico parte do meu tempo à{' '}
              <strong>educação médica continuada</strong> e à{' '}
              <strong>
                divulgação de informações confiáveis sobre saúde
                coloproctológica
              </strong>
              . Acredito que o conhecimento compartilhado é uma ferramenta
              poderosa na prevenção e no tratamento precoce de doenças.
            </p>
          </div>

          {/* Contact CTA */}
          <CallToActionCard
            title="Vamos cuidar da sua saúde juntos?"
            body={
              <p>
                Estou aqui para oferecer o cuidado especializado que você
                merece, com atenção humanizada e a mais alta qualidade técnica.
              </p>
            }
            actions={
              <>
                <Link
                  href="/#contato"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-background font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Agendar Consulta
                </Link>
                <Link
                  href="/tratamentos"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-2xl hover:bg-primary hover:text-background transition-all duration-300"
                >
                  Conhecer Tratamentos
                </Link>
              </>
            }
            variant="secondary"
          />

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
      </section>
    </>
  )
}
