import type { BlogPost } from '@/lib/blog'
import type { TreatmentSlug } from '@/lib/treatment-images'

export interface TreatmentLinkEntry {
  slug: TreatmentSlug
  href: string
  title: string
  description: string
}

const buildRelationshipMap = (slugs: string[], relatedTreatments: TreatmentSlug[]) =>
  Object.fromEntries(slugs.map((slug) => [slug, relatedTreatments]))

export const TREATMENT_LINK_BY_SLUG: Record<TreatmentSlug, TreatmentLinkEntry> = {
  'cx-laser': {
    slug: 'cx-laser',
    href: '/tratamentos/cx-laser',
    title: 'Cirurgia a laser proctológica',
    description:
      'Veja quando o laser pode ser considerado em hemorroidas, fissuras e outras doenças orificiais.',
  },
  hemorroidas: {
    slug: 'hemorroidas',
    href: '/tratamentos/hemorroidas',
    title: 'Tratamento de hemorroidas',
    description:
      'Entenda opções como ligadura elástica, escleroterapia, hemorroidectomia, laser e THD.',
  },
  'cx-fistulas-anorretais': {
    slug: 'cx-fistulas-anorretais',
    href: '/tratamentos/cx-fistulas-anorretais',
    title: 'Cirurgias para fístulas anorretais',
    description:
      'Compare fistulotomia, seton, LIFT, retalho mucoso e técnicas combinadas para fístula anal.',
  },
  'toxina-botulinica': {
    slug: 'toxina-botulinica',
    href: '/tratamentos/toxina-botulinica',
    title: 'Toxina botulínica para fissura anal',
    description:
      'Saiba quando o botox anal pode ser considerado para fissura anal crônica e dor anal persistente.',
  },
  'rastreio-cancer-anal': {
    slug: 'rastreio-cancer-anal',
    href: '/tratamentos/rastreio-cancer-anal',
    title: 'Rastreio de câncer anal e HPV',
    description:
      'Conheça citologia anal, anuscopia de alta resolução e critérios de rastreio em grupos de risco.',
  },
  'hpv-anal': {
    slug: 'hpv-anal',
    href: '/tratamentos/hpv-anal',
    title: 'Tratamento de HPV anal',
    description:
      'Veja como é feita a avaliação, o tratamento de condilomas e o acompanhamento das lesões por HPV.',
  },
  'cx-cisto-pilonidal': {
    slug: 'cx-cisto-pilonidal',
    href: '/tratamentos/cx-cisto-pilonidal',
    title: 'Cirurgia de cisto pilonidal',
    description:
      'Entenda quando operar, como avaliar recorrência e em quais casos o laser pode ajudar.',
  },
  'doencas-inflamatorias-intestinais': {
    slug: 'doencas-inflamatorias-intestinais',
    href: '/tratamentos/doencas-inflamatorias-intestinais',
    title: 'Doença de Crohn e retocolite',
    description:
      'Acompanhamento especializado para doenças inflamatórias intestinais, remissão e prevenção de complicações.',
  },
  'sindrome-intestino-irritavel': {
    slug: 'sindrome-intestino-irritavel',
    href: '/tratamentos/sindrome-intestino-irritavel',
    title: 'Síndrome do intestino irritável',
    description:
      'Investigação e acompanhamento de dor abdominal, distensão, constipação e diarreia funcionais.',
  },
}

const DEFAULT_RELATED_TREATMENTS_BY_POST_SLUG: Record<string, TreatmentSlug[]> = {
  ...buildRelationshipMap(
    [
      'hemorroida-sempre-cirurgica-tratamento',
      'hemorroida-sempre-precisa-cirurgia',
      'hemorroida-quanto-tempo-dura-quando-procurar',
      'sangue-papel-higienico-sempre-hemorroida',
      'ligadura-elastica-hemorroidas-doi-recuperacao',
      'thd-hemorroidas-quando-indicado',
    ],
    ['hemorroidas']
  ),
  ...buildRelationshipMap(
    [
      'fissura-anal-tratamento',
      'fissura-anal-toxina-botulinica-tratamento',
      'fissura-anal-quando-cirurgia-indicada',
      'dor-ao-evacuar-causas-tratamento',
      'proctologista-e-coloproctologista-qual-diferenca-quando-procurar-atendimento',
      'primeira-consulta-proctologista-curitiba-o-que-esperar',
    ],
    ['toxina-botulinica', 'cx-laser']
  ),
  ...buildRelationshipMap(
    [
      'tratamento-fistulas-anorretais',
      'proctologista-e-coloproctologista-qual-diferenca-quando-procurar-atendimento',
    ],
    ['cx-fistulas-anorretais']
  ),
  ...buildRelationshipMap(
    [
      'hpv-anal-condilomas-riscos-tratamento-rastreio',
      'cancer-canal-anal-rastreio-hpv-quem-deve-se-preocupar',
      'saude-sexual-cuidado-informacao-bem-estar',
      'coceira-anal-quando-procurar-coloproctologista-curitiba',
      'coceira-anus-causas-tratamento',
      'proctologista-e-coloproctologista-qual-diferenca-quando-procurar-atendimento',
    ],
    ['hpv-anal', 'rastreio-cancer-anal']
  ),
  ...buildRelationshipMap(
    [
      'cisto-pilonidal-cirurgia-laser-quando-operar',
      'cisto-pilonidal-precisa-cirurgia',
      'cisto-pilonidal-cisto-sacrococcigeo-mesma-coisa',
    ],
    ['cx-cisto-pilonidal', 'cx-laser']
  ),
  ...buildRelationshipMap(
    [
      'constipacao-intestinal-cronica-causas-tratamento',
      'diarreia-cronica-tratamento',
      'sindrome-intestino-irritavel-sintomas-diagnostico-tratamento',
      'alimentacao-e-saude-intestinal',
      'alimentacao-fibras-saude-intestinal',
      'disbiose-sibo-tratamento',
      'disturbios-assoalho-pelvico-funcionamento-intestino',
      'intestino-preso-muitos-dias-perigoso',
      'por-que-meus-sintomas-nunca-melhoram',
      'proctologista-e-coloproctologista-qual-diferenca-quando-procurar-atendimento',
      'primeira-consulta-proctologista-curitiba-o-que-esperar',
    ],
    ['sindrome-intestino-irritavel']
  ),
  ...buildRelationshipMap(
    [
      'doencas-inflamatorias-intestinais-acompanhamento',
      'diarreia-cronica-tratamento',
      'sangue-nas-fezes-quando-procurar-coloproctologista',
      'quando-intestino-da-sinais-de-alerta-coloproctologista-curitiba',
      'cancer-colorretal-rastreio-prevencao-diagnostico-precoce',
      'por-que-meus-sintomas-nunca-melhoram',
      'primeira-consulta-proctologista-curitiba-o-que-esperar',
    ],
    ['doencas-inflamatorias-intestinais']
  ),
  'plicoma-anal-cirurgia-laser': ['cx-laser'],
  'plicoma-anal-vale-a-pena-retirar': ['cx-laser'],
  'quando-procurar-coloproctologista-curitiba': ['hemorroidas', 'sindrome-intestino-irritavel'],
  'quando-intestino-da-sinais-de-alerta-coloproctologista-curitiba': [
    'hemorroidas',
    'doencas-inflamatorias-intestinais',
  ],
  'sangue-nas-fezes-quando-procurar-coloproctologista': [
    'hemorroidas',
    'doencas-inflamatorias-intestinais',
  ],
  'sinto-vergonha-procurar-coloproctologista-isso-e-normal': [
    'hemorroidas',
    'sindrome-intestino-irritavel',
  ],
  'o-que-muda-acompanhamento-especializado-coloproctologista-curitiba': [
    'doencas-inflamatorias-intestinais',
    'sindrome-intestino-irritavel',
  ],
}

