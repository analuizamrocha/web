import { describe, expect, it } from 'vitest'
import {
  RUN_UPSERT_CONFLICT_COLUMNS,
  HISTORY_UPSERT_CONFLICT_COLUMNS,
  toNullableNumber,
  toNullableInteger,
  parseRankLabelToValue,
  buildRunKey,
  mapHistoryRowsToDbRows,
} from '../../../scripts/lib/rank-repository-core.mjs'

describe('rank repository core', () => {
  it('parses rank labels into nullable numeric values', () => {
    expect(parseRankLabelToValue('7')).toBe(7)
    expect(parseRankLabelToValue('30+')).toBe(30)
    expect(parseRankLabelToValue('Not found (GSC period)')).toBeNull()
    expect(parseRankLabelToValue('')).toBeNull()
  })

  it('handles nullable number coercion safely', () => {
    expect(toNullableNumber('12.34')).toBe(12.34)
    expect(toNullableNumber('')).toBeNull()
    expect(toNullableNumber('abc')).toBeNull()
    expect(toNullableInteger('1200')).toBe(1200)
    expect(toNullableInteger('12.6')).toBe(13)
  })

  it('builds deterministic run keys for idempotent run upserts', () => {
    const a = buildRunKey({
      timestamp: '2026-03-10T09:15:00.000Z',
      startDate: '2026-02-11',
      endDate: '2026-03-09',
      siteUrl: 'https://www.analuizarocha.com.br/',
      searchType: 'web',
    })
    const b = buildRunKey({
      timestamp: '2026-03-10T09:15:00.000Z',
      startDate: '2026-02-11',
      endDate: '2026-03-09',
      siteUrl: 'https://www.analuizarocha.com.br/',
      searchType: 'web',
    })
    const c = buildRunKey({
      timestamp: '2026-03-11T09:15:00.000Z',
      startDate: '2026-02-11',
      endDate: '2026-03-09',
      siteUrl: 'https://www.analuizarocha.com.br/',
      searchType: 'web',
    })

    expect(a).toBe(b)
    expect(a).not.toBe(c)
  })

  it('uses explicit conflict keys for run and history upserts', () => {
    expect(RUN_UPSERT_CONFLICT_COLUMNS).toEqual(['run_key'])
    expect(HISTORY_UPSERT_CONFLICT_COLUMNS).toEqual([
      'timestamp',
      'source',
      'keyword',
      'start_date',
      'end_date',
    ])
  })

  it('maps history rows to db payload with numeric conversion and keyword ids', () => {
    const rows = mapHistoryRowsToDbRows({
      runId: 44,
      keywordIdByKeyword: new Map([
        ['coloproctologia curitiba', 7],
        ['fissura anal curitiba', 8],
      ]),
      historyRows: [
        {
          Timestamp: '2026-03-10T09:15:00.000Z',
          'Start date': '2026-02-11',
          'End date': '2026-03-09',
          Source: 'gsc',
          Keyword: 'coloproctologia curitiba',
          Rank: '4',
          'Position (avg)': '4.23',
          Impressions: '120',
          Clicks: '35',
          CTR: '0.2917',
          'Matched page': 'https://www.analuizarocha.com.br/',
          'Expected page': 'https://www.analuizarocha.com.br/',
          'Top domain': '',
          'Top title': '',
          'Total results': '',
        },
      ],
    })

    expect(rows).toHaveLength(1)
    expect(rows[0].run_id).toBe(44)
    expect(rows[0].keyword_id).toBe(7)
    expect(rows[0].rank_label).toBe('4')
    expect(rows[0].rank_value).toBe(4)
    expect(rows[0].avg_position).toBe(4.23)
    expect(rows[0].impressions).toBe(120)
    expect(rows[0].clicks).toBe(35)
    expect(rows[0].ctr).toBe(0.2917)
  })
})
