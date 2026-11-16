import { test, expect } from "../fixtures/pages.js";
test.use({ storageState: '.auth/user.json' });

test('設定使用者名稱後，重新打開頁面會顯示新名字', async ({ profilePage }) => {
    const name = `user_${Date.now()}`;
    await profilePage.open();
    await profilePage.setUsername(name);
    await profilePage.open();
    await expect(profilePage.usernameInput, '使用者名稱應該與設定相同').toHaveValue(name);
});