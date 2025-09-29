import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tratamentos de Coloproctologia | Dra. Ana Luiza Moraes Rocha',
  description:
    'Tratamentos especializados em coloproctologia: cirurgias à laser, tratamento de hemorróidas, fístulas anorretais e muito mais em Curitiba.',
  keywords: [
    'coloproctologia curitiba',
    'cirurgia hemorroidas curitiba',
    'tratamento fissura anal',
    'proctologista curitiba',
    'cirurgia laser curitiba',
    'HPV anal curitiba',
    'cisto pilonidal curitiba',
  ],
  alternates: {
    canonical: 'https://analuizarocha.com.br/tratamentos',
  },
}

const treatments = [
  {
    title: 'Cirurgias à Laser',
    description:
      'Procedimentos minimamente invasivos com tecnologia laser para tratamento de hemorróidas e fissuras anais.',
    slug: 'cirurgias-laser',
    category: 'Cirúrgico',
  },
  {
    title: 'Tratamento de Hemorróidas',
    description:
      'Ligadura elástica, escleroterapia e outros procedimentos para alívio definitivo das hemorróidas.',
    slug: 'tratamento-hemorroidas',
    category: 'Clínico/Cirúrgico',
  },
  {
    title: 'Cirurgias para Fístulas Anorretais',
    description:
      'Tratamento cirúrgico especializado para fístulas complexas com preservação da continência.',
    slug: 'cirurgia-fistulas',
    category: 'Cirúrgico',
  },
  {
    title: 'Toxina Botulínica',
    description:
      'Aplicação de botox para tratamento de fissura anal e dores crônicas na região anorretal.',
    slug: 'toxina-botulinica',
    category: 'Clínico',
  },
  {
    title: 'Rastreio do Câncer de Canal Anal',
    description:
      'Prevenção e detecção precoce de lesões pré-cancerosas e câncer anal.',
    slug: 'rastreio-cancer-anal',
    category: 'Preventivo',
  },
  {
    title: 'Tratamento de HPV Anal',
    description:
      'Diagnóstico e tratamento de condilomas acuminados (verrugas) na região anal.',
    slug: 'tratamento-hpv',
    category: 'Clínico',
  },
  {
    title: 'Cirurgia de Cisto Pilonidal',
    description:
      'Remoção cirúrgica de cistos pilonidais com técnicas modernas e baixa recidiva.',
    slug: 'cirurgia-cisto-pilonidal',
    category: 'Cirúrgico',
  },
  {
    title: 'Doenças Inflamatórias Intestinais',
    description:
      'Acompanhamento especializado de Doença de Crohn e Retocolite Ulcerativa.',
    slug: 'doencas-inflamatorias',
    category: 'Clínico',
  },
  {
    title: 'Síndrome do Intestino Irritável',
    description:
      'Diagnóstico e tratamento personalizado para controle dos sintomas intestinais.',
    slug: 'intestino-irritavel',
    category: 'Clínico',
  },
]

export default function ServicosPage() {
  return (
    <>
      {/* Medical Services Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalOrganization',
            '@id': 'https://analuizarocha.com.br/#organization',
            medicalSpecialty: ['Coloproctologia', 'Proctologia'],
            availableService: treatments.map((treatment) => ({
              '@type': 'MedicalProcedure',
              name: treatment.title,
              description: treatment.description,
              procedureType: treatment.category,
              url: `https://analuizarocha.com.br/tratamentos/${treatment.slug}`,
            })),
          }),
        }}
      />

      <section className="section bg-background pt-24 md:pt-28 animate-fade-in">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          {/* Header Section */}
          <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
              Tratamentos de Coloproctologia
            </h1>
            <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-secondary font-medium space-y-4">
              <p>
                Oferecemos tratamentos especializados com tecnologia avançada e
                cuidado humanizado para todas as condições coloproctológicas.
              </p>
              <p>
                Nossa abordagem é sempre individualizada, buscando o melhor
                resultado com o menor desconforto possível.
              </p>
            </div>
          </div>

          {/* Treatments Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8 xl:gap-10 mb-16">
            {treatments.map((treatment) => (
              <Link
                key={treatment.slug}
                href={`/tratamentos/${treatment.slug}`}
              >
                <Card
                  title={treatment.title}
                  description={treatment.description}
                  variant="service"
                  className="h-full hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="mt-auto pt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {treatment.category}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="mx-auto max-w-4xl">
            <div className="bg-secondary/10 rounded-3xl p-8 lg:p-10 border border-secondary/20 text-center">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-4">
                Precisa de um diagnóstico especializado?
              </h2>
              <p className="text-lg lg:text-xl text-secondary leading-relaxed mb-6">
                Agende sua consulta e receba o cuidado especializado que você
                merece. Atendimento humanizado com a mais alta qualidade
                técnica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contato"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-background font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Agendar Consulta
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-2xl hover:bg-primary hover:text-background transition-all duration-300"
                >
                  Artigos Educativos
                </Link>
              </div>
            </div>
          </div>

          {/* Breadcrumb Navigation */}
          <div className="mt-16 text-center">
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
