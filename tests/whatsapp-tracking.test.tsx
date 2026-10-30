import { describe, expect, it } from 'vitest'
import { validateTrackingUrl } from '@/lib/whatsapp-tracking'

const TRACKING_URL = 'https://go.mdxstudio.com.br/c/agendar1'

describe('tracking link validation', () => {
  it.each([undefined, '', 'go.mdxstudio.com.br/c/agendar1', 'https://other.example/c/agendar1', 'http://go.mdxstudio.com.br/c/agendar1', 'javascript:alert(1)', 'https://user:pass@go.mdxstudio.com.br/c/agendar1', 'https://go.mdxstudio.com.br/c/a', `${TRACKING_URL}?gclid=PINNED`, `${TRACKING_URL}#test`])('rejects %s', value => {
    expect(validateTrackingUrl(value)).toBe('')
  })
  it('accepts a production tracking link, trimming whitespace', () => {
    expect(validateTrackingUrl(` ${TRACKING_URL} `)).toBe(TRACKING_URL)
  })
})
