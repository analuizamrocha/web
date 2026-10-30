import { afterEach, describe, expect, it, vi } from 'vitest'

const TRACKING_URL = 'https://go.mdxstudio.com.br/c/agendar1'
async function loadConstants(value = '') {
  vi.resetModules()
  vi.stubEnv('NEXT_PUBLIC_WHATSAPP_TRACKING_URL', value)
  return import('@/lib/constants')
}
afterEach(() => vi.unstubAllEnvs())

describe('scheduling WhatsApp link', () => {
  it.each(['', 'go.mdxstudio.com.br/c/agendar1', 'https://other.example/c/agendar1', 'http://go.mdxstudio.com.br/c/agendar1', 'javascript:alert(1)', 'https://user:pass@go.mdxstudio.com.br/c/agendar1', 'https://go.mdxstudio.com.br/c/a', `${TRACKING_URL}?gclid=PINNED`, `${TRACKING_URL}#test`])('keeps direct scheduling for absent or invalid config: %s', async value => {
    const constants = await loadConstants(value)
    expect(constants.WHATSAPP_HREF_SECRETARY).toBe(`https://wa.me/554130739732?text=${encodeURIComponent(constants.WHATSAPP_MSG_TEXT_SECRETARY)}`)
    expect(constants.WHATSAPP_TRACKING_URL).toBe('')
  })
  it('uses a valid production tracking link', async () => {
    const constants = await loadConstants(TRACKING_URL)
    expect(constants.WHATSAPP_HREF_SECRETARY).toBe(TRACKING_URL)
  })
  it('does not enable shared CTAs through the home hero pilot configuration', async () => {
    vi.stubEnv('WHATSAPP_HOME_TRACKING_URL', TRACKING_URL)
    const constants = await loadConstants()
    expect(constants.WHATSAPP_HREF_SECRETARY).toMatch(/^https:\/\/wa.me\/554130739732\?text=/)
  })
})
