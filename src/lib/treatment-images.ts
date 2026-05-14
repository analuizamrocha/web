export const TREATMENT_IMAGE_BY_SLUG = {
  'cx-laser': {
    id: 'TRT-001',
    slug: 'cx-laser',
    src: '/images/posts/tratamento-fistulas-anorretais/fistula-laser.webp',
    alt: 'Ilustracao de tratamento proctologico com laser',
    sourcePostSlug: 'tratamento-fistulas-anorretais',
  },
  hemorroidas: {
    id: 'TRT-002',
    slug: 'hemorroidas',
    src: '/images/posts/hemorroida-sempre-cirurgica-tratamento/hemorroidas-internas-externas.webp',
    alt: 'Ilustracao comparativa de hemorroidas internas e externas',
    sourcePostSlug: 'hemorroida-sempre-cirurgica-tratamento',
  },
  'cx-fistulas-anorretais': {
    id: 'TRT-003',
    slug: 'cx-fistulas-anorretais',
    src: '/images/posts/tratamento-fistulas-anorretais/fistula.webp',
    alt: 'Ilustracao de fistula anorretal',
    sourcePostSlug: 'tratamento-fistulas-anorretais',
  },
  'toxina-botulinica': {
    id: 'TRT-004',
    slug: 'toxina-botulinica',
    src: '/images/posts/toxina-botulinica.webp',
    alt: 'Aplicacao de toxina botulinica no tratamento de fissura anal cronica',
    sourcePostSlug: null,
  },
  'rastreio-cancer-anal': {
    id: 'TRT-005',
    slug: 'rastreio-cancer-anal',
    src: '/images/posts/cancer-canal-anal-rastreio-hpv-quem-deve-se-preocupar/rastreio-prevencao-cancer-canal-anal.webp',
    alt: 'Rastreio e prevencao do cancer de canal anal',
    sourcePostSlug: null,
  },
  'hpv-anal': {
    id: 'TRT-006',
    slug: 'hpv-anal',
    src: '/images/posts/hpv-anal/condilomas-hpv.webp',
    alt: 'Ilustracao de condilomas associados ao HPV anal',
    sourcePostSlug: 'hpv-anal-condilomas-riscos-tratamento-rastreio',
  },
  'cx-cisto-pilonidal': {
    id: 'TRT-007',
    slug: 'cx-cisto-pilonidal',
    src: '/images/posts/cisto-pilonidal-cirurgia-laser-quando-operar/cisto-pilonidal.webp',
    alt: 'Ilustracao anatomica de cisto pilonidal',
    sourcePostSlug: 'cisto-pilonidal-cirurgia-laser-quando-operar',
  },
  'doencas-inflamatorias-intestinais': {
    id: 'TRT-008',
    slug: 'doencas-inflamatorias-intestinais',
    src: '/images/posts/doencas-inflamatorias-intestinais-acompanhamento/doencas-inflamatorias-intestinais.webp',
    alt: 'Ilustracao de doencas inflamatorias intestinais',
    sourcePostSlug: 'doencas-inflamatorias-intestinais-acompanhamento',
  },
  'sindrome-intestino-irritavel': {
    id: 'TRT-009',
    slug: 'sindrome-intestino-irritavel',
    src: '/images/posts/sindrome-intestino-irritavel/sindrome-intestino-irritavel.webp',
    alt: 'Ilustracao sobre sindrome do intestino irritavel',
    sourcePostSlug: 'sindrome-intestino-irritavel-sintomas-diagnostico-tratamento',
  },
} as const

export type TreatmentSlug = keyof typeof TREATMENT_IMAGE_BY_SLUG
export type TreatmentImage = (typeof TREATMENT_IMAGE_BY_SLUG)[TreatmentSlug]

export function getTreatmentImageBySlug(slug: string): TreatmentImage | undefined {
  return TREATMENT_IMAGE_BY_SLUG[slug as TreatmentSlug]
}
