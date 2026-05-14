import {
  CLINICA_NASSIF,
  DR_NAME,
  SPECTA_ENDOSCOPIA,
  WEBSITE_URL,
  WHATSAPP_MSG_TEXT_ENCODED,
  WPP_NUMBER_NASSIF,
} from './constants'
import { generateBreadcrumbSchema, type FAQItem } from './seo-schemas'

export const LOCATIONS_BASE_PATH = '/locais-de-atendimento'

const WHATSAPP_COLONOSCOPY_TEXT = encodeURIComponent(
  'Olá! Gostaria de agendar minha colonoscopia com a Dra. Ana Luiza Rocha.'
)

const createWhatsAppHref = (phone: string, encodedText: string) =>
  `https://wa.me/${phone.replace(/\D/g, '')}/?text=${encodedText}`

const createPhoneHref = (phone: string) => `tel:${phone.replace(/\D/g, '')}`

type RelatedLink = {
  href: string
  label: string
}

type RelatedTreatment = RelatedLink & {
  subtitle?: string
  thumbVariant?: 'terracotta' | 'sage'
}

type LocationService = {
  name: string
  description: string
}

export type LocationCtaVariant = 'primary' | 'sage'

export type LocationRoleChipVariant = 'terracotta' | 'sage'

export interface LocationPageData {
  slug: string
  name: string
  shortName: string
  badgeLabel: string
  pageTitle: string
  metaTitle: string
  metaDescription: string
  summary: string
  cardDescription: string
  visibleRelationshipText: string
  addressLines: [string, string]
  streetAddress: string
  neighborhood: string
  city: string
  state: string
  postalCode?: string
  phoneDisplay: string
  phoneHref: string
  whatsappDisplay: string
  whatsappHref: string
  mapUrl: string
  mapLabel: string
  primaryCtaLabel: string
  schedulingDescription: string
  servicesTitle: string
  services: string[]
  overviewParagraphs: string[]
  practicalInfo: string[]
  relatedTreatments: RelatedTreatment[]
  relatedArticles?: RelatedLink[]
  faq: FAQItem[]
  schemaDescription: string
  schemaServices: LocationService[]
  clinicWebsite?: string

  // New layout content (location detail page redesign)
  heroLead: string
  heroPhotoTag: string
  heroPhotoSrc: string
  heroPhotoAlt: string
  heroPhotoObjectPosition?: string
  tagline: string
  placeCalloutLabel: string
  ctaVariant: LocationCtaVariant
  roleChipVariant: LocationRoleChipVariant
  hours: { display: string; sub: string }
  structure: { display: string; sub: string }
  narrative: {
    eyebrow: string
    heading: string
    paragraphs: string[]
    pullQuote: string
  }
  narrativeSideLinks: {
    title: string
    items: { href: string; label: string; external?: boolean }[]
  }
  indication: {
    eyebrow: string
    heading: string
    intro: string
    items: { title: string; description: string }[]
  }
  beforeYouCome: {
    eyebrow: string
    heading: string
    intro: string
    cards: { eyebrow: string; title: string; description: string }[]
  }
  mapStrip: {
    eyebrow: string
    heading: string
    intro: string
    fullAddress: string
    references: string[]
  }
  relatedSection: {
    eyebrow: string
    heading: string
    intro: string
    treatmentsEyebrow: string
    treatmentsHeading: string
    articlesEyebrow: string
    articlesHeading: string
  }
  faqSection: {
    eyebrow: string
    heading: string
  }
  stickyBar: {
    eyebrow: string
    message: string
  }
}

