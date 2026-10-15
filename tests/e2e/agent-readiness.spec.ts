import { expect, test } from '@playwright/test'

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
    expect((await response.text()).length).toBeGreaterThan(500)
  }
  for (const accept of ['text/markdown', 'text/html']) {
    const response = await request.get('/blog/cisto-pilonidal-cirurgia-laser', { headers: { Accept: accept }, maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(response.headers()['location']).toBe('/blog/cisto-pilonidal-cirurgia-laser-quando-operar')
  }
})

test('trust pages expose substantive content, canonical URLs, and real contacts', async ({ page }) => {
  for (const [path, canonical] of [['/about', '/sobre'], ['/contact', '/contact'], ['/privacy', '/politica-privacidade']]) {
    const response = await page.goto(path)
    expect(response?.status(), path).toBe(200)
    expect((await page.locator('main').innerText()).length, path).toBeGreaterThan(500)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.analuizarocha.com.br${canonical}`)
  }
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  await page.goto('/contact')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contato e agendamento')
  await expect(page.locator('main a[href^="https://wa.me/"]').first()).toHaveAttribute('href', /wa\.me\/554130739732/)
  await expect(page.locator('a[href="mailto:analuizarochaprocto@gmail.com"]')).toBeVisible()
  await expect(page.locator('footer a[href="/contact"]')).toBeVisible()
  const organization = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.flatMap((script) => JSON.parse(script.textContent ?? '{}')['@graph'] ?? []).find((item) => item['@type'] === 'MedicalOrganization')
  )
  expect(organization.contactPoint).toMatchObject({ '@type': 'ContactPoint', telephone: '+554130739732', contactType: 'appointment scheduling' })
  expect(organization.address['@type']).toBe('PostalAddress')
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
  expect(guide).toContain('## When to use this site')

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
  }
})
