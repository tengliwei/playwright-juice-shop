// tests/login.spec.js
import { test, expect } from "../fixtures/pages.js";

test.describe('登入', () => {
  test.beforeEach(async({ registerPage }) => {
    await registerPage.registerOverlayHandlers();
  })

  test('正確帳密可以登入並進到商品頁', async ({ page, registerPage, loginPage }) => {
    const email = `user_${Date.now()}@test.com`;
    const password = '111111';
    await registerPage.open();
    await registerPage.register({email, password, answer: 'answer'});
    await expect(page).toHaveURL(/#\/login/);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/\/#\/search/);
    await loginPage.openAccountMenu();
    await expect(loginPage.userProfileMenuItem).toContainText(email);
  });

  test('密碼錯誤時登入失敗並停在登入頁', async ({ page, registerPage, loginPage }) => {
    const email = `user_${Date.now()}@test.com`;
    const password = '111111';
    await registerPage.open();
    await registerPage.register({ email, password, answer: 'answer'});
    await expect(page).toHaveURL(/#\/login/);
    await loginPage.login(email, '222222');
    await expect(loginPage.errorMessage, '應該出現 Invalid email or password.').toBeVisible();
    await expect(page).toHaveURL(/#\/login/);
  });

  test('兩欄都空時不能按登入', async({ loginPage }) => {
    await loginPage.open();
    await expect(loginPage.loginButton, '欄位空著時 Login 按鈕應該是灰的').toBeDisabled();
  });

  test('只填 email 時不能按登入', async({ loginPage }) => {
    const email = 'test@test.com';
    await loginPage.open();
    await loginPage.fillCredentials(email, '');
    await expect(loginPage.loginButton, '只填 email 時 Login 按鈕應該是灰的').toBeDisabled();
  });

  test('兩欄都填時可以按登入', async({ loginPage }) => {
    const email = 'test@test.com';
    const password = '111111';
    await loginPage.open();
    await loginPage.fillCredentials(email, password);
    await expect(loginPage.loginButton, 'email 與 password 都填時 Login 按鈕應該能點擊').toBeEnabled();
  });
});
