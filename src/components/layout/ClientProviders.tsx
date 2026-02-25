'use client'

import dynamic from 'next/dynamic'

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

export function ClientProviders() {
  return (
    <>
      <CookieConsent />
      <AnalyticsProvider />
    </>
  )
}
