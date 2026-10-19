'use client'

import dynamic from 'next/dynamic'
import { TrackingLinkScript } from '@/components/analytics/TrackingLinkScript'

const CookieConsent = dynamic(() => import('@/components/layout/CookieConsent'), {
  ssr: false,
})

const AnalyticsProvider = dynamic(
  () =>
    import('@/components/analytics/AnalyticsProvider').then(
      (mod) => mod.AnalyticsProvider
    ),
  { ssr: false }
)

export function ClientProviders({
  enableVercelSignals = false,
}: {
  enableVercelSignals?: boolean
}) {
  return (
    <>
      <CookieConsent />
      <AnalyticsProvider enableVercelSignals={enableVercelSignals} />
      <TrackingLinkScript />
    </>
  )
}
