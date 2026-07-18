import { expect, test } from '@playwright/test'

const CANONICAL_WEBSITE_URL = 'https://www.analuizarocha.com.br'

function getXmlValues(xml: string, tagName: string): string[] {
  const pattern = new RegExp(`<${tagName}>(.*?)</${tagName}>`, 'g')
  return Array.from(xml.matchAll(pattern), ([, value]) => value.trim())
}

test('homepage renders hero content and primary CTA', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /Cada paciente uma história/i,
    })
  ).toBeVisible()

  await expect(
    page.locator('#hero').getByRole('link', {
      name: /Agendar consulta com coloproctologista em Curitiba/i,
    })
  ).toBeVisible()
})

test('cookie consent stores accepted decision', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('Cookies & Privacidade')).toBeVisible({
    timeout: 10_000,
  })

  await page
    .getByRole('button', { name: /Aceitar cookies|Aceitar e continuar/i })
    .click()
  await page.waitForLoadState('domcontentloaded')

  await expect
    .poll(() =>
      page.evaluate(() => localStorage.getItem('lgpd-cookie-consent'))
    )
    .toBe('accepted')
})

test('blog index renders and links to articles', async ({ page }) => {
  await page.goto('/blog')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /Cuidando da sua saúde intestinal/i,
    })
  ).toBeVisible()

  await expect(page.getByRole('link', { name: /Ler artigo/i }).first()).toBeVisible()
})

test('blog post page renders expected heading and CTA', async ({ page }) => {
  await page.goto('/blog/fissura-anal-tratamento')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /Fissura anal:/i,
    })
  ).toBeVisible()

  await expect(page.getByRole('link', { name: /Agendar consulta/i })).toBeVisible()
})

test('treatments page renders heading and treatment cards', async ({ page }) => {
  await page.goto('/tratamentos')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /Tratamentos de Coloproctologia/i,
    })
  ).toBeVisible()

  await expect(
    page.getByRole('link', { name: /Ver detalhes sobre Cirurgias a Laser/i })
  ).toBeVisible()

  await expect(page.locator('img[fetchpriority="high"]').first()).toBeAttached()
})

test('treatment heroes are prioritized without changing their layout', async ({ page }) => {
  const treatmentSlugs = [
    'cx-cisto-pilonidal',
    'cx-fistulas-anorretais',
    'cx-laser',
    'doencas-inflamatorias-intestinais',
    'hemorroidas',
    'hpv-anal',
    'rastreio-cancer-anal',
    'sindrome-intestino-irritavel',
    'toxina-botulinica',
  ]

  for (const slug of treatmentSlugs) {
    await page.goto(`/tratamentos/${slug}`)
    await expect(page.locator('figure img[fetchpriority="high"]')).toHaveCount(1)
  }
})

test('technical social metadata and article schema use valid site resources', async ({ page }) => {
  await page.goto('/tratamentos')
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    `${CANONICAL_WEBSITE_URL}/tratamentos`
  )

  await page.goto('/blog/fissura-anal-tratamento')
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    `${CANONICAL_WEBSITE_URL}/images/og.png`
  )

  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents()
  expect(schemas.length).toBeGreaterThan(0)
  expect(() => schemas.map((schema) => JSON.parse(schema))).not.toThrow()
  expect(schemas.join(' ')).not.toContain('/search?q=')
  expect(schemas.join(' ')).not.toContain('/logo.png')

  const socialImageResponse = await page.request.get('/images/og.png')
  expect(socialImageResponse.ok()).toBeTruthy()
})

test('sitemap and robots expose canonical crawl signals', async ({ page }) => {
  const sitemapResponse = await page.request.get('/sitemap.xml')
  expect(sitemapResponse.ok()).toBeTruthy()

  const sitemapXml = await sitemapResponse.text()
  const locs = getXmlValues(sitemapXml, 'loc')
  const blogPostLocs = locs.filter((loc) => loc.startsWith(`${CANONICAL_WEBSITE_URL}/blog/`))

  expect(locs.length).toBeGreaterThan(0)
  expect(locs).toContain(`${CANONICAL_WEBSITE_URL}/blog`)
  expect(blogPostLocs.length).toBeGreaterThan(0)
  expect(locs).not.toContain(`${CANONICAL_WEBSITE_URL}/politica-privacidade`)

  for (const loc of locs) {
    expect(loc.startsWith(CANONICAL_WEBSITE_URL)).toBeTruthy()
  }

  const robotsResponse = await page.request.get('/robots.txt')
  expect(robotsResponse.ok()).toBeTruthy()

  const robotsTxt = await robotsResponse.text()
  expect(robotsTxt).toContain(`Sitemap: ${CANONICAL_WEBSITE_URL}/sitemap.xml`)
})
