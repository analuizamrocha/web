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
      },
      location: locationPages.map((location) => ({
        '@id': `${WEBSITE_URL}${getLocationPath(location.slug)}#place`,
      })),
    },
    {
      '@type': 'Physician',
      '@id': `${WEBSITE_URL}/#physician`,
      name: DR_NAME,
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
      // availableService is valid on Physician per schema.org
      availableService: [
        { '@type': 'MedicalTherapy', name: 'Cirurgias a laser' },
        { '@type': 'MedicalTherapy', name: 'Toxina botulínica para fissura anal' },
        { '@type': 'MedicalTherapy', name: 'Cirurgias para fístulas anorretais' },
        { '@type': 'MedicalProcedure', name: 'Ligadura elástica para hemorroidas' },
        { '@type': 'MedicalTherapy', name: 'Tratamento de HPV anal' },
        { '@type': 'MedicalTherapy', name: 'Cirurgia de cisto pilonidal' },
        { '@type': 'MedicalTherapy', name: 'Acompanhamento de doenças inflamatórias intestinais' },
        { '@type': 'MedicalTherapy', name: 'Tratamento da síndrome do intestino irritável' },
        { '@type': 'MedicalProcedure', name: 'Rastreio e prevenção do câncer de canal anal' },
        { '@type': 'MedicalTest', name: 'Colonoscopia quando indicada' },
      ],
      worksFor: {
        '@id': `${WEBSITE_URL}/#organization`,
      },
      workLocation: locationPages.map((location) => ({
        '@id': `${WEBSITE_URL}${getLocationPath(location.slug)}#place`,
      })),
      // schema.org MedicalSpecialty requires enum URIs, not free-text strings
      medicalSpecialty: ['https://schema.org/Gastroenterologic', 'https://schema.org/Surgical'],
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
