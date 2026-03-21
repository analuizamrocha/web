import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { parseCsv, stringifyCsv } from '../../../scripts/lib/csv-utils.mjs'
import { HISTORY_COLUMNS } from '../../../scripts/lib/rank-tracking-core.mjs'
import { SUMMARY_COLUMNS } from '../../../scripts/lib/rank-summary-core.mjs'
import { runRankSummaryPipeline } from '../../../scripts/lib/rank-summary-pipeline.mjs'

const tmpDirs: string[] = []

afterEach(() => {
  for (const dir of tmpDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

function makeTmpDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-rank-summary-'))
  tmpDirs.push(dir)
  return dir
}

describe('rank summary pipeline', () => {
  it('writes header-only summary when history is missing', async () => {
    const dir = makeTmpDir()
    const input = path.join(dir, 'history.csv')
    const output = path.join(dir, 'summary.csv')

    const result = await runRankSummaryPipeline(
      { input, output },
      { logger: { log: () => {}, warn: () => {} } }
    )

    expect(result.missingHistory).toBe(true)

    const parsed = parseCsv(fs.readFileSync(output, 'utf8'))
    expect(parsed.header).toEqual(SUMMARY_COLUMNS)
    expect(parsed.rows).toHaveLength(0)
  })

  it('aggregates KPI rollups from GSC history rows', async () => {
    const dir = makeTmpDir()
    const input = path.join(dir, 'history.csv')
    const output = path.join(dir, 'summary.csv')

    const historyRows = [
      {
        Timestamp: '2026-03-10T09:15:00.000Z',
        'Start date': '2026-02-11',
        'End date': '2026-03-09',
        Source: 'gsc',
        Keyword: 'k1',
        Rank: '2',
        'Position (avg)': '2.20',
        Impressions: '100',
        Clicks: '10',
        CTR: '0.1000',
        'Matched page': '/a',
        'Expected page': '/a',
        'Top domain': '',
        'Top title': '',
        'Total results': '',
      },
      {
        Timestamp: '2026-03-10T09:15:00.000Z',
        'Start date': '2026-02-11',
        'End date': '2026-03-09',
        Source: 'gsc',
        Keyword: 'k2',
        Rank: '15',
        'Position (avg)': '14.70',
        Impressions: '50',
        Clicks: '5',
        CTR: '0.1000',
        'Matched page': '/b',
        'Expected page': '/b',
        'Top domain': '',
        'Top title': '',
        'Total results': '',
      },
      {
        Timestamp: '2026-03-10T09:15:00.000Z',
        'Start date': '2026-02-11',
        'End date': '2026-03-09',
        Source: 'gsc',
        Keyword: 'k3',
        Rank: 'Not found (GSC period)',
        'Position (avg)': '',
        Impressions: '',
        Clicks: '',
        CTR: '',
        'Matched page': '',
        'Expected page': '/c',
        'Top domain': '',
        'Top title': '',
        'Total results': '',
      },
    ]

    fs.writeFileSync(input, stringifyCsv(HISTORY_COLUMNS, historyRows, { withBom: true }), 'utf8')
    await runRankSummaryPipeline({ input, output }, { logger: { log: () => {}, warn: () => {} } })

    const summary = parseCsv(fs.readFileSync(output, 'utf8'))
    expect(summary.rows).toHaveLength(1)
    const row = summary.rows[0]

    expect(row['Keywords tracked']).toBe('3')
    expect(row['Keywords found']).toBe('2')
    expect(row['Top 3']).toBe('1')
    expect(row['Top 10']).toBe('1')
    expect(row['Top 30']).toBe('2')
    expect(row['Not found']).toBe('1')
    expect(row['Avg rank']).toBe('8.50')
    expect(row['Avg position']).toBe('8.45')
    expect(row['Total impressions']).toBe('150')
    expect(row['Total clicks']).toBe('15')
    expect(row['CTR (%)']).toBe('10.00')
  })

  it('keeps latest keyword row per timestamp before aggregation', async () => {
    const dir = makeTmpDir()
    const input = path.join(dir, 'history.csv')
    const output = path.join(dir, 'summary.csv')

    const historyRows = [
      {
        Timestamp: '2026-03-10T09:15:00.000Z',
        'Start date': '2026-02-11',
        'End date': '2026-03-09',
        Source: 'gsc',
        Keyword: 'k1',
        Rank: '30+',
        'Position (avg)': '35.00',
        Impressions: '10',
        Clicks: '0',
        CTR: '0.0000',
        'Matched page': '/old',
        'Expected page': '/old',
        'Top domain': '',
        'Top title': '',
        'Total results': '',
      },
      {
        Timestamp: '2026-03-10T09:15:00.000Z',
        'Start date': '2026-02-11',
        'End date': '2026-03-09',
        Source: 'gsc',
        Keyword: 'k1',
        Rank: '4',
        'Position (avg)': '3.80',
        Impressions: '120',
        Clicks: '30',
        CTR: '0.2500',
        'Matched page': '/new',
        'Expected page': '/new',
        'Top domain': '',
        'Top title': '',
        'Total results': '',
      },
    ]

    fs.writeFileSync(input, stringifyCsv(HISTORY_COLUMNS, historyRows, { withBom: true }), 'utf8')
    await runRankSummaryPipeline({ input, output }, { logger: { log: () => {}, warn: () => {} } })

    const summary = parseCsv(fs.readFileSync(output, 'utf8'))
    expect(summary.rows).toHaveLength(1)
    const row = summary.rows[0]
    expect(row['Keywords tracked']).toBe('1')
    expect(row['Avg rank']).toBe('4.00')
    expect(row['Total impressions']).toBe('120')
    expect(row['Total clicks']).toBe('30')
  })
})
