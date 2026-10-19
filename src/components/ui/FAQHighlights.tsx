'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

// Cards are rendered by the server; only manual scrolling needs JavaScript.
export function FAQHighlights({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const destination = useRef<number | null>(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  useEffect(() => {
    const element = track.current
    if (!element) return

    function updateEdges() {
      if (!element) return
      const maxScroll = element.scrollWidth - element.clientWidth
      if (destination.current !== null && Math.abs(element.scrollLeft - destination.current) <= 1) {
        destination.current = null
      }
      const start = element.scrollLeft <= 1
      const end = element.scrollLeft >= maxScroll - 1
      setEdges((previous) =>
        previous.start === start && previous.end === end ? previous : { start, end }
      )
    }

    function resetDestination() {
      destination.current = null
    }

    const observer = new ResizeObserver(() => {
      resetDestination()
      updateEdges()
    })
    observer.observe(element)
    Array.from(element.children).forEach((child) => observer.observe(child))
    element.addEventListener('scroll', updateEdges, { passive: true })
    element.addEventListener('scrollend', resetDestination)
    element.addEventListener('pointerdown', resetDestination)
    element.addEventListener('wheel', resetDestination, { passive: true })
    element.addEventListener('keydown', resetDestination)
    updateEdges()

    return () => {
      observer.disconnect()
      element.removeEventListener('scroll', updateEdges)
      element.removeEventListener('scrollend', resetDestination)
      element.removeEventListener('pointerdown', resetDestination)
      element.removeEventListener('wheel', resetDestination)
      element.removeEventListener('keydown', resetDestination)
    }
  }, [children])

  function move(direction: -1 | 1) {
    const element = track.current
    if (!element) return
    const maxScroll = Math.max(0, element.scrollWidth - element.clientWidth)
    const trackLeft = element.getBoundingClientRect().left
    const positions = Array.from(element.children, (child) =>
      Math.min(maxScroll, Math.max(0, child.getBoundingClientRect().left - trackLeft + element.scrollLeft))
    )
    // Keep rapid clicks relative to the requested card while smooth scrolling.
    const current = destination.current ?? element.scrollLeft
    const next = direction === 1
      ? positions.find((position) => position > current + 1) ?? maxScroll
      : positions.findLast((position) => position < current - 1) ?? 0
    destination.current = next
    element.scrollTo({
      left: next,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }
  return (
    <div role="region" aria-roledescription="carrossel" aria-label="Perguntas em destaque">
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Ver destaques anteriores"
          aria-controls="faq-highlights"
          disabled={edges.start}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-primary/25 text-primary enabled:hover:bg-card-bg disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Ver próximos destaques"
          aria-controls="faq-highlights"
          disabled={edges.end}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-primary/25 text-primary enabled:hover:bg-card-bg disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          →
        </button>
      </div>
      <div
        ref={track}
        id="faq-highlights"
        tabIndex={0}
        aria-label="Respostas em destaque; use as setas para navegar"
        className="faq-highlights-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto rounded-3xl pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {children}
      </div>
    </div>
  )
}
