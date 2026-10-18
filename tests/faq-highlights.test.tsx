import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { FAQHighlights } from '@/components/ui/FAQHighlights'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('FAQ highlight navigation', () => {
  it.each([false, true])(
    'scrolls in both directions and respects reduced motion (%s)',
    (reducedMotion) => {
      vi.stubGlobal(
        'matchMedia',
        vi.fn(() => ({ matches: reducedMotion }))
      )
      render(
        <FAQHighlights>
          <article>Primeira resposta</article>
          <article>Segunda resposta</article>
        </FAQHighlights>
      )
      const track = screen.getByLabelText('Respostas em destaque; use as setas para navegar')
      const scrollBy = vi.fn()
      Object.defineProperties(track, {
        clientWidth: { value: 360 },
        scrollBy: { value: scrollBy },
      })
      fireEvent.click(screen.getByRole('button', { name: 'Ver próximos destaques' }))
      expect(scrollBy).toHaveBeenLastCalledWith({
        left: 360,
        behavior: reducedMotion ? 'instant' : 'smooth',
      })
      fireEvent.click(screen.getByRole('button', { name: 'Ver destaques anteriores' }))
      expect(scrollBy).toHaveBeenLastCalledWith({
        left: -360,
        behavior: reducedMotion ? 'instant' : 'smooth',
      })
      expect(screen.getByText('Primeira resposta')).toBeTruthy()
      expect(screen.getByText('Segunda resposta')).toBeTruthy()
      expect(track.tabIndex).toBe(0)
    }
  )
})
