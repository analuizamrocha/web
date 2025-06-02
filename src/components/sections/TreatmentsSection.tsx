import { Card } from '@/components/ui/Card'

const treatments = [
  {
    name: 'Cirurgias à laser',
  },
  {
    name: 'Botox para fissura anal',
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
    name: 'Anuscopia de alta resolução',
  },
]

export function TreatmentsSection() {
  return (
    <div id="tratamentos" className="bg-background py-12 sm:py-16">
      {/* Mobile Layout */}
      <div className="block lg:hidden px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-secondary">Tratamentos</h2>
          <p className="mt-6 text-lg leading-8 text-accent text-primary">
            Nossa consulta é individualizada e detalhada e busca um entendimento
            completo sobre você e seu problema. Para nós, diagnosticar e tratar
            não é o suficiente. Precisamos adequar os melhores tratamentos a
            quem você é e seu estilo de vida.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {treatments.map((treatment) => (
            <Card
              key={treatment.name}
              title={treatment.name}
              variant="treatment"
            />
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-secondary">Tratamentos</h2>
            <p className="mt-6 text-lg leading-8 text-accent text-primary">
              Nossa consulta é individualizada e detalhada e busca um
              entendimento completo sobre você e seu problema. Para nós,
              diagnosticar e tratar não é o suficiente. Precisamos adequar os
              melhores tratamentos a quem você é e seu estilo de vida.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-none grid-cols-3 gap-6 sm:mt-20">
            {treatments.map((treatment) => (
              <Card
                key={treatment.name}
                title={treatment.name}
                variant="treatment"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
