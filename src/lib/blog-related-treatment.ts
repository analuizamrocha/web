import type { TreatmentSlug } from '@/lib/treatment-images'
import { getTreatmentHref, getTreatmentSummary, type TreatmentSummary } from '@/lib/treatments'

/**
 * Posts whose subject maps one-to-one to an existing treatment page, so the
 * reader who finished the article can reach the page that explains how that
 * condition is cared for.
 *
 * Deliberately conservative: a post is listed only when its condition is the
 * same condition the treatment page covers. Posts about symptoms with several
 * possible causes (dor ao evacuar, bolinha no ânus, coceira) stay out — linking
 * them to one treatment would suggest a diagnosis. Hemorrhoid posts are linked
 * in their own body text (PR #78), so they are not repeated here.
 */
export const RELATED_TREATMENT_BY_POST: Readonly<Record<string, TreatmentSlug>> = {
  'cisto-pilonidal-precisa-cirurgia': 'cx-cisto-pilonidal',
  'fissura-anal-pode-cicatrizar-sozinha': 'toxina-botulinica',
  'hpv-anal-vaporizacao-laser-co2': 'hpv-anal',
  'plicoma-anal-cirurgia-laser': 'cx-laser',
}

export interface RelatedTreatment extends TreatmentSummary {
  href: string
}

export const getRelatedTreatmentForPost = (postSlug: string): RelatedTreatment | null => {
  const treatmentSlug = RELATED_TREATMENT_BY_POST[postSlug]
  if (!treatmentSlug) return null

  const treatment = getTreatmentSummary(treatmentSlug)
  if (!treatment) return null

  return { ...treatment, href: getTreatmentHref(treatment.slug) }
}
