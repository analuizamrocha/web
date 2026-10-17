'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { WHATSAPP_TRACKING_SCRIPT_SRC } from '@/lib/constants'

const CONSENT_KEY = 'lgpd-cookie-consent'
const CONSENT_EVENT = 'lgpd-consent-updated'

/**
 * Loads the MDX Studio tracking-link script after the visitor accepts
 * cookies, like the analytics scripts. Without consent the WhatsApp link
 * still works; the conversation just records the site, not the ad.
 */
export function TrackingLinkScript({
  src = WHATSAPP_TRACKING_SCRIPT_SRC,
}: {
  src?: string
}) {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const syncConsentState = () => {
      setHasConsent(localStorage.getItem(CONSENT_KEY) === 'accepted')
    }

    const timer = setTimeout(syncConsentState, 0)
    window.addEventListener('storage', syncConsentState)
    window.addEventListener(CONSENT_EVENT, syncConsentState as EventListener)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('storage', syncConsentState)
      window.removeEventListener(CONSENT_EVENT, syncConsentState as EventListener)
    }
  }, [])

  if (!src || !hasConsent) return null

  return <Script src={src} strategy="afterInteractive" />
}
