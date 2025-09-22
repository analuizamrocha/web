import { Card } from '@/components/ui/Card'
import Link from 'next/link'

const treatments = [
  {
    name: 'Cirurgias à laser',
  },
  {
    name: 'Toxina botulínica para fissura anal e dores crônicas',
  },
  {
    name: 'Cirurgias para fístulas anorretais',
  },
  {
    name: 'Ligadura elástica para hemorróidas',
  },
  {
    name: 'Rastreio e prevenção do câncer de canal anal',
  },
  {
    name: 'Acompanhamento de doenças inflamatórias intestinais',
  },
  {
    name: 'Tratamento de HPV',
  },
  {
    name: 'Cirurgia de cisto pilonidal',
  },
  {
    name: 'Síndrome do intestino irritável',
  },
]

export function TreatmentsSection() {
  return (
    <section id="tratamentos" className="section bg-background">
      {/* Beautiful Responsive Layout */}
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Header Section - Enhanced Typography */}
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
            Tratamentos
          </h2>
          <div className="text-xl lg:text-2xl leading-relaxed text-secondary font-medium space-y-4">
            <p>
              Nossa consulta é individualizada e detalhada e busca um
              entendimento completo sobre você e seu problema.
            </p>
            <p>Para nós, diagnosticar e tratar não é o suficiente.</p>
            <p>
              Precisamos adequar os melhores tratamentos ao seu estilo de vida.
            </p>
          </div>
        </div>

        {/* Smart Responsive Grid - Hides last item for even columns */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8 xl:gap-10">
          {treatments.map((treatment, index) => (
            <Card
              key={treatment.name}
              title={treatment.name}
              variant="treatment"
              className={`
                ${
                  index === treatments.length - 1
                    ? 'flex sm:hidden lg:flex'
                    : ''
                }
              `}
            />
          ))}
        </div>
      </div>
      {/* TODO: Add a link to the /tratamentos page */}
      {/* right aligned, "saiba mais" link */}
      <div className="text-center">
        <Link
          href="/tratamentos"
          className="text-primary hover:text-primary/80 font-medium transition-colors text-lg"
        >
          Saiba mais
        </Link>
      </div>
    </section>
  )
}
