import fs from 'node:fs'
import path from 'node:path'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { RelatedTreatmentCard } from '@/components/ui/RelatedTreatmentCard'
import {
  getRelatedTreatmentForPost,
  RELATED_TREATMENT_BY_POST,
} from '@/lib/blog-related-treatment'
import { getAllPostSlugs } from '@/lib/blog'
import { TREATMENTS } from '@/lib/treatments'

afterEach(cleanup)

const treatmentRouteExists = (slug: string) =>
  fs.existsSync(path.join(process.cwd(), 'src', 'app', 'tratamentos', slug, 'page.tsx'))

describe('related treatment on blog posts', () => {
  it('maps only published posts to treatment pages that exist', () => {
    const postSlugs = new Set(getAllPostSlugs())

    for (const [postSlug, treatmentSlug] of Object.entries(RELATED_TREATMENT_BY_POST)) {
      expect(postSlugs.has(postSlug), postSlug).toBe(true)
      expect(treatmentRouteExists(treatmentSlug), treatmentSlug).toBe(true)
    }
  })

  it('keeps every hub treatment backed by a route', () => {
    for (const treatment of TREATMENTS) {
      expect(treatmentRouteExists(treatment.slug), treatment.slug).toBe(true)
    }
  })

  it('renders the hub copy and an internal link for a mapped post', () => {
    render(
      <RelatedTreatmentCard treatment={getRelatedTreatmentForPost('hpv-anal-vaporizacao-laser-co2')} />
    )

    expect(screen.getByRole('heading', { name: 'Tratamento de HPV Anal' })).toBeTruthy()
    const link = screen.getByRole('link', { name: 'Conhecer o tratamento' })
    expect(link.getAttribute('href')).toBe('/tratamentos/hpv-anal')
  })

  it('renders nothing for posts without a one-to-one treatment', () => {
    const { container } = render(
      <RelatedTreatmentCard treatment={getRelatedTreatmentForPost('dor-ao-evacuar-causas-tratamento')} />
    )

    expect(container.innerHTML).toBe('')
  })

  it('never points the block at WhatsApp or another external destination', () => {
    for (const postSlug of Object.keys(RELATED_TREATMENT_BY_POST)) {
      const href = getRelatedTreatmentForPost(postSlug)?.href ?? ''
      expect(href.startsWith('/tratamentos/'), postSlug).toBe(true)
    }
  })
})
