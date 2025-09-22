'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// TODO: Production test this component, its state being saved to cookies, etc...
export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('lgpd-cookie-consent')
    if (!consent) {
      setShowConsent(true)
    } else if (consent === 'accepted') {
      // Enable analytics only after consent
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        personalization_storage: 'denied',
      })
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('lgpd-cookie-consent', 'accepted')
    setShowConsent(false)

    // Enable analytics
    window.gtag?.('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      personalization_storage: 'denied',
    })

    // Reload to initialize analytics
    window.location.reload()
  }

  const rejectCookies = () => {
    localStorage.setItem('lgpd-cookie-consent', 'rejected')
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Backdrop - subtle and non-intrusive */}
      <div className="absolute inset-0 bg-primary/5 backdrop-blur-[1px] opacity-0 animate-in fade-in duration-500" />

      {/* Modal positioned bottom-right */}
      <div className="absolute bottom-6 right-6 pointer-events-auto animate-in slide-in-from-bottom-4 slide-in-from-right-4 duration-500">
        <div className="bg-background/95 backdrop-blur-md border border-primary/20 rounded-2xl shadow-2xl max-w-sm w-80">
          {/* Close button */}
          <button
            onClick={rejectCookies}
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-secondary/60 hover:text-secondary transition-colors rounded-full hover:bg-secondary/10"
            aria-label="Fechar"
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

          <div className="p-6">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <h3 className="font-serif font-semibold text-primary text-lg">
                  Cookies & Privacidade
                </h3>
              </div>
              <p className="text-sm text-secondary leading-relaxed">
                Usamos cookies para melhorar sua experiência. Os dados são
                usados apenas para estatísticas, conforme nossa{' '}
                <Link
                  href="/politica-privacidade"
                  className="text-primary hover:underline font-medium"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={rejectCookies}
                className="flex-1 px-4 py-2.5 text-sm border border-secondary/30 text-secondary hover:bg-secondary/10 rounded-xl transition-all duration-200 font-medium"
              >
                Recusar
              </button>
              <button
                onClick={acceptCookies}
                className="flex-1 px-4 py-2.5 text-sm bg-primary text-background hover:bg-primary/90 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Aceitar
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary/20 rounded-full"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-secondary/30 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
