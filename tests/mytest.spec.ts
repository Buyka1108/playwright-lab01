import { test, expect } from '@playwright/test';

/**
 * Лаборатори №1
 * SauceDemo веб системийн UI автомат тест
 *
 * Тестүүд:
 * 1. Амжилттай нэвтрэх
 * 2. Амжилтгүй нэвтрэх
 * 3. Нэвтрээд барааг сагсанд нэмэх
 */

test('Амжилттай нэвтрэх тест', async ({ page }) => {

  // SauceDemo веб сайтыг нээнэ.
  await page.goto('https://www.saucedemo.com', {
    waitUntil: 'domcontentloaded',
  });

  // Хэрэглэгчийн нэр болон нууц үгийг оруулна.
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Login товчийг role locator ашиглан дарна.
  await page.getByRole('button', { name: 'Login' }).click();

  // Нэвтрэлт амжилттай болсон эсэхийг URL-аар шалгана.
  await expect(page).toHaveURL(/inventory\.html/);

  // Products гарчиг яг харагдаж байгаа эсэхийг шалгана.
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  // Нэвтэрсэн тестийг Logout үйлдлээр заавал төгсгөнө.
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();

  // Logout хийсний дараа login хуудас руу буцсаныг шалгана.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(
    page.getByRole('button', { name: 'Login' })
  ).toBeVisible();
});


test('Амжилтгүй нэвтрэх тест', async ({ page }) => {

  // SauceDemo веб сайтыг нээнэ.
  await page.goto('https://www.saucedemo.com', {
    waitUntil: 'domcontentloaded',
  });

  // Зөв username, буруу password ашиглана.
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');

  // Login товчийг дарна.
  await page.getByRole('button', { name: 'Login' }).click();

  // Алдааны мэдээлэл харагдаж байгаа эсэхийг assertion ашиглан шалгана.
  await expect(
    page.getByText(
      'Epic sadface: Username and password do not match any user in this service',
      { exact: true }
    )
  ).toBeVisible();

  // Амжилтгүй нэвтэрсэн тул authenticated session үүсээгүй.
  // Иймээс энэ тестэд Logout хийх шаардлагагүй.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});


test('Барааг сагсанд нэмэх тест', async ({ page }) => {

  // SauceDemo веб сайтыг нээнэ.
  await page.goto('https://www.saucedemo.com', {
    waitUntil: 'domcontentloaded',
  });

  // Системд амжилттай нэвтэрнэ.
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Inventory хуудас руу орсныг шалгана.
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  // Эхний бүтээгдэхүүнийг сагсанд нэмнэ.
  // XPath болон ID selector ашиглахын оронд хэрэглэгчид харагдах
  // button role-ийг ашиглаж байна.
  await page
    .getByTestId('add-to-cart-sauce-labs-backpack')
    .click();

  await expect(
    page.getByTestId('shopping-cart-badge')
  ).toHaveText('1');

  // Нэвтэрсэн тестийг Logout үйлдлээр төгсгөнө.
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();

  // Logout хийсний дараа login хуудас руу буцсаныг шалгана.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(
    page.getByRole('button', { name: 'Login' })
  ).toBeVisible();
});