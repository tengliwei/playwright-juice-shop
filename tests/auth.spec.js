import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';

/**
 * 註冊新帳號後，用同一組帳密登入，帳號選單顯示自己的 email
 * @param {{ page: import('@playwright/test').Page }} fixtures
 */
test('新註冊的帳號可以登入', async ({ page }) => {
  const email = `user_${Date.now()}@test.com`;
  const password = '111111';
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  await registerPage.registerOverlayHandlers();
  await registerPage.open();
  await registerPage.register({ email, password, answer: 'answer'});
  await expect(page).toHaveURL(/#\/login/);
  await loginPage.login(email, password);
  await loginPage.openAccountMenu();
  await expect(loginPage.userProfileMenuItem).toContainText(email);
})