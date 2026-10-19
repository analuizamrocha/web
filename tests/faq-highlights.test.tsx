import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { FAQHighlights } from '@/components/ui/FAQHighlights'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

function setup(reducedMotion = false) {
  let resize = () => {}
  const disconnect = vi.fn()
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: () => void) { resize = callback }
    observe() {}
    disconnect = disconnect
  })
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: reducedMotion })))
  const view = render(
    <FAQHighlights>
      <article>Primeira resposta</article>
      <article>Segunda resposta</article>
      <article>Terceira resposta</article>
    </FAQHighlights>
  )
  const track = screen.getByLabelText('Respostas em destaque; use as setas para navegar')
  const scrollTo = vi.fn()
  Object.defineProperties(track, {
    clientWidth: { value: 360, configurable: true },
    scrollWidth: { value: 940, configurable: true },
    scrollTo: { value: scrollTo },
  })
  // TODO: replace partial DOMRect casts with a full rect helper.
  vi.spyOn(track, 'getBoundingClientRect').mockReturnValue({ left: 24 } as DOMRect)
  Array.from(track.children).forEach((child, index) => {
    vi.spyOn(child, 'getBoundingClientRect').mockImplementation(() => ({
      left: 24 + index * 320 - track.scrollLeft,
    } as DOMRect))
  })
  act(() => resize())
  const settle = (left: number) => {
    track.scrollLeft = left
    fireEvent.scroll(track)
  }
  return {
    ...view, track, scrollTo, settle, resize, disconnect,
    // TODO: drop casts once a typed button query helper exists.
    prev: screen.getByRole('button', { name: 'Ver destaques anteriores' }) as HTMLButtonElement,
    next: screen.getByRole('button', { name: 'Ver próximos destaques' }) as HTMLButtonElement,
  }
}

describe('FAQ highlight navigation', () => {
  it.each([false, true])('aligns cards, clamps both edges and respects reduced motion (%s)', (reducedMotion) => {
    const { track, prev, next, scrollTo, settle } = setup(reducedMotion)
    expect(prev.disabled).toBe(true)
    expect(next.disabled).toBe(false)
    fireEvent.click(prev)
    expect(scrollTo).not.toHaveBeenCalled()
    fireEvent.click(next)
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 320, behavior: reducedMotion ? 'instant' : 'smooth' })
    settle(320)
    expect(prev.disabled).toBe(false)
    fireEvent.click(next)
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 580, behavior: reducedMotion ? 'instant' : 'smooth' })
    settle(580)
    expect(next.disabled).toBe(true)
    fireEvent.click(next)
    expect(scrollTo).toHaveBeenCalledTimes(2)
    fireEvent.click(prev)
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 320, behavior: reducedMotion ? 'instant' : 'smooth' })
    settle(320)
    fireEvent.click(prev)
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: reducedMotion ? 'instant' : 'smooth' })
    settle(0)
    expect(prev.disabled).toBe(true)
    expect(track.tabIndex).toBe(0)
  })

  it('keeps rapid clicks within the available cards before smooth scrolling finishes', () => {
    const { next, prev, scrollTo, settle } = setup()
    for (let i = 0; i < 10; i++) fireEvent.click(next)
    expect(scrollTo.mock.calls.map(([options]) => options.left)).toEqual([320, ...Array(9).fill(580)])
    settle(580)
    for (let i = 0; i < 10; i++) fireEvent.click(prev)
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: 'smooth' })
    settle(0)
    expect(prev.disabled).toBe(true)
  })

  it('updates boundaries after manual scrolling and resizing, and cleans up observers', () => {
    const { track, prev, next, settle, resize, unmount, disconnect } = setup()
    settle(580)
    expect(next.disabled).toBe(true)
    expect(prev.disabled).toBe(false)
    settle(0)
    expect(prev.disabled).toBe(true)
    expect(next.disabled).toBe(false)
    Object.defineProperty(track, 'clientWidth', { value: 940 })
    act(() => resize())
    expect(prev.disabled).toBe(true)
    expect(next.disabled).toBe(true)
    unmount()
    expect(disconnect).toHaveBeenCalledOnce()
  })

  it('uses the actual position after a touch gesture interrupts an animation', () => {
    const { track, next, scrollTo, settle } = setup()
    fireEvent.click(next)
    fireEvent.pointerDown(track)
    settle(100)
    fireEvent.click(next)
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 320, behavior: 'smooth' })
  })
})
