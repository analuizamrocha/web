import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { Divider } from '@/components/ui/Divider'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { LinkButton } from '@/components/ui/LinkButton'
import { TreatmentCard } from '@/components/ui/TreatmentCard'
import { WHATSAPP_HREF_SECRETARY } from '@/lib/constants'

/**
 * Dev-only kitchen-sink page.
 *
 * - In production builds, `notFound()` returns 404 so visitors can't reach it.
 * - `robots: noindex` is belt-and-braces in case the page leaks into a preview.
 * - Imports the real components from `@/components/ui/*` so the page can never
 *   drift from what the site actually ships.
 */
export const metadata: Metadata = {
  title: 'Design system — dev only',
  robots: { index: false, follow: false },
}

const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'sage',
  'destructive',
] as const

const BUTTON_SIZES = ['sm', 'default', 'lg', 'xl'] as const

const BADGE_VARIANTS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
] as const

const BADGE_SIZES = ['sm', 'md', 'lg'] as const

const COLOR_TOKENS = [
  { name: 'background', value: '#fffbf7', utility: 'bg-background' },
  { name: 'primary', value: '#663a25', utility: 'bg-primary' },
  { name: 'secondary', value: '#d4b7a2', utility: 'bg-secondary' },
  { name: 'tertiary', value: '#b08771', utility: 'bg-tertiary' },
  { name: 'brand-primary', value: '#c27e5c', utility: 'bg-brand-primary' },
  { name: 'accent-neutral (sage)', value: '#7a8b68', utility: 'bg-accent-neutral' },
  { name: 'accent-sage-deep', value: '#5d6f47', utility: 'bg-accent-sage-deep' },
  { name: 'text-heading', value: '#3d1f0f', utility: 'text-heading' },
  { name: 'text-body', value: '#6b4226', utility: 'text-body' },
  { name: 'text-muted', value: '#8b5a3c', utility: 'text-muted' },
  { name: 'card-bg', value: '#f5ebe1', utility: 'bg-card' },
  { name: 'card-bg-hover', value: '#f0e3d4', utility: 'bg-card-hover' },
  { name: 'bg-subtle', value: '#fef8f2', utility: 'bg-subtle' },
  { name: 'border-subtle', value: '#e5d4c4', utility: 'border-subtle' },
]

const TOC = [
  { id: 'tokens', label: 'Tokens' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'link-buttons', label: 'LinkButton' },
  { id: 'badges', label: 'Badge' },
  { id: 'cards', label: 'Cards' },
  { id: 'layout', label: 'Layout primitives' },
]

const SAMPLE_FAQ = [
  {
    question: 'Como agendo uma consulta?',
    answer: 'Você pode agendar pelo botão "Agendar consulta" ou diretamente pelo nosso WhatsApp.',
  },
  {
    question: 'Quais convênios são aceitos?',
    answer: 'A consulta é particular. Após a consulta, fornecemos a documentação necessária para reembolso.',
  },
]

