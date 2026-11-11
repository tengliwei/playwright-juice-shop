import {test, expect} from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';
/**
 * 冒煙測試：首頁能正常打開
 * @param {{ page: import('@playwright/test').Page }} fixtures - Playwright 自動注入的分頁物件
 */
test('首頁可以正常打開', async({ page }) => {
    const basePage = new BasePage(page);
    await basePage.registerOverlayHandlers();
    await basePage.goto();
    await expect(page).toHaveTitle(/OWASP Juice Shop/);
});

/**
 * 冒煙測試：歡迎彈窗被自動關掉後，帳號選單可以點開
 * @param {{ page: import('@playwright/test').Page }} fixtures - Playwright 自動注入的分頁物件
 */
test('彈窗被自動關閉，可以打開帳號選單', async({ page }) => {
    const basePage = new BasePage(page);
    await basePage.goto();
    await basePage.waitForWelcomeBanner();
    await basePage.registerOverlayHandlers();
    await basePage.openAccountMenu();
    await expect(page.getByRole('menuitem', { name: 'Go to login page' }),'帳戶選單內沒有登入項目').toBeVisible();
})