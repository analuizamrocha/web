'use client'

import { useState, useEffect } from 'react'

const navigation = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'Missão', href: '#missao', id: 'missao' },
  { name: 'Tratamentos', href: '#tratamentos', id: 'tratamentos' },
  { name: 'Locais de atendimento', href: '#atendimento', id: 'atendimento' },
]

export function useActiveSection(isRootPage: boolean) {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    if (!isRootPage) return

    const sections = navigation.map((nav) => nav.id)

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -40% 0px',
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

        // Clear focus from the clicked button to allow intersection observer to take over
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      }
    }
  }

  return { activeSection, scrollToSection }
}
