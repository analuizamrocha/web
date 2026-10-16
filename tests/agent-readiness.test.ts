// @vitest-environment node
import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { negotiatePage } from '@/lib/content-negotiation'
import { proxy } from '@/proxy'
import { GET } from '@/app/conteudo-markdown/[[...path]]/route'
import { getAllPosts } from '@/lib/blog'
import { locationPages } from '@/lib/locations'
import { structuredData } from '@/lib/structured-data'
import { CONTACT_EMAIL, WEBSITE_URL, WPP_NUMBER_SECRETARY } from '@/lib/constants'
import sitemap from '@/app/sitemap'

describe('page content negotiation', () => {
  it.each([
    [null, 'text/html'],
    ['*/*', 'text/html'],
    ['text/*', 'text/html'],
    ['text/html', 'text/html'],
    ['text/markdown', 'text/markdown'],
    ['TEXT/MARKDOWN; charset=UTF-8', 'text/markdown'],
    ['text/markdown;q=0, text/html', 'text/html'],
    ['text/markdown;q=0, */*;q=0.5', 'text/html'],
    ['text/markdown;q=0.5, text/html;q=0.9', 'text/html'],
    ['text/markdown;q=0.9, text/html;q=0.5', 'text/markdown'],
    ['text/html;q=0, text/*;q=0.5', 'text/markdown'],
    ['text/html;q=0, text/markdown;q=0', undefined],
    ['application/json', undefined],
    ['text/markdown; charset=iso-8859-1', undefined],
  ])('negotiates %s as %s', (accept, expected) => {
    expect(negotiatePage(accept)).toBe(expected)
  })

  it('rewrites Markdown homepage requests without changing the public URL', () => {
    const response = proxy(new NextRequest(`${WEBSITE_URL}/?source=agent`, { headers: { accept: 'text/markdown' } }))
    expect(response.headers.get('x-middleware-rewrite')).toBe(`${WEBSITE_URL}/conteudo-markdown?source=agent`)
  })

  it('removes a spoofed internal format header', () => {
    const response = proxy(new NextRequest(`${WEBSITE_URL}/missing`, { headers: { accept: 'text/html', 'x-agent-markdown': '1' } }))
    expect(response.headers.has('x-middleware-request-x-agent-markdown')).toBe(false)
    expect(response.headers.get('x-middleware-override-headers')).not.toContain('x-agent-markdown')
  })

  it.each<{ method: string; headers: Record<string, string> }>([
    { method: 'POST', headers: { accept: 'text/markdown' } },
    { method: 'GET', headers: { accept: 'text/x-component', rsc: '1' } },
  ])('preserves Next.js protocol requests: %j', (init) => {
    const response = proxy(new NextRequest(`${WEBSITE_URL}/`, init))
    expect(response.headers.get('x-middleware-next')).toBe('1')
    expect(response.headers.has('x-middleware-rewrite')).toBe(false)
  })
})

describe('Markdown representations', () => {
  it('serves useful homepage content with protocol and cache headers', async () => {
    const response = await GET(new Request(WEBSITE_URL), { params: Promise.resolve({}) })
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('text/markdown; charset=utf-8')
    expect(response.headers.get('vary')).toBe('Accept')
    expect(response.headers.get('cache-control')).toContain('no-store')
    const body = await response.text()
    for (const value of ['CRM-PR 45351', 'RQE 36221', 'Clínica Nassif', 'Specta', '/contato', '/llms.txt', '/sitemap.xml']) {
      expect(body).toContain(value)
    }
  })

  it('returns the exact published article body without frontmatter', async () => {
    const post = getAllPosts()[0]
    const response = await GET(new Request(WEBSITE_URL), { params: Promise.resolve({ path: ['blog', post.slug] }) })
    expect(response.status).toBe(200)
    const body = await response.text()
    expect(body).toContain(`Publicado em: ${post.publishDate}. Última atualização: ${post.lastModified}.`)
    expect(body).toContain(`[Fonte original](${WEBSITE_URL}/blog/${post.slug})`)
    expect(body.endsWith(`${post.content.trim()}\n`)).toBe(true)
  })

  it('keeps negotiated canonical content indexable and direct helper URLs noindex', async () => {
    const response = await GET(new Request(WEBSITE_URL, { headers: { 'x-agent-markdown': '1' } }), { params: Promise.resolve({}) })
    expect(response.headers.has('x-robots-tag')).toBe(false)
    expect(response.headers.get('content-language')).toBe('pt-BR')
    const direct = await GET(new Request(`${WEBSITE_URL}/conteudo-markdown`), { params: Promise.resolve({}) })
    expect(direct.headers.get('x-robots-tag')).toBe('noindex')
  })

  it('uses the existing data for each location', async () => {
    for (const location of locationPages) {
      const response = await GET(new Request(WEBSITE_URL), { params: Promise.resolve({ path: ['locais-de-atendimento', location.slug] }) })
      expect(response.status).toBe(200)
      const body = await response.text()
      expect(body).toContain(location.streetAddress)
      expect(body).toContain(location.whatsappHref)
    }
  })

  it.each([['not-found'], ['blog', 'missing'], ['locais-de-atendimento', 'missing'], ['blog', '..', 'constants']])('returns a recoverable real 404 for %j', async (...path) => {
    const response = await GET(new Request(WEBSITE_URL), { params: Promise.resolve({ path }) })
    expect(response.status).toBe(404)
    expect(response.headers.get('content-type')).toContain('text/markdown')
    const body = await response.text()
    expect(body.length).toBeGreaterThan(20)
    expect(body).toContain('[Mapa do site]')
    expect(body).toContain('/llms.txt')
  })
})

describe('business discovery', () => {
  it('adds a real scheduling ContactPoint alongside the existing postal address', () => {
    const organization = structuredData['@graph'].find((item) => item['@type'] === 'MedicalOrganization')!
    expect(organization.contactPoint).toMatchObject({
      '@type': 'ContactPoint',
      telephone: `+${WPP_NUMBER_SECRETARY}`,
      email: CONTACT_EMAIL,
      contactType: 'appointment scheduling',
      url: `${WEBSITE_URL}/contato`,
    })
    expect(organization.address).toMatchObject({ '@type': 'PostalAddress', addressLocality: 'Curitiba', addressCountry: 'BR' })
  })

  it('publishes linked when-to-use guidance and canonical contact discovery', () => {
    const llms = fs.readFileSync('public/llms.txt', 'utf8')
    expect(llms).toContain('## Quando usar este site')
    expect(llms).not.toMatch(/Official website|When to use|Use when|Patient education/)
    expect(llms).toContain('Accept: text/markdown')
    expect(llms).not.toContain('### ')
    // Every H2 section follows the llms.txt file-list format.
    for (const section of llms.split(/^## /m).slice(1)) {
      expect(section).toMatch(/\n\s*- \[[^\]]+\]\(https:\/\/[^)]+\)/)
    }
    for (const route of ['/sobre', '/contato', '/politica-privacidade']) expect(llms).toContain(`${WEBSITE_URL}${route}`)
    expect(sitemap().some((item) => item.url === `${WEBSITE_URL}/contato`)).toBe(true)
  })
})
