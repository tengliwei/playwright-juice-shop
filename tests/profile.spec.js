import { test, expect } from "../fixtures/pages.js";

test.beforeEach(async ({ page, newUser, loginPage }) => {
    await loginPage.registerOverlayHandlers();
    await loginPage.open();
    await loginPage.login(newUser.email, newUser.password);
    await expect(page).toHaveURL(/\/#\/search/);
});

test('設定使用者名稱後，重新打開頁面會顯示新名字', async ({ profilePage }) => {
    const name = `user_${Date.now()}`;
    await profilePage.open();
    await profilePage.setUsername(name);
    await profilePage.open();
    await expect(profilePage.usernameInput, '使用者名稱應該與設定相同').toHaveValue(name);
});

test('新帳號還沒設定過使用者名稱', async ({ profilePage }) => {
    await profilePage.open();
    await expect(profilePage.usernameInput, '新帳號的使用者名稱應該是空的').toHaveValue('');
});
