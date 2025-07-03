'use client'

import { WPP_FORMATTED_NUMBER, WPP_NUMBER } from '@/lib/constants'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'Tratamentos', href: '#tratamentos', id: 'tratamentos' },
  { name: 'Locais de atendimento', href: '#atendimento', id: 'atendimento' },
]

export function HeaderClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Smooth scroll function with offset
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1))
      if (element) {
        const headerHeight = 80 // Fixed header height
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
    setMobileMenuOpen(false)
  }

  // Enhanced active section detection with better settings for Tratamentos
  useEffect(() => {
    const sections = navigation.map((nav) => nav.id)

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -40% 0px', // Better detection - more sensitive at top, less at bottom
      threshold: [0.1, 0.3, 0.5], // Multiple thresholds for better detection
    }

    const observer = new IntersectionObserver((entries) => {
      // Sort entries by intersection ratio to prioritize most visible section
      const sortedEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (sortedEntries.length > 0) {
        setActiveSection(sortedEntries[0].target.id)
      }
    }, observerOptions)

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-[100] bg-primary text-background px-4 py-2 rounded-md font-medium transition-all duration-200"
        onFocus={(e) => e.target.classList.remove('sr-only')}
        onBlur={(e) => e.target.classList.add('sr-only')}
      >
        Pular para o conteúdo principal
      </a>

      <header className="fixed top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-primary/10 shadow-sm">
        <div className="w-full">
          <nav className="mx-auto flex max-w-[1760px] items-center justify-between px-6 py-3 sm:px-8 lg:px-10 xl:px-12">
            <div className="flex lg:flex-1">
              <Link
                href="/"
                className="-m-1.5 p-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md"
              >
                <span className="font-serif text-base sm:text-lg text-primary">
                  Dra Ana Luiza M. Rocha
                </span>
                <p className="text-xs text-accent text-secondary justify-center mb-0">
                  Coloproctologista
                </p>
              </Link>
            </div>

            {/* Desktop navigation with active section detection and fixed focus styling */}
            <div className="hidden md:flex gap-x-8 lg:gap-x-12">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  data-header-nav
                  className={cn(
                    'text-sm font-semibold leading-6 transition-all duration-200 relative py-2',
                    'hover:text-primary focus:text-primary focus:outline-none',
                    'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300',
                    activeSection === item.id
                      ? 'text-primary after:w-full'
                      : 'text-secondary after:w-0 hover:after:w-full focus:after:w-full'
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="relative p-2 text-secondary hover:text-primary transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background rounded-md"
                onClick={toggleMobileMenu}
                aria-label={
                  mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'
                }
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-haspopup="true"
              >
                {/* Animated hamburger icon */}
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-current mt-1 transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-current mt-1 transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-secondary/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu panel - slides down from header */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-labelledby="mobile-menu-title"
          aria-modal="true"
          className={`fixed top-[72px] inset-x-0 bottom-0 bg-background/95 backdrop-blur-md border-t border-primary/10 shadow-xl transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Navigation links */}
            <div className="flex-1 px-6 py-8">
              <nav className="space-y-6">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      'block w-full text-left text-xl font-medium transition-colors duration-200 py-3 border-b border-primary/10 focus:outline-none',
                      activeSection === item.id
                        ? 'text-primary border-primary/30'
                        : 'text-secondary hover:text-primary focus:text-primary'
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Footer section */}
            <div className="px-6 py-6 border-t border-primary/10 bg-background/50 text-primary">
              <div className="space-y-4">
                {/* Contact info */}
                <Link
                  href={`https://wa.me/${WPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background rounded-md"
                >
                  <p className="text-sm font-medium text-secondary">Contato</p>
                  <p className="text-sm text-accent mt-1">
                    {WPP_FORMATTED_NUMBER}
                  </p>
                </Link>

                {/* Instagram link */}
                <Link
                  href="https://www.instagram.com/analuiza.mrocha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-accent hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background rounded-md p-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                  @analuiza.mrocha
                </Link>

                {/* CRM info */}
                <div className="pt-2">
                  <p className="text-xs text-accent text-secondary justify-center">
                    CRM-PR 45351 | RQE 36221
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
