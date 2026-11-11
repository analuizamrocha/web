import type { TreatmentSlug } from '@/lib/treatment-images'

/**
 * Treatment pages as listed on the /tratamentos hub. The copy is the hub's
 * published card text; other surfaces (e.g. the related-treatment block on
 * blog posts) reuse it so a treatment is described the same way everywhere.
 */
export interface TreatmentSummary {
  title: string
  description: string
  slug: TreatmentSlug
  category: string
}

export const TREATMENTS: TreatmentSummary[] = [
  {
    title: 'Cirurgias a Laser',
    description:
      'Procedimentos minimamente invasivos com tecnologia laser para tratamento de hemorroidas e fissuras anais.',
    slug: 'cx-laser',
    category: 'Cirúrgico',
  },
  {
    title: 'Tratamento de Hemorroidas',
    description:
      'Ligadura elástica, escleroterapia e outros procedimentos para alívio dos sintomas das hemorroidas.',
    slug: 'hemorroidas',
    category: 'Clínico/Cirúrgico',
  },
  {
    title: 'Cirurgias para Fístulas Anorretais',
    description:
      'Tratamento cirúrgico especializado para fístulas complexas com preservação da continência.',
    slug: 'cx-fistulas-anorretais',
    category: 'Cirúrgico',
  },
  {
    title: 'Toxina Botulínica',
    description:
      'Aplicação de botox para tratamento de fissura anal e dores crônicas na região anorretal.',
    slug: 'toxina-botulinica',
    category: 'Clínico',
  },
  {
    title: 'Rastreio do Câncer de Canal Anal',
    description: 'Prevenção e detecção precoce de lesões pré-cancerosas e câncer anal.',
    slug: 'rastreio-cancer-anal',
    category: 'Preventivo',
  },
  {
    title: 'Tratamento de HPV Anal',
    description: 'Diagnóstico e tratamento de condilomas acuminados (verrugas) na região anal.',
    slug: 'hpv-anal',
    category: 'Clínico',
  },
  {
    title: 'Cirurgia de Cisto Pilonidal',
    description: 'Remoção cirúrgica de cistos pilonidais com técnicas modernas e indicação individualizada.',
    slug: 'cx-cisto-pilonidal',
    category: 'Cirúrgico',
  },
  {
    title: 'Doenças Inflamatórias Intestinais',
    description: 'Acompanhamento especializado de Doença de Crohn e Retocolite Ulcerativa.',
    slug: 'doencas-inflamatorias-intestinais',
    category: 'Clínico',
  },
  {
    title: 'Síndrome do Intestino Irritável',
    description: 'Diagnóstico e tratamento personalizado para controle dos sintomas intestinais.',
    slug: 'sindrome-intestino-irritavel',
    category: 'Clínico',
  },
]

export const getTreatmentHref = (slug: TreatmentSlug) => `/tratamentos/${slug}`

export const getTreatmentSummary = (slug: string): TreatmentSummary | undefined =>
  TREATMENTS.find((treatment) => treatment.slug === slug)
