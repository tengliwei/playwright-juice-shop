import { test, expect } from '../fixtures/pages.js';

test('首頁可以正常打開', async({ page, basePage }) => {
    await basePage.registerOverlayHandlers();
    await basePage.goto();
    await expect(page).toHaveTitle(/OWASP Juice Shop/);
});

test('彈窗被自動關閉，可以打開帳號選單', async({ page, basePage }) => {
    await basePage.goto();
    await basePage.waitForWelcomeBanner();
    await basePage.registerOverlayHandlers();
    await basePage.openAccountMenu();
    await expect(page.getByRole('menuitem', { name: 'Go to login page' }),'帳戶選單內沒有登入項目').toBeVisible();
})