export const locationPages: LocationPageData[] = [
  {
    slug: 'clinica-nassif',
    name: CLINICA_NASSIF.name,
    shortName: 'Clínica Nassif',
    badgeLabel: 'Atendimento em coloproctologia',
    pageTitle: 'Clínica Nassif',
    metaTitle: 'Clínica Nassif | Onde a Dra. Ana Luiza Rocha atende em Curitiba',
    metaDescription:
      'Consultas em coloproctologia com a Dra. Ana Luiza Rocha na Clínica Nassif, no Batel, em Curitiba. Veja endereço, como agendar e tratamentos relacionados.',
    summary: 'Consultas, retornos e acompanhamento no Batel.',
    cardDescription:
      'Avaliação de sintomas, revisão de exames, retornos e acompanhamento em coloproctologia.',
    visibleRelationshipText:
      'A Dra. Ana Luiza Rocha atende na Clínica Nassif para consultas, retornos e acompanhamento em coloproctologia.',
    addressLines: ['Rua Bruno Filgueira, 489', 'Batel, Curitiba - PR'],
    streetAddress: CLINICA_NASSIF.address,
    neighborhood: CLINICA_NASSIF.neighborhood,
    city: CLINICA_NASSIF.city,
    state: CLINICA_NASSIF.state,
    postalCode: CLINICA_NASSIF.cep,
    phoneDisplay: CLINICA_NASSIF.phone,
    phoneHref: createPhoneHref(CLINICA_NASSIF.phoneFormatted),
    whatsappDisplay: CLINICA_NASSIF.wpp,
    whatsappHref: createWhatsAppHref(WPP_NUMBER_NASSIF, WHATSAPP_MSG_TEXT_ENCODED),
    mapUrl: CLINICA_NASSIF.maps,
    mapLabel: 'Ver rota para a Clínica Nassif',
    primaryCtaLabel: 'Agendar consulta',
    schedulingDescription:
      'Este é o principal local para consulta, reavaliação, retorno e organização do cuidado clínico ou cirúrgico com a Dra. Ana Luiza.',
    servicesTitle: 'Quando este local faz mais sentido',
    services: [
      'Consulta inicial para avaliar sintomas, histórico e exames já realizados.',
      'Retornos e seguimento de tratamentos clínicos, ambulatoriais e cirúrgicos.',
      'Discussão de condutas para hemorroidas, fissura anal, fístulas, HPV anal e doenças inflamatórias intestinais.',
      'Orientação sobre exames e encaminhamento para procedimentos quando indicados.',
    ],
    overviewParagraphs: [
      'A Clínica Nassif é a principal referência para consulta com a Dra. Ana Luiza em Curitiba. É aqui que acontece a avaliação inicial, a revisão de exames e o acompanhamento ao longo do tratamento.',
      'Na consulta, a proposta é entender a queixa com calma, revisar hipóteses diagnósticas e definir o próximo passo do cuidado de forma individualizada.',
    ],
    practicalInfo: [
      'O endereço fica no Batel, bairro de fácil acesso para quem busca atendimento em Curitiba.',
      'Se você já tiver exames, laudos ou receitas recentes, vale levá-los para a consulta.',
      'O agendamento pode ser feito pelo WhatsApp da equipe ou pelo telefone da clínica.',
    ],
    relatedTreatments: [
      {
        href: '/tratamentos/hemorroidas',
        label: 'Tratamento de hemorroidas',
        subtitle: 'Avaliação clínica e opções de tratamento',
        thumbVariant: 'terracotta',
      },
      {
        href: '/tratamentos/toxina-botulinica',
        label: 'Toxina botulínica para fissura anal',
        subtitle: 'Alívio de dor e cicatrização',
        thumbVariant: 'terracotta',
      },
      {
        href: '/tratamentos/cx-laser',
        label: 'Cirurgias a laser em coloproctologia',
        subtitle: 'Procedimentos menos invasivos',
        thumbVariant: 'sage',
      },
    ],
    relatedArticles: [
      {
        href: '/blog/quando-procurar-coloproctologista-curitiba',
        label: 'Quando procurar um coloproctologista',
      },
      {
        href: '/blog/sangue-nas-fezes-quando-procurar-coloproctologista',
        label: 'Sangue nas fezes: quando investigar',
      },
      {
        href: '/blog/hemorroida-quanto-tempo-dura-quando-procurar',
        label: 'Hemorroida: quanto tempo dura e quando tratar',
      },
      {
        href: '/blog/sinto-vergonha-procurar-coloproctologista-isso-e-normal',
        label: 'Sinto vergonha de procurar: isso é comum?',
      },
    ],
    heroLead:
      'Consulta, retorno e acompanhamento em coloproctologia, com escuta cuidadosa e plano definido caso a caso.',
    heroPhotoTag: 'recepção · clínica nassif',
    heroPhotoSrc: '/images/nassif.png',
    heroPhotoAlt:
      'Recepção moderna da Clínica Nassif com balcão de atendimento, escada e área de espera',
    heroPhotoObjectPosition: 'center',
    tagline:
      'Consulta inicial, retornos e acompanhamento clínico com escuta cuidadosa e orientação.',
    placeCalloutLabel: 'Indicado para',
    ctaVariant: 'primary',
    roleChipVariant: 'terracotta',
    hours: {
      display: 'Segunda a sexta',
      sub: '8h às 19h · Agendamento prévio recomendado',
    },
    structure: {
      display: 'Consultório clínico · acessível',
      sub: 'Estacionamento conveniado próximo',
    },
    narrative: {
      eyebrow: 'O papel deste local',
      heading: 'Consulta com escuta, exame e orientação',
      paragraphs: [
        'A Clínica Nassif é o principal local de consulta com a Dra. Ana. É neste espaço que a queixa é ouvida com atenção, os exames são revistos e o plano é definido caso a caso.',
        'O acompanhamento clínico e os retornos também acontecem neste mesmo espaço, mantendo continuidade entre avaliação, tratamento e seguimento.',
      ],
      pullQuote:
        '"A consulta é o momento de entender a queixa, revisar exames e definir os próximos passos com clareza."',
    },
    narrativeSideLinks: {
      title: 'Links úteis',
      items: [
        { href: '/sobre', label: 'Conhecer a Dra. Ana' },
        { href: '/tratamentos', label: 'Ver tratamentos oferecidos' },
        {
          href: '/blog/quando-procurar-coloproctologista-curitiba',
          label: 'Quando procurar um coloproctologista',
        },
        {
          href: '/blog/sinto-vergonha-procurar-coloproctologista-isso-e-normal',
          label: 'Vergonha de procurar? É mais comum do que parece',
        },
      ],
    },
    indication: {
      eyebrow: 'Indicações de consulta',
      heading: 'Quando a consulta é o primeiro passo',
      intro:
        'A Clínica Nassif é indicada para avaliação clínica em coloproctologia, revisão de exames e definição de um plano de cuidado individualizado.',
      items: [
        {
          title: 'Avaliação de sintomas',
          description:
            'Dor, sangramento, coceira anal ou alteração intestinal podem exigir avaliação especializada.',
        },
        {
          title: 'Retorno e seguimento',
          description:
            'Acompanhamento de tratamentos clínicos, pós-procedimento ou pós-cirurgia com continuidade do cuidado.',
        },
        {
          title: 'Definição de conduta',
          description:
            'Hemorroidas, fissura, fístulas, HPV anal e doenças intestinais são avaliadas caso a caso.',
        },
        {
          title: 'Exames quando necessários',
          description:
            'Quando indicado, a consulta orienta colonoscopia, retossigmoidoscopia ou exames complementares.',
        },
      ],
    },
    beforeYouCome: {
      eyebrow: 'Antes da consulta',
      heading: 'Como se preparar para a consulta',
      intro:
        'Levar informações organizadas ajuda a tornar a avaliação mais completa e a definir os próximos passos com mais segurança.',
      cards: [
        {
          eyebrow: '01 · Documentos',
          title: 'Exames e documentos',
          description:
            'Leve exames, laudos, colonoscopias anteriores, ultrassons ou exames de sangue recentes. Receitas e medicamentos em uso também ajudam.',
        },
        {
          eyebrow: '02 · Histórico',
          title: 'Histórico dos sintomas',
          description:
            'Anote quando a queixa começou, o que melhora, o que piora e se houve mudanças no intestino, dor, sangramento ou coceira.',
        },
        {
          eyebrow: '03 · Logística',
          title: 'Tempo para a consulta',
          description:
            'Em geral, a consulta de avaliação não exige jejum. Reserve um horário confortável para conversar, passar pela avaliação física quando indicada e esclarecer dúvidas.',
        },
      ],
    },
    mapStrip: {
      eyebrow: 'Localização',
      heading: 'Endereço da Clínica Nassif',
      intro: 'Confira a rota, referências próximas e opções de estacionamento antes da consulta.',
      fullAddress: 'Rua Bruno Filgueira, 489 · Batel, Curitiba - PR · 80240-220',
      references: ['Próximo ao Shopping Pátio Batel', 'Estacionamento conveniado próximo'],
    },
    relatedSection: {
      eyebrow: 'Relacionado',
      heading: 'Condições e leituras relacionadas',
      intro:
        'Veja temas que costumam aparecer na consulta e conteúdos educativos para entender melhor sintomas, exames e possibilidades de cuidado.',
      treatmentsEyebrow: 'Tratamentos relacionados',
      treatmentsHeading: 'Condições avaliadas em consulta',
      articlesEyebrow: 'Leituras úteis',
      articlesHeading: 'Conteúdos educativos',
    },
    faqSection: {
      eyebrow: 'Dúvidas comuns',
      heading: 'Antes do atendimento',
    },
    stickyBar: {
      eyebrow: 'Pronto para agendar?',
      message: 'Organize sua primeira avaliação',
    },
    faq: [
      {
        question: 'A primeira avaliação acontece na Clínica Nassif?',
        answer:
          'A Clínica Nassif é o principal local para avaliação inicial, retorno e acompanhamento com a Dra. Ana. É ali que a queixa é acolhida e o plano de cuidado começa a ser organizado.',
      },
      {
        question: 'Preciso fazer algum preparo antes?',
        answer:
          'Em geral, a avaliação não exige jejum ou preparo intestinal. Levar exames, laudos e uma lista dos medicamentos em uso ajuda a tornar o atendimento mais completo.',
      },
      {
        question: 'Quais queixas costumam ser avaliadas?',
        answer:
          'Dor ao evacuar, sangramento, coceira anal, hemorroidas, fissuras, alteração intestinal e necessidade de acompanhamento especializado são motivos frequentes para avaliação coloproctológica.',
      },
    ],
    schemaDescription:
      'Clínica em Curitiba onde a Dra. Ana Luiza Rocha realiza consultas, retornos e acompanhamento em coloproctologia.',
    schemaServices: [
      {
        name: 'Consulta em coloproctologia',
        description:
          'Avaliação inicial, revisão de sintomas e definição de conduta com a Dra. Ana Luiza Rocha.',
      },
      {
        name: 'Retorno e acompanhamento',
        description: 'Seguimento clínico e pós-tratamento em doenças do intestino, reto e ânus.',
      },
    ],
    clinicWebsite: CLINICA_NASSIF.website,
  },
  {
    slug: 'specta-endoscopia-digestiva',
    name: SPECTA_ENDOSCOPIA.name,
    shortName: 'Specta Endoscopia Digestiva',
    badgeLabel: 'Colonoscopia com indicação médica',
    pageTitle: 'Specta Endoscopia Digestiva',
    metaTitle: 'Specta Endoscopia Digestiva | Atendimento com Dra. Ana Luiza Rocha',
    metaDescription:
      'Colonoscopia com a Dra. Ana Luiza Rocha na Specta Endoscopia Digestiva, em Curitiba. Veja endereço, orientações de agendamento e contexto do exame.',
    summary: 'Colonoscopia e exames endoscópicos nas Mercês.',
    cardDescription:
      'Colonoscopia realizada quando indicada para investigação, rastreio ou seguimento.',
    visibleRelationshipText:
      'A Dra. Ana Luiza Rocha realiza colonoscopia na Specta quando há indicação dentro do plano de cuidado.',
    addressLines: ['R. Dom Alberto Gonçalves, 311', 'Mercês, Curitiba - PR'],
    streetAddress: SPECTA_ENDOSCOPIA.address,
    neighborhood: SPECTA_ENDOSCOPIA.neighborhood,
    city: SPECTA_ENDOSCOPIA.city,
    state: SPECTA_ENDOSCOPIA.state,
    phoneDisplay: SPECTA_ENDOSCOPIA.phone,
    phoneHref: createPhoneHref(SPECTA_ENDOSCOPIA.phone),
    whatsappDisplay: SPECTA_ENDOSCOPIA.phone,
    whatsappHref: createWhatsAppHref(SPECTA_ENDOSCOPIA.wppNumber, WHATSAPP_COLONOSCOPY_TEXT),
    mapUrl: SPECTA_ENDOSCOPIA.maps,
    mapLabel: 'Ver rota para a Specta Endoscopia Digestiva',
    primaryCtaLabel: 'Agendar colonoscopia',
    schedulingDescription:
      'Este local é indicado quando a colonoscopia faz parte da investigação, do rastreio ou do acompanhamento definido pela Dra. Ana.',
    servicesTitle: 'Quando este local costuma ser indicado',
    services: [
      'Colonoscopia indicada após avaliação clínica, conforme sintomas, idade, histórico e fatores de risco.',
      'Investigação de sangramento, alteração intestinal ou necessidade de rastreio.',
      'Exame complementar quando o plano de cuidado precisa de avaliação direta do intestino.',
    ],
    overviewParagraphs: [
      'A Specta Endoscopia Digestiva é o local onde a Dra. Ana realiza colonoscopia quando o procedimento é indicado dentro do plano de cuidado.',
      'A indicação considera sintomas, histórico, idade, exames anteriores e objetivo da investigação. Quando há indicação, a equipe orienta preparo, horários e cuidados necessários.',
    ],
    practicalInfo: [
      'O endereço fica no bairro Mercês, em Curitiba.',
      'A equipe informa no agendamento como funciona o preparo e quais cuidados precisam ser seguidos.',
      'Quando houver avaliação prévia, mantenha laudos e orientações médicas em mãos para facilitar a organização.',
    ],
    relatedTreatments: [
      {
        href: '/tratamentos/doencas-inflamatorias-intestinais',
        label: 'Doenças inflamatórias intestinais',
        subtitle: 'Acompanhamento e seguimento clínico',
        thumbVariant: 'sage',
      },
      {
        href: '/tratamentos/sindrome-intestino-irritavel',
        label: 'Síndrome do intestino irritável',
        subtitle: 'Diagnóstico diferencial e manejo',
        thumbVariant: 'sage',
      },
      {
        href: '/tratamentos',
        label: 'Visão geral dos tratamentos',
        subtitle: 'Todas as condições e procedimentos',
        thumbVariant: 'terracotta',
      },
    ],
    heroLead:
      'Colonoscopia realizada pela Dra. Ana, com preparo orientado e resultado analisado no contexto do seu cuidado.',
    heroPhotoTag: 'fachada · hospital lipoplastic',
    heroPhotoSrc: '/images/specta.png',
    heroPhotoAlt:
      'Fachada do Hospital Lipoplastic em Curitiba, com placa de identificação e entrada para pacientes',
    heroPhotoObjectPosition: 'center',
    tagline: 'Colonoscopia com preparo orientado, sedação e revisão clínica do resultado.',
    placeCalloutLabel: 'Indicado para',
    ctaVariant: 'sage',
    roleChipVariant: 'sage',
    hours: {
      display: 'Segunda a sexta',
      sub: '7h às 16h · Conforme preparo agendado',
    },
    structure: {
      display: 'Sedação · acompanhante',
      sub: 'Acesso por elevador',
    },
    narrative: {
      eyebrow: 'O papel da Specta',
      heading: 'Um espaço dedicado à colonoscopia',
      paragraphs: [
        'A Specta é um centro voltado a exames endoscópicos. Quando a colonoscopia é indicada, o procedimento é realizado neste local, com preparo orientado e equipe dedicada a essa rotina de atendimento.',
        'Depois, o laudo é revisto em retorno com a Dra. Ana, relacionando o resultado aos sintomas, ao histórico e aos próximos passos do cuidado.',
      ],
      pullQuote:
        '"A colonoscopia deve ter indicação clara, preparo bem orientado e leitura clínica do resultado."',
    },
    narrativeSideLinks: {
      title: 'Para entender o exame',
      items: [
        { href: '/sobre', label: 'Conhecer a Dra. Ana' },
        {
          href: '/blog/cancer-colorretal-rastreio-prevencao-diagnostico-precoce',
          label: 'Quando a colonoscopia entra no rastreio',
        },
        {
          href: '/blog/sangue-nas-fezes-quando-procurar-coloproctologista',
          label: 'Sangue nas fezes: quando investigar',
        },
        { href: '/tratamentos', label: 'Tratamentos relacionados' },
      ],
    },
    indication: {
      eyebrow: 'Indicações do exame',
      heading: 'Quando a colonoscopia entra no plano',
      intro:
        'A indicação é individualizada e depende do objetivo clínico. Estes são alguns contextos em que a colonoscopia pode ser indicada:',
      items: [
        {
          title: 'Investigação de sintomas',
          description:
            'Sangramento, dor persistente, alteração do hábito intestinal ou mudanças importantes no funcionamento do intestino.',
        },
        {
          title: 'Rastreio por idade ou histórico',
          description:
            'A partir dos 45 anos, ou antes, se houver antecedente familiar significativo.',
        },
        {
          title: 'Acompanhamento de condição prévia',
          description:
            'Doença inflamatória intestinal, pólipos prévios ou acompanhamento periódico definido pela avaliação médica.',
        },
        {
          title: 'Confirmação diagnóstica',
          description:
            'Quando a avaliação levanta hipóteses que precisam de visualização direta do intestino.',
        },
      ],
    },
    beforeYouCome: {
      eyebrow: 'Antes do exame',
      heading: 'Como se preparar para a colonoscopia',
      intro:
        'O preparo é parte essencial da colonoscopia. A equipe envia as orientações e confirma os cuidados necessários antes do procedimento.',
      cards: [
        {
          eyebrow: '01 · Preparo',
          title: 'Preparo intestinal',
          description:
            'Após o agendamento, a equipe orienta dieta, medicação do preparo, horários e período de jejum.',
        },
        {
          eyebrow: '02 · Sedação',
          title: 'Acompanhante obrigatório',
          description:
            'Como o exame é realizado com sedação, é necessário vir com acompanhante e não dirigir após o procedimento.',
        },
        {
          eyebrow: '03 · Resultado',
          title: 'Interpretação do laudo',
          description:
            'O laudo é discutido em retorno com a Dra. Ana, relacionando o resultado ao seu quadro clínico e aos próximos passos.',
        },
      ],
    },
    mapStrip: {
      eyebrow: 'Localização',
      heading: 'Endereço da Specta',
      intro: 'Confira a rota e as orientações de chegada antes do dia do exame.',
      fullAddress: 'R. Dom Alberto Gonçalves, 311 · Mercês, Curitiba - PR',
      references: ['3,2 km · 12 min da Clínica Nassif', 'Estacionamento conveniado no quarteirão'],
    },
    relatedSection: {
      eyebrow: 'Relacionado',
      heading: 'Colonoscopia e temas relacionados',
      intro:
        'Veja conteúdos sobre rastreio, investigação de sintomas e condições que podem levar à indicação de colonoscopia.',
      treatmentsEyebrow: 'Tratamentos relacionados',
      treatmentsHeading: 'Condições relacionadas ao exame',
      articlesEyebrow: 'Leituras úteis',
      articlesHeading: 'Conteúdos educativos',
    },
    faqSection: {
      eyebrow: 'Dúvidas comuns',
      heading: 'Antes da colonoscopia',
    },
    stickyBar: {
      eyebrow: 'Pronto para agendar?',
      message: 'Receba as orientações do exame',
    },
    relatedArticles: [
      {
        href: '/blog/cancer-colorretal-rastreio-prevencao-diagnostico-precoce',
        label: 'Quando a colonoscopia entra no rastreio do câncer colorretal',
      },
      {
        href: '/blog/sangue-nas-fezes-quando-procurar-coloproctologista',
        label: 'Sangue nas fezes: quando investigar',
      },
      {
        href: '/blog/doencas-inflamatorias-intestinais-acompanhamento',
        label: 'Doenças inflamatórias intestinais: acompanhamento especializado',
      },
      {
        href: '/blog/diarreia-cronica-tratamento',
        label: 'Diarreia crônica: quando a investigação é necessária',
      },
    ],
    faq: [
      {
        question: 'A Specta também é local de consulta?',
        answer:
          'A Specta é o local onde a Dra. Ana realiza colonoscopia quando há indicação. A avaliação clínica, os retornos e o acompanhamento acontecem na Clínica Nassif.',
      },
      {
        question: 'Todo paciente precisa fazer colonoscopia?',
        answer:
          'A indicação é individualizada. Sintomas, idade, histórico familiar, exames anteriores e objetivo da investigação ajudam a definir se a colonoscopia é necessária.',
      },
      {
        question: 'Como funciona o agendamento do exame?',
        answer:
          'O agendamento pode ser iniciado pelo contato exibido nesta página. A equipe orienta preparo, horários, necessidade de acompanhante e demais cuidados antes da confirmação.',
      },
    ],
    schemaDescription:
      'Local em Curitiba relacionado à colonoscopia com a Dra. Ana Luiza Rocha quando o exame é indicado na investigação ou prevenção.',
    schemaServices: [
      {
        name: 'Colonoscopia',
        description:
          'Exame endoscópico realizado com a Dra. Ana Luiza Rocha quando há indicação clínica ou preventiva.',
      },
    ],
  },
]

