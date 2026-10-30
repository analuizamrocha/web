import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { startWhatsAppTracking } from '@/lib/whatsapp-tracking'

const BASE = 'https://go.mdxstudio.com.br/c/test1234'
let stop: (() => void) | undefined
const link = () => document.querySelector('a')!
function consent(value: string) {
  window.localStorage.setItem('lgpd-cookie-consent', value)
  window.dispatchEvent(new Event('lgpd-consent-updated'))
}
beforeEach(() => {
  for (const key of ['localStorage', 'sessionStorage']) {
    const values = new Map<string, string>()
    vi.stubGlobal(key, { getItem: (k: string) => values.get(k) ?? null, setItem: (k: string, v: string) => values.set(k, v), removeItem: (k: string) => values.delete(k), clear: () => values.clear() })
  }
  window.localStorage.clear()
  window.sessionStorage.clear()
  window.history.replaceState({}, '', '/?utm_source=google&utm_campaign=teste-release&gclid=TESTE123&email=private')
  document.body.innerHTML = `<a href="${BASE}">Agendar</a>`
})
afterEach(() => { stop?.(); document.body.innerHTML = ''; vi.unstubAllGlobals() })

describe('campaign consent and navigation', () => {
  it('collects nothing before acceptance or after rejection, then clears and restores on revocation', () => {
    stop = startWhatsAppTracking()
    expect(link().href).toBe(BASE)
    expect(window.sessionStorage.getItem('mdx_tracking_params')).toBeNull()
    consent('rejected')
    expect(link().href).toBe(BASE)
    consent('accepted')
    expect(new URL(link().href).searchParams.get('gclid')).toBe('TESTE123')
    expect(JSON.parse(window.sessionStorage.getItem('mdx_tracking_params')!)).toEqual({utm_source:'google',utm_campaign:'teste-release',gclid:'TESTE123'})
    consent('rejected')
    expect(link().href).toBe(BASE)
    expect(window.sessionStorage.getItem('mdx_tracking_params')).toBeNull()
    link().dispatchEvent(new MouseEvent('auxclick', { bubbles: true }))
    expect(link().href).toBe(BASE)
  })

  it('retains campaign across page loads, and replaces stale fields on a new tagged landing', () => {
    consent('accepted')
    stop = startWhatsAppTracking()
    stop()
    window.history.replaceState({}, '', '/sobre')
    stop = startWhatsAppTracking()
    expect(new URL(link().href).searchParams.get('gclid')).toBe('TESTE123')
    window.history.replaceState({}, '', '/?utm_source=instagram')
    link().dispatchEvent(new MouseEvent('auxclick', { bubbles: true }))
    expect(new URL(link().href).searchParams.get('utm_source')).toBe('instagram')
    expect(new URL(link().href).searchParams.has('gclid')).toBe(false)
    expect(new URL(link().href).searchParams.has('utm_campaign')).toBe(false)
  })

  it('decorates new anchors, preserves explicit values and leaves other destinations alone', async () => {
    consent('accepted')
    stop = startWhatsAppTracking()
    document.body.innerHTML += `<a id="new" href="${BASE}?utm_content=topo">New</a><a id="other" href="https://wa.me/554133333333">Other</a>`
    await new Promise(resolve => setTimeout(resolve, 0))
    const added = document.querySelector<HTMLAnchorElement>('#new')!
    expect(new URL(added.href).searchParams.get('gclid')).toBe('TESTE123')
    expect(new URL(added.href).searchParams.get('utm_content')).toBe('topo')
    expect(document.querySelector<HTMLAnchorElement>('#other')!.href).toBe('https://wa.me/554133333333')
    stop()
    expect(added.href).toBe(`${BASE}?utm_content=topo`)
  })

  it('does not restore a campaign collected before revocation when accepting again', () => {
    consent('accepted')
    stop = startWhatsAppTracking()
    window.history.replaceState({}, '', '/sobre')
    consent('rejected')
    consent('accepted')
    expect(link().href).toBe(BASE)
    expect(window.sessionStorage.getItem('mdx_tracking_params')).toBeNull()
  })
  it('keeps the current handoff usable when session storage is unavailable', () => {
    consent('accepted')
    vi.spyOn(window.sessionStorage, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    vi.spyOn(window.sessionStorage, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    vi.spyOn(window.sessionStorage, 'removeItem').mockImplementation(() => { throw new Error('blocked') })
    stop = startWhatsAppTracking()
    expect(new URL(link().href).searchParams.get('gclid')).toBe('TESTE123')
    consent('rejected')
    expect(link().href).toBe(BASE)
  })

  it('filters stored fields and caps campaign values', () => {
    window.history.replaceState({}, '', '/sobre')
    window.sessionStorage.setItem('mdx_tracking_params', JSON.stringify({gclid:'x'.repeat(300), email:'private', utm_source:42}))
    consent('accepted')
    stop = startWhatsAppTracking()
    expect(new URL(link().href).searchParams.get('gclid')).toBe('x'.repeat(256))
    expect(new URL(link().href).searchParams.has('email')).toBe(false)
    expect(new URL(link().href).searchParams.has('utm_source')).toBe(false)
  })

  it('preserves an explicit campaign value over the landing campaign', () => {
    link().href = `${BASE}?utm_source=qr&utm_campaign=pinned`
    consent('accepted')
    stop = startWhatsAppTracking()
    expect(new URL(link().href).searchParams.get('utm_source')).toBe('qr')
    expect(new URL(link().href).searchParams.get('utm_campaign')).toBe('pinned')
    expect(new URL(link().href).searchParams.get('gclid')).toBe('TESTE123')
    consent('rejected')
    expect(link().href).toBe(`${BASE}?utm_source=qr&utm_campaign=pinned`)
  })

  it('removes listeners and the observer so stopped tracking cannot restart', async () => {
    consent('accepted')
    stop = startWhatsAppTracking()
    stop()
    window.sessionStorage.clear()
    window.history.replaceState({}, '', '/?utm_source=facebook&fbclid=NEW')
    for (const event of ['lgpd-consent-updated', 'storage', 'popstate']) {
      window.dispatchEvent(new Event(event))
      expect(link().href).toBe(BASE)
      expect(window.sessionStorage.getItem('mdx_tracking_params')).toBeNull()
    }
    for (const event of ['click', 'auxclick']) {
      link().addEventListener(event, event => event.preventDefault())
      link().dispatchEvent(new MouseEvent(event, {bubbles:true,cancelable:true}))
      expect(link().href).toBe(BASE)
      expect(window.sessionStorage.getItem('mdx_tracking_params')).toBeNull()
    }
    const added = document.createElement('a')
    added.href = BASE
    document.body.append(added)
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(added.href).toBe(BASE)
    expect(window.sessionStorage.getItem('mdx_tracking_params')).toBeNull()
  })

})
