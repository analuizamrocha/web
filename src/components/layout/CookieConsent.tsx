'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const CONSENT_KEY = 'lgpd-cookie-consent'
const CONSENT_EVENT = 'lgpd-consent-updated'

/**
 * Cookie Consent Banner - LGPD/GDPR Compliance
 *
 * Works with AnalyticsProvider:
 * - Shows banner only if no consent decision exists
 * - On accept/reject: Sets localStorage and notifies listeners
 * - Keeps a persistent preferences entry point for consent revocation/updates
 *
 * Architecture:
 * - Isolated client component
 * - No direct analytics logic (delegated to AnalyticsProvider)
 * - Uses Button component for consistent styling
 */
export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [hasStoredChoice, setHasStoredChoice] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let showTimer: number | undefined
    let visibleTimer: number | undefined
    let syncTimer: number | undefined

    const clearTimers = () => {
      if (showTimer !== undefined) clearTimeout(showTimer)
      if (visibleTimer !== undefined) clearTimeout(visibleTimer)
      if (syncTimer !== undefined) clearTimeout(syncTimer)
      showTimer = undefined
      visibleTimer = undefined
      syncTimer = undefined
    }

    const syncConsentBanner = () => {
      clearTimers()

      const consent = localStorage.getItem(CONSENT_KEY)
      const hasDecision = consent === 'accepted' || consent === 'rejected'
      setHasStoredChoice(hasDecision)

      if (hasDecision) {
        setShowConsent(false)
        setIsVisible(false)
        return
      }

      // Defer state updates to avoid synchronous setState in effect.
      showTimer = window.setTimeout(() => setShowConsent(true), 0)
      // Keep the banner non-blocking for initial hero paint on slow devices.
      visibleTimer = window.setTimeout(() => setIsVisible(true), 2200)
    }

    syncTimer = window.setTimeout(syncConsentBanner, 0)
    window.addEventListener('storage', syncConsentBanner)
    window.addEventListener(CONSENT_EVENT, syncConsentBanner as EventListener)

    return () => {
      clearTimers()
      window.removeEventListener('storage', syncConsentBanner)
      window.removeEventListener(
        CONSENT_EVENT,
        syncConsentBanner as EventListener
      )
    }
  }, [])

  const updateConsent = (decision: 'accepted' | 'rejected') => {
    localStorage.setItem(CONSENT_KEY, decision)
    window.dispatchEvent(new Event(CONSENT_EVENT))
    setHasStoredChoice(true)
    setShowConsent(false)
    setIsVisible(false)
  }

  const dismissBanner = () => {
    // Just close the banner without saving preference
    // User will see it again if no decision is stored.
    setShowConsent(false)
    setIsVisible(false)
  }

  const openPreferences = () => {
    setShowConsent(true)
    setIsVisible(true)
  }

  if (!showConsent && hasStoredChoice) {
    return (
      <Button
        onClick={openPreferences}
        variant="outline"
        size="sm"
        className="fixed bottom-4 left-4 z-40 bg-background/95 backdrop-blur-sm border-primary/20 shadow-md hover:shadow-lg"
        aria-label="Gerenciar preferências de cookies"
      >
        Gerenciar cookies
      </Button>
    )
  }

  if (!showConsent) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Desktop: bottom-right card | Mobile: bottom sheet */}
      <div
        className="absolute sm:bottom-6 sm:right-6 bottom-0 left-0 right-0 sm:left-auto pointer-events-auto w-full sm:max-w-sm transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'translate(0, 0)'
            : window.innerWidth >= 640
            ? 'translate(24px, 0)' // Desktop: slide from right
            : 'translate(0, 24px)', // Mobile: slide from bottom
        }}
      >
        <div className="bg-background sm:border sm:border-primary/10 rounded-t-3xl sm:rounded-2xl overflow-hidden relative shadow-[0_-4px_20px_rgba(102,58,37,0.15)] sm:shadow-[0_8px_30px_rgba(102,58,37,0.2)]">
          {/* X button - dismisses without saving preference */}
          <button
            onClick={dismissBanner}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted hover:text-primary transition-colors rounded-full hover:bg-primary/5 z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Fechar (será exibido novamente)"
            title="Fechar banner (você verá novamente)"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-5 sm:p-6 pr-10 sm:pr-10">
            {/* Icon & Title */}
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary text-base my-2">
                  Cookies & Privacidade
                </h3>
                <p className="text-sm text-body leading-relaxed">
                  Usamos cookies para melhorar sua experiência e entender como
                  você usa nosso site.
                  <br />
                  <Link
                    href="/politica-privacidade"
                    className="text-primary hover:underline font-medium inline-flex items-center gap-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm mt-2"
                  >
                    Saiba mais
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </p>
              </div>
            </div>

            <div className="mx-auto w-full flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <Button
                  onClick={() => updateConsent('accepted')}
                  variant="primary"
                  size="default"
                  className="w-full font-semibold shadow-lg hover:shadow-xl"
                >
                  Aceitar cookies
                </Button>
                <Button
                  onClick={() => updateConsent('rejected')}
                  variant="outline"
                  size="default"
                  className="w-full font-semibold"
                >
                  Recusar cookies
                </Button>
              </div>

              <p className="text-xs text-muted mt-3 text-center">
                Você pode alterar sua escolha a qualquer momento em
                &quot;Gerenciar cookies&quot;.
              </p>
            </div>
          </div>

          {/* Bottom accent bar */}
          <div className="h-1 bg-gradient-to-r from-primary via-brand-primary to-primary opacity-80" />
        </div>
      </div>
    </div>
  )
}
