import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQHighlights } from '@/components/ui/FAQHighlights'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { patientFAQTopics, patientFAQs } from '@/lib/patient-faqs'
import { CRM_RQE_TEXT, DR_NAME, WEBSITE_URL, WHATSAPP_HREF_SECRETARY } from '@/lib/constants'
import {
  generateFAQSchema,
  generateOpenGraphMetadata,
  generateTwitterMetadata,
} from '@/lib/seo-schemas'

const title = 'Perguntas frequentes sobre coloproctologia em Curitiba'
const description =
  'Tire dúvidas sobre consulta com proctologista, hemorroidas, fissura anal, sangue nas fezes, colonoscopia, HPV e saúde intestinal em Curitiba.'
const url = `${WEBSITE_URL}/perguntas-frequentes`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: generateOpenGraphMetadata({ title, description, url }),
  twitter: generateTwitterMetadata({ title, description, url }),
}

export default function PatientFAQPage() {
  return (
    <div className="px-6 pb-16 pt-28 sm:px-8 lg:px-12 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...generateFAQSchema(patientFAQs),
            '@id': `${url}#faq`,
          }).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Início', item: WEBSITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Perguntas frequentes', item: url },
            ],
          }),
        }}
      />
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Navegação estrutural" className="mb-10 flex gap-3 text-sm text-text-muted">
          <Link href="/" className="hover:underline">
            Início
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Perguntas frequentes</span>
        </nav>
        <div className="mb-12 max-w-3xl">
          <span className="inline-flex rounded-full bg-card-bg px-4 py-2 text-xs font-semibold uppercase tracking-widest text-accent-strong">
            Perguntas frequentes · Coloproctologia
          </span>
          <h1 className="mb-6 mt-5 text-balance text-4xl font-serif font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Suas dúvidas merecem uma conversa.
          </h1>
          <p className="text-lg leading-relaxed text-text-body sm:text-xl">
            Perguntas frequentes sobre coloproctologia: consulta, sintomas e cuidados com o
            intestino, reto e ânus. Uma orientação inicial para você se preparar para o atendimento
            em Curitiba.
          </p>
          <p className="mt-4 text-sm text-text-muted">
            As respostas são educativas e não substituem uma avaliação médica individualizada.
          </p>
        </div>

        <section aria-labelledby="highlights-heading" className="mb-14">
          <div className="flex flex-wrap items-end justify-between gap-3 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-strong">
                Um ponto de partida
              </p>
              <h2 id="highlights-heading" className="mt-2 text-balance text-3xl font-serif font-bold text-primary sm:text-4xl">
                Dúvidas em destaque
              </h2>
            </div>
            <a
              href="#faq"
              className="text-sm font-semibold text-primary underline underline-offset-4"
            >
              Ver todas as perguntas ↓
            </a>
          </div>
          <FAQHighlights>
            {patientFAQTopics.flatMap((topic) =>
              topic.items
                .filter((item) => item.featured)
                .map((item) => (
                  <article
                    key={item.id}
                    className="flex min-w-0 shrink-0 basis-[88%] snap-start flex-col rounded-3xl border border-border-subtle bg-card-bg p-6 sm:basis-[60%] sm:p-8 lg:basis-[calc((100%-2.5rem)/3)]"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent-strong">
                      {topic.label}
                    </span>
                    <h3 className="mb-4 mt-5 text-balance text-xl font-serif font-bold leading-snug text-primary sm:text-2xl">
                      {item.question}
                    </h3>
                    <p className="mb-6 text-[15px] leading-relaxed text-text-body">{item.answer}</p>
                    <a
                      href={`#faq-${topic.id}`}
                      className="mt-auto text-sm font-semibold text-primary underline underline-offset-4"
                    >
                      Mais sobre {topic.label.toLowerCase()} →
                    </a>
                  </article>
                ))
            )}
          </FAQHighlights>
        </section>

        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="scroll-mt-24 rounded-3xl bg-primary p-6 text-background sm:p-10 lg:p-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-background/80">
            Dúvidas organizadas por assunto
          </p>
          <h2 id="faq-heading" className="mb-4 mt-3 text-balance text-3xl font-serif font-bold text-background sm:text-4xl">
            O que você gostaria de saber?
          </h2>
          <p className="text-background/90">
            Escolha um tema e abra as perguntas para ler as respostas.
          </p>
          <nav
            aria-label="Assuntos das perguntas frequentes"
            className="mt-7 border-t border-background/20 pt-7"
          >
            <ul className="flex flex-wrap gap-3">
              {patientFAQTopics.map((topic) => (
                <li key={topic.id}>
                  <a
                    href={`#faq-${topic.id}`}
                    className="inline-flex min-h-11 items-center gap-3 rounded-full border border-background/30 px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-background/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background"
                  >
                    {topic.label}
                    <span className="text-background/75">
                      {topic.items.length}
                      <span className="sr-only"> perguntas</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
          {patientFAQTopics.map((topic, index) => (
            <section
              key={topic.id}
              id={`faq-${topic.id}`}
              aria-labelledby={`heading-${topic.id}`}
              className="scroll-mt-24 rounded-3xl border border-border-subtle bg-bg-subtle p-6 sm:p-8"
            >
              <div className="mb-5 flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-card-bg text-sm font-semibold text-primary"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 id={`heading-${topic.id}`} className="text-2xl font-serif font-bold text-primary">
                    {topic.label}
                  </h2>
                  <p className="mt-2 text-sm text-text-muted">{topic.description}</p>
                </div>
              </div>
              <FAQAccordion items={topic.items} />
              <Link
                href={topic.href}
                className="mt-6 inline-block text-sm font-semibold text-primary underline underline-offset-4"
              >
                {topic.linkLabel} →
              </Link>
            </section>
          ))}
        </div>

        <aside
          aria-label="Quando procurar atendimento imediato"
          className="my-10 rounded-2xl border border-border-subtle bg-card-bg p-6 text-text-body"
        >
          <h2 className="mb-3 text-xl font-serif font-bold text-primary">Quando não esperar pela consulta</h2>
          <p className="text-sm">
            Sangramento intenso, desmaio, dor forte com febre ou piora importante do estado geral
            precisam de atendimento imediato em um serviço de urgência. O WhatsApp de agendamento
            não é um canal de emergência.
          </p>
        </aside>

        <section
          aria-labelledby="contact-heading"
          className="my-12 rounded-3xl bg-card-bg p-8 sm:p-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-strong">
            Atendimento em Curitiba
          </p>
          <h2 id="contact-heading" className="mb-4 mt-3 text-balance text-3xl font-serif font-bold text-primary sm:text-4xl">
            Sua dúvida pode ser o começo do cuidado.
          </h2>
          <p className="text-text-body">
            Para entender seus sintomas e as opções para o seu caso, converse com a equipe e
            organize sua consulta.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={WHATSAPP_HREF_SECRETARY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 py-3 font-semibold text-background hover:bg-text-heading"
            >
              Falar com a equipe
            </a>
            <Link
              href="/locais-de-atendimento"
              className="inline-flex min-h-12 items-center px-3 text-sm font-semibold text-primary underline underline-offset-4"
            >
              Ver locais de atendimento →
            </Link>
          </div>
        </section>
        <footer className="border-t border-border-subtle pt-8 text-sm text-text-muted">
          <p>
            <Link href="/sobre" className="font-semibold text-primary underline underline-offset-4">
              {DR_NAME}
            </Link>
            <br />
            Médica Coloproctologista · {CRM_RQE_TEXT}
          </p>
          <p>
            Este conteúdo tem caráter educativo e não substitui a consulta médica. Procure
            orientação profissional para diagnóstico e tratamento adequados.
          </p>
          <p className="mt-4">
            Referências para pacientes:{' '}
            <a
              href="https://www.fascrs.org/Web/Patients/Diseases-and-Conditions/A-Z/Hemorrhoids.aspx"
              className="underline"
            >
              ASCRS — hemorroidas
            </a>{' '}
            e{' '}
            <a
              href="https://www.fascrs.org/Web/Patients/Diseases-and-Conditions/A-Z/Anal-Fissure.aspx"
              className="underline"
            >
              fissura anal
            </a>
            . Veja também os{' '}
            <Link href="/blog" className="underline">
              artigos educativos do blog
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  )
}
