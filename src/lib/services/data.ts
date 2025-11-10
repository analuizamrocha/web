import { DR_NAME, WEBSITE_URL } from '@/lib/constants'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  type FAQItem,
} from '@/lib/seo-schemas'
import {
  type MetaPath,
  metaConfig,
} from '@/lib/seo/meta-config'
import type {
  ServicePageProps,
  ServicePageSchema,
} from '@/components/sections/ServicePage'

export interface ServicePageContent extends ServicePageProps {
  route: MetaPath
  slug: string
}

const basePerformer = {
  '@type': 'Physician',
  name: DR_NAME,
  url: WEBSITE_URL,
}

const createServiceConfig = (
  route: MetaPath,
  config: Omit<
    ServicePageContent,
    'route' | 'title' | 'description' | 'keywords'
  >
): ServicePageContent => {
  const meta = metaConfig[route]

  return {
    route,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    ...config,
  }
}

const hemorroidasFaq: FAQItem[] = [
  {
    question: 'O laser substitui todas as cirurgias de hemorroidas?',
    answer:
      'Nem sempre. A tecnologia laser pode ser associada a ligadura elástica ou hemorroidectomia tradicional, dependendo do grau das hemorroidas e dos sintomas.',
  },
  {
    question: 'Quanto tempo demora para voltar às atividades?',
    answer:
      'A maioria dos pacientes retorna às atividades leves em 3 a 5 dias e retoma exercícios em 2 a 3 semanas, conforme orientação médica.',
  },
  {
    question: 'O procedimento é feito com anestesia?',
    answer:
      'Sim. Utilizamos anestesia adequada ao quadro clínico para garantir conforto e segurança durante o procedimento.',
  },
]

const cistoPilonidalFaq: FAQItem[] = [
  {
    question: 'Todo cisto pilonidal precisa de cirurgia?',
    answer:
      'Cistos inflamados ou com drenagens recorrentes costumam exigir cirurgia para evitar novas infecções e melhorar a qualidade de vida.',
  },
  {
    question: 'Qual técnica é utilizada?',
    answer:
      'Avalio cada caso para indicar técnicas minimamente invasivas, como sinusectomia endoscópica, ou abordagens abertas quando necessário.',
  },
  {
    question: 'Como é o pós-operatório?',
    answer:
      'Com cuidados locais, higiene adequada e acompanhamento clínico, o retorno ao trabalho ocorre em poucos dias.',
  },
]

const fissuraFaq: FAQItem[] = [
  {
    question: 'Botox substitui a cirurgia definitivamente?',
    answer:
      'Em muitos casos evita a necessidade de esfincterotomia. Entretanto, fissuras recorrentes podem precisar de cirurgia definitiva.',
  },
  {
    question: 'O efeito da toxina é temporário?',
    answer:
      'Sim. O objetivo é promover relaxamento controlado do esfíncter por alguns meses para permitir a cicatrização completa.',
  },
  {
    question: 'O tratamento dói?',
    answer:
      'Utilizamos anestesia local e técnicas delicadas para tornar o procedimento confortável e rápido.',
  },
]

const endometrioseFaq: FAQItem[] = [
  {
    question: 'Quais exames confirmam endometriose intestinal?',
    answer:
      'Resonância magnética pélvica, colonoscopia e ecoendoscopia auxiliam no mapeamento das lesões e definição da estratégia cirúrgica.',
  },
  {
    question: 'Preciso de equipe multidisciplinar?',
    answer:
      'Sim. Trabalho com ginecologistas e cirurgiões especializados para cirurgias combinadas quando necessário.',
  },
  {
    question: 'A cirurgia é sempre indicada?',
    answer:
      'Nem sempre. Casos leves podem ser acompanhados clinicamente, mas sintomas retais persistentes indicam avaliação cirúrgica.',
  },
]

const cirurgiaMinInvFaq: FAQItem[] = [
  {
    question: 'Quais doenças podem ser tratadas com laparoscopia?',
    answer:
      'Doença diverticular, câncer de reto, endometriose profunda e doenças inflamatórias intestinais são exemplos.',
  },
  {
    question: 'Existe diferença entre laparoscopia e robótica?',
    answer:
      'Ambas são minimamente invasivas; a cirurgia robótica oferece maior precisão em pelves estreitas ou tumores baixos.',
  },
  {
    question: 'Quando a cirurgia aberta ainda é necessária?',
    answer:
      'Casos muito avançados, aderências extensas ou emergências podem exigir abordagens convencionais.',
  },
]

