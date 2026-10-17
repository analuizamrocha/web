import { expect, test } from '@playwright/test'
import { markdownPagePaths } from '../../src/lib/markdown-page-paths'
import { remark } from 'remark'
import { visit } from 'unist-util-visit'

const markdownHeaders = { Accept: 'text/markdown' }

test('homepage negotiates Markdown and HTML without crossing response variants', async ({ request }) => {
  for (const accept of ['text/markdown', 'text/html', '*/*', 'text/markdown;q=0, text/html', 'text/markdown']) {
    const response = await request.get('/', { headers: { Accept: accept } })
    expect(response.status()).toBe(200)
    expect(response.headers()['vary'].toLowerCase().split(/,\s*/)).toContain('accept')
    const body = await response.text()
    if (accept === 'text/markdown') {
      expect(response.headers()['content-type']).toContain('text/markdown')
      expect(response.headers()['cache-control']).toContain('no-store')
      expect(response.headers()['x-robots-tag']).toBeUndefined()
      expect(response.headers()['content-language']).toBe('pt-BR')
      expect(response.headers()['link']).toBe('<https://www.analuizarocha.com.br>; rel="canonical"')
      expect(body).toContain('# Dra. Ana Luiza')
      expect(body).toContain('/sitemap.xml')
      expect(body).not.toContain('<!DOCTYPE')
    } else {
      expect(response.headers()['content-type']).toContain('text/html')
      expect(body).toMatch(/<!doctype html>/i)
      expect(body).toContain('Cada paciente uma história')
    }
  }
  const unsupported = await request.get('/', { headers: { Accept: 'application/json' } })
  expect(unsupported.status()).toBe(406)
  expect(await unsupported.text()).toContain('text/markdown')

  const head = await request.head('/', { headers: markdownHeaders })
  expect(head.status()).toBe(200)
  expect(head.headers()['content-type']).toContain('text/markdown')
  expect(await head.text()).toBe('')

  const flight = await request.get('/sobre?_rsc=vary-regression', { headers: { RSC: '1', Accept: '*/*' } })
  expect(flight.status()).toBe(200)
  expect(flight.headers()['content-type']).toContain('text/x-component')
  const vary = flight.headers()['vary'].toLowerCase().split(/,\s*/)
  expect(vary).toContain('accept')
  expect(vary).toContain('rsc')
})

test('missing routes return Markdown 404s and retain HTML 404 behavior', async ({ request }) => {
  for (const path of ['/__ora-404-probe-regression', '/missing/nested/page', '/missing.html', '/blog/missing-agent-post', '/locais-de-atendimento/missing-agent-clinic']) {
    const response = await request.get(path, { headers: markdownHeaders })
    expect(response.status(), path).toBe(404)
    expect(response.headers()['content-type'], path).toContain('text/markdown')
    expect(response.headers()['vary'].toLowerCase()).toContain('accept')
    const body = await response.text()
    expect(body.length).toBeGreaterThan(20)
    expect(body).toContain('/llms.txt')
    expect(body).toContain('/sitemap.xml')
  }
  const response = await request.get('/__ora-404-probe-regression', {
    headers: { Accept: 'text/html', 'x-agent-markdown': '1' },
  })
  expect(response.status()).toBe(404)
  expect(response.headers()['content-type']).toContain('text/html')
})

