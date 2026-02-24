'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

/**
 * Cookie Consent Banner - LGPD/GDPR Compliance
 *
 * Works with AnalyticsProvider:
 * - Shows banner only if no consent decision exists
 * - On accept: Sets localStorage and reloads (AnalyticsProvider loads GA)
 * - On reject: Sets localStorage, no analytics loaded
 *
 * Architecture:
 * - Isolated client component
 * - No direct analytics logic (delegated to AnalyticsProvider)
 * - Uses Button component for consistent styling
 * - Progressive disclosure for reject option
 */
export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showRejectOption, setShowRejectOption] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show if user hasn't made a decision yet
    const consent = localStorage.getItem('lgpd-cookie-consent')
    if (!consent) {
      // Defer state updates to avoid synchronous setState in effect.
      const showTimer = setTimeout(() => setShowConsent(true), 0)
      const visibleTimer = setTimeout(() => setIsVisible(true), 1200)
      return () => {
        clearTimeout(showTimer)
        clearTimeout(visibleTimer)
      }
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('lgpd-cookie-consent', 'accepted')
    setShowConsent(false)
    window.location.reload()
  }

  const rejectCookies = () => {
    localStorage.setItem('lgpd-cookie-consent', 'rejected')
    setShowConsent(false)
  }

  const dismissBanner = () => {
    // Just close the banner without saving preference
    // User will see it again on next visit (nudge to accept)
    setShowConsent(false)
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
              {/* Primary CTA - Accept Button using Button component */}
              <Button
                onClick={acceptCookies}
                variant="primary"
                size="default"
                className="w-full max-w-md mx-auto font-semibold shadow-lg hover:shadow-xl"
              >
                Aceitar e continuar
              </Button>

              {/* Secondary action - Manage preferences */}
              {!showRejectOption ? (
                <div className="mx-auto w-full flex justify-center items-center mt-3">
                  <button
                    onClick={() => setShowRejectOption(true)}
                    className="w-fit px-4 py-2 text-xs text-muted hover:text-primary transition-colors underline-offset-2 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                  >
                    Gerenciar preferências
                  </button>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-primary/10 space-y-3 animate-in fade-in slide-in-from-top-3 duration-500 mx-auto w-full flex flex-col justify-center items-center">
                  <p className="text-xs text-muted">
                    Ao recusar, não coletaremos dados de uso.
                  </p>
                  <Button
                    onClick={rejectCookies}
                    variant="link"
                    className="w-fit mx-auto px-0 py-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                  >
                    Recusar cookies
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom accent bar */}
          <div className="h-1 bg-gradient-to-r from-primary via-brand-primary to-primary opacity-80" />
        </div>
      </div>
    </div>
  )
}
