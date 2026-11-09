import {test, expect} from '@playwright/test';

/**
 * 冒煙測試：首頁能正常打開
 * @param {{ page: import('@playwright/test').Page }} fixtures - Playwright 自動注入的分頁物件
 */
test('首頁可以正常打開', async({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/OWASP Juice Shop/);
});