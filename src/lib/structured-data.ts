import {
  DR_NAME,
  WPP_FORMATTED_NUMBER,
  CLINICA_NASSIF_UPDATED,
} from './constants'

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // Medical Organization
    {
      '@type': 'MedicalOrganization',
      '@id': 'https://analuizarocha.com.br/#organization',
      name: `${DR_NAME} - Coloproctologia`,
      url: 'https://analuizarocha.com.br',
      logo: 'https://analuizarocha.com.br/images/og.webp',
      description:
        'Especialista em Coloproctologia oferecendo cuidado clínico e cirúrgico do intestino, reto e ânus em Curitiba.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINICA_NASSIF_UPDATED.address,
        addressLocality: CLINICA_NASSIF_UPDATED.city,
        addressRegion: CLINICA_NASSIF_UPDATED.state,
        addressCountry: 'BR',
        postalCode: CLINICA_NASSIF_UPDATED.cep,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: CLINICA_NASSIF_UPDATED.coordinates.latitude,
        longitude: CLINICA_NASSIF_UPDATED.coordinates.longitude,
      },
      telephone: WPP_FORMATTED_NUMBER,
      priceRange: '$$',
      openingHours: CLINICA_NASSIF_UPDATED.openingHours,
      areaServed: {
        '@type': 'City',
        name: 'Curitiba',
        addressRegion: 'Paraná',
        addressCountry: 'Brasil',
      },
      // Reference to the clinic where she works
      containedInPlace: {
        '@type': 'MedicalClinic',
        name: CLINICA_NASSIF_UPDATED.name,
        url: CLINICA_NASSIF_UPDATED.website,
        telephone: CLINICA_NASSIF_UPDATED.phoneFormatted,
        address: {
          '@type': 'PostalAddress',
          streetAddress: CLINICA_NASSIF_UPDATED.address,
          addressLocality: CLINICA_NASSIF_UPDATED.city,
          addressRegion: CLINICA_NASSIF_UPDATED.state,
          addressCountry: 'BR',
          postalCode: CLINICA_NASSIF_UPDATED.cep,
        },
      },
    },
    // Medical Professional
    {
      '@type': 'Physician',
      '@id': 'https://analuizarocha.com.br/#physician',
      name: DR_NAME,
      jobTitle: 'Coloproctologista',
      description:
        'Especialista em Coloproctologia com formação internacional, dedicada ao cuidado integral e humanizado de cada paciente.',
      image: 'https://analuizarocha.com.br/images/og.webp',
      url: 'https://analuizarocha.com.br',
      sameAs: ['https://www.instagram.com/analuiza.mrocha/'],
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'PUC-PR',
          description: 'Graduação em Medicina',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Hospital Santa Casa de Curitiba',
          description: 'Especialização em Cirurgia Geral',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Hospital Universitário Evangélico Mackenzie',
          description: 'Especialização em Coloproctologia',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Hospital Clinic Barcelona',
          description: 'Fellow em Cirurgia Colorretal',
        },
      ],
      memberOf: [
        {
          '@type': 'Organization',
          name: 'International Anal Neoplasia Society (IANS)',
        },
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Registro Profissional',
          recognizedBy: 'Conselho Regional de Medicina do Paraná',
          identifier: 'CRM-PR 45351',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Qualificação de Especialista',
          recognizedBy: 'Conselho Regional de Medicina do Paraná',
          identifier: 'RQE 36221',
        },
      ],
      worksFor: {
        '@id': 'https://analuizarocha.com.br/#organization',
      },
      workLocation: {
        '@type': 'MedicalClinic',
        name: CLINICA_NASSIF_UPDATED.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: CLINICA_NASSIF_UPDATED.address,
          addressLocality: CLINICA_NASSIF_UPDATED.city,
          addressRegion: CLINICA_NASSIF_UPDATED.state,
          addressCountry: 'BR',
          postalCode: CLINICA_NASSIF_UPDATED.cep,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: CLINICA_NASSIF_UPDATED.coordinates.latitude,
          longitude: CLINICA_NASSIF_UPDATED.coordinates.longitude,
        },
      },
      medicalSpecialty: [
        'Coloproctologia',
        'Cirurgia Colorretal',
        'Proctologia',
        'Gastroenterologia Cirúrgica',
      ],
    },
    // Medical Services
    {
      '@type': 'MedicalProcedure',
      '@id': 'https://analuizarocha.com.br/#services',
      name: 'Serviços de Coloproctologia',
      description:
        'Tratamento especializado para doenças do intestino, reto e ânus',
      procedureType: [
        'Cirurgias à laser',
        'Botox para fissura anal',
        'Cirurgias para fístulas anorretais',
        'Ligadura elástica para hemorróidas',
        'Tratamento de HPV',
        'Cirurgia de cisto pilonidal',
        'Acompanhamento de doenças inflamatórias intestinais',
        'Tratamento da síndrome do intestino irritável',
        'Rastreio e prevenção do câncer de canal anal',
      ],
      performer: {
        '@id': 'https://analuizarocha.com.br/#physician',
      },
    },
    // Website
    {
      '@type': 'WebSite',
      '@id': 'https://analuizarocha.com.br/#website',
      url: 'https://analuizarocha.com.br',
      name: `${DR_NAME} - Coloproctologista`,
      description:
        'Site oficial da Dra. Ana Luiza M. Rocha, especialista em Coloproctologia em Curitiba.',
      publisher: {
        '@id': 'https://analuizarocha.com.br/#organization',
      },
      inLanguage: 'pt-BR',
    },
    // Local Business
    {
      '@type': 'LocalBusiness',
      '@id': 'https://analuizarocha.com.br/#localbusiness',
      name: `${DR_NAME} - Coloproctologia`,
      description:
        'Consultas de Coloproctologia em ambiente acolhedor e moderno no Batel, Curitiba.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINICA_NASSIF_UPDATED.address,
        addressLocality: CLINICA_NASSIF_UPDATED.city,
        addressRegion: CLINICA_NASSIF_UPDATED.state,
        addressCountry: 'BR',
        postalCode: CLINICA_NASSIF_UPDATED.cep,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: CLINICA_NASSIF_UPDATED.coordinates.latitude,
        longitude: CLINICA_NASSIF_UPDATED.coordinates.longitude,
      },
      telephone: WPP_FORMATTED_NUMBER,
      url: 'https://analuizarocha.com.br',
      image: 'https://analuizarocha.com.br/images/og.webp',
      priceRange: '$$',
      openingHours: CLINICA_NASSIF_UPDATED.openingHours,
      hasMap: `https://maps.google.com/?q=${CLINICA_NASSIF_UPDATED.coordinates.latitude},${CLINICA_NASSIF_UPDATED.coordinates.longitude}`,
    },
  ],
}

export function getStructuredData() {
  return JSON.stringify(structuredData)
}
