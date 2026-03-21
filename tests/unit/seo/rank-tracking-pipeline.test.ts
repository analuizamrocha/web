import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { parseCsv, stringifyCsv } from '../../../scripts/lib/csv-utils.mjs'
import { HISTORY_COLUMNS } from '../../../scripts/lib/rank-tracking-core.mjs'
import { runRankTrackingPipeline } from '../../../scripts/lib/rank-tracking-pipeline.mjs'

const TRACKING_HEADER = [
  'Keywords',
  'Your actual rank (1-30+)',
  "Your URL that's ranking",
  'Your page title in search results',
  'Top ranking domain (competitor)',
  "Top result's title",
  'Total search results',
  'Timestamp',
]

const tmpDirs: string[] = []

afterEach(() => {
  for (const dir of tmpDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

function makeTmpDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-rank-pipeline-'))
  tmpDirs.push(dir)
  return dir
}

function writeTrackingCsv(filePath: string, rows: Record<string, string>[]) {
  const csv = stringifyCsv(TRACKING_HEADER, rows, { withBom: true })
  fs.writeFileSync(filePath, csv, 'utf8')
}

function parseTrackingCsv(filePath: string) {
  return parseCsv(fs.readFileSync(filePath, 'utf8'))
}

function baseConfig(dir: string) {
  return {
    input: path.join(dir, 'tracking.csv'),
    output: path.join(dir, 'tracking.csv'),
    tsvOutput: path.join(dir, 'tracking.tsv'),
    historyFile: path.join(dir, 'history.csv'),
    rowLimit: 100,
    searchType: 'web',
    siteUrl: 'https://www.analuizarocha.com.br/',
    clientEmail: 'svc@example.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----',
    startDate: '2026-02-11',
    endDate: '2026-03-09',
    timestamp: '2026-03-10T09:15:00.000Z',
    serpApi: {
      apiKey: '',
      maxCalls: 0,
      location: 'Curitiba, Parana, Brazil',
      language: 'pt-br',
      country: 'br',
      numResults: 20,
      cursorFile: path.join(dir, 'cursor.json'),
      overrideRank: false,
    },
    db: {
      backend: 'none',
      required: false,
      supabaseUrl: '',
      supabaseServiceRoleKey: '',
    },
  }
}

describe('rank tracking pipeline', () => {
  it('updates GSC ranks and writes history rows for found and not found keywords', async () => {
    const dir = makeTmpDir()
    const config = baseConfig(dir)

    writeTrackingCsv(config.input, [
      {
        Keywords: 'coloproctologia curitiba',
        'Your actual rank (1-30+)': '',
        "Your URL that's ranking": 'https://www.analuizarocha.com.br/',
        'Your page title in search results': 'Dra. Ana Luiza M. Rocha | Coloproctologista Curitiba',
        'Top ranking domain (competitor)': '',
        "Top result's title": '',
        'Total search results': '',
        Timestamp: '',
      },
      {
        Keywords: 'anuscopia alta resolução curitiba',
        'Your actual rank (1-30+)': '',
        "Your URL that's ranking":
          'https://www.analuizarocha.com.br/tratamentos/rastreio-cancer-anal',
        'Your page title in search results': 'Rastreio de Câncer Anal e HPV',
        'Top ranking domain (competitor)': '',
        "Top result's title": '',
        'Total search results': '',
        Timestamp: '',
      },
    ])

    const result = await runRankTrackingPipeline(config, {
      logger: { log: () => {}, warn: () => {} },
      getAccessToken: async () => 'fake-token',
      getSearchConsoleRows: async () => [
        {
          query: 'coloproctologia curitiba',
          page: 'https://www.analuizarocha.com.br/',
          impressions: 100,
          clicks: 25,
          ctr: 0.25,
          position: 3.8,
        },
      ],
    })

    expect(result.foundCount).toBe(1)
    expect(result.notFoundCount).toBe(1)

    const updated = parseTrackingCsv(config.output).rows
    expect(updated[0]['Your actual rank (1-30+)']).toBe('4')
    expect(updated[0].Timestamp).toBe('2026-03-10T09:15:00.000Z')
    expect(updated[1]['Your actual rank (1-30+)']).toBe('Not found (GSC period)')
    expect(updated[1].Timestamp).toBe('2026-03-10T09:15:00.000Z')

    const history = parseTrackingCsv(config.historyFile)
    expect(history.rows).toHaveLength(2)
    expect(history.rows.every((row) => row.Timestamp === '2026-03-10T09:15:00.000Z')).toBe(true)
    expect(history.rows.map((row) => row.Source)).toEqual(['gsc', 'gsc'])
  })

  it('enriches competitor fields via SerpAPI with quota-safe rotation and persisted cursor', async () => {
    const dir = makeTmpDir()
    const config = baseConfig(dir)
    config.serpApi.apiKey = 'serpapi-key'
    config.serpApi.maxCalls = 2

    writeTrackingCsv(config.input, [
      {
        Keywords: 'k1',
        'Your actual rank (1-30+)': '',
        "Your URL that's ranking": 'https://www.analuizarocha.com.br/',
        'Your page title in search results': 'Home',
        'Top ranking domain (competitor)': '',
        "Top result's title": '',
        'Total search results': '',
        Timestamp: '',
      },
      {
        Keywords: 'k2',
        'Your actual rank (1-30+)': '',
        "Your URL that's ranking": 'https://www.analuizarocha.com.br/sobre',
        'Your page title in search results': 'Sobre',
        'Top ranking domain (competitor)': '',
        "Top result's title": '',
        'Total search results': '',
        Timestamp: '',
      },
      {
        Keywords: 'k3',
        'Your actual rank (1-30+)': '',
        "Your URL that's ranking": 'https://www.analuizarocha.com.br/tratamentos',
        'Your page title in search results': 'Tratamentos',
        'Top ranking domain (competitor)': '',
        "Top result's title": '',
        'Total search results': '',
        Timestamp: '',
      },
    ])

    const calledKeywords: string[] = []
    const getSerpApiResult = async ({ keyword }: { keyword: string }) => {
      calledKeywords.push(keyword)
      return {
        topDomain: `competitor-${keyword}.com`,
        topTitle: `Top ${keyword}`,
        totalResults: '1234',
        ownResult: {
          link: `https://www.analuizarocha.com.br/${keyword}`,
          title: `Page ${keyword}`,
          resolvedPosition: 2,
        },
      }
    }

    await runRankTrackingPipeline(config, {
      logger: { log: () => {}, warn: () => {} },
      getAccessToken: async () => 'token',
      getSearchConsoleRows: async () => [],
      getSerpApiResult,
    })

    expect(calledKeywords).toEqual(['k1', 'k2'])
    const cursor1 = JSON.parse(fs.readFileSync(config.serpApi.cursorFile, 'utf8'))
    expect(cursor1.index).toBe(2)

    await runRankTrackingPipeline(config, {
      logger: { log: () => {}, warn: () => {} },
      getAccessToken: async () => 'token',
      getSearchConsoleRows: async () => [],
      getSerpApiResult,
    })

    expect(calledKeywords).toEqual(['k1', 'k2', 'k3', 'k1'])
    const cursor2 = JSON.parse(fs.readFileSync(config.serpApi.cursorFile, 'utf8'))
    expect(cursor2.index).toBe(1)

    const updatedRows = parseTrackingCsv(config.output).rows
    expect(updatedRows.find((row) => row.Keywords === 'k3')?.['Top ranking domain (competitor)']).toBe(
      'competitor-k3.com'
    )
  })

  it('continues pipeline run when SerpAPI fails for selected keyword', async () => {
    const dir = makeTmpDir()
    const config = baseConfig(dir)
    config.serpApi.apiKey = 'serpapi-key'
    config.serpApi.maxCalls = 1

    writeTrackingCsv(config.input, [
      {
        Keywords: 'k1',
        'Your actual rank (1-30+)': '',
        "Your URL that's ranking": 'https://www.analuizarocha.com.br/',
        'Your page title in search results': 'Home',
        'Top ranking domain (competitor)': '',
        "Top result's title": '',
        'Total search results': '',
        Timestamp: '',
      },
    ])

    const result = await runRankTrackingPipeline(config, {
      logger: { log: () => {}, warn: () => {} },
      getAccessToken: async () => 'token',
      getSearchConsoleRows: async () => [],
      getSerpApiResult: async () => {
        throw new Error('rate limit')
      },
    })

    expect(result.serpFailures).toBe(1)
    expect(fs.existsSync(config.output)).toBe(true)
    expect(fs.existsSync(config.historyFile)).toBe(true)
  })

  it('persists run and history through injected rank repository', async () => {
    const dir = makeTmpDir()
    const config = baseConfig(dir)
    config.db.backend = 'supabase'
    config.db.required = true
    config.db.supabaseUrl = 'https://example.supabase.co'
    config.db.supabaseServiceRoleKey = 'service-role'

    writeTrackingCsv(config.input, [
      {
        Keywords: 'coloproctologia curitiba',
        'Your actual rank (1-30+)': '',
        "Your URL that's ranking": 'https://www.analuizarocha.com.br/',
        'Your page title in search results': 'Home',
        'Top ranking domain (competitor)': '',
        "Top result's title": '',
        'Total search results': '',
        Timestamp: '',
      },
    ])

    const syncKeywords = vi.fn(async () => new Map([['coloproctologia curitiba', 101]]))
    const upsertRun = vi.fn(async () => ({ id: 77, runKey: 'seo-run-test' }))
    const upsertHistoryRows = vi.fn(async () => 1)

    const result = await runRankTrackingPipeline(config, {
      logger: { log: () => {}, warn: () => {} },
      getAccessToken: async () => 'token',
      getSearchConsoleRows: async () => [
        {
          query: 'coloproctologia curitiba',
          page: 'https://www.analuizarocha.com.br/',
          impressions: 80,
          clicks: 8,
          ctr: 0.1,
          position: 5.1,
        },
      ],
      rankRepository: {
        syncKeywords,
        upsertRun,
        upsertHistoryRows,
      },
    })

    expect(syncKeywords).toHaveBeenCalledTimes(1)
    expect(upsertRun).toHaveBeenCalledTimes(1)
    expect(upsertHistoryRows).toHaveBeenCalledTimes(1)
    expect(result.dbRunId).toBe(77)
    expect(result.dbHistoryUpserted).toBe(1)
  })

  it('throws when db backend is required and repository step fails', async () => {
    const dir = makeTmpDir()
    const config = baseConfig(dir)
    config.db.backend = 'supabase'
    config.db.required = true
    config.db.supabaseUrl = 'https://example.supabase.co'
    config.db.supabaseServiceRoleKey = 'service-role'

    writeTrackingCsv(config.input, [
      {
        Keywords: 'k1',
        'Your actual rank (1-30+)': '',
        "Your URL that's ranking": 'https://www.analuizarocha.com.br/',
        'Your page title in search results': 'Home',
        'Top ranking domain (competitor)': '',
        "Top result's title": '',
        'Total search results': '',
        Timestamp: '',
      },
    ])

    await expect(
      runRankTrackingPipeline(config, {
        logger: { log: () => {}, warn: () => {} },
        getAccessToken: async () => 'token',
        getSearchConsoleRows: async () => [],
        rankRepository: {
          syncKeywords: async () => {
            throw new Error('db down')
          },
          upsertRun: async () => ({ id: 1, runKey: 'seo-run' }),
          upsertHistoryRows: async () => 1,
        },
      })
    ).rejects.toThrow('DB step "syncKeywords" failed: db down')
  })

  it('skips DB persistence when backend is none', async () => {
    const dir = makeTmpDir()
    const config = baseConfig(dir)
    config.db.backend = 'none'
    config.db.required = false

    writeTrackingCsv(config.input, [
      {
        Keywords: 'k1',
        'Your actual rank (1-30+)': '',
        "Your URL that's ranking": 'https://www.analuizarocha.com.br/',
        'Your page title in search results': 'Home',
        'Top ranking domain (competitor)': '',
        "Top result's title": '',
        'Total search results': '',
        Timestamp: '',
      },
    ])

    const result = await runRankTrackingPipeline(config, {
      logger: { log: () => {}, warn: () => {} },
      getAccessToken: async () => 'token',
      getSearchConsoleRows: async () => [],
    })

    expect(result.dbBackend).toBe('none')
    expect(result.dbRunId).toBe(null)
    expect(result.dbHistoryUpserted).toBe(0)
  })

  it('migrates old history schema forward while preserving compatibility', async () => {
    const dir = makeTmpDir()
    const config = baseConfig(dir)

    writeTrackingCsv(config.input, [
      {
        Keywords: 'k1',
        'Your actual rank (1-30+)': '',
        "Your URL that's ranking": 'https://www.analuizarocha.com.br/',
        'Your page title in search results': 'Home',
        'Top ranking domain (competitor)': '',
        "Top result's title": '',
        'Total search results': '',
        Timestamp: '',
      },
    ])

    const oldHistoryHeader = ['Timestamp', 'Start date', 'End date', 'Keyword', 'Rank']
    const oldHistoryRows = [
      {
        Timestamp: '2026-02-01T09:15:00.000Z',
        'Start date': '2026-01-01',
        'End date': '2026-01-31',
        Keyword: 'legacy keyword',
        Rank: '12',
      },
    ]
    fs.writeFileSync(
      config.historyFile,
      stringifyCsv(oldHistoryHeader, oldHistoryRows, { withBom: true }),
      'utf8'
    )

    await runRankTrackingPipeline(config, {
      logger: { log: () => {}, warn: () => {} },
      getAccessToken: async () => 'token',
      getSearchConsoleRows: async () => [],
    })

    const migrated = parseTrackingCsv(config.historyFile)
    expect(migrated.header).toEqual(HISTORY_COLUMNS)
    expect(migrated.rows.length).toBe(2)
    expect(migrated.rows[0].Source).toBe('')
    expect(migrated.rows[1].Source).toBe('gsc')
  })
})
