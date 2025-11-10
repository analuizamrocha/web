import type { Metadata } from 'next'

import { WEBSITE_URL } from '@/lib/constants'
import {
  generateOpenGraphMetadata,
  generateTwitterMetadata,
} from '@/lib/seo-schemas'

type CanonicalMap = Record<
  string,
  {
    title: string
    description: string
    keywords: string[]
    alternates?: Metadata['alternates']
  }
>

export const metaConfig: CanonicalMap = {
  '/': {
    title:
      'Dra. Ana Luiza - Coloproctologista e Proctologista em Curitiba | CRM-PR 45351',
    description:
      'Consultas e cirurgias de coloproctologia, proctologia e cirurgia colorretal em Curitiba com tecnologia minimamente invasiva e acolhimento humanizado.',
    keywords: [
      'coloproctologista curitiba',
      'proctologista curitiba',
      'cirurgia colorretal',
      'tratamento hemorroidas curitiba',
      'fissura anal especialista',
      'cirurgia laser coloproctologia',
    ],
  },
  '/proctologia': {
    title: 'Proctologista em Curitiba | Dra. Ana Luiza - Procto Especialista',
    description:
      'Atendimento humanizado em proctologia para hemorroidas, fissuras, sangramento e dores anais. Tratamentos clínicos e cirúrgicos com tecnologia a laser.',
    keywords: [
      'proctologista curitiba',
      'proctologia curitiba',
      'médica procto',
      'sintomas proctológicos',
      'consulta proctologista',
    ],
  },
  '/tratamentos': {
    title:
      'Coloproctologia e Cirurgia Colorretal | Tratamentos Especializados',
    description:
      'Protocolos completos de coloproctologia: cirurgias minimamente invasivas, laser, toxina botulínica, tratamento de fístulas e doenças inflamatórias intestinais.',
    keywords: [
      'coloproctologia curitiba',
      'cirurgia colorretal curitiba',
      'tratamentos proctologia',
      'laser coloproctologia',
      'botox fissura anal',
    ],
  },
  '/especialidades/hemorroidas-tratamento-laser': {
    title: 'Tratamento de Hemorroidas a Laser em Curitiba | Dra. Ana Luiza',
    description:
      'Tratamento de hemorroidas com laser e ligadura elástica em Curitiba. Procedimentos com rápida recuperação e foco no conforto do paciente.',
    keywords: [
      'hemorroidas laser curitiba',
      'tratamento hemorroidas',
      'cirurgia hemorroidas minimamente invasiva',
      'ligadura elastica curitiba',
    ],
  },
  '/especialidades/cisto-pilonidal-cirurgia': {
    title:
      'Cirurgia de Cisto Pilonidal Minimamente Invasiva em Curitiba | Proctologia',
    description:
      'Técnicas modernas para cisto pilonidal com incisões reduzidas, menor dor pós-operatória e retorno rápido às atividades.',
    keywords: [
      'cisto pilonidal curitiba',
      'cirurgia cisto pilonidal',
      'coloproctologista cisto pilonidal',
      'tratamento minimamente invasivo curitiba',
    ],
  },
  '/especialidades/fissura-anal-toxina-botulinica': {
    title: 'Toxina Botulínica para Fissura Anal em Curitiba | Tratamento sem cirurgia',
    description:
      'Aplicação de toxina botulínica (Botox) para cicatrização da fissura anal crônica, reduzindo a dor e evitando cirurgia em muitos casos.',
    keywords: [
      'fissura anal botox',
      'toxina botulinica fissura anal',
      'tratamento fissura anal curitiba',
      'proctologista fissura anal',
    ],
  },
  '/especialidades/endometriose-intestinal': {
    title: 'Endometriose Intestinal | Coloproctologista em Curitiba',
    description:
      'Diagnóstico multidisciplinar e planejamento cirúrgico para endometriose intestinal, com abordagem integrada com ginecologia.',
    keywords: [
      'endometriose intestinal',
      'cirurgia endometriose intestinal',
      'coloproctologista endometriose',
      'dor evacuar endometriose',
    ],
  },
  '/procedimentos/cirurgia-minimamente-invasiva': {
    title: 'Cirurgia Minimamente Invasiva Colorretal | Tecnologia e Recuperação Rápida',
    description:
      'Cirurgias laparoscópicas e robóticas para doenças colorretais com menor dor, melhor estética e retorno acelerado para a rotina.',
    keywords: [
      'cirurgia colorretal minimamente invasiva',
      'cirurgia laparoscopica intestino',
      'cirurgia robótica colorretal',
      'coloproctologia avancada',
    ],
  },
  '/procedimentos/laser-coloproctologia': {
    title:
      'Laser em Coloproctologia | Hemorroidas, Fístulas e Cisto Pilonidal',
    description:
      'Tecnologia laser aplicada em hemorroidas, fístulas e cisto pilonidal com menos dor e alta mais rápida.',
    keywords: [
      'laser proctologia',
      'laser hemorroidas',
      'laser fistula anal',
      'laser cisto pilonidal',
    ],
  },
}

export type MetaPath = keyof typeof metaConfig

export const getRouteMetadata = (path: MetaPath): Metadata => {
  const config = metaConfig[path]
  const url = `${WEBSITE_URL}${path === '/' ? '' : path}`

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates:
      config.alternates ??
      ({
        canonical: url,
      } satisfies Metadata['alternates']),
    openGraph: generateOpenGraphMetadata({
      title: config.title,
      description: config.description,
      url,
    }),
    twitter: generateTwitterMetadata({
      title: config.title,
      description: config.description,
      url,
    }),
  }
}
