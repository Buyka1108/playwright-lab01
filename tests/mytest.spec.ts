import { test, expect } from '@playwright/test';


// ==========================================
// TEST 1: Амжилттай нэвтрэх
// ==========================================
test('Амжилттай нэвтрэх тест', async ({ page }) => {

  // SauceDemo веб сайтыг нээнэ
  await page.goto('https://www.saucedemo.com');

  // Username оруулна
  await page.getByPlaceholder('Username').fill('standard_user');

  // Password оруулна
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Login товч дарна
  await page.getByRole('button', { name: 'Login' }).click();

  // Products гэсэн текст харагдаж байгаа эсэхийг шалгана
  await expect(page.getByText('Products')).toBeVisible();

  // Menu нээнэ
  await page.getByRole('button', { name: 'Open Menu' }).click();

  // Logout хийнэ
  await page.getByText('Logout').click();

  // Login хуудас руу буцсан эсэхийг шалгана
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});


// ==========================================
// TEST 2: Амжилтгүй нэвтрэх
// ==========================================
test('Амжилтгүй нэвтрэх тест', async ({ page }) => {

  // SauceDemo сайтыг нээнэ
  await page.goto('https://www.saucedemo.com');

  // Зөв username оруулна
  await page.getByPlaceholder('Username').fill('standard_user');

  // Санаатайгаар буруу password оруулна
  await page.getByPlaceholder('Password').fill('wrong_password');

  // Login товч дарна
  await page.getByRole('button', { name: 'Login' }).click();

  // Алдааны мэдээлэл гарсан эсэхийг шалгана
  await expect(
    page.getByText(/Username and password do not match/)
  ).toBeVisible();

});


// ==========================================
// TEST 3: Нэвтэрсний дараа бараа сагсанд нэмэх
// ==========================================
test('Барааг сагсанд нэмэх тест', async ({ page }) => {

  // SauceDemo сайтыг нээнэ
  await page.goto('https://www.saucedemo.com');

  // Нэвтрэх
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Нэвтэрсэн эсэхийг шалгана
  await expect(page.getByText('Products')).toBeVisible();

  // Sauce Labs Backpack барааг сагсанд нэмнэ
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Сагсны тоо 1 болсон эсэхийг шалгана
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Menu нээнэ
  await page.getByRole('button', { name: 'Open Menu' }).click();

  // Logout хийнэ
  await page.getByText('Logout').click();

  // Login хуудас руу буцсан эсэхийг шалгана
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

});