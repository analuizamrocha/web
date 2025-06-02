'use client'

import { WPP_FORMATTED_NUMBER, WPP_NUMBER } from '@/lib/constants'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Tratamentos', href: '#tratamentos' },
  { name: 'Locais de atendimento', href: '#atendimento' },
]

export function HeaderClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

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
      <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-container items-center justify-between px-6 py-3 sm:px-8 lg:px-10 xl:px-12">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="font-serif text-base sm:text-lg text-primary">
                Dra Ana Luiza M. Rocha
              </span>
              <p className="text-xs text-accent text-secondary justify-center">
                Coloproctologista
              </p>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex gap-x-8 lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-secondary hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="relative p-2 text-secondary hover:text-primary transition-colors duration-200 cursor-pointer focus:ring-0"
              onClick={toggleMobileMenu}
              aria-label={
                mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'
              }
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
          className={`fixed top-[72px] inset-x-0 bottom-0 bg-background/95 backdrop-blur-md border-t border-primary/10 shadow-xl transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Navigation links */}
            <div className="flex-1 px-6 py-8">
              <nav className="space-y-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-xl font-medium text-secondary hover:text-primary transition-colors duration-200 py-3 border-b border-primary/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
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
                  className="flex items-center gap-2 text-sm text-accent hover:text-primary transition-colors duration-200"
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
