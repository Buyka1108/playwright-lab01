import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright test configuration
 */
export default defineConfig({
  // Нэг тестийн хамгийн их ажиллах хугацаа
  timeout: 90000,

  // Test файлууд байрлах хавтас
  testDir: './tests',

  // Тестүүдийг зэрэг ажиллуулахгүй
  fullyParallel: false,

  // CI орчинд test.only үлдсэн эсэхийг шалгана
  forbidOnly: !!process.env.CI,

  // Сүлжээний түр зуурын алдаа гарвал 2 удаа дахин оролдоно
  retries: 2,

  // Нэг worker ашиглаж тестүүдийг дарааллаар ажиллуулна
  workers: 1,

  // HTML report үүсгэнэ
  reporter: 'html',

  // Бүх тестэд ашиглах ерөнхий тохиргоо
  use: {
    // Retry хийх үед Trace хадгална
    trace: 'on-first-retry',

    // Windows HTTPS certificate шалгалтын асуудлыг тойрч ажиллана
    ignoreHTTPSErrors: true,
  },

  // SauceDemo тестийг Chromium browser дээр ажиллуулна
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});