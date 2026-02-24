import { expect, test } from '@playwright/test'

test('homepage renders hero content and primary CTA', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /Cada paciente uma história/i,
    })
  ).toBeVisible()

  await expect(
    page.getByRole('link', {
      name: /Agende sua consulta agora/i,
    })
  ).toBeVisible()
})

test('cookie consent stores accepted decision', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('Cookies & Privacidade')).toBeVisible({
    timeout: 10_000,
  })

  await page.getByRole('button', { name: 'Aceitar e continuar' }).click()
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
})
