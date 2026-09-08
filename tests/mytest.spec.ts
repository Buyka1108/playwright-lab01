import { test, expect } from '@playwright/test';

test('Амжилттай нэвтрэх тест', async ({ page }) => {

  // SauceDemo веб сайтыг нээнэ
  await page.goto('https://www.saucedemo.com');

  // Username оруулна
  await page.getByPlaceholder('Username').fill('standard_user');

  // Password оруулна
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Login товч дарна
  await page.getByRole('button', { name: 'Login' }).click();

  // Амжилттай нэвтэрсэн эсэхийг шалгана
  await expect(page.getByText('Products')).toBeVisible();

});