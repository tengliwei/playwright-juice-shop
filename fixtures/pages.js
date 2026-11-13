import { test as base, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

/**
 * 擴充 Playwright 的 test：把頁面物件注入成 fixture，spec 直接從參數拿
 */
export const test = base.extend({
  /**
   * @param {{ page: import('@playwright/test').Page }} fixtures - 這個 Fixture 依賴的其他 Fixture
   * @param {(value: LoginPage) => Promise<void>} use - 把準備好的東西交給測試
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  }
});

export { expect };
