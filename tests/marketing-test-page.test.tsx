import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import MarketingTestPage, { metadata } from '@/app/teste-marketing/page'

vi.mock('next/navigation', () => ({ notFound: () => { throw new Error('NOT_FOUND') } }))
afterEach(() => { cleanup(); vi.unstubAllEnvs() })

describe('isolated marketing CTA', () => {
  it.each(['', 'https://other.example/c/test1234'])('returns not found for disabled or invalid configuration %s', value => {
    vi.stubEnv('WHATSAPP_TEST_TRACKING_URL', value)
    expect(() => MarketingTestPage()).toThrow('NOT_FOUND')
  })
  it('renders the configured CTA without advertising the page to crawlers', () => {
    vi.stubEnv('WHATSAPP_TEST_TRACKING_URL', 'https://go.mdxstudio.com.br/c/test1234')
    render(<MarketingTestPage />)
    expect(screen.getByRole('link', {name:'Testar contato pelo WhatsApp'}).getAttribute('href')).toBe('https://go.mdxstudio.com.br/c/test1234')
    expect(metadata.robots).toEqual({index:false,follow:false})
  })
})
