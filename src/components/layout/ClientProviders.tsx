'use client'

import dynamic from 'next/dynamic'
import { WhatsAppTracking } from '@/components/analytics/WhatsAppTracking'

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
  enableWhatsAppTracking = false,
}: {
  enableVercelSignals?: boolean
  enableWhatsAppTracking?: boolean
}) {
  return (
    <>
      <CookieConsent />
      <AnalyticsProvider enableVercelSignals={enableVercelSignals} />
      {enableWhatsAppTracking ? <WhatsAppTracking /> : null}
    </>
  )
}
