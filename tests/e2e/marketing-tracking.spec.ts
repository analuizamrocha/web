import { expect, test, type Page } from '@playwright/test'

const enabled = process.env.MARKETING_TEST_MODE === 'enabled'
const TEST_LINK = 'https://go.mdxstudio.com.br/c/test1234'
const DIRECT = /^https:\/\/wa\.me\/554130739732\?text=/
const LANDING = '/?utm_source=google&utm_medium=cpc&utm_campaign=teste-home-piloto&gclid=TESTE123'
const CTA_NAME = 'Agende sua consulta agora pelo WhatsApp'

const tracked = (page: Page) => page.locator('a[href^="https://go.mdxstudio.com.br/"]')
const heroCta = (page: Page) => page.locator('#hero').getByRole('link', { name: CTA_NAME })

test('home hero alone follows consent, navigation and the WhatsApp handoff contract', async ({ page, context }) => {
  if (!enabled) {
    await page.goto(LANDING)
    await expect(heroCta(page)).toHaveAttribute('href', DIRECT)
    await expect(tracked(page)).toHaveCount(0)
    return
  }

  await page.goto(LANDING)
  await expect(heroCta(page)).toHaveAttribute('href', TEST_LINK)
  await expect(tracked(page)).toHaveCount(1)
  await expect(page.locator('#servicos').getByRole('link', { name: CTA_NAME })).toHaveAttribute('href', DIRECT)
  expect(await page.evaluate(() => sessionStorage.getItem('mdx_tracking_params'))).toBeNull()

  await page.getByRole('button', { name: 'Aceitar cookies', exact: true }).click()
  await expect(heroCta(page)).toHaveAttribute('href', /gclid=TESTE123/)
  const decorated = new URL((await heroCta(page).getAttribute('href'))!)
  expect(Object.fromEntries(decorated.searchParams)).toEqual({
    utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'teste-home-piloto', gclid: 'TESTE123',
  })

  // Client navigation away, then an untagged load of home: the campaign comes from the session.
  await page.locator('a[href="/sobre"]:visible').first().click()
  await expect(page).toHaveURL(/\/sobre$/)
  await expect(tracked(page)).toHaveCount(0)
  await page.goto('/')
  await expect(heroCta(page)).toHaveAttribute('href', /utm_campaign=teste-home-piloto/)
  await expect(tracked(page)).toHaveCount(1)

  // This pins the browser handoff only; live ingestion and inbound matching need the owner round trip.
  await context.route('https://go.mdxstudio.com.br/c/**', async route => {
    const url = new URL(route.request().url())
    expect(url.searchParams.get('gclid')).toBe('TESTE123')
    expect(url.searchParams.get('utm_campaign')).toBe('teste-home-piloto')
    await route.fulfill({ status: 200, contentType: 'text/html', body: '<script>location.replace("https://wa.me/554130739732?text=Teste%20(ref%20K7M2Q9XA)")</script>' })
  })
  await context.route('https://wa.me/**', route => route.fulfill({ status: 200, contentType: 'text/plain', body: 'WhatsApp test handoff' }))
  const popupPromise = page.waitForEvent('popup')
  await heroCta(page).click()
  const popup = await popupPromise
  await expect(popup).toHaveURL(/wa\.me\/554130739732/)
  expect(new URL(popup.url()).searchParams.get('text')).toBe('Teste (ref K7M2Q9XA)')
  await popup.close()

  await page.getByRole('button', { name: 'Gerenciar preferências de cookies' }).click()
  await page.getByRole('button', { name: 'Recusar', exact: true }).click()
  await expect(heroCta(page)).toHaveAttribute('href', TEST_LINK)
  expect(await page.evaluate(() => sessionStorage.getItem('mdx_tracking_params'))).toBeNull()
  await expect(page.locator('script[src*="go.mdxstudio.com.br"]')).toHaveCount(0)
})

test('mobile layout keeps the menu WhatsApp link direct while the hero is tracked', async ({ page }) => {
  test.skip(!enabled, 'disabled mode is covered by the direct-link assertions above')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir menu de navegação' }).click()
  const menu = page.getByRole('dialog', { name: 'Menu de navegação' })
  await expect(menu.locator('a[href^="https://wa.me/"]').first()).toHaveAttribute('href', DIRECT)
  await expect(heroCta(page)).toHaveAttribute('href', TEST_LINK)
  await expect(tracked(page)).toHaveCount(1)
})
