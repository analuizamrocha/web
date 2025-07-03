'use client'

import { useState, useEffect, useRef } from 'react'

export function useMobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const firstFocusableElementRef = useRef<HTMLButtonElement>(null)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Handle body scroll and focus trapping when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'

      // Focus the first focusable element in the menu
      if (firstFocusableElementRef.current) {
        firstFocusableElementRef.current.focus()
      }

      // Add inert attribute to main content and other elements to prevent tab navigation
      const mainContent = document.getElementById('main')
      const header = document.querySelector('header')
      const skipToContent = document.getElementById('skip-to-content')

      // More specific targeting of focusable elements
      const allButtons = document.querySelectorAll('main button, main a[href]')
      const heroSection = document.getElementById('hero')
      const locationSection = document.getElementById('atendimento')

      if (mainContent) {
        mainContent.setAttribute('inert', '')
      }

      // Also set inert on specific sections to ensure proper focus trapping
      if (heroSection) {
        heroSection.setAttribute('inert', '')
      }
      if (locationSection) {
        locationSection.setAttribute('inert', '')
      }

      // Set inert on all buttons and links in main as backup
      allButtons.forEach((element) => {
        element.setAttribute('inert', '')
      })

      if (header) {
        const desktopNav = header.querySelector('.hidden.md\\:flex')
        const logoLink = header.querySelector('a[href="/"]')
        if (desktopNav) {
          desktopNav.setAttribute('inert', '')
        }
        if (logoLink) {
          logoLink.setAttribute('inert', '')
        }
      }
      if (skipToContent) {
        skipToContent.setAttribute('inert', '')
      }
    } else {
      document.body.style.overflow = 'unset'

      // Remove inert attribute to restore tab navigation
      const mainContent = document.getElementById('main')
      const header = document.querySelector('header')
      const skipToContent = document.getElementById('skip-to-content')

      // Remove inert from specific elements
      const allButtons = document.querySelectorAll('main button, main a[href]')
      const heroSection = document.getElementById('hero')
      const locationSection = document.getElementById('atendimento')

      if (mainContent) {
        mainContent.removeAttribute('inert')
      }

      // Remove inert from specific sections
      if (heroSection) {
        heroSection.removeAttribute('inert')
      }
      if (locationSection) {
        locationSection.removeAttribute('inert')
      }

      // Remove inert from all buttons and links
      allButtons.forEach((element) => {
        element.removeAttribute('inert')
      })

      if (header) {
        const desktopNav = header.querySelector('.hidden.md\\:flex')
        const logoLink = header.querySelector('a[href="/"]')
        if (desktopNav) {
          desktopNav.removeAttribute('inert')
        }
        if (logoLink) {
          logoLink.removeAttribute('inert')
        }
      }
      if (skipToContent) {
        skipToContent.removeAttribute('inert')
      }
    }

    return () => {
      document.body.style.overflow = 'unset'
      // Cleanup inert attributes
      const mainContent = document.getElementById('main')
      const header = document.querySelector('header')
      const skipToContent = document.getElementById('skip-to-content')

      // Cleanup specific elements
      const allButtons = document.querySelectorAll('main button, main a[href]')
      const heroSection = document.getElementById('hero')
      const locationSection = document.getElementById('atendimento')

      if (mainContent) {
        mainContent.removeAttribute('inert')
      }

      // Cleanup specific sections
      if (heroSection) {
        heroSection.removeAttribute('inert')
      }
      if (locationSection) {
        locationSection.removeAttribute('inert')
      }

      // Cleanup all buttons and links
      allButtons.forEach((element) => {
        element.removeAttribute('inert')
      })

      if (header) {
        const desktopNav = header.querySelector('.hidden.md\\:flex')
        const logoLink = header.querySelector('a[href="/"]')
        if (desktopNav) {
          desktopNav.removeAttribute('inert')
        }
        if (logoLink) {
          logoLink.removeAttribute('inert')
        }
      }
      if (skipToContent) {
        skipToContent.removeAttribute('inert')
      }
    }
  }, [mobileMenuOpen])

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  return {
    mobileMenuOpen,
    setMobileMenuOpen,
    toggleMobileMenu,
    mobileMenuRef,
    firstFocusableElementRef,
  }
}
