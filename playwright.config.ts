import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'
const playwrightHtmlReportDir = 'reports/playwright/html'
const playwrightArtifactsDir = 'reports/playwright/artifacts'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never', outputFolder: playwrightHtmlReportDir }]],
  outputDir: playwrightArtifactsDir,
  timeout: 30_000,
  expect: {
    timeout: 8_000,
  },
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // `video: 'retain-on-failure'` hangs context teardown for ~30s per failed
    // test when paired with `channel: 'chrome'`. Disabled for now — re-enable
    // once we're back on Playwright's bundled Chromium.
    video: 'off',
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: process.env.PLAYWRIGHT_PRODUCTION === 'true' ? 'bun run start' : 'bun run dev',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {
      name: 'chromium',
      // CI uses the Chromium installed by the workflow; local runs use Chrome.
      use: { ...devices['Desktop Chrome'], ...(process.env.CI ? {} : { channel: 'chrome' }) },
    },
  ],
})
