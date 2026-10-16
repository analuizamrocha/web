import { Suspense, type ComponentType } from 'react'
import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Resolve the real provider branches without initializing external SDKs.
vi.mock('next/dynamic', async () => {
  const { lazy } = await import('react')
  return { default: (load: () => Promise<ComponentType>) => lazy(async () => ({ default: await load() })) }
})
vi.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => <div data-testid="ga" data-id={gaId} />,
  GoogleTagManager: ({ gtmId }: { gtmId: string }) => <div data-testid="gtm" data-id={gtmId} />,
}))
vi.mock('@vercel/analytics/next', () => ({ Analytics: () => <div data-testid="vercel-analytics" /> }))
vi.mock('@vercel/speed-insights/next', () => ({ SpeedInsights: () => <div data-testid="speed-insights" /> }))

import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'

async function flushConsentAndIdleWork() {
  for (let step = 0; step < 3; step++) {
    await act(async () => {
      await vi.runOnlyPendingTimersAsync()
      await vi.dynamicImportSettled()
    })
  }
}

beforeEach(() => {
  vi.useFakeTimers()
  // Avoid Node 24's native Web Storage binding in the jsdom test process.
  const values = new Map<string, string>()
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, String(value)),
    removeItem: (key: string) => values.delete(key),
    clear: () => values.clear(),
    key: (index: number) => Array.from(values.keys())[index] ?? null,
    get length() { return values.size },
  })
  vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TESTONLY')
  vi.stubEnv('NEXT_PUBLIC_GTM_ID', 'GTM-TESTONLY')
  vi.stubEnv('NEXT_PUBLIC_ANALYTICS_PROVIDER', 'ga')
})
afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('analytics initialization consent', () => {
  it.each([null, 'rejected'])('does not initialize any provider for consent=%s', async (consent) => {
    if (consent) localStorage.setItem('lgpd-cookie-consent', consent)
    render(<Suspense fallback={null}><AnalyticsProvider enableVercelSignals /></Suspense>)
    await flushConsentAndIdleWork()
    for (const provider of ['ga', 'gtm', 'vercel-analytics', 'speed-insights']) {
      expect(screen.queryByTestId(provider)).toBeNull()
    }
  })

  it('initializes the selected Google provider and Vercel signals only after consent and idle work', async () => {
    render(<Suspense fallback={null}><AnalyticsProvider enableVercelSignals /></Suspense>)
    await flushConsentAndIdleWork()
    expect(screen.queryByTestId('ga')).toBeNull()

    localStorage.setItem('lgpd-cookie-consent', 'accepted')
    act(() => window.dispatchEvent(new Event('lgpd-consent-updated')))
    expect(screen.queryByTestId('ga')).toBeNull()
    await flushConsentAndIdleWork()
    expect(screen.getByTestId('ga').getAttribute('data-id')).toBe('G-TESTONLY')
    expect(screen.queryByTestId('gtm')).toBeNull()
    expect(screen.getByTestId('vercel-analytics')).toBeTruthy()
    expect(screen.getByTestId('speed-insights')).toBeTruthy()
  })

  it.each([
    ['gtm', ['gtm']],
    ['both', ['ga', 'gtm']],
    ['none', []],
  ] as const)('respects the explicit Google provider setting %s', async (setting, expected) => {
    vi.stubEnv('NEXT_PUBLIC_ANALYTICS_PROVIDER', setting)
    localStorage.setItem('lgpd-cookie-consent', 'accepted')
    render(<Suspense fallback={null}><AnalyticsProvider /></Suspense>)
    await flushConsentAndIdleWork()
    for (const provider of ['ga', 'gtm']) {
      expect(Boolean(screen.queryByTestId(provider))).toBe(expected.some((value) => value === provider))
    }
  })
})
