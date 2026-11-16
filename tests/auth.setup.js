import { test, expect } from '../fixtures/pages.js';
import { writeFile } from 'node:fs/promises';

// 把登入狀態檔的路徑存成常數，之後 spec 也要用同一個路徑
const authFile = '.auth/user.json';
const userInfoFile = '.auth/user-info.json';

test('建立登入狀態', async ({ page, registerPage, loginPage }) => {
  const email = `user${Date.now()}@test.com`;
  const password = '111111';
  await registerPage.registerOverlayHandlers();
  await registerPage.open();
  await registerPage.register({ email, password, answer: 'answer'});
  await expect(page).toHaveURL(/#\/login/);
  await loginPage.login(email,password);
  await expect(page).toHaveURL(/\/#\/search/);
  await page.context().storageState({ path: authFile});
  await writeFile(userInfoFile, JSON.stringify({ email }));
});
