import { test, expect } from '../fixtures/pages.js';
import { readFile } from 'node:fs/promises';

test.describe('已登入', () => {
  test.use({ storageState: '.auth/user.json' });

  test('購物車標題顯示目前帳號的 email', async ({ basketPage }) => {
    const { email } = JSON.parse(await readFile('.auth/user-info.json', 'utf-8'));
    await basketPage.open();
    await expect(basketPage.heading, '購物車標題應該顯示登入帳號的 email').toContainText(email);
  });
});

test.describe('未登入（對照組）', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('購物車沒有標題', async ({ basketPage }) => {
    await basketPage.open();
    await expect(basketPage.heading, '沒登入時購物車不應該顯示標題').toBeHidden();
  });
});
