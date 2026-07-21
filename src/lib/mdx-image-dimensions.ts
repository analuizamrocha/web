export interface MdxImageDimensions {
  width: number
  height: number
}

const DEFAULT_MDX_IMAGE_DIMENSIONS: MdxImageDimensions = {
  width: 1200,
  height: 800,
}

const MDX_IMAGE_DIMENSIONS: Record<string, MdxImageDimensions> = {
  '/images/posts/alimentacao-fibras-saude-intestinal/fibra-soluvel-fibra-insoluvel.webp': {
    width: 1200,
    height: 709,
  },
  '/images/posts/cancer-canal-anal-rastreio-hpv-quem-deve-se-preocupar/cancer-canal-anal-rastreio-hpv-verruga.webp': {
    width: 1024,
    height: 1024,
  },
  '/images/posts/celulas-mesenquimais-fistulas-anorretais/celulas-mesenquimais-fistulas-anorretais.png': {
    width: 1050,
    height: 728,
  },
  '/images/posts/cirurgia-laser-hemorroida-quando-faz-sentido/laser-para-hemorroida-diodo-co2.png': {
    width: 1536,
    height: 1024,
  },
  '/images/posts/cisto-pilonidal-cirurgia-laser-quando-operar/cisto-pilonidal-detalhes.webp': {
    width: 1024,
    height: 1536,
  },
  '/images/posts/cisto-pilonidal-precisa-cirurgia/cisto-pilonidal-detalhes.webp': {
    width: 1130,
    height: 746,
  },
  '/images/posts/constipacao-intestinal-cronica-causas-tratamento/sinais-constipacao-intestinal-cronica.webp': {
    width: 1200,
    height: 797,
  },
  '/images/posts/descobri-hpv-anal-e-agora/hpv-anal-diagnostico.webp': {
    width: 1200,
    height: 900,
  },
  '/images/posts/diarreia-cronica-tratamento/diferenca-diarreia-aguda-cronica.webp': {
    width: 1200,
    height: 617,
  },
  '/images/posts/doencas-inflamatorias-intestinais-acompanhamento/chron-retite-ulcerativa.webp': {
    width: 1075,
    height: 732,
  },
  '/images/posts/fases-cicatrizacao-cirurgia-hemorroida/hemorroida-fases-da-cicatrizacao.png': {
    width: 1536,
    height: 1024,
  },
  '/images/posts/fissura-anal-pode-cicatrizar-sozinha/fissura-anal.webp': {
    width: 1200,
    height: 600,
  },
  '/images/posts/gastroenterologista-ou-coloproctologista-diferenca/gastroenterologista-ou-coloproctologista.png': {
    width: 1536,
    height: 1024,
  },
  '/images/posts/hemorroida-sempre-precisa-cirurgia/hemorroidas-internas.webp': {
    width: 1200,
    height: 552,
  },
  '/images/posts/hemorroida-sempre-precisa-cirurgia/hemorroidectomia-laser.webp': {
    width: 1084,
    height: 778,
  },
  '/images/posts/plicoma-anal-cirurgia-laser/plicoma.webp': {
    width: 1024,
    height: 1024,
  },
  '/images/posts/proctologista-e-coloproctologista-entenda-os-termos/proctologista-e-coloproctologista-entenda-os-termos.png': {
    width: 1536,
    height: 1024,
  },
  '/images/posts/quando-intestino-da-sinais-de-alerta-coloproctologista-curitiba/desconforto-intestinal-sinais-alerta.webp': {
    width: 1024,
    height: 1536,
  },
  '/images/posts/quando-procurar-coloproctologista-curitiba/desconforto-intestinal-sinais-alerta.webp': {
    width: 1024,
    height: 1536,
  },
  '/images/posts/sangue-nas-fezes-quando-procurar-coloproctologista/sangue-nas-fezes.webp': {
    width: 1200,
    height: 757,
  },
  '/images/posts/sangue-papel-higienico-sempre-hemorroida/causas-sangramento-anal.webp': {
    width: 1200,
    height: 719,
  },
}

export function getMdxImageDimensions(src: string): MdxImageDimensions {
  return MDX_IMAGE_DIMENSIONS[src] ?? DEFAULT_MDX_IMAGE_DIMENSIONS
}