export function getLocationBySlug(slug: string) {
  return locationPages.find((location) => location.slug === slug)
}

export function getLocationPath(slug: string) {
  return `${LOCATIONS_BASE_PATH}/${slug}`
}

function getLocationSchemaId(slug: string) {
  return `${WEBSITE_URL}${getLocationPath(slug)}#place`
}

function getLocationPageUrl(slug: string) {
  return `${WEBSITE_URL}${getLocationPath(slug)}`
}

function getPostalAddress(location: LocationPageData) {
  return {
    '@type': 'PostalAddress',
    streetAddress: location.streetAddress,
    addressLocality: location.city,
    addressRegion: location.state,
    addressCountry: 'BR',
    ...(location.postalCode ? { postalCode: location.postalCode } : {}),
  }
}

function getServiceSchema(service: LocationService) {
  return {
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@id': `${WEBSITE_URL}/#physician`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Curitiba',
    },
  }
}

function getLocationSchema(location: LocationPageData) {
  return {
    '@type': 'MedicalClinic',
    '@id': getLocationSchemaId(location.slug),
    name: location.name,
    description: location.schemaDescription,
    url: getLocationPageUrl(location.slug),
    telephone: location.phoneDisplay,
    address: getPostalAddress(location),
    hasMap: location.mapUrl,
    availableService: location.schemaServices.map(getServiceSchema),
    ...(location.clinicWebsite ? { sameAs: [location.clinicWebsite] } : {}),
  }
}