const laserColoproctologiaFaq: FAQItem[] = [
  {
    question: 'Laser serve apenas para hemorroidas?',
    answer:
      'Não. Também utilizo laser para tratar fístulas, cisto pilonidal e fissuras selecionadas.',
  },
  {
    question: 'O laser reduz o tempo em hospital?',
    answer:
      'Sim. Em geral, o procedimento é ambulatorial, com alta no mesmo dia e dor controlada.',
  },
  {
    question: 'Pode ser associado a outras técnicas?',
    answer:
      'Sim. Combinar laser com ligadura elástica ou retalho permite resultados mais duradouros.',
  },
]

const createSchema = (data: {
  name: string
  description: string
  url: string
  targets: string[]
}): ServicePageSchema => ({
  medicalProcedure: {
    name: data.name,
    description: data.description,
    url: data.url,
    procedureType: data.targets,
    performer: basePerformer,
    areaServed: 'Curitiba e região metropolitana',
  },
  faqSchema: {},
  breadcrumbs: {},
})

const hemorroidasSchema: ServicePageSchema = {
  ...createSchema({
    name: 'Tratamento de Hemorroidas a Laser',
    description:
      'Procedimentos minimamente invasivos para hemorroidas com laser e ligadura elástica.',
    url: `${WEBSITE_URL}/especialidades/hemorroidas-tratamento-laser`,
    targets: ['Laser Surgery', 'Ligadura Elástica'],
  }),
  faqSchema: generateFAQSchema(hemorroidasFaq),
  breadcrumbs: generateBreadcrumbSchema([
    { label: 'Início', href: '/' },
    { label: 'Tratamentos', href: '/tratamentos' },
    { label: 'Hemorroidas - Laser' },
  ]),
}

const cistoPilonidalSchema: ServicePageSchema = {
  ...createSchema({
    name: 'Cirurgia de Cisto Pilonidal',
    description:
      'Tratamento cirúrgico do cisto pilonidal com técnicas abertas e endoscópicas.',
    url: `${WEBSITE_URL}/especialidades/cisto-pilonidal-cirurgia`,
    targets: ['Sinusectomia Endoscópica', 'Cirurgia Minimamente Invasiva'],
  }),
  faqSchema: generateFAQSchema(cistoPilonidalFaq),
  breadcrumbs: generateBreadcrumbSchema([
    { label: 'Início', href: '/' },
    { label: 'Tratamentos', href: '/tratamentos' },
    { label: 'Cirurgia de Cisto Pilonidal' },
  ]),
}

const fissuraBotoxSchema: ServicePageSchema = {
  ...createSchema({
    name: 'Toxina Botulínica para Fissura Anal',
    description:
      'Aplicação de toxina botulínica para cicatrização da fissura anal crônica.',
    url: `${WEBSITE_URL}/especialidades/fissura-anal-toxina-botulinica`,
    targets: ['Botulinum Toxin', 'Pain Management'],
  }),
  faqSchema: generateFAQSchema(fissuraFaq),
  breadcrumbs: generateBreadcrumbSchema([
    { label: 'Início', href: '/' },
    { label: 'Tratamentos', href: '/tratamentos' },
    { label: 'Fissura Anal' },
  ]),
}

const endometrioseSchema: ServicePageSchema = {
  ...createSchema({
    name: 'Tratamento de Endometriose Intestinal',
    description:
      'Planejamento cirúrgico e acompanhamento de endometriose profunda com acometimento intestinal.',
    url: `${WEBSITE_URL}/especialidades/endometriose-intestinal`,
    targets: ['Cirurgia Multidisciplinar', 'Coloproctologia'],
  }),
  faqSchema: generateFAQSchema(endometrioseFaq),
  breadcrumbs: generateBreadcrumbSchema([
    { label: 'Início', href: '/' },
    { label: 'Tratamentos', href: '/tratamentos' },
    { label: 'Endometriose Intestinal' },
  ]),
}

const cirurgiaMinInvSchema: ServicePageSchema = {
  ...createSchema({
    name: 'Cirurgia Minimamente Invasiva Colorretal',
    description:
      'Protocolos laparoscópicos e robóticos para doenças colorretais e pélvicas.',
    url: `${WEBSITE_URL}/procedimentos/cirurgia-minimamente-invasiva`,
    targets: ['Laparoscopic Surgery', 'Robotic Surgery'],
  }),
  faqSchema: generateFAQSchema(cirurgiaMinInvFaq),
  breadcrumbs: generateBreadcrumbSchema([
    { label: 'Início', href: '/' },
    { label: 'Tratamentos', href: '/tratamentos' },
    { label: 'Cirurgia Minimamente Invasiva' },
  ]),
}