test('dynamic pages support Markdown and renamed URLs retain their redirects', async ({ request }) => {
  for (const path of ['/blog/fissura-anal-tratamento', '/locais-de-atendimento/clinica-nassif', '/locais-de-atendimento/specta-endoscopia-digestiva']) {
    const response = await request.get(path, { headers: markdownHeaders })
    expect(response.status(), path).toBe(200)
    expect(response.headers()['content-type']).toContain('text/markdown')
    expect(response.headers()['x-robots-tag']).toBeUndefined()
    expect(response.headers()['link']).toBe(`<https://www.analuizarocha.com.br${path}>; rel="canonical"`)
    expect((await response.text()).length).toBeGreaterThan(500)
  }
  for (const accept of ['text/markdown', 'text/html']) {
    const response = await request.get('/blog/cisto-pilonidal-cirurgia-laser', { headers: { Accept: accept }, maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(response.headers()['location']).toBe('/blog/cisto-pilonidal-cirurgia-laser-quando-operar')
  }
})

test('helper URLs stay private to rewrites, including spoofed request markers', async ({ request }) => {
  for (const path of ['/conteudo-markdown', '/conteudo-markdown/blog/fissura-anal-tratamento', '/conteudo-markdown/tratamentos/hemorroidas', '/conteudo-markdown/politica-privacidade']) {
    for (const accept of ['text/html', 'text/markdown']) {
      const response = await request.get(path, { headers: { Accept: accept, 'x-agent-markdown': '1' } })
      expect(response.status(), path).toBe(404)
      expect(response.headers()['x-robots-tag']).toContain('noindex')
      expect(response.headers()['link']).toBeUndefined()
      expect(await response.text()).toContain('/llms.txt')
    }
    const head = await request.head(path, { headers: markdownHeaders })
    expect(head.status()).toBe(404)
    expect(await head.text()).toBe('')
  }
})

test('utility pages and social-preview resources are excluded from indexing, not from use', async ({ page, request }) => {
  for (const path of ['/politica-privacidade', '/design', '/design-system', '/opengraph-image', '/twitter-image', '/blog/exemplo/opengraph-image']) {
    for (const accept of ['text/html', 'text/markdown']) {
      const response = await request.get(path, { headers: { Accept: accept } })
      expect(response.headers()['x-robots-tag'], path).toContain('noindex')
      if (path === '/politica-privacidade') {
        expect(response.status()).toBe(200)
        expect(response.headers()['content-type']).toContain(accept)
      } else {
        expect(response.status()).toBe(404)
      }
    }
  }
  for (const path of ['/images/og.png', '/_next/image?url=%2Fimages%2Fog.png&w=640&q=75']) {
    const image = await request.get(path)
    expect(image.status(), path).toBe(200)
    expect(image.headers()['content-type']).toMatch(/^image\//)
    expect(image.headers()['x-robots-tag'], path).toContain('noindex')
  }
  const articleImage = await request.get('/images/posts/fissura-anal-tratamento/fissura-anal.webp')
  expect(articleImage.status()).toBe(200)
  expect(articleImage.headers()['x-robots-tag']).toBeUndefined()

  await page.goto('/politica-privacidade')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  await page.goto('/blog/fissura-anal-tratamento')
  await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute('content', /noindex/)
})

test('trust pages expose substantive content, canonical URLs, and real contacts', async ({ page }) => {
  for (const path of ['/sobre', '/contato', '/politica-privacidade']) {
    const response = await page.goto(path)
    expect(response?.status(), path).toBe(200)
    expect((await page.locator('main').innerText()).length, path).toBeGreaterThan(500)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.analuizarocha.com.br${path}`)
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  }
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  await page.goto('/contato')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contato e agendamento')
  await expect(page.locator('main a[href^="https://wa.me/"]').first()).toHaveAttribute('href', /wa\.me\/554130739732/)
  await expect(page.locator('a[href="mailto:analuizarochaprocto@gmail.com"]')).toBeVisible()
  await expect(page.locator('footer a[href="/contato"]')).toBeVisible()
  const organization = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.flatMap((script) => JSON.parse(script.textContent ?? '{}')['@graph'] ?? []).find((item) => item['@type'] === 'MedicalOrganization')
  )
  expect(organization.contactPoint).toMatchObject({ '@type': 'ContactPoint', telephone: '+554130739732', contactType: 'appointment scheduling' })
  expect(organization.address['@type']).toBe('PostalAddress')

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }

  await page.goto('/')
  await page.locator('footer a[href="/contato"]').click()
  await expect(page).toHaveURL(/\/contato$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contato e agendamento')
})

test('English trust-page paths redirect permanently to the Portuguese canonical pages', async ({ request }) => {
  for (const [path, destination] of [['/about', '/sobre'], ['/contact', '/contato'], ['/privacy', '/politica-privacidade']]) {
    for (const accept of ['text/html', 'text/markdown']) {
      const response = await request.get(path, { headers: { Accept: accept }, maxRedirects: 0 })
      expect(response.status(), path).toBe(308)
      expect(new URL(response.headers().location, response.url()).pathname).toBe(destination)

      const target = await request.get(path, { headers: { Accept: accept } })
      expect(target.status(), path).toBe(200)
      expect(target.headers()['content-type']).toContain(accept)
    }
  }
  // Aliases are redirects only; discovery files keep listing the canonical pages.
  const llms = await (await request.get('/llms.txt')).text()
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const path of ['/about', '/contact', '/privacy']) {
    expect(llms).not.toContain(`analuizarocha.com.br${path}`)
    expect(sitemap).not.toContain(`analuizarocha.com.br${path}<`)
  }
})

test('all sitemap URLs and llms links resolve, and discovery files keep their formats', async ({ request }) => {
  test.setTimeout(120_000)
  const sitemap = await request.get('/sitemap.xml', { headers: markdownHeaders })
  expect(sitemap.status()).toBe(200)
  expect(sitemap.headers()['content-type']).toContain('xml')
  const xml = await sitemap.text()
  expect(xml).toContain('http://www.sitemaps.org/schemas/sitemap/0.9')

  const llms = await request.get('/llms.txt', { headers: markdownHeaders })
  expect(llms.status()).toBe(200)
  expect(llms.headers()['content-type']).toContain('text/plain')
  const guide = await llms.text()
  expect(guide).toContain('## Quando usar este site (When to use this site)\n')
  expect(guide.replace('(When to use this site)', '')).not.toMatch(/Official website|When to use|Use when/)
  expect(guide).not.toMatch(/https:\/\/www\.analuizarocha\.com\.br\/(about|contact|privacy)(?:\)|\/|$)/m)
  for (const excluded of ['/politica-privacidade', '/design', '/design-system', '/conteudo-markdown', '/images/og.png', '/opengraph-image', '/twitter-image']) {
    expect(xml).not.toContain(`<loc>https://www.analuizarocha.com.br${excluded}</loc>`)
  }

  const robots = await request.get('/robots.txt', { headers: markdownHeaders })
  expect(robots.status()).toBe(200)
  expect(robots.headers()['content-type']).toContain('text/plain')
  expect(await robots.text()).toContain('Sitemap: https://www.analuizarocha.com.br/sitemap.xml')

  const urls = new Set([
    ...Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g), ([, url]) => new URL(url).pathname),
    ...Array.from(guide.matchAll(/\]\((https:\/\/www\.analuizarocha\.com\.br[^)]*)\)/g), ([, url]) => new URL(url).pathname),
  ])
  expect(urls.size).toBeGreaterThan(50)
  for (const path of urls) {
    const response = await request.get(path, { headers: { Accept: 'text/html' } })
    expect(response.status(), path).toBe(200)
    await response.dispose()
    if (!['/sitemap.xml', '/llms.txt', '/robots.txt'].includes(path)) {
      const markdown = await request.get(path, { headers: markdownHeaders })
      expect(markdown.status(), path).toBe(200)
      expect(markdown.headers()['content-type'], path).toContain('text/markdown')
      if (path === '/politica-privacidade') expect(markdown.headers()['x-robots-tag'], path).toContain('noindex')
      else expect(markdown.headers()['x-robots-tag'], path).toBeUndefined()
      expect(markdown.headers()['link'], path).toBe(`<https://www.analuizarocha.com.br${path === '/' ? '' : path}>; rel="canonical"`)
      expect(await markdown.text(), path).not.toMatch(/\]\(\s*\/(?!\/)/)
      expect((await markdown.text()).length, path).toBeGreaterThan(100)
      await markdown.dispose()
    }
  }
})

