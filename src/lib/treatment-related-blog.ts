import type { TreatmentSlug } from '@/lib/treatment-images'

export interface RelatedBlogEntry {
  href: string
  title: string
  description: string
}

const RELATED_BLOG_BY_TREATMENT: Record<TreatmentSlug, RelatedBlogEntry> = {
  'cx-laser': {
    href: '/blog/cisto-pilonidal-cirurgia-laser-quando-operar',
    title: 'Cisto pilonidal: quando operar e como o laser pode ajudar',
    description:
      'Entenda as indicações, benefícios e limitações da abordagem a laser em um exemplo clínico comum.',
  },
  hemorroidas: {
    href: '/blog/hemorroida-sempre-cirurgica-tratamento',
    title: 'Hemorroida sempre precisa de cirurgia?',
    description:
      'Veja quando o tratamento clínico resolve e em quais casos os procedimentos são considerados.',
  },
  'cx-fistulas-anorretais': {
    href: '/blog/tratamento-fistulas-anorretais',
    title: 'Tratamento de fístulas anorretais: técnicas e critérios',
    description:
      'Comparativo prático das abordagens mais usadas para preservar função e reduzir recidiva.',
  },
  'toxina-botulinica': {
    href: '/blog/fissura-anal-tratamento',
    title: 'Fissura anal: opções de tratamento e quando escalar cuidado',
    description:
      'Guia educativo para entender manejo inicial, falhas de resposta e alternativas terapêuticas.',
  },
  'rastreio-cancer-anal': {
    href: '/blog/hpv-anal-condilomas-riscos-tratamento-rastreio',
    title: 'HPV anal, rastreio e redução de risco',
    description:
      'Conteúdo focado em prevenção, vigilância e sinais que merecem acompanhamento especializado.',
  },
  'hpv-anal': {
    href: '/blog/hpv-anal-condilomas-riscos-tratamento-rastreio',
    title: 'HPV anal e condilomas: quando investigar e tratar',
    description:
      'Entenda opções terapêuticas, acompanhamento e estratégia de rastreio para reduzir complicações.',
  },
  'cx-cisto-pilonidal': {
    href: '/blog/cisto-pilonidal-cirurgia-laser-quando-operar',
    title: 'Cisto pilonidal: o que muda na cirurgia a laser',
    description:
      'Artigo com foco em indicação cirúrgica, recuperação e expectativas realistas de resultado.',
  },
  'doencas-inflamatorias-intestinais': {
    href: '/blog/doencas-inflamatorias-intestinais-acompanhamento',
    title: 'Doença de Crohn e retocolite: importância do acompanhamento',
    description:
      'Por que o seguimento contínuo ajuda no controle dos sintomas e na prevenção de complicações.',
  },
  'sindrome-intestino-irritavel': {
    href: '/blog/sindrome-intestino-irritavel-sintomas-diagnostico-tratamento',
    title: 'Síndrome do intestino irritável: sinais, diagnóstico e manejo',
    description:
      'Resumo objetivo sobre gatilhos, investigação e estratégias para melhorar qualidade de vida.',
  },
}

export function getRelatedBlogByTreatmentSlug(slug: string): RelatedBlogEntry | undefined {
  return RELATED_BLOG_BY_TREATMENT[slug as TreatmentSlug]
}