const laserColoproctologiaSchema: ServicePageSchema = {
  ...createSchema({
    name: 'Laser em Coloproctologia',
    description:
      'Procedimentos a laser para hemorroidas, fístulas e cisto pilonidal.',
    url: `${WEBSITE_URL}/procedimentos/laser-coloproctologia`,
    targets: ['Laser Surgery', 'Coloproctology'],
  }),
  faqSchema: generateFAQSchema(laserColoproctologiaFaq),
  breadcrumbs: generateBreadcrumbSchema([
    { label: 'Início', href: '/' },
    { label: 'Tratamentos', href: '/tratamentos' },
    { label: 'Laser em Coloproctologia' },
  ]),
}

export const servicePages = {
  hemorroidasLaser: createServiceConfig(
    '/especialidades/hemorroidas-tratamento-laser',
    {
      slug: 'hemorroidas-tratamento-laser',
      hero: {
        h1: 'Tratamento de Hemorroidas a Laser em Curitiba',
        subtitle:
          'Procedimentos minimamente invasivos com laser e ligadura elástica para controlar sangramento, dor e prolapsos com recuperação rápida.',
        highlights: [
          'Avaliação detalhada para definir o grau das hemorroidas.',
          'Cirurgias em centro cirúrgico com alta no mesmo dia.',
        ],
      },
      schema: hemorroidasSchema,
      symptomsList: [
        'Sangramento ao evacuar ou manchas de sangue na roupa íntima.',
        'Dor, coceira ou sensação de peso na região anal.',
        'Prolapso que precisa ser empurrado após evacuação.',
        'Histórico de trombose hemorroidária recorrente.',
      ],
      treatmentOptions: [
        {
          title: 'Laser Hemorroidário (LHP)',
          description:
            'Fibra específica que reduz o volume dos mamilos internos, preservando o tecido saudável e diminuindo o risco de estenose.',
        },
        {
          title: 'Ligadura elástica guiada',
          description:
            'Uso de anéis elásticos em consultório para interromper o fluxo dos mamilos internos e controlar o sangramento.',
        },
        {
          title: 'Hemorroidectomia com anestesia especializada',
          description:
            'Quando indicado, realizo técnicas abertas ou fechadas com instrumental de energia para menor dor pós-operatória.',
        },
        {
          title: 'Protocolos combinados com escleroterapia',
          description:
            'Associar substâncias esclerosantes ao laser garante resultados duradouros e reduz recidivas.',
        },
      ],
      faq: hemorroidasFaq,
      relatedArticles: [
        {
          label: 'Hemorroidas sempre exigem cirurgia?',
          href: '/blog/hemorroida-sempre-cirurgica-tratamento',
          description: 'Entenda quando optar por técnicas minimamente invasivas.',
        },
        {
          label: 'Quando procurar um coloproctologista em Curitiba',
          href: '/blog/quando-procurar-coloproctologista-curitiba',
          description: 'Sinais de alerta que exigem avaliação imediata.',
        },
      ],
    }
  ),
  cistoPilonidalCirurgia: createServiceConfig(
    '/especialidades/cisto-pilonidal-cirurgia',
    {
      slug: 'cisto-pilonidal-cirurgia',
      hero: {
        h1: 'Cirurgia de Cisto Pilonidal Minimamente Invasiva',
        subtitle:
          'Tratamento personalizado que controla infecções, remove trajeto fistuloso e devolve qualidade de vida rapidamente.',
        highlights: [
          'Mapeamento pré-operatório completo das trajetórias.',
          'Técnicas endoscópicas e abertas de acordo com a complexidade.',
        ],
      },
      schema: cistoPilonidalSchema,
      symptomsList: [
        'Dor ou inchaço na região sacrococcígea.',
        'Drenagem de secreção com mau odor.',
        'Recorrência após procedimentos anteriores.',
        'Profissionais que permanecem longos períodos sentados.',
      ],
      treatmentOptions: [
        {
          title: 'Sinusectomia endoscópica (EPSiT/VAAPS)',
          description:
            'Câmera delicada que remove pêlos e tecido inflamado por microincisões, reduzindo cicatriz e tempo de recuperação.',
        },
        {
          title: 'Técnica aberta com retalho',
          description:
            'Indicação para trajetos extensos. Reposiciono a linha média para diminuir recidivas.',
        },
        {
          title: 'Cuidados pós-operatórios guiados',
          description:
            'Orientação sobre higiene, depilação e retorno gradual às atividades físicas.',
        },
      ],
      faq: cistoPilonidalFaq,
      relatedArticles: [
        {
          label: 'Cisto pilonidal: quando operar?',
          href: '/blog/cisto-pilonidal-cirurgia-laser-quando-operar',
          description: 'Critérios clínicos para indicar a cirurgia.',
        },
        {
          label: 'Entenda o papel da cirurgia a laser',
          href: '/tratamentos/cx-laser',
          description: 'Como a tecnologia se aplica a diferentes procedimentos.',
        },
      ],
    }
  ),
  fissuraAnalBotox: createServiceConfig(
    '/especialidades/fissura-anal-toxina-botulinica',
    {
      slug: 'fissura-anal-toxina-botulinica',
      hero: {
        h1: 'Toxina Botulínica para Fissura Anal Crônica',
        subtitle:
          'Alívio rápido da dor e cicatrização acelerada para fissuras persistentes, evitando cirurgia em grande parte dos casos.',
        highlights: [
          'Protocolo ambulatorial seguro e guiado.',
          'Plano alimentar e de hábitos intestinais para manter o resultado.',
        ],
      },
      schema: fissuraBotoxSchema,
      symptomsList: [
        'Dor intensa ao evacuar que continua após o banheiro.',
        'Sangramento em papel higiênico ou vaso sanitário.',
        'Uso prolongado de pomadas sem melhora.',
        'Espasmo anal ou sensação de corte na região.',
      ],
      treatmentOptions: [
        {
          title: 'Aplicação de toxina botulínica guiada',
          description:
            'Relaxamento temporário do esfíncter interno para reduzir a dor e permitir cicatrização.',
        },
        {
          title: 'Bloqueios associados e analgesia local',
          description:
            'Uso de anestésicos de longa duração e anti-inflamatórios para conforto imediato.',
        },
        {
          title: 'Programa de reeducação intestinal',
          description:
            'Ajuste de fibras, hidratação e rotina evacuatória para evitar recidiva.',
        },
      ],
      faq: fissuraFaq,
      relatedArticles: [
        {
          label: 'Fissura anal: tratamento e prevenção',
          href: '/tratamentos/toxina-botulinica',
          description: 'Entenda todas as opções terapêuticas disponíveis.',
        },
        {
          label: 'Sintomas que exigem proctologista',
          href: '/blog/sangue-nas-fezes-quando-procurar-coloproctologista',
          description: 'Quando o sangramento precisa de avaliação urgente.',
        },
      ],
    }
  ),
  endometrioseIntestinal: createServiceConfig(
    '/especialidades/endometriose-intestinal',
    {
      slug: 'endometriose-intestinal',
      hero: {
        h1: 'Endometriose Intestinal com Abordagem Multidisciplinar',
        subtitle:
          'Integração entre coloproctologia e ginecologia para tratar dor pélvica, alterações intestinais e infertilidade relacionadas.',
        highlights: [
          'Planejamento cirúrgico combinado quando há acometimento profundo.',
          'Acompanhamento contínuo para controle de sintomas.',
        ],
      },
      schema: endometrioseSchema,
      symptomsList: [
        'Dor para evacuar ou durante o período menstrual.',
        'Constipação, diarreia ou alternância intestinal com ciclos.',
        'Sangramento nas fezes em dias específicos do ciclo.',
        'Infertilidade associada a dor pélvica profunda.',
      ],
      treatmentOptions: [
        {
          title: 'Estadiamento completo com imagem avançada',
          description:
            'Solicito exames direcionados para mapear o intestino, reto e estruturas anexas.',
        },
        {
          title: 'Cirurgia segmentar ou shaving',
          description:
            'Defino o tipo de ressecção intestinal necessária respeitando a função esfincteriana.',
        },
        {
          title: 'Seguimento clínico e complementar',
          description:
            'Planos de analgesia, suporte nutricional e fisioterapia para reabilitação.',
        },
      ],
      faq: endometrioseFaq,
      relatedArticles: [
        {
          label: 'Endometriose intestinal: sinais de alerta',
          href: '/blog/constipacao-intestinal-cronica-causas-tratamento',
          description: 'Entenda a diferença entre constipação funcional e endometriose.',
        },
        {
          label: 'Como preparar o intestino para cirurgia',
          href: '/tratamentos/cx-fistulas-anorretais',
          description: 'Rotina pré-operatória e recuperação.',
        },
      ],
    }
  ),
  cirurgiaMinimamenteInvasiva: createServiceConfig(
    '/procedimentos/cirurgia-minimamente-invasiva',
    {
      slug: 'cirurgia-minimamente-invasiva',
      hero: {
        h1: 'Cirurgia Minimamente Invasiva em Coloproctologia',
        subtitle:
          'Técnicas laparoscópicas e robóticas para doenças colorretais com menos dor, menor cicatriz e alta precoce.',
        highlights: [
          'Planejamento 3D de tumores de reto e sigmoide.',
          'Equipe especializada em cirurgias complexas.',
        ],
      },
      schema: cirurgiaMinInvSchema,
      symptomsList: [
        'Tumores colorretais diagnosticados precocemente.',
        'Doença diverticular complicada com abscesso ou fístula.',
        'Endometriose profunda ou doença inflamatória intestinal.',
        'Recuperação lenta após cirurgias abertas anteriores.',
      ],
      treatmentOptions: [
        {
          title: 'Laparoscopia avançada',
          description:
            'Pequenas incisões e câmera HD para dissecção precisa e menor trauma tecidual.',
        },
        {
          title: 'Cirurgia robótica',
          description:
            'Indicação para pelves estreitas, tumores baixos e cirurgias combinadas com ginecologia.',
        },
        {
          title: 'Programas ERAS',
          description:
            'Protocolos de recuperação acelerada com analgesia multimodal e mobilização precoce.',
        },
      ],
      faq: cirurgiaMinInvFaq,
      relatedArticles: [
        {
          label: 'Cirurgia colorretal: o que esperar',
          href: '/tratamentos/cx-laser',
          description: 'Tecnologias que utilizo para minimizar dor e acelerar alta.',
        },
        {
          label: 'Quando procurar um especialista em proctologia',
          href: '/blog/quando-procurar-coloproctologista-curitiba',
          description: 'Critérios para definir o momento da avaliação cirúrgica.',
        },
      ],
    }
  ),
  laserColoproctologia: createServiceConfig(
    '/procedimentos/laser-coloproctologia',
    {
      slug: 'laser-coloproctologia',
      hero: {
        h1: 'Laser em Coloproctologia',
        subtitle:
          'Tecnologia a laser aplicada a hemorroidas, fístulas, fissuras e cisto pilonidal para tratamentos rápidos e precisos.',
        highlights: [
          'Procedimentos ambulatoriais com anestesia personalizada.',
          'Menor trauma tecidual e retorno rápido às atividades.',
        ],
      },
      schema: laserColoproctologiaSchema,
      symptomsList: [
        'Hemorroidas internas ou externas que sangram com frequência.',
        'Fístulas anais com abscessos recorrentes.',
        'Cistos pilonidais inflamados ou dolorosos.',
        'Fissuras crônicas que não cicatrizam com pomadas.',
      ],
      treatmentOptions: [
        {
          title: 'Laser para hemorroidas (LHP)',
          description:
            'Redução seletiva dos vasos internos mantendo o revestimento anal.',
        },
        {
          title: 'FiLaC para fístulas anais',
          description:
            'Fibra radial que cauteriza o trajeto interno preservando o esfíncter.',
        },
        {
          title: 'Laser para cisto pilonidal',
          description:
            'Ablação do trajeto e cauterização dos tecidos doentes por pequenas incisões.',
        },
      ],
      faq: laserColoproctologiaFaq,
      relatedArticles: [
        {
          label: 'Tecnologia a laser na coloproctologia',
          href: '/tratamentos/cx-laser',
          description: 'Quando indico laser para cada condição.',
        },
        {
          label: 'Como escolher um proctologista',
          href: '/blog/coceira-anal-quando-procurar-coloproctologista-curitiba',
          description: 'Critérios para definir o especialista ideal.',
        },
      ],
    }
  ),
}

export const servicePageList = Object.values(servicePages)

export const getServicePageByRoute = (route: MetaPath) =>
  servicePageList.find((page) => page.route === route)

export const getServicePageBySlug = (slug: string) =>
  servicePageList.find((page) => page.slug === slug)
