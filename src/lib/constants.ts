/**
 * Application Constants
 * Centralized configuration for doctor information, contact details, and clinic data
 */

// =============================================================================
// Doctor Information
// =============================================================================

/** Doctor's full professional name */
export const DR_NAME = 'Dra. Ana Luiza Moraes Rocha'

/** Doctor's abbreviated name (used in headers/footers) */
export const DR_NAME_ABBREVIATED = 'Dra. Ana Luiza M. Rocha'

/** Doctor's short name (informal contexts) */
export const DR_NAME_SHORT = 'Dra. Ana Luiza'

/** Site name / Organization name (Doctor + Specialty) */
export const SITE_NAME = `${DR_NAME} - Coloproctologia`

/** Professional registration numbers */
export const CRM_NUMBER = 'CRM-PR 45351'
export const RQE_NUMBER = 'RQE 36221'
export const CRM_RQE_TEXT = `${CRM_NUMBER} | ${RQE_NUMBER}`

// =============================================================================
// Descriptions & SEO
// =============================================================================

/** Main organization description for SEO and schema */
export const ORG_DESCRIPTION =
  'Especialista em Coloproctologia oferecendo cuidado clínico e cirúrgico do intestino, reto e ânus em Curitiba.'

/** Physician professional description for schema */
export const PHYSICIAN_DESCRIPTION =
  'Especialista em Coloproctologia com formação internacional, dedicada ao cuidado integral e humanizado de cada paciente.'

/** Medical services description */
export const SERVICES_DESCRIPTION = 'Tratamento especializado para doenças do intestino, reto e ânus'

/** Website description for schema */
export const WEBSITE_DESCRIPTION =
  'Site oficial da Dra. Ana Luiza M. Rocha, especialista em Coloproctologia em Curitiba.'

/** Local business description */
export const BUSINESS_DESCRIPTION =
  'Consultas de Coloproctologia em ambiente acolhedor e moderno no Batel, Curitiba.'

// =============================================================================
// Educational Institutions
// =============================================================================

/** Medical school */
export const PUC_PR = 'PUC-PR'

/** General surgery residency hospital */
export const HOSPITAL_SANTA_CASA = 'Hospital Santa Casa de Curitiba'

/** Coloproctology residency hospital */
export const HOSPITAL_MACKENZIE = 'Hospital Universitário Evangélico Mackenzie'

/** Fellowship hospital in Barcelona */
export const HOSPITAL_CLINIC_BARCELONA = 'Hospital Clinic Barcelona'

// =============================================================================
// Website & Social Media
// =============================================================================

/** Primary website URL */
export const WEBSITE_URL = 'https://www.analuizarocha.com.br'

/** Instagram profile URL */
export const URL_INSTAGRAM = 'https://www.instagram.com/analuiza.mrocha/'

/** Instagram handle */
export const TAG_INSTAGRAM = '@analuiza.mrocha'

/** LinkedIn profile URL */
export const URL_LINKEDIN =
  'https://www.linkedin.com/in/ana-luiza-moraes-rocha-3728b92aa/'

// =============================================================================
// WhatsApp Contact
// =============================================================================

/** WhatsApp number in E.164 format (for links) */
export const WPP_NUMBER_NASSIF = '+5541988645800'

/** WhatsApp number formatted for display */
export const WPP_NUMBER_NASSIF_FORMATTED = '(41) 98864-5800'

/** Default WhatsApp message text (plain) */
export const WHATSAPP_MSG_TEXT =
  'Olá! Gostaria de agendar uma consulta com a Dra. Ana Luiza Rocha.'

/** WhatsApp message text (URL encoded for links) */
export const WHATSAPP_MSG_TEXT_ENCODED =
  'Ol%C3%A1%21%0A%0AGostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra.%20Ana%20Luiza%20Rocha.%20'

// =============================================================================
// WhatsApp Contact — Agendamento (secretária / Dra. Ana Luiza)
// =============================================================================
// Direct scheduling line for consultations with Dra. Ana Luiza. Used by the
// general "agendar consulta" CTAs across the site. Clinic-specific location
// cards keep their own numbers (Clínica Nassif / Specta) below.

/** Scheduling WhatsApp number in E.164 digits (for wa.me links) */
export const WPP_NUMBER_SECRETARY = '554130739732'

/** Scheduling WhatsApp number formatted for display */
export const WPP_NUMBER_SECRETARY_FORMATTED = '(41) 3073-9732'

/** Scheduling WhatsApp message text (plain) */
export const WHATSAPP_MSG_TEXT_SECRETARY =
  'Olá! Gostaria de agendar uma consulta com a Dra Ana Luiza Rocha '

/** Scheduling WhatsApp message text (URL encoded for links) */
export const WHATSAPP_MSG_TEXT_SECRETARY_ENCODED =
  'Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra%20Ana%20Luiza%20Rocha%20'

/** Ready-to-use wa.me href for scheduling a consultation with the secretary */
export const WHATSAPP_HREF_SECRETARY = `https://wa.me/${WPP_NUMBER_SECRETARY}?text=${WHATSAPP_MSG_TEXT_SECRETARY_ENCODED}`

// =============================================================================
// Clínica Nassif Information
// =============================================================================

/** Google Maps short URL for Clínica Nassif */
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/oWS7Zuw2YjE16jV79'

/**
 * Clínica Nassif complete information
 * Used for contact display, schema markup, and location data
 */
export const CLINICA_NASSIF = {
  /** Clinic name */
  name: 'Clínica Nassif',

  /** Street address */
  address: 'Rua Bruno Filgueira, 489',

  /** Neighborhood */
  neighborhood: 'Batel',

  /** City */
  city: 'Curitiba',

  /** State abbreviation */
  state: 'PR',

  /** State full name */
  stateFull: 'Paraná',

  /** Postal code */
  cep: '80240-220',

  /** Landline phone (formatted for display) */
  phone: '(41) 3244-1022',

  /** Landline phone (E.164 format for tel: links) */
  phoneFormatted: '+55 41 3244-1022',

  /** WhatsApp number (formatted for display) */
  wpp: WPP_NUMBER_NASSIF_FORMATTED,

  /** WhatsApp number (E.164 format for links) */
  wppNumber: WPP_NUMBER_NASSIF,

  /** Clinic website */
  website: 'https://clinicanassif.com.br',

  /** Google Maps URL */
  maps: GOOGLE_MAPS_URL,

  /** Geographic coordinates for maps and schema */
  coordinates: {
    latitude: -25.444975,
    longitude: -49.290097,
  },

  /** Opening hours in schema.org format */
  openingHours: 'Mo-Fr 08:00-19:30',

  /** Opening hours formatted for display */
  openingHoursDisplay: 'Segunda a Sexta: 08:00 - 19:30',
} as const

// =============================================================================
// Specta Endoscopia Digestiva Information
// =============================================================================

export const SPECTA_ENDOSCOPIA = {
  /** Clinic name */
  name: 'Specta Endoscopia Digestiva',

  /** Street address */
  address: 'R. Dom Alberto Gonçalves, 311',

  /** Neighborhood */
  neighborhood: 'Mercês',

  /** City */
  city: 'Curitiba',

  /** State abbreviation */
  state: 'PR',

  /** State full name */
  stateFull: 'Paraná',

  /** Contact phone used on the website */
  phone: '(41) 98773-7829',

  /** WhatsApp number (E.164 format for links) */
  wppNumber: '5541987737829',

  /** Google Maps short URL */
  maps: 'https://maps.app.goo.gl/iR5CKZxYLZrzDweM6',
} as const
