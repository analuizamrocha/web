'use client'

import { useState, useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useMobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)
  const skipScrollRestoreRef = useRef(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState)
  }

  /** Close the menu without restoring the saved scroll position (use for section nav clicks). */
  const closeWithoutScrollRestore = () => {
    skipScrollRestoreRef.current = true
    setMobileMenuOpen(false)
  }

  const cleanupInertAttributes = () => {
    const mainContent = document.getElementById('main')
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const skipToContent = document.getElementById('skip-to-content')

    if (mainContent) {
      mainContent.removeAttribute('inert')
    }
    footer?.removeAttribute('inert')

    if (header) {
      const desktopNav = header.querySelector('.hidden.lg\\:flex')
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
    const menuButton = mobileMenuButtonRef.current
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.left = '0'
    style.right = '0'
    style.overflow = 'hidden'

    // Keep page content outside the modal navigation unavailable while it is open.
    const mainContent = document.getElementById('main')
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const skipToContent = document.getElementById('skip-to-content')

    if (mainContent) {
      mainContent.setAttribute('inert', '')
    }
    footer?.setAttribute('inert', '')

    if (header) {
      const desktopNav = header.querySelector('.hidden.lg\\:flex')
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

    // This works on every route; previously only the homepage supplied a focus ref.
    mobileMenuRef.current
      ?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      ?.focus({ preventScroll: true })

    return () => {
      style.position = ''
      style.top = ''
      style.left = ''
      style.right = ''
      style.overflow = ''
      if (!skipScrollRestoreRef.current) {
        // 'instant' overrides html { scroll-behavior: smooth }, which would
        // otherwise animate the restore and the user sees the page scroll back.
        window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' as ScrollBehavior })
      }
      skipScrollRestoreRef.current = false
      cleanupInertAttributes()
      menuButton?.focus({ preventScroll: true })
    }
  }, [mobileMenuOpen])

  // Keep keyboard focus within the modal navigation and its visible toggle.
  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        return
      }

      if (e.key !== 'Tab') return

      const menu = mobileMenuRef.current
      const menuButton = mobileMenuButtonRef.current
      if (!menu || !menuButton) return

      const menuElements = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      const firstElement = menuElements[0]
      const lastMenuElement = menuElements[menuElements.length - 1]
      const activeElement = document.activeElement

      if (!firstElement || !lastMenuElement) return

      if (e.shiftKey && activeElement === firstElement) {
        e.preventDefault()
        menuButton.focus()
      } else if (e.shiftKey && activeElement === menuButton) {
        e.preventDefault()
        lastMenuElement.focus()
      } else if (!e.shiftKey && activeElement === lastMenuElement) {
        e.preventDefault()
        menuButton.focus()
      } else if (!e.shiftKey && activeElement === menuButton) {
        e.preventDefault()
        firstElement.focus()
      } else if (
        activeElement !== menuButton &&
        !menuElements.includes(activeElement as HTMLElement)
      ) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    const handleFocusIn = (e: FocusEvent) => {
      const menu = mobileMenuRef.current
      const menuButton = mobileMenuButtonRef.current
      const target = e.target

      if (!(target instanceof HTMLElement) || !menu || !menuButton) return
      if (target === menuButton || menu.contains(target)) return

      menu.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus({ preventScroll: true })
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)
    }
  }, [mobileMenuOpen])

  return {
    mobileMenuOpen,
    setMobileMenuOpen,
    toggleMobileMenu,
    closeWithoutScrollRestore,
    mobileMenuRef,
    mobileMenuButtonRef,
  }
}