const DEFAULT_RELATED_POSTS_BY_POST_SLUG: Record<string, string[]> = {
  'proctologista-e-coloproctologista-qual-diferenca-quando-procurar-atendimento': [
    'quando-procurar-coloproctologista-curitiba',
    'primeira-consulta-proctologista-curitiba-o-que-esperar',
  ],
  'primeira-consulta-proctologista-curitiba-o-que-esperar': [
    'proctologista-e-coloproctologista-qual-diferenca-quando-procurar-atendimento',
    'quando-procurar-coloproctologista-curitiba',
  ],
  'ligadura-elastica-hemorroidas-doi-recuperacao': [
    'hemorroida-sempre-cirurgica-tratamento',
    'thd-hemorroidas-quando-indicado',
  ],
  'thd-hemorroidas-quando-indicado': [
    'ligadura-elastica-hemorroidas-doi-recuperacao',
    'hemorroida-sempre-cirurgica-tratamento',
  ],
  'cisto-pilonidal-cisto-sacrococcigeo-mesma-coisa': [
    'cisto-pilonidal-cirurgia-laser-quando-operar',
    'cisto-pilonidal-precisa-cirurgia',
  ],
}

const unique = <T,>(values: T[]) => Array.from(new Set(values))

export function getTreatmentLinkBySlug(slug: string): TreatmentLinkEntry | undefined {
  return TREATMENT_LINK_BY_SLUG[slug as TreatmentSlug]
}

export function getResolvedRelatedTreatmentSlugs(
  post: Pick<BlogPost, 'slug' | 'relatedTreatments'>
): TreatmentSlug[] {
  if (post.relatedTreatments && post.relatedTreatments.length > 0) {
    return unique(post.relatedTreatments)
  }

  return DEFAULT_RELATED_TREATMENTS_BY_POST_SLUG[post.slug] || []
}

export function getResolvedRelatedPostSlugs(
  post: Pick<BlogPost, 'slug' | 'relatedPosts' | 'relatedTreatments'>,
  allPosts: BlogPost[],
  limit = 2
): string[] {
  if (post.relatedPosts && post.relatedPosts.length > 0) {
    return unique(post.relatedPosts.filter((slug) => slug !== post.slug)).slice(0, limit)
  }

  const defaultRelatedPosts = DEFAULT_RELATED_POSTS_BY_POST_SLUG[post.slug]
  if (defaultRelatedPosts && defaultRelatedPosts.length > 0) {
    return unique(defaultRelatedPosts.filter((slug) => slug !== post.slug)).slice(0, limit)
  }

  const relatedTreatmentSlugs = getResolvedRelatedTreatmentSlugs(post)

  if (relatedTreatmentSlugs.length === 0) {
    return []
  }

  return allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .filter((candidate) => {
      const candidateTreatmentSlugs = getResolvedRelatedTreatmentSlugs(candidate)
      return candidateTreatmentSlugs.some((slug) => relatedTreatmentSlugs.includes(slug))
    })
    .map((candidate) => candidate.slug)
    .slice(0, limit)
}

export function getRelatedPostsForTreatment(
  treatmentSlug: TreatmentSlug,
  allPosts: BlogPost[],
  limit = 4
): BlogPost[] {
  return allPosts
    .filter((post) => getResolvedRelatedTreatmentSlugs(post).includes(treatmentSlug))
    .sort((left, right) => {
      const leftFeatured = left.featured ? 1 : 0
      const rightFeatured = right.featured ? 1 : 0

      if (leftFeatured !== rightFeatured) {
        return rightFeatured - leftFeatured
      }

      return right.publishDate.localeCompare(left.publishDate)
    })
    .slice(0, limit)
}
