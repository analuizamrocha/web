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

type LocationService = {
  name: string
  description: string
}

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
  relatedTreatments: RelatedLink[]
  relatedArticles?: RelatedLink[]
  faq: FAQItem[]
  schemaDescription: string
  schemaServices: LocationService[]
  clinicWebsite?: string
}

export const locationPages: LocationPageData[] = [
  {
    slug: 'clinica-nassif',
    name: CLINICA_NASSIF.name,
    shortName: 'Clínica Nassif',
    badgeLabel: 'Consulta em coloproctologia',
    pageTitle: 'Clínica Nassif',
    metaTitle: 'Clínica Nassif | Onde a Dra. Ana Luiza Rocha atende em Curitiba',
    metaDescription:
      'Consultas em coloproctologia com a Dra. Ana Luiza Rocha na Clínica Nassif, no Batel, em Curitiba. Veja endereço, como agendar e tratamentos relacionados.',
    summary: 'Consultas, retornos e acompanhamento no Batel.',
    cardDescription:
      'Local indicado para consulta inicial, retorno e definição do plano de cuidado em coloproctologia.',
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
    primaryCtaLabel: 'Agendar consulta na Clínica Nassif',
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
      { href: '/tratamentos/hemorroidas', label: 'Tratamento de hemorroidas' },
      { href: '/tratamentos/toxina-botulinica', label: 'Toxina botulínica para fissura anal' },
      { href: '/tratamentos/cx-laser', label: 'Cirurgias a laser em coloproctologia' },
    ],
    faq: [
      {
        question: 'A primeira consulta com a Dra. Ana Luiza acontece na Clínica Nassif?',
        answer:
          'Sim. A Clínica Nassif é um dos locais indicados para consulta inicial, retorno e organização do plano de cuidado em coloproctologia.',
      },
      {
        question: 'Posso agendar retorno neste mesmo local?',
        answer:
          'Sim. O acompanhamento clínico e o seguimento após tratamentos podem ser organizados pela equipe da Clínica Nassif.',
      },
      {
        question: 'Quais sintomas costumam motivar consulta neste local?',
        answer:
          'Queixas como dor ao evacuar, sangramento, coceira anal, hemorroidas, fissuras, alterações do hábito intestinal e necessidade de acompanhamento especializado costumam ser avaliadas em consulta.',
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
        description:
          'Seguimento clínico e pós-tratamento em doenças do intestino, reto e ânus.',
      },
    ],
    clinicWebsite: CLINICA_NASSIF.website,
  },
  {
    slug: 'specta-endoscopia-digestiva',
    name: SPECTA_ENDOSCOPIA.name,
    shortName: 'Specta Endoscopia Digestiva',
    badgeLabel: 'Colonoscopia quando indicada',
    pageTitle: 'Specta Endoscopia Digestiva',
    metaTitle: 'Specta Endoscopia Digestiva | Atendimento com Dra. Ana Luiza Rocha',
    metaDescription:
      'Colonoscopia com a Dra. Ana Luiza Rocha na Specta Endoscopia Digestiva, em Curitiba. Veja endereço, orientações de agendamento e contexto do exame.',
    summary:
      'Local relacionado à colonoscopia no bairro Mercês.',
    cardDescription:
      'Referência para colonoscopia com a Dra. Ana Luiza quando o exame entra na investigação ou no rastreio.',
    visibleRelationshipText:
      'A Dra. Ana Luiza Rocha realiza colonoscopia na Specta quando o exame é indicado na avaliação do paciente.',
    addressLines: ['R. Dom Alberto Gonçalves, 311', 'Mercês, Curitiba - PR'],
    streetAddress: SPECTA_ENDOSCOPIA.address,
    neighborhood: SPECTA_ENDOSCOPIA.neighborhood,
    city: SPECTA_ENDOSCOPIA.city,
    state: SPECTA_ENDOSCOPIA.state,
    phoneDisplay: SPECTA_ENDOSCOPIA.phone,
    phoneHref: createPhoneHref(SPECTA_ENDOSCOPIA.phone),
    whatsappDisplay: SPECTA_ENDOSCOPIA.phone,
    whatsappHref: createWhatsAppHref(SPECTA_ENDOSCOPIA.phone, WHATSAPP_COLONOSCOPY_TEXT),
    mapUrl: SPECTA_ENDOSCOPIA.maps,
    mapLabel: 'Ver rota para a Specta Endoscopia Digestiva',
    primaryCtaLabel: 'Agendar colonoscopia',
    schedulingDescription:
      'Este local é usado quando a colonoscopia faz parte da investigação de sintomas ou do rastreio recomendado pela Dra. Ana Luiza.',
    servicesTitle: 'Quando este local costuma ser indicado',
    services: [
      'Colonoscopia solicitada após consulta, conforme sintomas, idade, histórico e fatores de risco.',
      'Exame no contexto de investigação de sangramento, alteração intestinal ou necessidade de rastreio.',
      'Complemento da avaliação quando o plano de cuidado exige confirmação diagnóstica por exame.',
    ],
    overviewParagraphs: [
      'A Specta Endoscopia Digestiva é o local de referência quando a Dra. Ana Luiza indica colonoscopia como parte da investigação ou da prevenção. O foco aqui é o exame, e não a consulta geral.',
      'Na prática, a consulta ajuda a definir se a colonoscopia faz sentido. Quando há indicação, o exame é organizado no local apropriado, com orientação específica para esse momento do cuidado.',
    ],
    practicalInfo: [
      'O endereço fica no bairro Mercês, em Curitiba.',
      'A equipe informa no agendamento como funciona o preparo e os passos práticos antes do exame.',
      'Quando houver consulta prévia, vale manter os laudos e orientações médicas em mãos para facilitar a organização do exame.',
    ],
    relatedTreatments: [
      {
        href: '/tratamentos/doencas-inflamatorias-intestinais',
        label: 'Acompanhamento de doenças inflamatórias intestinais',
      },
      {
        href: '/tratamentos/sindrome-intestino-irritavel',
        label: 'Síndrome do intestino irritável',
      },
      { href: '/tratamentos', label: 'Ver a visão geral dos tratamentos' },
    ],
    relatedArticles: [
      {
        href: '/blog/cancer-colorretal-rastreio-prevencao-diagnostico-precoce',
        label: 'Quando a colonoscopia entra no rastreio do câncer colorretal',
      },
      {
        href: '/blog/sangue-nas-fezes-quando-procurar-coloproctologista',
        label: 'Sangue nas fezes: quando investigar',
      },
    ],
    faq: [
      {
        question: 'A Specta é o local das consultas em coloproctologia?',
        answer:
          'Não. A Specta aparece no site como o local relacionado à colonoscopia quando esse exame é indicado. A consulta clínica e o acompanhamento geral são organizados em contexto próprio.',
      },
      {
        question: 'Toda pessoa atendida pela Dra. Ana precisa de colonoscopia?',
        answer:
          'Não. A colonoscopia é indicada de forma individualizada, de acordo com sintomas, idade, histórico e objetivo da investigação.',
      },
      {
        question: 'Como agendar a colonoscopia na Specta?',
        answer:
          'O agendamento pode ser iniciado pelo contato exibido nesta página. A equipe orienta os próximos passos, inclusive preparo e horário quando o exame é confirmado.',
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
