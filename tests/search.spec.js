import { test, expect } from '../fixtures/pages.js';

test.beforeEach(async ({ page, loginPage, newUser }) => {
  await loginPage.registerOverlayHandlers();
  await loginPage.open();
  await loginPage.login(newUser.email, newUser.password);
  await expect(page).toHaveURL(/\/#\/search/);
});

test('搜尋商品並加入購物車後，導覽列購物車數量變成 1', async ({ searchPage }) => {
  await searchPage.search('apple');
  const productName = 'Apple Juice (1000ml)';
  await expect(searchPage.productCard(productName), `${productName}的商品卡剛好 1 張`).toHaveCount(1);
  await searchPage.addToBasket(productName);
  await expect (searchPage.basketButton, '購物車按鈕含有 1').toContainText('1');
});
