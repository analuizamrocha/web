'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const VercelAnalytics = dynamic(
  () => import('@vercel/analytics/next').then((mod) => mod.Analytics),
  { ssr: false }
)

const VercelSpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((mod) => mod.SpeedInsights),
  { ssr: false }
)

const CONSENT_KEY = 'lgpd-cookie-consent'
const CONSENT_EVENT = 'lgpd-consent-updated'

/**
 * Analytics Provider - LGPD-compliant analytics with Next.js optimizations
 *
 * This component:
 * - Uses @next/third-parties for Google scripts
 * - Renders all analytics only after explicit consent
 * - Defers script loading until browser idle to protect core rendering
 *
 * Architecture:
 * - Isolated from server components (preserves SSG/SSR)
 * - Conditionally renders based on localStorage consent
 * - Keeps a single analytics provider active by default (GA first)
 */
export function AnalyticsProvider({
  enableVercelSignals = false,
}: {
  enableVercelSignals?: boolean
}) {
  const [hasConsent, setHasConsent] = useState(false)
  const [shouldLoadScripts, setShouldLoadScripts] = useState(false)

  useEffect(() => {
    const syncConsentState = () => {
      const consent = localStorage.getItem(CONSENT_KEY)
      setHasConsent(consent === 'accepted')
    }

    // Defer initial sync to avoid synchronous setState in effect.
    const timer = setTimeout(syncConsentState, 0)
    window.addEventListener('storage', syncConsentState)
    window.addEventListener(CONSENT_EVENT, syncConsentState as EventListener)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('storage', syncConsentState)
      window.removeEventListener(CONSENT_EVENT, syncConsentState as EventListener)
    }
  }, [])

  useEffect(() => {
    if (!hasConsent) {
      return
    }

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
      cancelIdleCallback?: (handle: number) => void
    }

    let fallbackTimer: number | undefined
    let idleHandle: number | undefined

    const enableScripts = () => {
      setShouldLoadScripts(true)
    }

    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleHandle = idleWindow.requestIdleCallback(
        () => {
          fallbackTimer = window.setTimeout(enableScripts, 200)
        },
        { timeout: 2000 }
      )
    } else {
      fallbackTimer = window.setTimeout(enableScripts, 1500)
    }

    return () => {
      if (
        idleHandle !== undefined &&
        typeof idleWindow.cancelIdleCallback === 'function'
      ) {
        idleWindow.cancelIdleCallback(idleHandle)
      }
      if (fallbackTimer !== undefined) {
        clearTimeout(fallbackTimer)
      }
    }
  }, [hasConsent])

  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const analyticsProvider = (
    process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || 'ga'
  ).toLowerCase()

  if (!gaId && !gtmId && !enableVercelSignals) {
    return null
  }

  let shouldLoadGa = false
  let shouldLoadGtm = false

  if (analyticsProvider === 'none') {
    shouldLoadGa = false
    shouldLoadGtm = false
  } else if (analyticsProvider === 'both') {
    shouldLoadGa = Boolean(gaId)
    shouldLoadGtm = Boolean(gtmId)
  } else if (analyticsProvider === 'gtm') {
    shouldLoadGtm = Boolean(gtmId)
    shouldLoadGa = !shouldLoadGtm && Boolean(gaId)
  } else {
    // Default to GA first to reduce third-party and ad tag overhead.
    shouldLoadGa = Boolean(gaId)
    shouldLoadGtm = !shouldLoadGa && Boolean(gtmId)
  }

  // Prevent any third-party scripts unless user explicitly accepted.
  if (!hasConsent || !shouldLoadScripts) return null

  return (
    <>
      {shouldLoadGa && gaId && <GoogleAnalytics gaId={gaId} />}
      {shouldLoadGtm && gtmId && <GoogleTagManager gtmId={gtmId} />}
      {enableVercelSignals && <VercelAnalytics />}
      {enableVercelSignals && <VercelSpeedInsights />}
    </>
  )
}
