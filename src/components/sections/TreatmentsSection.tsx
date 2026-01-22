import { LinkButton } from '@/components/ui/LinkButton'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
              Nossa consulta é individualizada e detalhada e busca um entendimento completo sobre
              você e seu problema.
            </p>
            <p>
              Para nós, cuidar vai além do diagnóstico. Adaptamos cada tratamento ao seu estilo de
              vida.
            </p>
          </div>
        </div>

        {/* Thin Treatments Grid with Clickable Arrows */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment, index) => (
            <div
              key={treatment.slug}
              className={`group relative rounded-xl sm:rounded-2xl border border-primary/15 bg-background hover:bg-card transition-all duration-300 hover:border-primary/25 hover:shadow-sm min-h-[100px] sm:min-h-[110px] lg:min-h-[120px] ${
                index === treatments.length - 1 ? 'flex sm:hidden lg:flex' : 'flex'
              }`}
            >
              {/* Non-clickable content area */}
              <div className="flex-grow p-3.5 sm:p-5 lg:p-6 flex items-center">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-primary leading-snug">
                  {treatment.name}
                </h3>
              </div>

              {/* Clickable arrow button only */}
              <Link
                href={`/tratamentos/${treatment.slug}`}
                className="flex-shrink-0 flex items-center justify-center w-12 sm:w-14 lg:w-16 border-l border-primary/10 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 group rounded-r-xl sm:rounded-r-2xl"
                aria-label={`Ver detalhes sobre ${treatment.name}`}
              >
                <ArrowRight
                  size={18}
                  className="sm:w-5 sm:h-5 text-primary group-hover:translate-x-0.5 transition-transform duration-300"
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <LinkButton href="/tratamentos" variant="link" size="lg">
            Ver todos os tratamentos
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
