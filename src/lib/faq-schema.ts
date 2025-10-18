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
      name: 'Onde fica o consultório em Curitiba?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O consultório fica na Clínica Nassif, localizada na Rua Bruno Filgueira, 489, no bairro Batel, em Curitiba - PR.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como agendar uma consulta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Você pode agendar uma consulta através do WhatsApp (41) 98864-5800 ou pelo telefone da Clínica Nassif (41) 3342-5060.',
      },
    },
  ],
}

export function getFAQSchema() {
  return JSON.stringify(faqSchema)
}