export default function DesignPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <div className="mx-auto max-w-[1280px] px-6 pt-24 pb-16 sm:px-8 md:pt-28 lg:px-10 xl:px-12">
      <header className="mb-12">
        <p className="text-xs font-mono uppercase tracking-wider text-muted">dev only · not indexed</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-heading sm:text-5xl">
          Design system kitchen sink
        </h1>
        <p className="mt-3 text-body max-w-prose">
          Every reusable primitive in one place. Edit a token in <code className="rounded bg-card px-1.5 py-0.5 text-sm">globals.css</code> or a variant in <code className="rounded bg-card px-1.5 py-0.5 text-sm">Button.tsx</code> and scroll this page to see what changed. See <code className="rounded bg-card px-1.5 py-0.5 text-sm">docs/components.md</code> for the full inventory.
        </p>

        <nav aria-label="Table of contents" className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {TOC.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full border border-primary/20 px-3 py-1 text-primary transition-colors hover:bg-primary hover:text-background"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      {/* TOKENS */}
      <section id="tokens" className="scroll-mt-24 py-12">
        <SectionHeading title="Tokens" caption="Defined in `src/app/globals.css` (@theme) and extended by `tailwind.config.ts`." />

        <h3 className="mt-8 mb-4 text-lg font-semibold text-heading">Colors</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {COLOR_TOKENS.map((token) => (
            <div key={token.name} className="overflow-hidden rounded-2xl border border-subtle">
              <div
                className="h-20 w-full"
                style={{ backgroundColor: token.value }}
                aria-hidden
              />
              <div className="p-3">
                <p className="text-sm font-semibold text-heading">{token.name}</p>
                <p className="font-mono text-xs text-muted">{token.value}</p>
                <p className="mt-1 font-mono text-[11px] text-muted">{token.utility}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-12 mb-4 text-lg font-semibold text-heading">Typography</h3>
        <div className="space-y-4 rounded-2xl border border-subtle bg-card p-6">
          <div>
            <p className="font-mono text-xs text-muted">.text-hero</p>
            <p className="text-hero text-primary">Cada paciente uma história</p>
          </div>
          <div>
            <p className="font-mono text-xs text-muted">.text-section-title</p>
            <p className="text-section-title text-primary">Cuidado humanizado e especializado</p>
          </div>
          <div>
            <p className="font-mono text-xs text-muted">.text-subsection-title</p>
            <p className="text-subsection-title text-primary">Quando procurar uma coloproctologista</p>
          </div>
          <div>
            <p className="font-mono text-xs text-muted">h3</p>
            <h3 className="text-primary">Cirurgias a Laser</h3>
          </div>
          <div>
            <p className="font-mono text-xs text-muted">.text-body-lg</p>
            <p className="text-body-lg text-body">
              Corpo de texto largo para parágrafos introdutórios e conteúdo destacado em landing pages.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-muted">.text-body</p>
            <p className="text-body">
              Corpo de texto padrão para uso geral. Otimizado para leitura confortável.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-muted">.text-body-sm</p>
            <p className="text-body-sm text-muted">Metadados, legendas e textos de apoio.</p>
          </div>
        </div>

        <h3 className="mt-12 mb-4 text-lg font-semibold text-heading">Shadows</h3>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { name: 'shadow-sm', utility: 'shadow-sm' },
            { name: 'shadow-md', utility: 'shadow-md' },
            { name: 'shadow-lg', utility: 'shadow-lg' },
            { name: 'shadow-brand', utility: 'shadow-brand' },
            { name: 'shadow-brand-lg', utility: 'shadow-brand-lg' },
          ].map((shadow) => (
            <div
              key={shadow.name}
              className={`flex h-24 items-center justify-center rounded-2xl bg-background ${shadow.utility}`}
            >
              <span className="font-mono text-xs text-muted">{shadow.name}</span>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* BUTTONS */}
      <section id="buttons" className="scroll-mt-24 py-12">
        <SectionHeading
          title="Buttons"
          caption="`src/components/ui/Button.tsx`. The active hierarchy is primary → outline → ghost."
        />

        <h3 className="mt-8 mb-4 text-lg font-semibold text-heading">Variants × sizes</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-x-2 border-spacing-y-3">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-muted">variant</th>
                {BUTTON_SIZES.map((size) => (
                  <th key={size} className="text-left text-xs font-medium text-muted">
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BUTTON_VARIANTS.map((variant) => (
                <tr key={variant}>
                  <td className="pr-4 align-middle font-mono text-xs text-heading">{variant}</td>
                  {BUTTON_SIZES.map((size) => (
                    <td key={size} className="align-middle">
                      <Button variant={variant} size={size}>
                        Button
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-12 mb-4 text-lg font-semibold text-heading">Disabled state</h3>
        <div className="flex flex-wrap items-center gap-3">
          {BUTTON_VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {variant}
            </Button>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* LINKBUTTON */}
      <section id="link-buttons" className="scroll-mt-24 py-12">
        <SectionHeading
          title="LinkButton"
          caption="`src/components/ui/LinkButton.tsx`. Same variants as `Button` but renders an anchor — use this whenever the action is navigation."
        />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <LinkButton href="/" variant="primary" size="lg">
            Internal link
          </LinkButton>
          <LinkButton href={WHATSAPP_HREF_SECRETARY} external newTab variant="outline" size="lg">
            External + new tab
          </LinkButton>
          <LinkButton href="/blog" variant="ghost" size="lg" className="group">
            Ghost with arrow
            <span className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </LinkButton>
        </div>
      </section>

      <SectionDivider />

      {/* BADGE */}
      <section id="badges" className="scroll-mt-24 py-12">
        <SectionHeading
          title="Badge"
          caption="`src/components/ui/Badge.tsx`. Used heavily for card metadata (intent, audience, category)."
        />

        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-separate border-spacing-x-2 border-spacing-y-3">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-muted">variant</th>
                {BADGE_SIZES.map((size) => (
                  <th key={size} className="text-left text-xs font-medium text-muted">
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BADGE_VARIANTS.map((variant) => (
                <tr key={variant}>
                  <td className="pr-4 align-middle font-mono text-xs text-heading">{variant}</td>
                  {BADGE_SIZES.map((size) => (
                    <td key={size} className="align-middle">
                      <Badge variant={variant} size={size}>
                        {variant}
                      </Badge>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <SectionDivider />

      {/* CARDS */}
      <section id="cards" className="scroll-mt-24 py-12">
        <SectionHeading
          title="Cards"
          caption="See `docs/components.md` for the full 'which card to use when' matrix."
        />

        <h3 className="mt-8 mb-4 text-lg font-semibold text-heading">TreatmentCard — compact</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TreatmentCard
            title="Cirurgias a Laser"
            href="/tratamentos/cx-laser"
            variant="compact"
          />
          <TreatmentCard
            title="Tratamento de Hemorroidas"
            href="/tratamentos/hemorroidas"
            variant="compact"
          />
          <TreatmentCard
            title="Cirurgia de Cisto Pilonidal"
            href="/tratamentos/cisto-pilonidal"
            variant="compact"
          />
        </div>

        <h3 className="mt-12 mb-4 text-lg font-semibold text-heading">TreatmentCard — detailed</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TreatmentCard
            title="Cirurgias a Laser"
            href="/tratamentos/cx-laser"
            description="Procedimentos minimamente invasivos com tecnologia laser para tratamento de hemorroidas, fissuras e fístulas."
            category="Cirúrgico"
            variant="detailed"
          />
        </div>

        <h3 className="mt-12 mb-4 text-lg font-semibold text-heading">CallToActionCard — primary tone</h3>
        <CallToActionCard
          variant="primary"
          title="Precisa de um diagnóstico especializado?"
          body={
            <>
              Agende sua consulta e receba o cuidado especializado que você merece.
              <br />
              Atendimento humanizado com a mais alta qualidade técnica.
            </>
          }
          actions={
            <>
              <LinkButton href={WHATSAPP_HREF_SECRETARY} external newTab variant="primary" size="lg">
                Agendar consulta
              </LinkButton>
              <LinkButton href="/locais-de-atendimento" variant="outline" size="lg">
                Locais de atendimento
              </LinkButton>
              <LinkButton href="/blog" variant="ghost" size="lg" className="group">
                Ler o blog
                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </LinkButton>
            </>
          }
        />

        <h3 className="mt-12 mb-4 text-lg font-semibold text-heading">CallToActionCard — secondary tone</h3>
        <CallToActionCard
          variant="secondary"
          title="Vamos cuidar da sua saúde juntos?"
          body="Estou aqui para oferecer o cuidado especializado que você merece."
          actions={
            <LinkButton href={WHATSAPP_HREF_SECRETARY} external newTab variant="primary" size="lg">
              Agendar consulta
            </LinkButton>
          }
        />

        <h3 className="mt-12 mb-4 text-lg font-semibold text-heading">Card with image — sample</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-secondary/20 bg-card-bg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-lg">
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary/15">
              <Image
                src="/images/posts/celulas-mesenquimais-fistulas-anorretais/celulas-mesenquimais-fistulas-anorretais.png"
                alt="Sample blog card"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 lg:p-6">
              <div className="mb-3 flex items-center gap-4 text-sm text-muted">
                <time dateTime="2026-01-15">15 de jan, 2026</time>
                <span>· 6 min</span>
              </div>
              <h3 className="!font-serif text-xl font-bold text-primary">Sample blog card</h3>
              <p className="mt-2 text-body">
                The blog index page uses this layout. Flex column with mt-auto on metadata so cards align even with varying excerpt lengths.
              </p>
              <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">Decisão</Badge>
                  <Badge variant="secondary">Pacientes</Badge>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <SectionDivider />

      {/* LAYOUT PRIMITIVES */}
      <section id="layout" className="scroll-mt-24 py-12">
        <SectionHeading
          title="Layout primitives"
          caption="Small reusable pieces: Breadcrumb, Divider, FAQAccordion."
        />

        <h3 className="mt-8 mb-4 text-lg font-semibold text-heading">Breadcrumb</h3>
        <div className="rounded-2xl border border-subtle bg-card p-6">
          <Breadcrumb
            items={[
              { label: 'Início', href: '/' },
              { label: 'Tratamentos', href: '/tratamentos' },
              { label: 'Cirurgias a Laser' },
            ]}
          />
        </div>

        <h3 className="mt-12 mb-4 text-lg font-semibold text-heading">Divider</h3>
        <div className="rounded-2xl border border-subtle bg-card p-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-body">Item A</span>
            <Divider orientation="vertical" size="sm" className="h-4" />
            <span className="text-sm text-body">Item B</span>
            <Divider orientation="vertical" size="md" className="h-4" />
            <span className="text-sm text-body">Item C</span>
          </div>
          <div className="mt-6 space-y-3">
            <span className="text-sm text-body">Above</span>
            <Divider orientation="horizontal" size="sm" />
            <span className="text-sm text-body">Below</span>
          </div>
        </div>

        <h3 className="mt-12 mb-4 text-lg font-semibold text-heading">FAQAccordion</h3>
        <div className="rounded-2xl border border-subtle bg-background p-6">
          <FAQAccordion items={SAMPLE_FAQ} defaultOpenIndex={0} />
        </div>
      </section>
    </div>
  )
}

function SectionHeading({ title, caption }: { title: string; caption: string }) {
  return (
    <div>
      <h2 className="font-serif text-3xl font-bold text-heading">{title}</h2>
      <p className="mt-2 text-sm text-muted">{caption}</p>
    </div>
  )
}

function SectionDivider() {
  return <div className="my-12 border-t border-subtle" aria-hidden />
}
