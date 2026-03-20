import Link from 'next/link'
import Image from 'next/image'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { Badge } from '@/components/ui/Badge'
import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { LinkButton } from '@/components/ui/LinkButton'
import {
  WPP_NUMBER_NASSIF,
  WHATSAPP_MSG_TEXT_ENCODED,
  WEBSITE_URL,
  CLINICA_NASSIF,
  DR_NAME,
  WPP_NUMBER_NASSIF_FORMATTED,
  URL_INSTAGRAM,
  CRM_NUMBER,
  RQE_NUMBER,
  PUC_PR,
  HOSPITAL_SANTA_CASA,
  HOSPITAL_MACKENZIE,
} from '@/lib/constants'
import {
  generateBreadcrumbSchema,
  generateOpenGraphMetadata,
  generateTwitterMetadata,
  generateLocalBusinessSchema,
  type BreadcrumbItem,
} from '@/lib/seo-schemas'
import {
  GraduationCap,
  Stethoscope,
  Plane,
  BookOpen,
  Award,
  Heart,
  Shield,
  MessageCircle,
  Users,
} from 'lucide-react'

const pageTitle = 'Sobre a Dra. Ana Luiza M. Rocha | Especialista em Coloproctologia'
const pageDescription =
  'Conheça a trajetória da Dra. Ana Luiza Moraes Rocha, especialista em Coloproctologia com formação internacional e experiência em cirurgias minimamente invasivas.'
