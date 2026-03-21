import { describe, expect, it } from 'vitest'
import {
  buildRankTrackingConfig,
  validateRankTrackingConfig,
} from '../../../scripts/lib/rank-tracking-pipeline.mjs'

describe('rank tracking config', () => {
  const baseEnv = {
    GSC_SITE_URL: 'https://www.analuizarocha.com.br/',
    GSC_CLIENT_EMAIL: 'svc@example.iam.gserviceaccount.com',
    GSC_PRIVATE_KEY: '-----BEGIN PRIVATE KEY-----\\nabc\\n-----END PRIVATE KEY-----',
  }

  it('defaults db backend to none when unset', () => {
    const config = buildRankTrackingConfig({ env: { ...baseEnv }, now: new Date('2026-03-10T00:00:00Z') })
    expect(config.db.backend).toBe('none')
    expect(config.db.required).toBe(false)
  })

  it('defaults db required=true for supabase backend', () => {
    const config = buildRankTrackingConfig({
      env: {
        ...baseEnv,
        RANK_DB_BACKEND: 'supabase',
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'service-role',
      },
      now: new Date('2026-03-10T00:00:00Z'),
    })

    expect(config.db.backend).toBe('supabase')
    expect(config.db.required).toBe(true)
  })

  it('validates required supabase env vars when backend is supabase', () => {
    const config = buildRankTrackingConfig({
      env: {
        ...baseEnv,
        RANK_DB_BACKEND: 'supabase',
      },
      now: new Date('2026-03-10T00:00:00Z'),
    })

    expect(() => validateRankTrackingConfig(config)).toThrow('Missing SUPABASE_URL')
  })

  it('accepts valid supabase configuration', () => {
    const config = buildRankTrackingConfig({
      env: {
        ...baseEnv,
        RANK_DB_BACKEND: 'supabase',
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'service-role',
      },
      now: new Date('2026-03-10T00:00:00Z'),
    })

    expect(() => validateRankTrackingConfig(config)).not.toThrow()
  })
})
