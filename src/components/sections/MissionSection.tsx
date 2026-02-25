import { Heart, Shield, Users, Stethoscope } from 'lucide-react'

const missionValues = [
  {
    icon: Stethoscope,
    title: 'Cuidar vai além de tratar',
    description:
      'É ouvir, acolher e valorizar cada queixa do paciente. Um diagnóstico preciso começa com uma escuta atenta.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
  },
  {
    icon: Shield,
    title: 'Prevenir é a melhor escolha',
    description:
      'A prevenção é sempre o caminho mais eficaz para manter a saúde e evitar complicações futuras.',
    color: 'text-brand-primary',
    bgColor: 'bg-brand-primary/10',
    borderColor: 'border-brand-primary/20',
  },
  {
    icon: Heart,
    title: 'Qualidade de vida em primeiro lugar',
    description:
      'Ter uma doença crônica não significa abrir mão da qualidade de vida. Cada paciente merece viver plenamente.',
    color: 'text-accent-neutral',
    bgColor: 'bg-accent-neutral/10',
    borderColor: 'border-accent-neutral/20',
  },
  {
    icon: Users,
    title: 'Jornada compartilhada',
    description:
      'Lembrar que a gente não vence nada sozinho - a jornada da saúde é compartilhada entre médico e paciente.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/20',
    borderColor: 'border-secondary/30',
  },
]

export function MissionSection() {
  return (
    <section id="missao" className="section section-deferred bg-background">
      {/* Header Section - Enhanced Typography */}
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
            Nossa Missão
          </h2>
          <div className="text-xl lg:text-2xl leading-relaxed text-secondary font-medium space-y-4">
            <p>
              Transformar tabus em cuidado humanizado através de atendimento
              médico especializado.
            </p>
            <p>Coloproctologia com empatia e excelência técnica.</p>
          </div>
        </div>

        {/* Mobile: Simplified Timeline */}
        <div className="lg:hidden max-w-[350px] mx-auto">
          <div className="relative">
            {/* Mobile Connecting Line */}
            <div
              className="absolute left-6 w-0.5 bg-gradient-to-b from-primary via-brand-primary to-secondary z-0"
              style={{ top: '1.5rem', bottom: '1.5rem' }}
            ></div>

            {/* Mobile Mission Values */}
            <div className="space-y-8">
              {missionValues.map((value, index) => {
                const Icon = value.icon
                const isFirst = index === 0

                return (
                  <div
                    key={index}
                    className={`relative flex items-start gap-4 ${
                      isFirst ? '' : ''
                    }`}
                  >
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`${value.bgColor} ${value.borderColor} border-2 rounded-full p-3 shadow-sm`}
                        style={{ backgroundColor: 'var(--color-background)' }}
                      >
                        <Icon className={`size-5 ${value.color}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <h3 className="text-lg font-serif font-bold text-primary mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-secondary font-medium leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Desktop: Beautiful Timeline/Steps Design */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Mission Values Container */}
            <div className="relative max-w-4xl mx-auto">
              {/* Connecting Line - Starts from first icon */}
              <div
                className="absolute left-1/2 w-0.5 bg-gradient-to-b from-primary via-brand-primary to-secondary transform -translate-x-1/2 z-0"
                style={{ top: '0px', bottom: '20px' }}
              ></div>

              {missionValues.map((value, index) => {
                const Icon = value.icon
                const isLeft = index % 2 === 0 // Even items on left, odd on right
                const isFirst = index === 0

                return (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      isFirst ? '' : 'mt-16 xl:mt-20'
                    }`}
                  >
                    {/* Content Left of Line */}
                    <div
                      className={`w-1/2 ${
                        isLeft
                          ? 'pr-12 text-right'
                          : 'pr-12 opacity-0 pointer-events-none'
                      }`}
                    >
                      {isLeft && (
                        <div className="space-y-4">
                          <h3 className="text-2xl xl:text-3xl font-serif font-bold text-primary">
                            {value.title}
                          </h3>
                          <p className="text-lg xl:text-xl text-secondary font-medium leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Center Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`${value.bgColor} ${value.borderColor} border-2 rounded-full p-5 shadow-lg`}
                        style={{ backgroundColor: 'var(--color-background)' }}
                      >
                        <Icon className={`size-8 ${value.color}`} />
                      </div>
                    </div>

                    {/* Content Right of Line */}
                    <div
                      className={`w-1/2 ${
                        !isLeft
                          ? 'pl-12 text-left'
                          : 'pl-12 opacity-0 pointer-events-none'
                      }`}
                    >
                      {!isLeft && (
                        <div className="space-y-4">
                          <h3 className="text-2xl xl:text-3xl font-serif font-bold text-primary">
                            {value.title}
                          </h3>
                          <p className="text-lg xl:text-xl text-secondary font-medium leading-relaxed">
                            {value.description}
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
    </section>
  )
}
