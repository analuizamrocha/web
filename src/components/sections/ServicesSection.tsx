import { Card } from '@/components/ui/Card'
import { WPP_NUMBER_NASSIF } from '@/lib/constants'

const buildWhatsAppLink = (serviceName: string) =>
  `https://wa.me/${WPP_NUMBER_NASSIF}/?text=${encodeURIComponent(
    `Olá! Gostaria de saber mais sobre ${serviceName.toLowerCase()} e agendar uma consulta.`
  )}`

const services = [
  {
    name: 'Hemorroidas',
    description:
      'Quando há dor, sangramento, coceira ou incômodo ao evacuar, é possível que se trate de hemorroidas. Felizmente, hoje existem alternativas modernas e menos invasivas para aliviar esses sintomas com segurança.',
    href: '/blog/hemorroida-sempre-cirurgica-tratamento',
  },
  {
    name: 'Fissura Anal',
    description:
      'Trata-se de uma pequena lesão na borda anal que costuma causar dor intensa durante e após as evacuações. O tratamento precoce pode evitar sofrimento prolongado.',
    href: '/blog/fissura-anal-tratamento',
  },
  {
    name: 'Fístula Anal',
    description:
      'Presença de secreção, dor ou abertura próxima ao ânus pode indicar uma fístula. Essa condição exige avaliação especializada, e há diferentes formas de abordagem.',
    href: buildWhatsAppLink('Fístula Anal'),
    external: true,
    ctaLabel: 'Agendar pelo WhatsApp',
  },
  {
    name: 'Coceira Anal (Prurido)',
    description:
      'A coceira na região anal pode parecer algo simples, mas quando é persistente, deve ser investigada. Pode ter diversas causas e merece atenção cuidadosa.',
    href: '/blog/coceira-anal-quando-procurar-coloproctologista-curitiba',
  },
  {
    name: 'HPV Anal',
    description:
      'Lesões causadas pelo papilomavírus humano podem afetar a região anal, tanto interna quanto externamente. O acompanhamento é essencial para tratamento e prevenção de complicações.',
    href: '/blog/hpv-anal-condilomas-riscos-tratamento-rastreio',
  },
  {
    name: 'Cisto Pilonidal',
    description:
      'Se você nota dor ou secreção recorrente na parte inferior da coluna (perto do cóccix), pode ser um cisto pilonidal. Existem opções modernas de tratamento com recuperação mais rápida.',
    href: '/blog/cisto-pilonidal-cirurgia-laser-quando-operar',
  },
  {
    name: 'Constipação Intestinal',
    description:
      'Ficar muitos dias sem evacuar, ter fezes ressecadas ou fazer muito esforço para evacuar não é normal. Essas queixas precisam ser ouvidas e tratadas com cuidado.',
    href: '/blog/constipacao-intestinal-cronica-causas-tratamento',
  },
  {
    name: 'Diarreia Crônica',
    description:
      'Evacuar com frequência excessiva e com fezes líquidas por semanas pode indicar algo mais sério. Investigar é essencial para recuperar a saúde intestinal.',
    href: '/blog/diarreia-cronica-tratamento',
  },
  {
    name: 'Síndrome do Intestino Irritável (SII)',
    description:
      'Sintomas como dor abdominal, gases, inchaço e alterações no ritmo intestinal podem fazer parte da SII. Com acompanhamento adequado, é possível controlar e melhorar muito a qualidade de vida.',
    href: '/blog/sindrome-intestino-irritavel-sintomas-diagnostico-tratamento',
  },
  {
    name: 'Doenças Inflamatórias Intestinais',
    description:
      'Retocolite Ulcerativa e Doença de Crohn são doenças crônicas que exigem acompanhamento contínuo. O foco é manter a doença sob controle e preservar a qualidade de vida do paciente.',
    href: buildWhatsAppLink('Doenças Inflamatórias Intestinais'),
    external: true,
    ctaLabel: 'Agendar pelo WhatsApp',
  },
  {
    name: 'Saúde Sexual',
    description:
      'Aqui, o foco vai além do diagnóstico e tratamento de infecções sexualmente transmissíveis — a proposta é acolher, orientar e ajudar cada paciente a viver sua sexualidade com segurança, conforto e bem-estar.',
    href: '/blog/saude-sexual-cuidado-informacao-bem-estar',
  },
  {
    name: 'Distúrbios do Assoalho Pélvico',
    description:
      'Condições como incontinência fecal, dificuldade para evacuar ou sensação de evacuação incompleta podem estar relacionadas à musculatura pélvica.',
    href: '/blog/disturbios-assoalho-pelvico-funcionamento-intestino',
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="section bg-muted/30">
      {/* Beautiful Responsive Layout */}
      <div className="max-w-[1760px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        {/* Header Section - Enhanced Typography */}
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-8">
            Quando procurar uma coloproctologista?
          </h2>
          <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-secondary font-medium">
            <p>
              Reconhecer os sinais e sintomas é fundamental para buscar ajuda no
              momento adequado. Cada queixa merece atenção especializada e
              cuidadosa.
            </p>
          </div>
        </div>

        {/* Smart Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8 xl:gap-10">
          {services.map((service) => (
            <Card
              key={service.name}
              title={service.name}
              description={service.description}
              variant="service"
              className="animate-fade-in"
              href={service.href}
              external={service.external}
              ctaLabel={service.ctaLabel}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
