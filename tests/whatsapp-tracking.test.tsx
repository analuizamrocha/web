import { act, cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('next/script', () => ({
  default: ({ src }: { src: string }) => <span data-testid="tracking-script" data-src={src} />,
}))

const TRACKING_URL = 'https://go.mdxstudio.com.br/c/agendar1'

async function loadConstants(trackingUrl?: string) {
  vi.resetModules()
  if (trackingUrl === undefined) vi.unstubAllEnvs()
  else vi.stubEnv('NEXT_PUBLIC_WHATSAPP_TRACKING_URL', trackingUrl)
  return import('@/lib/constants')
}

afterEach(() => {
  cleanup()
  vi.unstubAllEnvs()
  localStorage.clear()
})

describe('scheduling WhatsApp link', () => {
  it('keeps the plain wa.me link when no tracking link is configured', async () => {
    const constants = await loadConstants()
    expect(constants.WHATSAPP_HREF_SECRETARY).toBe(
      `https://wa.me/554130739732?text=${encodeURIComponent(constants.WHATSAPP_MSG_TEXT_SECRETARY)}`
    )
    expect(constants.WHATSAPP_TRACKING_SCRIPT_SRC).toBe('')
  })

  it('uses the tracking link and its script when configured', async () => {
    const constants = await loadConstants(TRACKING_URL)
    expect(constants.WHATSAPP_HREF_SECRETARY).toBe(TRACKING_URL)
    expect(constants.WHATSAPP_TRACKING_SCRIPT_SRC).toBe('https://go.mdxstudio.com.br/s.js')
  })

  it('falls back to wa.me when the configured value is not a URL', async () => {
    const constants = await loadConstants('go.mdxstudio.com.br/c/agendar1')
    expect(constants.WHATSAPP_HREF_SECRETARY).toMatch(/^https:\/\/wa\.me\/554130739732\?text=/)
    expect(constants.WHATSAPP_TRACKING_SCRIPT_SRC).toBe('')
  })
})

describe('TrackingLinkScript', () => {
  async function renderScript(src: string) {
    const { TrackingLinkScript } = await import('@/components/analytics/TrackingLinkScript')
    const view = render(<TrackingLinkScript src={src} />)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    return view
  }

  it('waits for cookie consent before loading the script', async () => {
    const view = await renderScript('https://go.mdxstudio.com.br/s.js')
    expect(view.queryByTestId('tracking-script')).toBeNull()

    await act(async () => {
      localStorage.setItem('lgpd-cookie-consent', 'accepted')
      window.dispatchEvent(new Event('lgpd-consent-updated'))
    })

    expect(view.getByTestId('tracking-script').getAttribute('data-src')).toBe(
      'https://go.mdxstudio.com.br/s.js'
    )
  })

  it('stays off after the visitor rejects cookies', async () => {
    localStorage.setItem('lgpd-cookie-consent', 'rejected')
    const view = await renderScript('https://go.mdxstudio.com.br/s.js')
    expect(view.queryByTestId('tracking-script')).toBeNull()
  })

  it('renders nothing when no tracking link is configured', async () => {
    localStorage.setItem('lgpd-cookie-consent', 'accepted')
    const view = await renderScript('')
    expect(view.queryByTestId('tracking-script')).toBeNull()
  })
})
