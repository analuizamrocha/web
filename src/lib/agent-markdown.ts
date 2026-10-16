import {
  CLINICA_NASSIF,
  CRM_RQE_TEXT,
  DR_NAME,
  HOSPITAL_CLINIC_BARCELONA,
  HOSPITAL_MACKENZIE,
  HOSPITAL_SANTA_CASA,
  PUC_PR,
  WEBSITE_URL,
  WHATSAPP_HREF_SECRETARY,
  WPP_NUMBER_SECRETARY_FORMATTED,
} from '@/lib/constants'
import { faqSchema } from '@/lib/faq-schema'
import { locationPages } from '@/lib/locations'

export const markdownNotFound = `# 404 — Página não encontrada

A página solicitada não existe ou pode ter sido removida. Use os links abaixo para encontrar o conteúdo desejado.

- [Página inicial](${WEBSITE_URL}/)
- [Guia do site para agentes](${WEBSITE_URL}/llms.txt)
- [Mapa do site](${WEBSITE_URL}/sitemap.xml)
`

export function getHomepageMarkdown() {
  return `# ${DR_NAME} — Coloproctologista em Curitiba

Médica Coloproctologista. ${CRM_RQE_TEXT}.

Cada paciente uma história, cada história um cuidado único.
Cuidado Clínico e Cirúrgico do Intestino, Reto e Ânus.

## Formação e atendimento

Graduação em Medicina pela ${PUC_PR}, residência em Cirurgia Geral no ${HOSPITAL_SANTA_CASA}, residência em Coloproctologia no ${HOSPITAL_MACKENZIE} e fellowship em Cirurgia Colorretal no ${HOSPITAL_CLINIC_BARCELONA}. Mestre em Clínica Cirúrgica pela UFPR. Membro da International Anal Neoplasia Society (IANS).

O atendimento considera a história, os sintomas e as necessidades individuais de cada paciente.

## Serviços e tratamentos

Informações sobre hemorroidas, fissuras e fístulas anais, coceira anal, HPV anal, cisto pilonidal, constipação, diarreia crônica, síndrome do intestino irritável, doenças inflamatórias intestinais, saúde sexual e distúrbios do assoalho pélvico.

- [Tratamentos e procedimentos](${WEBSITE_URL}/tratamentos)
- [Artigos educativos](${WEBSITE_URL}/blog)
- [Formação e trajetória profissional](${WEBSITE_URL}/sobre)

## Agendamento e locais de atendimento

[Agendar consulta pelo WhatsApp](${WHATSAPP_HREF_SECRETARY}): ${WPP_NUMBER_SECRETARY_FORMATTED}. Confirme disponibilidade e orientações com a equipe.

${locationPages.map((location) => `### ${location.name}

${location.visibleRelationshipText}

${location.addressLines.join(', ')}. ${location.summary}

[Detalhes do local](${WEBSITE_URL}/locais-de-atendimento/${location.slug})`).join('\n\n')}

Telefone da ${CLINICA_NASSIF.name}: ${CLINICA_NASSIF.phone}.

## Perguntas frequentes

${faqSchema.mainEntity.map((item) => `### ${item.name}\n\n${item.acceptedAnswer.text}`).join('\n\n')}

## Contato e informações do site

- [Contato](${WEBSITE_URL}/contato)
- [Política de privacidade](${WEBSITE_URL}/politica-privacidade)
- [Quando usar este site e instruções para agentes](${WEBSITE_URL}/llms.txt)
- [Mapa do site](${WEBSITE_URL}/sitemap.xml)

Este conteúdo tem caráter educativo e não substitui a consulta médica. Procure orientação profissional para diagnóstico e tratamento adequados.
`
}
