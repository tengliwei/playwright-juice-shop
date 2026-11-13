import { test, expect } from "../fixtures/pages.js";

test('新註冊的帳號可以登入且選單顯示註冊郵箱', async ({ page,registerPage, loginPage }) => {
  const email = `user_${Date.now()}@test.com`;
  const password = '111111';
  await registerPage.registerOverlayHandlers();
  await registerPage.open();
  await registerPage.register({ email, password, answer: 'answer'});
  await expect(page).toHaveURL(/#\/login/);
  await loginPage.login(email, password);
  await loginPage.openAccountMenu();
  await expect(loginPage.userProfileMenuItem).toContainText(email);
})