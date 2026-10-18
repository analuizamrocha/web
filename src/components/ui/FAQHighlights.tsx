'use client'

import { useRef, type ReactNode } from 'react'

// Cards are rendered by the server; only manual scrolling needs JavaScript.
export function FAQHighlights({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  function move(direction: number) {
    const element = track.current
    if (!element) return
    element.scrollBy({
      left: direction * element.clientWidth,
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
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-primary/25 text-primary hover:bg-card-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Ver próximos destaques"
          aria-controls="faq-highlights"
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-primary/25 text-primary hover:bg-card-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          →
        </button>
      </div>
      <div
        ref={track}
        id="faq-highlights"
        tabIndex={0}
        aria-label="Respostas em destaque; use as setas para navegar"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto rounded-3xl pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {children}
      </div>
    </div>
  )
}
