import type { Metadata } from 'next'
import Link from 'next/link'
import { PlaceCard } from '@/components/ui/PlaceCard'
import { ChoiceRow, type ChoiceRowItem } from '@/components/ui/ChoiceRow'
import { FAQAccordion, type FAQAccordionItem } from '@/components/ui/FAQAccordion'
import { StickyCTABar } from '@/components/ui/StickyCTABar'
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/seo-schemas'
import {
  LOCATIONS_BASE_PATH,
  getLocationsIndexStructuredData,
  locationPages,
} from '@/lib/locations'
import { WEBSITE_URL, WPP_NUMBER_NASSIF, WHATSAPP_MSG_TEXT_ENCODED } from '@/lib/constants'

const pageTitle = 'Locais de atendimento em Curitiba'
const pageDescription =
  'Veja onde a Dra. Ana Luiza Rocha atende em Curitiba, com informações sobre consulta em coloproctologia, colonoscopia, endereços e agendamento.'
const pageUrl = `${WEBSITE_URL}${LOCATIONS_BASE_PATH}`

const nassifWhatsAppHref = `https://wa.me/${WPP_NUMBER_NASSIF.replace(/\D/g, '')}/?text=${WHATSAPP_MSG_TEXT_ENCODED}`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
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

const choiceRows: ChoiceRowItem[] = [
  {
    when: 'Primeira avaliação',
    recommendationStrong: 'Comece pela consulta.',
    recommendationRest:
      'A avaliação acontece na Clínica Nassif e organiza sintomas, histórico, exames e próximos passos.',
    href: '/locais-de-atendimento/clinica-nassif',
    variant: 'terracotta',
  },
  {
    when: 'Retorno ou acompanhamento',
    recommendationStrong: 'Siga pela Clínica Nassif.',
    recommendationRest: 'O seguimento clínico e a revisão de condutas acontecem no mesmo local.',
    href: '/locais-de-atendimento/clinica-nassif',
    variant: 'terracotta',
  },
  {
    when: 'Colonoscopia indicada',
    recommendationStrong: 'Siga para o exame.',
    recommendationRest:
      'A colonoscopia é realizada pela Dra. Ana na Specta, com preparo orientado.',
    href: '/locais-de-atendimento/specta-endoscopia-digestiva',
    variant: 'sage',
  },
  {
    when: 'Dúvida sobre agendamento',
    recommendationStrong: 'Fale com a equipe.',
    recommendationRest: 'O atendimento ajuda a identificar o melhor ponto de partida.',
    href: nassifWhatsAppHref,
    variant: 'terracotta',
    external: true,
  },
]

const indexFaq: FAQAccordionItem[] = [
  {
    question: 'Posso marcar a colonoscopia sem passar em consulta antes?',
    answer:
      'A colonoscopia é indicada a partir de avaliação clínica. Em geral, o ponto de partida é a consulta na Clínica Nassif. Se o exame fizer sentido para o seu caso, ele é organizado na Specta.',
  },
  {
    question: 'A Dra. Ana atende em outros locais em Curitiba?',
    answer:
      'No momento, a consulta acontece na Clínica Nassif. A colonoscopia, quando indicada, é realizada na Specta. Procedimentos cirúrgicos são organizados em hospitais parceiros, sempre com orientação prévia.',
  },
  {
    question: 'Os dois locais aceitam convênio?',
    answer:
      'Depende do plano e do tipo de atendimento. A equipe confirma autorização, cobertura e valores antes do agendamento. O atendimento particular também está disponível.',
  },
  {
    question: 'Como funciona o retorno após a colonoscopia?',
    answer:
      'O resultado é revisto em consulta de retorno na Clínica Nassif, no Batel. A Dra. Ana relaciona o laudo ao seu quadro clínico e orienta os próximos passos.',
  },
  {
    question: 'Pacientes de outras cidades podem agendar?',
    answer:
      'Sim. O atendimento presencial acontece em Curitiba, mas pacientes de outras cidades podem agendar consulta e, quando houver indicação, organizar exames na mesma vinda. A equipe orienta a melhor forma de planejar.',
  },
]

export default function LocationsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getLocationsIndexStructuredData(),
        }}
      />

      {/* ── HERO ── */}
      <section className="bg-background pt-24 md:pt-28 pb-6 lg:pb-10 animate-fade-in">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14">
          <nav className="mb-7 flex items-center gap-2.5 text-[13px] text-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <span className="opacity-50">›</span>
            <span className="font-medium text-primary">Locais de atendimento</span>
          </nav>

          <div className="max-w-[820px]">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
              Atendimento em Curitiba
            </span>
            <h1 className="mb-5 max-w-[14ch] font-serif text-[36px] sm:text-5xl lg:text-[52px] font-bold leading-[1.04] tracking-[-0.01em] text-primary">
              Consulta no Batel, colonoscopia nas Mercês.
            </h1>
            <p className="max-w-[52ch] font-serif text-[19px] italic font-normal leading-[1.55] text-body">
              A avaliação clínica acontece na Clínica Nassif, no Batel. Quando há indicação de
              colonoscopia, o exame é realizado na Specta Endoscopia Digestiva.
            </p>
          </div>
        </div>
      </section>

      {/* ── PLACES (2 cards side by side) ── */}
      <section className="bg-background pb-14">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
            {locationPages.map((location) => (
              <PlaceCard key={location.slug} location={location} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO CHOOSE (decision band) ── */}
      <section className="bg-subtle py-14">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_9fr] lg:gap-16 lg:items-start">
            <header>
              <span className="mb-3.5 block text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
                Orientação de agendamento
              </span>
              <h2 className="max-w-[14ch] font-serif text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.01em] text-primary">
                Qual local faz sentido para o seu momento
              </h2>
            </header>

            <div className="grid gap-3.5">
              {choiceRows.map((row) => (
                <ChoiceRow key={row.when} {...row} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-subtle py-14">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
              Dúvidas comuns
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-[1.1] tracking-[-0.01em] text-primary">
              Para agendar com mais clareza
            </h2>
          </div>
          <FAQAccordion items={indexFaq} defaultOpenIndex={0} />
        </div>
      </section>

      {/* ── STICKY CTA ── */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-14 -mt-8 pb-16">
        <StickyCTABar
          eyebrow="Não sabe por onde começar?"
          message="Nossa equipe te ajuda a dar o primeiro passo"
          primaryHref={nassifWhatsAppHref}
          primaryLabel="Agendar consulta"
        />
      </div>
    </>
  )
}