export function getHomeLocationsStructuredData() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Physician',
        '@id': `${WEBSITE_URL}/#physician`,
        name: DR_NAME,
        url: WEBSITE_URL,
        medicalSpecialty: ['Coloproctologia', 'Proctologia'],
        workLocation: locationPages.map((location) => ({
          '@id': getLocationSchemaId(location.slug),
        })),
      },
      ...locationPages.map(getLocationSchema),
    ],
  })
}

export function getLocationsIndexStructuredData() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${WEBSITE_URL}${LOCATIONS_BASE_PATH}#webpage`,
        url: `${WEBSITE_URL}${LOCATIONS_BASE_PATH}`,
        name: 'Locais de atendimento da Dra. Ana Luiza Rocha',
        description:
          'Página que reúne os locais de atendimento e exame relacionados à Dra. Ana Luiza Rocha em Curitiba.',
        about: [
          {
            '@id': `${WEBSITE_URL}/#physician`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: locationPages.map((location, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: getLocationPageUrl(location.slug),
          name: location.name,
        })),
      },
      {
        '@type': 'Physician',
        '@id': `${WEBSITE_URL}/#physician`,
        name: DR_NAME,
        url: WEBSITE_URL,
        workLocation: locationPages.map((location) => ({
          '@id': getLocationSchemaId(location.slug),
        })),
      },
      ...locationPages.map(getLocationSchema),
      generateBreadcrumbSchema([
        { label: 'Início', href: '/' },
        { label: 'Locais de atendimento' },
      ]),
    ],
  })
}

export function getLocationPageStructuredData(location: LocationPageData) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${getLocationPageUrl(location.slug)}#webpage`,
        url: getLocationPageUrl(location.slug),
        name: location.metaTitle,
        description: location.metaDescription,
        about: [
          {
            '@id': `${WEBSITE_URL}/#physician`,
          },
          {
            '@id': getLocationSchemaId(location.slug),
          },
        ],
      },
      {
        '@type': 'Physician',
        '@id': `${WEBSITE_URL}/#physician`,
        name: DR_NAME,
        url: WEBSITE_URL,
        medicalSpecialty: ['Coloproctologia', 'Proctologia'],
        workLocation: [
          {
            '@id': getLocationSchemaId(location.slug),
          },
        ],
      },
      getLocationSchema(location),
      generateBreadcrumbSchema([
        { label: 'Início', href: '/' },
        { label: 'Locais de atendimento', href: LOCATIONS_BASE_PATH },
        { label: location.name },
      ]),
    ],
  })
}
