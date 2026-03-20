'use client'

import { useState, useEffect, useRef } from 'react'

export function useMobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const firstFocusableElementRef = useRef<HTMLButtonElement>(null)

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState)
  }

  const cleanupInertAttributes = () => {
    const mainContent = document.getElementById('main')
    const header = document.querySelector('header')
    const skipToContent = document.getElementById('skip-to-content')

    const allButtons = document.querySelectorAll('main button, main a[href]')
    const heroSection = document.getElementById('hero')
    const locationSection = document.getElementById('atendimento')

    if (mainContent) {
      mainContent.removeAttribute('inert')
    }

    if (heroSection) {
      heroSection.removeAttribute('inert')
    }
    if (locationSection) {
      locationSection.removeAttribute('inert')
    }

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

  // Handle body scroll lock and focus trapping only while menu is open.
  // Uses position:fixed pattern for robust iOS Safari scroll prevention.
  useEffect(() => {
    if (!mobileMenuOpen) {
      return
    }

    // Save current scroll position and lock body
    const scrollY = window.scrollY
    const { body } = document
    const { style } = body
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.left = '0'
    style.right = '0'
    style.overflow = 'hidden'

    // Focus the first focusable element in the menu
    if (firstFocusableElementRef.current) {
      firstFocusableElementRef.current.focus()
    }

    // Add inert attribute to main content and other elements to prevent tab navigation
    const mainContent = document.getElementById('main')
    const header = document.querySelector('header')
    const skipToContent = document.getElementById('skip-to-content')

    const allButtons = document.querySelectorAll('main button, main a[href]')
    const heroSection = document.getElementById('hero')
    const locationSection = document.getElementById('atendimento')

    if (mainContent) {
      mainContent.setAttribute('inert', '')
    }

    if (heroSection) {
      heroSection.setAttribute('inert', '')
    }
    if (locationSection) {
      locationSection.setAttribute('inert', '')
    }

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

    return () => {
      // Restore scroll position and unlock body
      style.position = ''
      style.top = ''
      style.left = ''
      style.right = ''
      style.overflow = ''
      window.scrollTo(0, scrollY)
      cleanupInertAttributes()
    }
  }, [mobileMenuOpen])

  // Attach escape key handler only when menu is open.
  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
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
