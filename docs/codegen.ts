import { test, expect } from '@playwright/test';

/**
 * Playwright Codegen ашиглан үүсгэсэн кодын жишээ.
 *
 * Команд:
 * npx playwright codegen https://www.saucedemo.com
 *
 * Энэ файлыг үндсэн тест болгон ашиглаагүй.
 * Codegen-оос гарсан locator-уудыг өөрийн бичсэн
 * role-based locator-уудтай харьцуулах зорилгоор хадгалсан.
 */

test('Codegen login example', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');

  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');

  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory\.html/);
});