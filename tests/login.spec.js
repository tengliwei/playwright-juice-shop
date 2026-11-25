// tests/login.spec.js
import { test, expect } from '../fixtures/pages.js';
import loginButtonCases from '../test-data/login-buttons.json' with { type: 'json' };

test.describe('登入', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.registerOverlayHandlers();
  });

  test('正確帳密可以登入並進到商品頁', { tag: '@smoke' }, async ({ page, newUser, loginPage }) => {
    await loginPage.open();
    await loginPage.login(newUser.email, newUser.password);
    await expect(page).toHaveURL(/\/#\/search/);
    await loginPage.openAccountMenu();
    await expect(loginPage.userProfileMenuItem).toContainText(newUser.email);
  });

  test('密碼錯誤時登入失敗並停在登入頁', async ({ page, newUser, loginPage }) => {
    await loginPage.open();
    await loginPage.login(newUser.email, '222222');
    await expect(loginPage.errorMessage, '應該出現 Invalid email or password.').toBeVisible();
    await expect(page).toHaveURL(/#\/login/);
  });

  for (const testCase of loginButtonCases) {
    test(`登入按鈕狀態：${testCase.title}`, async ({ loginPage }) => {
      await loginPage.open();
      await loginPage.fillCredentials(testCase.email, testCase.password);
      await expect(loginPage.loginButton, `${testCase.title}，Login 按鈕可點擊應為 ${testCase.enabled}`).toBeEnabled({
        enabled: testCase.enabled,
      });
    });
  }

  test('登入按鈕狀態：同一頁依序切換', async ({ loginPage }) => {
    await loginPage.open();
    for (const testCase of loginButtonCases) {
      await loginPage.fillCredentials(testCase.email, testCase.password);
      await expect(loginPage.loginButton, `${testCase.title}，Login 按鈕可點擊應為 ${testCase.enabled}`).toBeEnabled({
        enabled: testCase.enabled,
      });
    }
  });
});
