import {
  DR_NAME,
  CLINICA_NASSIF,
  WPP_NUMBER_NASSIF_FORMATTED,
  WEBSITE_URL,
  URL_INSTAGRAM,
  ORG_DESCRIPTION,
  PHYSICIAN_DESCRIPTION,
  SERVICES_DESCRIPTION,
  WEBSITE_DESCRIPTION,
  BUSINESS_DESCRIPTION,
} from './constants'

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // Medical Organization
    {
      '@type': 'MedicalOrganization',
      '@id': `${WEBSITE_URL}/#organization`,
      name: `${DR_NAME} - Coloproctologia`,
      url: WEBSITE_URL,
      logo: `${WEBSITE_URL}/images/og.png`,
      description: ORG_DESCRIPTION,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINICA_NASSIF.address,
        addressLocality: CLINICA_NASSIF.city,
        addressRegion: CLINICA_NASSIF.state,
        addressCountry: 'BR',
        postalCode: CLINICA_NASSIF.cep,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: CLINICA_NASSIF.coordinates.latitude,
        longitude: CLINICA_NASSIF.coordinates.longitude,
      },
      telephone: WPP_NUMBER_NASSIF_FORMATTED,
      priceRange: '$$',
      openingHours: CLINICA_NASSIF.openingHours,
      areaServed: {
        '@type': 'City',
        name: 'Curitiba',
        addressRegion: 'Paraná',
        addressCountry: 'Brasil',
      },
      // Reference to the clinic where she works
      containedInPlace: {
        '@type': 'MedicalClinic',
        name: CLINICA_NASSIF.name,
        url: CLINICA_NASSIF.website,
        telephone: CLINICA_NASSIF.phoneFormatted,
        address: {
          '@type': 'PostalAddress',
          streetAddress: CLINICA_NASSIF.address,
          addressLocality: CLINICA_NASSIF.city,
          addressRegion: CLINICA_NASSIF.state,
          addressCountry: 'BR',
          postalCode: CLINICA_NASSIF.cep,
        },
      },
    },
    // Medical Professional
    {
      '@type': 'Physician',
      '@id': `${WEBSITE_URL}/#physician`,
      name: DR_NAME,
      jobTitle: 'Coloproctologista',
      description: PHYSICIAN_DESCRIPTION,
      image: `${WEBSITE_URL}/images/og.png`,
      url: WEBSITE_URL,
      sameAs: [URL_INSTAGRAM],
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
          identifier: 'CRM-PR 45351',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Conselho Regional de Medicina do Paraná',
            alternateName: 'CRM-PR',
            url: 'https://www.crmpr.org.br',
          },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Qualificação de Especialista',
          identifier: 'RQE 36221',
          name: 'Especialização em Coloproctologia',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Conselho Regional de Medicina do Paraná',
            alternateName: 'CRM-PR',
            url: 'https://www.crmpr.org.br',
          },
        },
      ],
      // Brazilian payment methods and currency
      paymentAccepted: ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'PIX'],
      currenciesAccepted: 'BRL',
      worksFor: {
        '@id': `${WEBSITE_URL}/#organization`,
      },
      workLocation: {
        '@type': 'MedicalClinic',
        name: CLINICA_NASSIF.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: CLINICA_NASSIF.address,
          addressLocality: CLINICA_NASSIF.city,
          addressRegion: CLINICA_NASSIF.state,
          addressCountry: 'BR',
          postalCode: CLINICA_NASSIF.cep,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: CLINICA_NASSIF.coordinates.latitude,
          longitude: CLINICA_NASSIF.coordinates.longitude,
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
      '@id': `${WEBSITE_URL}/#services`,
      name: 'Serviços de Coloproctologia',
      description: SERVICES_DESCRIPTION,
      procedureType: [
        'Cirurgias a laser',
        'Botox para fissura anal',
        'Cirurgias para fístulas anorretais',
        'Ligadura elástica para hemorroidas',
        'Tratamento de HPV',
        'Cirurgia de cisto pilonidal',
        'Acompanhamento de doenças inflamatórias intestinais',
        'Tratamento da síndrome do intestino irritável',
        'Rastreio e prevenção do câncer de canal anal',
      ],
      performer: {
        '@id': `${WEBSITE_URL}/#physician`,
      },
    },
    // Website
    {
      '@type': 'WebSite',
      '@id': `${WEBSITE_URL}/#website`,
      url: WEBSITE_URL,
      name: `${DR_NAME} - Coloproctologista`,
      description: WEBSITE_DESCRIPTION,
      publisher: {
        '@id': `${WEBSITE_URL}/#organization`,
      },
      inLanguage: 'pt-BR',
    },
    // Local Business
    {
      '@type': 'LocalBusiness',
      '@id': `${WEBSITE_URL}/#localbusiness`,
      name: `${DR_NAME} - Coloproctologia`,
      description: BUSINESS_DESCRIPTION,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CLINICA_NASSIF.address,
        addressLocality: CLINICA_NASSIF.city,
        addressRegion: CLINICA_NASSIF.state,
        addressCountry: 'BR',
        postalCode: CLINICA_NASSIF.cep,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: CLINICA_NASSIF.coordinates.latitude,
        longitude: CLINICA_NASSIF.coordinates.longitude,
      },
      telephone: WPP_NUMBER_NASSIF_FORMATTED,
      url: WEBSITE_URL,
      image: `${WEBSITE_URL}/images/og.png`,
      priceRange: '$$',
      openingHours: CLINICA_NASSIF.openingHours,
      hasMap: `https://maps.google.com/?q=${CLINICA_NASSIF.coordinates.latitude},${CLINICA_NASSIF.coordinates.longitude}`,
    },
  ],
}

export function getStructuredData() {
  return JSON.stringify(structuredData)
}
