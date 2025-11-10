import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";

const treatments = [
  {
    name: "Cirurgias a laser",
  },
  {
    name: "Toxina botulínica para fissura anal e dores crônicas",
  },
  {
    name: "Cirurgias para fístulas anorretais",
  },
  {
    name: "Ligadura elástica para hemorroidas",
  },
  {
    name: "Rastreio e prevenção do câncer de canal anal",
  },
  {
    name: "Acompanhamento de doenças inflamatórias intestinais",
  },
  {
    name: "Tratamento de HPV",
  },
  {
    name: "Cirurgia de cisto pilonidal",
  },
  {
    name: "Síndrome do intestino irritável",
  },
];

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
                    ? "flex sm:hidden lg:flex"
                    : ""
                }
              `}
            />
          ))}
        </div>

        <div className="text-right mt-4">
          <LinkButton href="/tratamentos" variant="outline" size="lg">
            Ver todos os tratamentos
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
