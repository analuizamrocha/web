import { CLINICA_NASSIF, SPECTA_ENDOSCOPIA, WPP_NUMBER_NASSIF_FORMATTED } from './constants'

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é Coloproctologia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coloproctologia é a especialidade médica que cuida do diagnóstico e tratamento das doenças do intestino grosso (cólon), reto e ânus. Inclui tanto tratamentos clínicos quanto cirúrgicos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quando devo procurar um coloproctologista?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Você deve procurar um coloproctologista se apresentar sintomas como sangramento anal, dor na região do ânus, alterações no hábito intestinal, hemorroidas, fissuras anais, ou para prevenção do câncer colorretal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais tratamentos são oferecidos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oferecemos cirurgias a laser, botox para fissura anal, ligadura elástica para hemorroidas, tratamento de HPV, cirurgia de cisto pilonidal, acompanhamento de doenças inflamatórias intestinais e tratamento da síndrome do intestino irritável.',
      },
    },
    {
      '@type': 'Question',
      name: 'Onde a Dra. Ana Luiza atende em Curitiba?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `As consultas acontecem na ${CLINICA_NASSIF.name}, localizada na ${CLINICA_NASSIF.address}, no bairro ${CLINICA_NASSIF.neighborhood}, em ${CLINICA_NASSIF.city} - ${CLINICA_NASSIF.state}. A ${SPECTA_ENDOSCOPIA.name}, na ${SPECTA_ENDOSCOPIA.address}, no bairro ${SPECTA_ENDOSCOPIA.neighborhood}, é o local onde a colonoscopia é realizada quando há indicação para o exame.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Como agendar uma consulta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Você pode agendar uma consulta pelo WhatsApp ${WPP_NUMBER_NASSIF_FORMATTED} ou pelo telefone da ${CLINICA_NASSIF.name} ${CLINICA_NASSIF.phone}.`,
      },
    },
  ],
}

export function getFAQSchema() {
  return JSON.stringify(faqSchema)
}
