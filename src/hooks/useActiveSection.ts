'use client'

import { useState, useEffect } from 'react'
import { navigationWithHashes } from '@/lib/navigation'

export function useActiveSection(isRootPage: boolean) {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    if (!isRootPage) return
    if (!window.matchMedia('(min-width: 1024px)').matches) return

    const sections = navigationWithHashes.map((nav) => nav.id)

    const observerOptions = {
      root: null,
      rootMargin: '-93px 0px -40% 0px',
      threshold: [0.1, 0.3, 0.5],
    }

    const observer = new IntersectionObserver((entries) => {
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
  }, [isRootPage])

  const scrollToSection = (href: string) => {
    if (!href.startsWith('#')) return
    const element = document.getElementById(href.slice(1))
    if (!element) return

    // Sections below the fold use `content-visibility: auto` with a placeholder
    // intrinsic size. During a smooth scroll, those placeholders swap for real
    // content as they enter the viewport — that reflows the document and the
    // scroll target drifts, so we land at the wrong section. Pin the deferred
    // sections to `visible` for the rest of this page session: the user has
    // committed to engaging with the page, so the initial-paint perf savings
    // no longer matter, and stable layout matters more than memory savings.
    document
      .querySelectorAll<HTMLElement>('.section-deferred')
      .forEach((el) => {
        el.style.contentVisibility = 'visible'
      })

    element.scrollIntoView({ behavior: 'smooth', block: 'start' })

    // Clear focus from the clicked button so the IntersectionObserver can take
    // over highlighting the active section.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  return { activeSection, scrollToSection }
}
