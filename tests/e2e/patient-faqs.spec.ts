import { expect, test } from '@playwright/test'
import { patientFAQs } from '../../src/lib/patient-faqs'

const path = '/perguntas-frequentes'

test.beforeEach(async ({ page }) => {
  // Keep the delayed cookie banner from covering the controls under test.
  await page.addInitScript(() => localStorage.setItem('lgpd-cookie-consent', 'rejected'))
})

test('FAQ hub exposes every answer and matching structured data', async ({ page }) => {
  await page.goto(path)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Suas dúvidas merecem uma conversa.'
  )
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('font-weight', '700')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `https://www.analuizarocha.com.br${path}`
  )
  await expect(page.locator('details')).toHaveCount(patientFAQs.length)
  const schema = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts
        .map((script) => JSON.parse(script.textContent || '{}'))
        .find((item) => item['@type'] === 'FAQPage')
    )
  expect(schema.mainEntity).toHaveLength(patientFAQs.length)
  await page.locator('#faq-hemorroidas summary').first().click()
  await expect(page.locator('#faq-hemorroidas details').first()).toHaveAttribute('open', '')
  await expect(page.locator('#faq-hemorroidas details').first()).toContainText(
    patientFAQs.find((item) => item.id === 'hemorroida-cirurgia')!.answer
  )
})

for (const width of [375, 390, 768, 1440]) {
  test(`highlight arrows align cards and stop at both edges at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(path)
    const track = page.locator('#faq-highlights')
    const prev = page.getByRole('button', { name: 'Ver destaques anteriores' })
    const next = page.getByRole('button', { name: 'Ver próximos destaques' })
    await expect(prev).toBeDisabled()
    await expect(next).toBeEnabled()
    const positions = await track.evaluate((element) => {
      const max = element.scrollWidth - element.clientWidth
      const left = element.getBoundingClientRect().left
      return [...new Set(Array.from(element.children, (child) =>
        Math.round(Math.min(max, child.getBoundingClientRect().left - left + element.scrollLeft))
      ))]
    })
    for (const position of positions.slice(1)) {
      await next.click()
      await expect.poll(async () => Math.abs(await track.evaluate((el) => el.scrollLeft) - position)).toBeLessThanOrEqual(1)
    }
    await expect(next).toBeDisabled()
    for (const position of positions.slice(0, -1).reverse()) {
      await prev.click()
      await expect.poll(async () => Math.abs(await track.evaluate((el) => el.scrollLeft) - position)).toBeLessThanOrEqual(1)
    }
    await expect(prev).toBeDisabled()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

test('rapid clicks, manual scrolling and resizing keep highlight controls in sync', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(path)
  const track = page.locator('#faq-highlights')
  const prev = page.getByRole('button', { name: 'Ver destaques anteriores' })
  const next = page.getByRole('button', { name: 'Ver próximos destaques' })
  await expect(next).toBeEnabled()
  await next.evaluate((button: HTMLButtonElement) => {
    for (let i = 0; i < 20; i++) button.click()
  })
  await expect(next).toBeDisabled()
  await expect.poll(() => track.evaluate((el) => Math.abs(el.scrollLeft - (el.scrollWidth - el.clientWidth)))).toBeLessThanOrEqual(1)
  await prev.evaluate((button: HTMLButtonElement) => {
    for (let i = 0; i < 20; i++) button.click()
  })
  await expect(prev).toBeDisabled()
  await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBe(0)
  await track.evaluate((el) => el.scrollTo({ left: el.scrollWidth, behavior: 'instant' }))
  await expect(next).toBeDisabled()
  await expect(prev).toBeEnabled()
  await page.setViewportSize({ width: 1440, height: 900 })
  await expect.poll(() => track.evaluate((el) => Math.abs(el.scrollLeft - (el.scrollWidth - el.clientWidth)))).toBeLessThanOrEqual(1)
  await expect(next).toBeDisabled()
  await prev.click()
  await expect(next).toBeEnabled()
})

test('mobile topic links and manual highlight carousel work without page overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(path)
  const track = page.locator('#faq-highlights')
  await page.getByRole('button', { name: 'Ver próximos destaques' }).click()
  await expect.poll(() => track.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0)
  await page.getByRole('button', { name: 'Ver destaques anteriores' }).click()
  await expect.poll(() => track.evaluate((element) => element.scrollLeft)).toBe(0)
  await page
    .getByRole('navigation', { name: 'Assuntos das perguntas frequentes' })
    .getByRole('link', { name: /Hemorroidas/ })
    .click()
  await expect(page).toHaveURL(/#faq-hemorroidas$/)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true
  )
})

test('answers remain readable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL })
  try {
    const page = await context.newPage()
    await page.goto(path)
    await page.locator('#faq-consulta summary').first().click()
    await expect(page.locator('#faq-consulta details').first()).toHaveAttribute('open', '')
    await expect(page.locator('#faq-consulta details').first()).toContainText(patientFAQs[0].answer)
  } finally {
    await context.close()
  }
})
