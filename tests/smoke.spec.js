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