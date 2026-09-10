import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 90000,
  testDir: './tests',

  fullyParallel: true,

  // CI орчинд test.only үлдсэн байвал build-ийг унагаана
  forbidOnly: !!process.env.CI,

  // Зөвхөн CI дээр failed тестийг дахин оролдоно
  retries: process.env.CI ? 2 : 0,

  // CI дээр тогтвортой ажиллуулахын тулд 1 worker ашиглана
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    trace: 'on-first-retry',

    // Танай Windows HTTPS certificate асуудлыг тойрч ажиллуулна
    ignoreHTTPSErrors: true,

    // SauceDemo data-testid биш data-test ашигладаг
    testIdAttribute: 'data-test',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});