import { test as base, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { BasketPage } from '../pages/BasketPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { randomUUID } from 'node:crypto';

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
  },
  basketPage: async ({ page }, use) => {
    const basketPage = new BasketPage(page);
    await use(basketPage);
  },
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },
  /**
   * 透過 API 註冊一個全新帳號，交給測試使用（不經過畫面）
   * @param {{ request: import('@playwright/test').APIRequestContext }} fixtures
   * @param {(value: { email: string, password: string }) => Promise<void>} use
   */
  newUser: async({ request }, use) => {
    const email = `user_${Date.now()}${randomUUID().slice(0, 8)}@test.com`;
    const password = process.env.TEST_PASSWORD ?? '111111';
    const response = await request.post('/api/Users', {
      data:{
        email,
        password,
        passwordRepeat: password
      }
    });
    await expect(response).toBeOK();
    await use({ email, password });
  }
});

export { expect };
