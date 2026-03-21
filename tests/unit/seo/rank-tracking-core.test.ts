import { describe, expect, it } from 'vitest'
import {
  normalizeText,
  normalizePath,
  extractDomain,
  domainMatches,
  formatRank,
  pickBestCandidate,
  chooseRowsForSerpApi,
  toIsoTimestamp,
} from '../../../scripts/lib/rank-tracking-core.mjs'

describe('rank-tracking core', () => {
  it('normalizes query text consistently', () => {
    expect(normalizeText('  Síndrome   do Intestino Irritável  ')).toBe(
      'sindrome do intestino irritavel'
    )
  })

  it('normalizes paths from full URLs and raw paths', () => {
    expect(
      normalizePath('https://www.analuizarocha.com.br/tratamentos/cx-laser/?utm_source=test')
    ).toBe('/tratamentos/cx-laser')
    expect(normalizePath('/Blog/Artigo/')).toBe('/blog/artigo')
  })

  it('extracts and matches domains with subdomains', () => {
    const domain = extractDomain('https://www.analuizarocha.com.br/tratamentos')
    expect(domain).toBe('analuizarocha.com.br')
    expect(domainMatches('blog.analuizarocha.com.br', 'analuizarocha.com.br')).toBe(true)
    expect(domainMatches('doctoralia.com.br', 'analuizarocha.com.br')).toBe(false)
  })

  it('formats rank boundaries correctly', () => {
    expect(formatRank(0)).toBe('Not found (GSC period)')
    expect(formatRank(31)).toBe('30+')
    expect(formatRank(4.2)).toBe('4')
  })

  it('prefers same expected path when selecting candidate', () => {
    const candidates = [
      {
        page: 'https://www.analuizarocha.com.br/',
        impressions: 500,
        clicks: 10,
        position: 5,
      },
      {
        page: 'https://www.analuizarocha.com.br/tratamentos/cx-laser',
        impressions: 200,
        clicks: 8,
        position: 3,
      },
    ]

    const best = pickBestCandidate(
      candidates,
      'https://www.analuizarocha.com.br/tratamentos/cx-laser'
    )
    expect(best?.page).toContain('/tratamentos/cx-laser')
  })

  it('rotates SerpAPI selection with wrap-around', () => {
    const rows = [{ Keywords: 'a' }, { Keywords: 'b' }, { Keywords: 'c' }, { Keywords: 'd' }]
    const first = chooseRowsForSerpApi(rows, 3, 2)
    expect(first.selected.map((r) => r.Keywords)).toEqual(['c', 'd', 'a'])
    expect(first.nextIndex).toBe(1)

    const second = chooseRowsForSerpApi(rows, 2, first.nextIndex)
    expect(second.selected.map((r) => r.Keywords)).toEqual(['b', 'c'])
    expect(second.nextIndex).toBe(3)
  })

  it('emits ISO UTC timestamps', () => {
    const iso = toIsoTimestamp(new Date('2026-03-10T09:15:00.000Z'))
    expect(iso).toBe('2026-03-10T09:15:00.000Z')
  })
})
