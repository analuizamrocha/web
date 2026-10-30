import { expect, test } from '@playwright/test'

const enabled = process.env.MARKETING_TEST_MODE === 'enabled'
const TEST_LINK = 'https://go.mdxstudio.com.br/c/test1234'

test('isolated CTA follows consent, navigation and the WhatsApp handoff contract', async ({ page, context }) => {
  if (!enabled) {
    const response = await page.goto('/teste-marketing')
    expect(response?.status()).toBe(404)
    await page.goto('/')
    await expect(page.locator('a[href^="https://go.mdxstudio.com.br/c/"]')).toHaveCount(0)
    return
  }

  await page.goto('/teste-marketing?utm_source=google&utm_medium=cpc&utm_campaign=teste-release&gclid=TESTE123')
  const cta = page.getByRole('link', { name: 'Testar contato pelo WhatsApp' })
  await expect(cta).toHaveAttribute('href', TEST_LINK)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex.*nofollow/)
  expect(await page.evaluate(() => sessionStorage.getItem('mdx_tracking_params'))).toBeNull()

  await page.getByRole('button', { name: 'Aceitar cookies', exact: true }).click()
  await expect(cta).toHaveAttribute('href', /gclid=TESTE123/)
  await page.getByRole('link', { name: 'Conheça a médica', exact: true }).click()
  await expect(page).toHaveURL(/\/sobre$/)
  await expect(page.locator('a[href^="https://go.mdxstudio.com.br/c/"]')).toHaveCount(0)
  await page.goBack()
  await expect(cta).toHaveAttribute('href', /gclid=TESTE123/)

  // This pins the browser handoff only; live ingestion and inbound matching need the owner round trip.
  await context.route('https://go.mdxstudio.com.br/c/**', async route => {
    const url = new URL(route.request().url())
    expect(url.searchParams.get('gclid')).toBe('TESTE123')
    expect(url.searchParams.get('utm_campaign')).toBe('teste-release')
    await route.fulfill({status:200, contentType:'text/html', body:'<script>location.replace("https://wa.me/554130739732?text=Teste%20(ref%20K7M2Q9XA)")</script>'})
  })
  await context.route('https://wa.me/**', route => route.fulfill({status:200,contentType:'text/plain',body:'WhatsApp test handoff'}))
  const popupPromise = page.waitForEvent('popup')
  await cta.click()
  const popup = await popupPromise
  await expect(popup).toHaveURL(/wa\.me\/554130739732/)
  expect(new URL(popup.url()).searchParams.get('text')).toBe('Teste (ref K7M2Q9XA)')
  await popup.close()

  await page.getByRole('button', {name:'Gerenciar preferências de cookies'}).click()
  await page.getByRole('button', {name:'Recusar',exact:true}).click()
  await expect(cta).toHaveAttribute('href', TEST_LINK)
  expect(await page.evaluate(() => sessionStorage.getItem('mdx_tracking_params'))).toBeNull()
  await expect(page.locator('script[src*="go.mdxstudio.com.br"]')).toHaveCount(0)
})
