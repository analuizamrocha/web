import { expect, test } from '@playwright/test'

const website = 'https://www.analuizarocha.com.br'
const itchArticle = '/blog/coceira-anal-quando-procurar-coloproctologista-curitiba'
// Known legacy article URLs and their canonical destinations.
const equivalents = [
  ['/blog/coceira-anal-quando-is-normal-e-quando-procurar-coloproctologista-curitiba', itchArticle],
  ['/blog/coceira-anal-quando-is-normal-e-quando-procurar-um-coloproctologista-curitiba', itchArticle],
  ['/blog/coceira-anal-quando-normal-quando-procurar-coloproctologista-curitiba', itchArticle],
  ['/blog/coceira-anal-quando-normal-e-quando-procurar-coloproctologista-curitiba', itchArticle],
  ['/blog/coceira-anal-quando-normal-e-quando-procurar-um-coloproctologista-curitiba', itchArticle],
  ['/blog/coloproctologista-curitiba-prurido-anal', itchArticle],
  ['/blog/cirurgia-laser-hemorroida-cuando-faz-sentido', '/blog/cirurgia-laser-hemorroida-quando-faz-sentido'],
  ['/blog/coloproctologia/prurido-anal-coceira-no-anus/', itchArticle],
  ['/blog/coceira-anal-quando-es-normal-quando-procurar-coloproctologista-curitiba', itchArticle],
] as const

for (const [source, destination] of equivalents) {
  test(`legacy equivalent resolves in one permanent hop: ${source}`, async ({ request }) => {
    const response = await request.get(source, { maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(new URL(response.headers().location, response.url()).pathname).toBe(destination)

    const target = await request.get(destination, { maxRedirects: 0 })
    expect(target.status()).toBe(200)
    expect(await target.text()).toContain(`rel="canonical" href="${website}${destination}"`)
  })
}

test('redirects preserve queries and normal slash removal without swallowing unknown URLs', async ({ request }) => {
  const response = await request.get(`${equivalents[0][0]}?utm_source=legacy`, { maxRedirects: 0 })
  const location = new URL(response.headers().location, response.url())
  expect(response.status()).toBe(308)
  expect(location.pathname).toBe(itchArticle)
  expect(location.searchParams.get('utm_source')).toBe('legacy')

  for (const path of ['/blog/', '/sobre/', '/tratamentos/cx-laser/', '/images/og.png/']) {
    const normalized = await request.get(path, { maxRedirects: 0 })
    expect(normalized.status()).toBe(308)
    expect(new URL(normalized.headers().location, normalized.url()).pathname).toBe(path.slice(0, -1))
    expect((await request.get(path.slice(0, -1), { maxRedirects: 0 })).status()).toBe(200)
  }

  for (const path of [
    '/__seo_audit_missing_page__',
    '/blog/coceira-anal-quando-normal-e-quando-procurar-coloproctologista-curitiba-extra',
    `${equivalents[0][0]}/outra-pagina`,
    '/tratamentos/tratamento-inexistente',
  ]) {
    const missing = await request.get(path, { maxRedirects: 0 })
    expect(missing.status()).toBe(404)
    expect(missing.headers().location).toBeUndefined()
  }
})

test('pre-existing redirects still resolve directly to their published pages', async ({ request }) => {
  for (const [source, destination] of [
    ['/tratamentos/tratamento-hpv-anal', '/tratamentos/hpv-anal'],
    ['/blog/cisto-pilonidal-cirurgia-laser', '/blog/cisto-pilonidal-cirurgia-laser-quando-operar'],
    ['/blog/coloproctologia/prurido-anal-coceira-no-anus', itchArticle],
  ]) {
    const response = await request.get(source, { maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(new URL(response.headers().location, response.url()).pathname).toBe(destination)
    expect((await request.get(destination, { maxRedirects: 0 })).status()).toBe(200)
  }
})

test('legacy URLs also redirect Markdown clients to the canonical representation', async ({ request }) => {
  for (const [source, destination] of equivalents) {
    const response = await request.get(source, {
      headers: { Accept: 'text/markdown' },
      maxRedirects: 0,
    })
    expect(response.status()).toBe(308)
    expect(new URL(response.headers().location, response.url()).pathname).toBe(destination)

    const target = await request.get(destination, {
      headers: { Accept: 'text/markdown' },
      maxRedirects: 0,
    })
    expect(target.status()).toBe(200)
    expect(target.headers()['content-type']).toContain('text/markdown')
    expect(target.headers().link).toBe(`<${website}${destination}>; rel="canonical"`)
  }
})

test('treatment FAQs expose the same answers to readers and structured data', async ({ page }) => {
  for (const slug of ['cx-laser', 'cx-cisto-pilonidal']) {
    await page.goto(`/tratamentos/${slug}`)
    const faq = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
      scripts.map((script) => JSON.parse(script.textContent || '{}'))
        .find((schema) => schema['@type'] === 'FAQPage')
    )
    expect(faq.mainEntity).toHaveLength(4)
    for (const question of faq.mainEntity) {
      await expect(page.getByRole('heading', { level: 3, name: question.name, exact: true })).toBeVisible()
      await expect(page.getByText(question.acceptedAnswer.text, { exact: true })).toBeVisible()
    }
  }
})
