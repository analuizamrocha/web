import { LinkButton } from '@/components/ui/LinkButton'
import { TreatmentCard } from '@/components/ui/TreatmentCard'

const treatments = [
  {
    name: 'Cirurgias a laser',
    slug: 'cx-laser',
  },
  {
    name: 'Toxina botulínica para fissura anal e dores crônicas',
    slug: 'toxina-botulinica',
  },
  {
    name: 'Cirurgias para fístulas anorretais',
    slug: 'cx-fistulas-anorretais',
  },
  {
    name: 'Ligadura elástica para hemorroidas',
    slug: 'hemorroidas',
  },
  {
    name: 'Rastreio e prevenção do câncer de canal anal',
    slug: 'rastreio-cancer-anal',
  },
  {
    name: 'Acompanhamento de doenças inflamatórias intestinais',
    slug: 'doencas-inflamatorias-intestinais',
  },
  {
    name: 'Tratamento de HPV',
    slug: 'hpv-anal',
  },
  {
    name: 'Cirurgia de cisto pilonidal',
    slug: 'cx-cisto-pilonidal',
  },
  {
    name: 'Síndrome do intestino irritável',
    slug: 'sindrome-intestino-irritavel',
  },
]

export function TreatmentsSection() {
  return (
    <section id="tratamentos" className="section bg-background">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
            Tratamentos
          </h2>
          <div className="text-xl lg:text-2xl leading-relaxed text-secondary font-medium space-y-4">
            <p>
              Nossa consulta é individualizada e detalhada e busca um
              entendimento completo sobre você e seu problema.
            </p>
            <p>
              Para nós, cuidar vai além do diagnóstico. Adaptamos cada
              tratamento ao seu estilo de vida.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -left-8 -top-8 hidden h-28 w-28 rounded-full bg-secondary/30 blur-2xl lg:block" />
          <div className="pointer-events-none absolute -right-8 bottom-0 hidden h-24 w-24 rounded-full bg-secondary/25 blur-2xl lg:block" />

          {/* Smart Responsive Grid - Hides last item for even columns */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-7">
            {treatments.map((treatment, index) => (
              <TreatmentCard
                key={treatment.slug}
                title={treatment.name}
                href={`/tratamentos/${treatment.slug}`}
                variant="compact"
                className={index === treatments.length - 1 ? 'sm:hidden lg:flex' : undefined}
              />
            ))}
          </div>
        </div>

        <div className="text-right mt-4">
          <LinkButton href="/tratamentos" variant="outline" size="lg">
            Ver todos os tratamentos
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
