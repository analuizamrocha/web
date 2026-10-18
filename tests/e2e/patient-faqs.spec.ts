import { expect, test } from '@playwright/test'
import { patientFAQs } from '../../src/lib/patient-faqs'

const path = '/perguntas-frequentes'

test('FAQ hub exposes every answer and matching structured data', async ({ page }) => {
  await page.goto(path)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Suas dúvidas merecem uma conversa.'
  )
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