test('shared page content is present in both HTML and Markdown', async ({ page, request }) => {
  test.setTimeout(120_000)
  const normalize = (text: string) => text.normalize('NFKC').replace(/\s+/g, ' ').trim()
  for (const path of markdownPagePaths) {
    await page.goto(path)
    const content = await page.locator('main h1, main h2, main h3, main h4, main p, main li, main summary').allTextContents()
    const response = await request.get(path, { headers: markdownHeaders })
    expect(response.status(), path).toBe(200)
    const tree = remark().parse(await response.text())
    let markdownText = ''
    visit(tree, (node) => {
      if (node.type === 'text' || node.type === 'inlineCode') markdownText += node.value
      else if (['paragraph', 'heading', 'listItem', 'blockquote'].includes(node.type)) markdownText += ' '
    })
    const normalizedMarkdown = normalize(markdownText)
    for (const text of content.map(normalize).filter((text) => text.length > 8)) {
      expect(normalizedMarkdown, `${path}: ${text}`).toContain(text)
    }
    for (const accept of ['application/json', 'text/markdown;q=0, text/html;q=0']) {
      const unsupported = await request.get(path, { headers: { Accept: accept } })
      expect(unsupported.status(), path).toBe(406)
      expect(unsupported.headers()['vary'].toLowerCase()).toContain('accept')
    }
    const head = await request.head(path, { headers: markdownHeaders })
    expect(head.status(), path).toBe(200)
    expect(head.headers()['content-type']).toContain('text/markdown')
    expect(await head.text()).toBe('')
    for (const [accept, contentType] of [
      ['text/markdown;q=0.9, text/html;q=0.2', 'text/markdown'],
      ['text/markdown;q=0.2, text/html;q=0.9', 'text/html'],
      ['text/markdown;q=0, */*;q=0.5', 'text/html'],
    ]) {
      const preferred = await request.get(path, { headers: { Accept: accept } })
      expect(preferred.status(), path).toBe(200)
      expect(preferred.headers()['content-type'], path).toContain(contentType)
      expect(preferred.headers()['vary'].toLowerCase(), path).toContain('accept')
    }
  }
})