const pageUrl = `${WEBSITE_URL}/sobre`

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  keywords: [
    'coloproctologista curitiba',
    'dra ana luiza moraes rocha',
    'crm pr 45351',
    'proctologista curitiba',
    'medica coloproctologista',
    'cirurgia colorretal curitiba',
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

// Breadcrumb data for schema
const breadcrumbItems: BreadcrumbItem[] = [{ label: 'Início', href: '/' }, { label: 'Sobre' }]

const credentials = [
  {
    title: 'Graduação em Medicina',
    institution: 'Pontifícia Universidade Católica do Paraná (PUC-PR)',
    description: 'Formação médica sólida e base fundamental para toda trajetória profissional.',
    icon: GraduationCap,
    colorStart: '#663a25',
    colorEnd: '#7d4a30',
  },
  {
    title: 'Residência em Cirurgia Geral',
    institution: HOSPITAL_SANTA_CASA,
    description: 'Formação especializada em técnicas cirúrgicas fundamentais.',
    icon: Stethoscope,
    colorStart: '#c27e5c',
    colorEnd: '#d0906d',
  },
  {
    title: 'Residência em Coloproctologia',
    institution: HOSPITAL_MACKENZIE,
    description: 'Especialização focada em doenças do intestino, reto e ânus.',
    icon: Award,
    colorStart: '#b08771',
    colorEnd: '#c09982',
  },
  {
    title: 'Fellow em Cirurgia Colorretal',
    institution: 'Hospital Clinic de Barcelona',
    description:
      'Experiência em oncologia, doenças inflamatórias intestinais e cirurgias orificiais minimamente invasivas.',
    icon: Plane,
    colorStart: '#7a8b68',
    colorEnd: '#8a9b78',
  },
  {
    title: 'Anuscopia de Alta Resolução',
    institution: 'International Anal Neoplasia Society (IANS)',
    description: 'Capacitação em técnicas avançadas de diagnóstico e prevenção.',
    icon: BookOpen,
    colorStart: '#5a4f47',
    colorEnd: '#6a5f57',
  },
]

const principles = [
  {
    icon: Heart,
    title: 'Humanização',
    description: 'Cada paciente recebe atenção integral e respeitosa.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
  },
  {
    icon: Shield,
    title: 'Excelência técnica',
    description: 'Utilização de técnicas atualizadas e seguras.',
    color: 'text-brand-primary',
    bgColor: 'bg-brand-primary/10',
    borderColor: 'border-brand-primary/20',
  },
  {
    icon: MessageCircle,
    title: 'Comunicação clara',
    description: 'Explicações detalhadas sobre diagnósticos e tratamentos.',
    color: 'text-accent-neutral',
    bgColor: 'bg-accent-neutral/10',
    borderColor: 'border-accent-neutral/20',
  },
  {
    icon: Users,
    title: 'Cuidado continuado',
    description: 'Acompanhamento próximo em todo o processo de tratamento.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/20',
    borderColor: 'border-secondary/30',
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
            '@id': `${WEBSITE_URL}/#physician`,
            name: 'Dra. Ana Luiza Moraes Rocha',
            jobTitle: 'Médica Coloproctologista',
            description:
              'Especialista em Coloproctologia com formação internacional, dedicada ao cuidado integral e humanizado de cada paciente',
            hasCredential: [
              {
                '@type': 'EducationalOccupationalCredential',
                identifier: CRM_NUMBER,
                credentialCategory: 'Registro Profissional',
              },
              {
                '@type': 'EducationalOccupationalCredential',
                identifier: RQE_NUMBER,
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
            url: WEBSITE_URL,
            sameAs: [URL_INSTAGRAM],
            workLocation: {
              '@type': 'MedicalClinic',
              addressLocality: 'Curitiba',
              addressRegion: 'Paraná',
              addressCountry: 'BR',
            },
          }),
        }}
      />

      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateLocalBusinessSchema({
              name: `${DR_NAME} - Coloproctologia`,
              description:
                'Consultas de Coloproctologia com atendimento humanizado e especializado em Curitiba. Diagnóstico e tratamento de doenças do intestino, reto e ânus.',
              address: {
                streetAddress: CLINICA_NASSIF.address,
                addressLocality: CLINICA_NASSIF.city,
                addressRegion: CLINICA_NASSIF.state,
                postalCode: CLINICA_NASSIF.cep,
                addressCountry: 'BR',
              },
              geo: {
                latitude: CLINICA_NASSIF.coordinates.latitude,
                longitude: CLINICA_NASSIF.coordinates.longitude,
              },
              telephone: WPP_NUMBER_NASSIF_FORMATTED,
              url: WEBSITE_URL,
              image: `${WEBSITE_URL}/images/og.png`,
              priceRange: '$$',
              openingHours: CLINICA_NASSIF.openingHours,
            })
          ),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      <section className="section bg-background pt-24 md:pt-28 animate-fade-in">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Sobre' }]} />

          <div className="mb-12 text-center">
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              <Badge variant="primary" size="lg">
                {CRM_NUMBER}
              </Badge>
              <Badge variant="secondary" size="lg">
                {RQE_NUMBER}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
              Dra. Ana Luiza Moraes Rocha
            </h1>

            <h2 className="text-start sm:text-center text-lg md:text-xl lg:text-2xl text-secondary mb-8 leading-relaxed font-medium w-full flex flex-col items-center justify-center max-w-3xl mx-auto">
              Especialista em Coloproctologia com formação internacional, dedicada ao cuidado
              integral e humanizado de cada paciente.
            </h2>
          </div>

          <main className="prose prose-lg max-w-none mb-8 lg:mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">
              Minha trajetória profissional
            </h2>
            <p className="text-lg text-secondary leading-relaxed mb-4">
              Minha jornada na medicina começou com a certeza de que queria cuidar de pessoas de
              forma integral. Durante a graduação em Medicina na <strong>{PUC_PR}</strong>,
              desenvolvi a base sólida da minha formação. Foi durante a&nbsp;
              <strong>residência em Cirurgia Geral, no {HOSPITAL_SANTA_CASA}</strong>, que descobri
              meu amor pela <strong>coloproctologia</strong> — especialidade que une conhecimento
              técnico avançado com o cuidado humanizado que sempre busquei oferecer aos meus
              pacientes.
            </p>

            {/* Professional Images Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              {/* First Image - Priority */}
              <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/images/cx-group.webp"
                    alt={`Dra. Ana Luiza Moraes Rocha, coloproctologista em Curitiba, ${CRM_NUMBER}, em seu consultório médico especializado`}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Second Image - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:block relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/images/cx-front.webp"
                    alt="Dra. Ana Luiza Moraes Rocha, especialista em coloproctologia, atendimento humanizado em cirurgia colorretal, Curitiba-PR"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>

            <p className="text-lg text-secondary leading-relaxed">
              A experiência internacional no&nbsp;
              <strong>Hospital Clinic de Barcelona</strong> foi transformadora. Lá tive contato com
              técnicas avançadas em&nbsp;
              <strong>
                cirurgia colorretal na área oncológica e de doenças inflamatórias intestinais
              </strong>
              , além de experiência prática em&nbsp;
              <strong>cirurgias orificiais com abordagem minimamente invasiva</strong>. Essa
              vivência ampliou minha visão da especialidade e reforçou meu compromisso em oferecer
              tratamentos modernos, seguros e individualizados aos pacientes.
            </p>
          </main>

          <div className="prose prose-lg max-w-none mb-8 lg:mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary text-center">
              Formação e especialização
            </h2>
          </div>

          {/* Credentials Timeline */}
          <div className="relative mb-8 lg:mb-16">
            {/* Mobile Timeline */}
            <div className="lg:hidden max-w-[420px] mx-auto justify-center items-center">
              <div className="relative">
                {/* Mobile Connecting Line */}
                <div
                  className="absolute left-6 w-0.5 z-0"
                  style={{
                    top: '1.5rem',
                    bottom: '1.5rem',
                    background:
                      'linear-gradient(to bottom, #663a25 0%, rgba(102, 58, 37, 0.4) 50%, transparent 100%)',
                  }}
                />

                {/* Mobile Credentials */}
                <div className="space-y-8">
                  {credentials.map((credential, index) => {
                    const Icon = credential.icon
                    const isFirst = index === 0

                    return (
                      <div
                        key={index}
                        className={`relative flex items-start gap-6 w-full ${isFirst ? '' : ''}`}
                      >
                        {/* Icon */}
                        <div className="relative z-10 flex-shrink-0">
                          <div
                            className="border-2 border-background rounded-full p-3 shadow-lg"
                            style={{
                              background: `linear-gradient(135deg, ${credential.colorStart}, ${credential.colorEnd})`,
                            }}
                          >
                            <Icon className="size-5 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="pb-2">
                          <h3 className="text-lg font-serif font-bold text-primary mb-1">
                            {credential.title}
                          </h3>
                          <p className="text-sm font-medium text-primary/80 mb-2">
                            {credential.institution}
                          </p>
                          <p className="text-sm text-secondary leading-relaxed text-balance">
                            {credential.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Credentials Container */}
                <div className="relative max-w-5xl mx-auto">
                  {/* Connecting Line */}
                  <div
                    className="absolute left-1/2 w-0.5 transform -translate-x-1/2 z-0"
                    style={{
                      top: '0px',
                      bottom: '20px',
                      background:
                        'linear-gradient(to bottom, #663a25 0%, rgba(102, 58, 37, 0.4) 50%, transparent 100%)',
                    }}
                  />

                  {credentials.map((credential, index) => {
                    const Icon = credential.icon
                    const isLeft = index % 2 === 0
                    const isFirst = index === 0

                    return (
                      <div
                        key={index}
                        className={`relative flex items-center gap-2 ${
                          isFirst ? '' : 'mt-16 xl:mt-20'
                        }`}
                      >
                        {/* Content Left of Line */}
                        <div
                          className={`w-1/2 ${
                            isLeft ? 'text-right' : 'opacity-0 pointer-events-none'
                          }`}
                        >
                          {isLeft && (
                            <div className="space-y-3">
                              <h3 className="text-xl xl:text-2xl font-serif font-bold text-primary">
                                {credential.title}
                              </h3>
                              <p className="text-base xl:text-lg font-medium text-primary/80 whitespace-nowrap">
                                {credential.institution}
                              </p>
                              <p className="text-base xl:text-lg text-secondary leading-relaxed text-balance">
                                {credential.description}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Center Icon */}
                        <div className="relative z-10 flex-shrink-0">
                          <div
                            className="border-2 border-background rounded-full p-4 shadow-lg"
                            style={{
                              background: `linear-gradient(135deg, ${credential.colorStart}, ${credential.colorEnd})`,
                            }}
                          >
                            <Icon className="size-7 text-white" />
                          </div>
                        </div>

                        {/* Content Right of Line */}
                        <div
                          className={`w-1/2 ${
                            !isLeft ? 'text-left' : 'opacity-0 pointer-events-none'
                          }`}
                        >
                          {!isLeft && (
                            <div className="space-y-3">
                              <h3 className="text-xl xl:text-2xl font-serif font-bold text-primary">
                                {credential.title}
                              </h3>
                              <p className="text-base xl:text-lg font-medium text-primary/80 whitespace-nowrap">
                                {credential.institution}
                              </p>
                              <p className="text-base xl:text-lg text-secondary leading-relaxed text-balance">
                                {credential.description}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 lg:mb-16">
            <div className="prose prose-lg max-w-none mb-6">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-8 text-center">
                Filosofia de atendimento
              </h2>
              <p className="text-lg text-secondary leading-relaxed mb-8 text-pretty sm:text-center max-w-4xl mx-auto">
                Acredito que cada paciente é único e merece atenção individualizada. Minhas
                consultas são detalhadas, buscando compreender a história, os sintomas e o estilo de
                vida de cada pessoa. Para mim, diagnosticar e tratar não é suficiente — é
                fundamental&nbsp;
                <strong>adequar o tratamento às necessidades reais do paciente</strong>, garantindo
                segurança e qualidade de vida.
              </p>
            </div>

            {/* Principles Grid */}
            <div className="bg-gradient-to-b from-muted/20 to-transparent rounded-3xl p-4 sm:p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary mb-8 text-center">
                Meus princípios de atuação
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {principles.map((principle, index) => {
                  const Icon = principle.icon

                  return (
                    <div
                      key={index}
                      className="bg-background rounded-2xl p-6 lg:p-8 border border-secondary/20 hover:border-secondary/30 transition-all duration-300 shadow-sm hover:shadow-lg group hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-4">
                        {/* Icon Circle */}
                        <div className="flex-shrink-0">
                          <div
                            className={`${principle.bgColor} ${principle.borderColor} border-2 rounded-full p-3 shadow-sm`}
                            style={{
                              backgroundColor: 'var(--color-background)',
                            }}
                          >
                            <Icon className={`size-6 ${principle.color}`} />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-2">
                          <h4 className="text-xl font-serif font-bold text-primary">
                            {principle.title}
                          </h4>
                          <p className="text-base text-secondary leading-relaxed">
                            {principle.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="prose prose-lg max-w-none mt-8 lg:mt-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">
                Participações profissionais
              </h2>
              <p className="text-lg text-secondary leading-relaxed max-w-xl mx-auto text-pretty sm:text-center">
                Faço parte da&nbsp;
                <strong>International Anal Neoplasia Society (IANS)</strong>, o que me permite estar
                sempre atualizada sobre as mais recentes pesquisas e práticas internacionais em
                prevenção, diagnóstico e tratamento de doenças anorretais.
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-8 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-6 text-center">
              Compromisso com a educação
            </h2>
            <p className="text-lg text-secondary leading-relaxed text-pretty sm:text-center max-w-4xl mx-auto">
              Além da prática clínica, dedico parte do meu tempo à&nbsp;
              <strong>educação médica continuada</strong> e à&nbsp;
              <strong>divulgação de informações confiáveis sobre saúde coloproctológica</strong>.
              Acredito que o conhecimento compartilhado é uma ferramenta poderosa na prevenção e no
              tratamento precoce de doenças.
            </p>
          </div>

          {/* Contact CTA */}
          <CallToActionCard
            className="flex flex-col mx-auto w-fit items-center justify-center"
            title="Vamos cuidar da sua saúde juntos?"
            body={
              <p>
                Estou aqui para oferecer o cuidado especializado que você merece, com atenção
                humanizada e a mais alta qualidade técnica.
              </p>
            }
            actions={
              <>
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
                <LinkButton
                  href="/tratamentos"
                  size="xl"
                  variant="outline"
                  className="text-lg px-8 py-4 font-semibold text-nowrap shadow-lg hover:shadow-xl transform  transition-all duration-300"
                >
                  Conhecer tratamentos
                </LinkButton>
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
