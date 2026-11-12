import type { TreatmentSlug } from '@/lib/treatment-images'
import { getTreatmentHref, getTreatmentSummary, type TreatmentSummary } from '@/lib/treatments'

/**
 * Posts whose subject maps one-to-one to an existing treatment page, so the
 * reader who finished the article can reach the page that explains how that
 * condition is cared for. The card reuses the hub description, so a post is
 * listed only when that description names the same condition as the article.
 *
 * Left unmapped:
 * - symptom posts with several possible causes (dor ao evacuar, bolinha no
 *   ânus, coceira) — one treatment would suggest a diagnosis
 * - hemorrhoid posts — already linked in their own body text (PR #78)
 * - plicoma-anal-cirurgia-laser — the laser hub card and /tratamentos/cx-laser
 *   describe hemorrhoids and fissures, not plicoma
 * - fissura-anal-pode-cicatrizar-sozinha — the article says an acute fissure
 *   can heal with bowel care; the botox card would present toxin as the
 *   related treatment. Needs a clinician decision before it is mapped
 */
export const RELATED_TREATMENT_BY_POST: Readonly<Record<string, TreatmentSlug>> = {
  'cisto-pilonidal-precisa-cirurgia': 'cx-cisto-pilonidal',
  'hpv-anal-vaporizacao-laser-co2': 'hpv-anal',
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
