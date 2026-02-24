'use client'

import { useEffect, useState } from 'react'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

/**
 * Analytics Provider - LGPD-compliant analytics with Next.js optimizations
 *
 * This component:
 * - Uses @next/third-parties for better performance (Next.js Script optimizations)
 * - Only renders Google Analytics & Tag Manager after user consent
 * - Prevents third-party cookies until user explicitly accepts
 *
 * Architecture:
 * - Isolated from server components (preserves SSG/SSR)
 * - Conditionally renders based on localStorage consent
 * - Leverages Next.js built-in Script strategies
 */
export function AnalyticsProvider() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Check if user has previously consented to analytics
    const consent = localStorage.getItem('lgpd-cookie-consent')

    if (consent === 'accepted') {
      // Defer state update to avoid synchronous setState in effect.
      const timer = setTimeout(() => setHasConsent(true), 0)
      return () => clearTimeout(timer)
    }
    // If consent is 'rejected' or not set, stay false (no analytics rendered)
  }, [])

  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  if (!gaId && !gtmId) {
    console.warn('No Google Analytics or Tag Manager IDs found in environment variables')
    return null
  }

  // Only render Google components if user consented
  // This prevents any scripts from loading until consent is given
  if (!hasConsent) return null

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </>
  )
}
