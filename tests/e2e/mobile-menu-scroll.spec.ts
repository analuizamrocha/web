import { expect, test } from '@playwright/test'

// iPhone-ish viewport without overriding browser type (describe-scoped use can't
// change defaultBrowserType). We only need the viewport + touch flags to make
// the mobile menu render.
const MOBILE_VIEWPORT = {
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 3,
}

/**
 * Regression tests for the mobile-menu scroll bugs fixed in:
 *   - src/hooks/useMobileMenu.ts (scroll-restore was animating because of
 *     `html { scroll-behavior: smooth }` in globals.css)
 *   - src/hooks/useActiveSection.ts (manual offset math + smooth scroll
 *     overshot when `content-visibility: auto` sections re-laid out mid-scroll)
 */

// Pre-accept cookies so the LGPD banner never intercepts clicks.
const acceptCookies = async (page: import('@playwright/test').Page) => {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('lgpd-cookie-consent', 'accepted')
    } catch {}
  })
}

test.describe('mobile menu — scroll behavior', () => {
  test.use(MOBILE_VIEWPORT)

  test.beforeEach(async ({ page }) => {
    await acceptCookies(page)
  })

  test('opening the menu does not move the page visually', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('header')
    await page.waitForSelector('#missao')

    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }))
    await page.waitForTimeout(100)

    const before = await page.evaluate(() => {
      const el = document.getElementById('missao')!
      return Math.round(el.getBoundingClientRect().top)
    })

    await page.click('button[aria-label="Abrir menu de navegação"]')
    await page.waitForTimeout(250)

    const during = await page.evaluate(() => {
      const el = document.getElementById('missao')!
      return Math.round(el.getBoundingClientRect().top)
    })

    // The position:fixed scroll-lock must keep #missao at the same viewport y.
    expect(Math.abs(during - before)).toBeLessThanOrEqual(2)
  })

  test('closing the menu restores scroll instantly (no smooth animation)', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForSelector('header')

    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }))
    await page.waitForTimeout(100)

    await page.click('button[aria-label="Abrir menu de navegação"]')
    await page.waitForTimeout(150)
    await page.click('button[aria-label="Fechar menu"]')

    // The restore must be synchronous. The original bug had scrollY animating
    // 0 → 464 → 706 → 1200 over ~650ms because of `scroll-behavior: smooth`.
    await page.waitForTimeout(80)
    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBe(1200)
  })

  test('clicking a far section lands precisely at scroll-margin-top', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForSelector('header')
    await page.waitForSelector('#atendimento')

    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }))
    await page.waitForTimeout(100)

    await page.click('button[aria-label="Abrir menu de navegação"]')
    await page.waitForTimeout(150)

    await page
      .locator('#mobile-menu button', { hasText: 'Locais de atendimento' })
      .click()

    // Wait for the smooth scroll to settle on this long jump.
    await page.waitForFunction(
      () => {
        const el = document.getElementById('atendimento')
        if (!el) return false
        const top = el.getBoundingClientRect().top
        // CSS scroll-margin-top: 93px → element should land at viewport y ≈ 93.
        return Math.abs(top - 93) <= 5
      },
      undefined,
      { timeout: 5000 },
    )

    const finalTop = await page.evaluate(
      () => document.getElementById('atendimento')!.getBoundingClientRect().top,
    )
    expect(Math.round(finalTop)).toBeGreaterThanOrEqual(88)
    expect(Math.round(finalTop)).toBeLessThanOrEqual(98)
  })

  test('clicking a short-distance section also lands precisely', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForSelector('header')
    await page.waitForSelector('#missao')

    await page.evaluate(() => window.scrollTo({ top: 200, behavior: 'instant' }))
    await page.waitForTimeout(100)

    await page.click('button[aria-label="Abrir menu de navegação"]')
    await page.waitForTimeout(150)

    await page.locator('#mobile-menu button', { hasText: 'Missão' }).click()

    await page.waitForFunction(
      () => {
        const el = document.getElementById('missao')
        if (!el) return false
        return Math.abs(el.getBoundingClientRect().top - 93) <= 5
      },
      undefined,
      { timeout: 5000 },
    )
  })

  test('mobile menu on non-homepage routes via Next.js (no scroll attempt)', async ({
    page,
  }) => {
    await page.goto('/blog')
    await page.waitForSelector('header')

    await page.click('button[aria-label="Abrir menu de navegação"]')
    await page.waitForTimeout(150)

    await page
      .locator('#mobile-menu a', { hasText: 'Locais de atendimento' })
      .click()

    await page.waitForURL('**/locais-de-atendimento')
    expect(page.url()).toMatch(/\/locais-de-atendimento$/)
  })

  test('skip link and mobile menu keep keyboard focus in the expected region', async ({
    page,
  }) => {
    await page.goto('/blog')

    await page.keyboard.press('Tab')
    await expect(page.locator('#skip-to-content')).toBeFocused()

    await page.getByRole('button', { name: 'Abrir menu de navegação' }).click()
    const dialog = page.getByRole('dialog', { name: 'Menu de navegação' })
    await expect(dialog).toBeVisible()

    const focusableCount = await dialog
      .locator('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      .count()

    for (let index = 0; index < focusableCount + 2; index += 1) {
      await page.keyboard.press('Tab')
      const focusStayedInMenu = await page.evaluate(() => {
        const activeElement = document.activeElement
        const menu = document.getElementById('mobile-menu')
        const menuButton = document.querySelector('button[aria-label="Fechar menu"]')
        return menu?.contains(activeElement) || activeElement === menuButton
      })
      expect(focusStayedInMenu).toBe(true)
    }

    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Abrir menu de navegação' })).toBeFocused()
  })
})

test.describe('desktop section nav — same scroll logic must still work', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test.beforeEach(async ({ page }) => {
    await acceptCookies(page)
  })

  test('desktop click on "Locais de atendimento" lands at top', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('header')

    await page.evaluate(() => window.scrollTo({ top: 200, behavior: 'instant' }))
    await page.waitForTimeout(100)

    await page
      .locator('header button', { hasText: 'Locais de atendimento' })
      .first()
      .click()

    await page.waitForFunction(
      () => {
        const el = document.getElementById('atendimento')
        if (!el) return false
        return Math.abs(el.getBoundingClientRect().top - 93) <= 5
      },
      undefined,
      { timeout: 5000 },
    )
  })
})
