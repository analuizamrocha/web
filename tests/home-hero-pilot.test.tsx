import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Home from '@/app/page'
import { WHATSAPP_HREF_SECRETARY } from '@/lib/constants'

const PILOT = 'https://go.mdxstudio.com.br/c/home1234'
afterEach(() => { cleanup(); vi.unstubAllEnvs() })

const heroCta = () => screen.getAllByRole('link', { name: 'Agende sua consulta agora pelo WhatsApp' })
const trackedLinks = (root: HTMLElement) => root.querySelectorAll('a[href^="https://go.mdxstudio.com.br/"]')

describe('home hero tracking pilot', () => {
  it.each(['', 'https://other.example/c/home1234', `${PILOT}?gclid=PINNED`])('keeps direct scheduling for absent or invalid config %s', value => {
    vi.stubEnv('WHATSAPP_HOME_TRACKING_URL', value)
    const { container } = render(<Home />)
    expect(trackedLinks(container)).toHaveLength(0)
    expect(heroCta()[0].getAttribute('href')).toBe(WHATSAPP_HREF_SECRETARY)
  })

  it('tracks the hero CTA alone and leaves every other link destination intact', () => {
    vi.stubEnv('WHATSAPP_HOME_TRACKING_URL', '')
    const direct = render(<Home />)
    const before = Array.from(direct.container.querySelectorAll('a[href]'), a => a.getAttribute('href'))
    cleanup()

    vi.stubEnv('WHATSAPP_HOME_TRACKING_URL', PILOT)
    const { container } = render(<Home />)
    const tracked = trackedLinks(container)
    expect(tracked).toHaveLength(1)
    expect(container.querySelector('#hero')!.contains(tracked[0])).toBe(true)
    const after = Array.from(container.querySelectorAll('a[href]'), a => a.getAttribute('href'))
    expect(after.filter((href, i) => href !== before[i])).toEqual([PILOT])
    // Services repeats the hero label but stays on the shared secretary link.
    expect(heroCta().map(a => a.getAttribute('href'))).toEqual([PILOT, WHATSAPP_HREF_SECRETARY])
  })
})
