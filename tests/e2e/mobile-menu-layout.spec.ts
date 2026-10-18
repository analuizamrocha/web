import { expect, test } from '@playwright/test'

const viewports = [
  { name: 'small portrait', width: 320, height: 568 },
  { name: 'portrait', width: 390, height: 667 },
  { name: 'short landscape', width: 667, height: 375 },
]

for (const viewport of viewports) {
  for (const path of ['/', '/blog']) {
    test(`${viewport.name}: compact menu fits at ${path}`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.addInitScript(() => localStorage.setItem('lgpd-cookie-consent', 'rejected'))
      await page.goto(path)
      await page.getByRole('button', { name: 'Abrir menu de navegação' }).click()

      const menu = page.getByRole('dialog', { name: 'Menu de navegação' })
      const navigation = menu.getByRole('navigation', { name: 'Navegação móvel' })
      const rows = navigation.locator('a, button')
      const expected = path === '/'
        ? ['Início', 'Missão', 'Serviços', 'Tratamentos', 'Locais de atendimento', 'Blog', 'Dúvidas']
        : ['Início', 'Blog', 'Dúvidas', 'Locais de atendimento', 'Tratamentos', 'Sobre']
      await expect(rows).toHaveText(expected)
      await expect.poll(() => navigation.evaluate((element) => {
        const container = element.parentElement!
        return container.scrollHeight - container.clientHeight
      })).toBeLessThanOrEqual(1)

      const measurements = await rows.evaluateAll((elements) => elements.map((element) => ({
        height: element.getBoundingClientRect().height,
        fontSize: parseFloat(getComputedStyle(element).fontSize),
      })))
      for (const row of measurements) {
        expect(row.height).toBeGreaterThanOrEqual(44)
        expect(row.fontSize).toBeLessThanOrEqual(16)
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      await expect(menu.getByRole('link', { name: /@analuiza/ })).toBeVisible()
      await page.screenshot({ path: test.info().outputPath('compact-menu.png') })

      await navigation.getByRole('link', { name: 'Dúvidas', exact: true }).click()
      await expect(page).toHaveURL(/\/perguntas-frequentes$/)
      await expect(page.getByRole('button', { name: 'Abrir menu de navegação' })).toBeVisible()
    })
  }
}

test('desktop navigation keeps Blog before Dúvidas', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  for (const path of ['/', '/blog']) {
    await page.goto(path)
    const routes = page.locator('header a').filter({ hasText: /^(Início|Blog|Dúvidas)$/ })
    await expect(routes).toHaveText(path === '/' ? ['Blog', 'Dúvidas'] : ['Início', 'Blog', 'Dúvidas'])
  }
})
