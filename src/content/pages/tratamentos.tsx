import Link from 'next/link'
import type { Metadata } from 'next'
import { WHATSAPP_HREF_SECRETARY, WEBSITE_URL } from '@/lib/constants'
import { LinkButton } from '@/components/ui/LinkButton'
import { TreatmentCard } from '@/components/ui/TreatmentCard'
import { getTreatmentImageBySlug } from '@/lib/treatment-images'
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/seo-schemas'

const pageTitle = 'Tratamentos em Coloproctologia'
const pageDescription =
  'Do diagnóstico ao pós-operatório: cirurgia a laser, hemorroidas, fístulas, cisto pilonidal, HPV anal e doenças inflamatórias intestinais. Conheça cada abordagem.'
const pageUrl = `${WEBSITE_URL}/tratamentos`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
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

const treatments = [
  {
    title: 'Cirurgias a Laser',
    description:
      'Procedimentos minimamente invasivos com tecnologia laser para tratamento de hemorroidas e fissuras anais.',
    slug: 'cx-laser',
    category: 'Cirúrgico',
  },
  {
    title: 'Tratamento de Hemorroidas',
    description:
      'Ligadura elástica, escleroterapia e outros procedimentos para alívio definitivo das hemorroidas.',
    slug: 'hemorroidas',
    category: 'Clínico/Cirúrgico',
  },
  {
    title: 'Cirurgias para Fístulas Anorretais',
    description:
      'Tratamento cirúrgico especializado para fístulas complexas com preservação da continência.',
    slug: 'cx-fistulas-anorretais',
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
    description: 'Prevenção e detecção precoce de lesões pré-cancerosas e câncer anal.',
    slug: 'rastreio-cancer-anal',
    category: 'Preventivo',
  },
  {
    title: 'Tratamento de HPV Anal',
    description: 'Diagnóstico e tratamento de condilomas acuminados (verrugas) na região anal.',
    slug: 'hpv-anal',
    category: 'Clínico',
  },
  {
    title: 'Cirurgia de Cisto Pilonidal',
    description: 'Remoção cirúrgica de cistos pilonidais com técnicas modernas e baixa recidiva.',
    slug: 'cx-cisto-pilonidal',
    category: 'Cirúrgico',
  },
  {
    title: 'Doenças Inflamatórias Intestinais',
    description: 'Acompanhamento especializado de Doença de Crohn e Retocolite Ulcerativa.',
    slug: 'doencas-inflamatorias-intestinais',
    category: 'Clínico',
  },
  {
    title: 'Síndrome do Intestino Irritável',
    description: 'Diagnóstico e tratamento personalizado para controle dos sintomas intestinais.',
    slug: 'sindrome-intestino-irritavel',
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
            '@id': `${WEBSITE_URL}/#organization`,
            medicalSpecialty: ['Coloproctologia', 'Proctologia'],
            availableService: treatments.map((treatment) => {
              const treatmentImage = getTreatmentImageBySlug(treatment.slug)

              return {
                '@type': 'MedicalProcedure',
                name: treatment.title,
                description: treatment.description,
                procedureType: treatment.category,
                ...(treatmentImage
                  ? {
                      identifier: treatmentImage.id,
                      image: `${WEBSITE_URL}${treatmentImage.src}`,
                    }
                  : {}),
                url: `${WEBSITE_URL}/tratamentos/${treatment.slug}`,
              }
            }),
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
                Oferecemos tratamentos especializados com tecnologia avançada e cuidado humanizado
                para todas as condições coloproctológicas.
              </p>
              <p>
                Nossa abordagem é sempre individualizada, buscando o melhor resultado com o menor
                desconforto possível.
              </p>
            </div>
          </div>

          <div className="relative mb-16">
            <div className="pointer-events-none absolute -left-10 top-8 hidden h-32 w-32 rounded-full bg-secondary/25 blur-3xl lg:block" />
            <div className="pointer-events-none absolute -right-10 bottom-6 hidden h-28 w-28 rounded-full bg-secondary/20 blur-3xl lg:block" />

            {/* Treatments Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-8">
              {treatments.map((treatment, index) => {
                const treatmentImage = getTreatmentImageBySlug(treatment.slug)

                return (
                  <TreatmentCard
                    key={treatment.slug}
                    title={treatment.title}
                    description={treatment.description}
                    category={treatment.category}
                    href={`/tratamentos/${treatment.slug}`}
                    variant="detailed"
                    treatmentId={treatmentImage?.id}
                    image={treatmentImage}
                    headingLevel="h2"
                    imagePriority={index === 0}
                  />
                )
              })}
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="mx-auto max-w-4xl">
            <div className="bg-secondary/10 rounded-3xl p-8 lg:p-10 border border-secondary/20 text-center">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-4">
                Precisa de um diagnóstico especializado?
              </h2>
              <p className="text-lg lg:text-xl text-secondary leading-relaxed mb-6">
                Agende sua consulta e receba o cuidado especializado que você merece.
                <br />
                Atendimento humanizado com a mais alta qualidade técnica.
              </p>
              <p className="text-base lg:text-lg text-secondary/80 leading-relaxed mb-6">
                Se quiser entender em qual clínica a consulta ou o exame faz mais sentido, veja
                também os locais de atendimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LinkButton
                  href={WHATSAPP_HREF_SECRETARY}
                  external
                  newTab
                  variant="primary"
                  size="xl"
                  className="bg-primary hover:bg-primary/90 text-background shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold text-nowrap"
                >
                  Agendar consulta
                </LinkButton>
                <LinkButton
                  href="/locais-de-atendimento"
                  size="xl"
                  variant="outline"
                  className="text-lg px-8 py-4 font-semibold text-nowrap shadow-lg hover:shadow-xl transform transition-all duration-300"
                >
                  Locais de atendimento
                </LinkButton>
                <LinkButton
                  href="/blog"
                  size="xl"
                  variant="ghost"
                  className="group text-lg px-8 py-4 font-semibold text-nowrap transition-colors duration-200"
                >
                  Ler o blog
                  <span className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </LinkButton>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
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
