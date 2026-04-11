import {
  DR_NAME,
  ORG_DESCRIPTION,
  PHYSICIAN_DESCRIPTION,
  WEBSITE_URL,
  URL_INSTAGRAM,
  WEBSITE_DESCRIPTION,
  CRM_NUMBER,
  RQE_NUMBER,
  PUC_PR,
  HOSPITAL_SANTA_CASA,
  HOSPITAL_MACKENZIE,
  HOSPITAL_CLINIC_BARCELONA,
  WPP_NUMBER_NASSIF_FORMATTED,
} from './constants'
import { locationPages, getLocationPath } from './locations'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalOrganization',
      '@id': `${WEBSITE_URL}/#organization`,
      name: `${DR_NAME} - Coloproctologia`,
      url: WEBSITE_URL,
      logo: `${WEBSITE_URL}/images/og.png`,
      description: ORG_DESCRIPTION,
      telephone: WPP_NUMBER_NASSIF_FORMATTED,
      areaServed: {
        '@type': 'City',
        name: 'Curitiba',
        addressRegion: 'Paraná',
        addressCountry: 'Brasil',
      },
      location: locationPages.map((location) => ({
        '@id': `${WEBSITE_URL}${getLocationPath(location.slug)}#place`,
      })),
    },
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
          name: PUC_PR,
          description: 'Graduação em Medicina',
        },
        {
          '@type': 'EducationalOrganization',
          name: HOSPITAL_SANTA_CASA,
          description: 'Especialização em Cirurgia Geral',
        },
        {
          '@type': 'EducationalOrganization',
          name: HOSPITAL_MACKENZIE,
          description: 'Especialização em Coloproctologia',
        },
        {
          '@type': 'EducationalOrganization',
          name: HOSPITAL_CLINIC_BARCELONA,
          description: 'Fellow em Cirurgia Colorretal',
        },
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Registro Profissional',
          identifier: CRM_NUMBER,
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
          identifier: RQE_NUMBER,
          name: 'Especialização em Coloproctologia',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Conselho Regional de Medicina do Paraná',
            alternateName: 'CRM-PR',
            url: 'https://www.crmpr.org.br',
          },
        },
      ],
      worksFor: {
        '@id': `${WEBSITE_URL}/#organization`,
      },
      workLocation: locationPages.map((location) => ({
        '@id': `${WEBSITE_URL}${getLocationPath(location.slug)}#place`,
      })),
      medicalSpecialty: ['Coloproctologia', 'Cirurgia Colorretal', 'Proctologia'],
    },
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
  ],
}

export function getStructuredData() {
  return JSON.stringify(structuredData)
}
