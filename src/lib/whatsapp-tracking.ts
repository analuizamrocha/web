export const TRACKING_ORIGIN = 'https://go.mdxstudio.com.br'
export const CAMPAIGN_STORE = 'mdx_tracking_params'
const FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid'] as const

export function validateTrackingUrl(value: string | undefined): string {
  try {
    const url = new URL(value?.trim() ?? '')
    return url.origin === TRACKING_ORIGIN && !url.username && !url.password &&
      /^\/c\/[a-zA-Z0-9]{4,32}$/.test(url.pathname) && !url.search && !url.hash
      ? url.href : ''
  } catch { return '' }
}

/** Local lifecycle control lets consent revocation undo links and listeners. */
export function startWhatsAppTracking() {
  let params: Record<string, string> = {}
  let lastLanding: string | undefined
  const originals = new Map<HTMLAnchorElement, { original: string; decorated: string }>()
  const readConsent = () => {
    try { return window.localStorage.getItem('lgpd-cookie-consent') === 'accepted' }
    catch { return false }
  }
  const restore = () => {
    for (const [anchor, hrefs] of originals) {
      if (anchor.href === hrefs.decorated) anchor.href = hrefs.original
    }
    originals.clear()
  }
  const clear = () => {
    params = {}
    lastLanding = undefined
    try { window.sessionStorage.removeItem(CAMPAIGN_STORE) } catch {}
    restore()
  }
  const refresh = () => {
    if (!readConsent()) { clear(); return false }
    const landing = window.location.href
    if (landing === lastLanding) return true
    restore()
    lastLanding = landing
    const query = new URLSearchParams(window.location.search)
    const fresh: Record<string, string> = {}
    for (const key of FIELDS) {
      const value = query.get(key)
      if (value) fresh[key] = value.slice(0, 256)
    }
    if (Object.keys(fresh).length) {
      params = fresh
      try { window.sessionStorage.setItem(CAMPAIGN_STORE, JSON.stringify(params)) } catch {}
    } else {
      try {
        const stored = JSON.parse(window.sessionStorage.getItem(CAMPAIGN_STORE) || '{}')
        for (const key of FIELDS) {
          if (typeof stored?.[key] === 'string') params[key] = stored[key].slice(0, 256)
        }
      } catch {}
    }
    return true
  }
  const decorate = (anchor: HTMLAnchorElement) => {
    const previous = originals.get(anchor)
    const original = previous && anchor.href === previous.decorated ? previous.original : anchor.href
    let url: URL
    try { url = new URL(original) } catch { return }
    if (url.origin !== TRACKING_ORIGIN || !/^\/c\/[a-zA-Z0-9]{4,32}$/.test(url.pathname)) return
    for (const [key, value] of Object.entries(params)) {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value)
    }
    const decorated = url.href
    if (anchor.href !== decorated) anchor.href = decorated
    originals.set(anchor, { original, decorated })
  }
  const sync = () => {
    if (refresh()) document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(decorate)
    for (const anchor of originals.keys()) if (!anchor.isConnected) originals.delete(anchor)
  }
  const activate = (event: Event) => {
    if (!refresh()) return
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null
    if (anchor) decorate(anchor)
  }
  sync()
  const observer = new MutationObserver(sync)
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] })
  window.addEventListener('lgpd-consent-updated', sync)
  window.addEventListener('storage', sync)
  window.addEventListener('popstate', sync)
  document.addEventListener('click', activate, true)
  document.addEventListener('auxclick', activate, true)
  return () => {
    observer.disconnect()
    window.removeEventListener('lgpd-consent-updated', sync)
    window.removeEventListener('storage', sync)
    window.removeEventListener('popstate', sync)
    document.removeEventListener('click', activate, true)
    document.removeEventListener('auxclick', activate, true)
    restore()
  }
}
