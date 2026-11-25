import { test, expect } from '../fixtures/pages.js';

test.beforeEach(async ({ page, loginPage, newUser }) => {
  await loginPage.registerOverlayHandlers();
  await loginPage.open();
  await loginPage.login(newUser.email, newUser.password);
  await expect(page).toHaveURL(/\/#\/search/);
});

test('加入一瓶 Apple Juice 後，購物車數量與總價正確', async ({ searchPage, basketPage }) => {
  await searchPage.search('apple');
  const productName = 'Apple Juice (1000ml)';
  await expect(searchPage.productCard(productName), `${productName}的商品卡剛好 1 張`).toHaveCount(1);
  await searchPage.addToBasket(productName);
  await expect(searchPage.basketButton, '購物車按鈕含有 1').toContainText('1');
  await basketPage.open();
  await expect(basketPage.productRow(productName), `購物車裡${productName}只有 1 列`).toHaveCount(1);
  await expect(basketPage.quantityCell(productName), `只加一次，${productName}數量應為 1`).toHaveText('1');
  await expect(basketPage.totalPrice, `總價應等於一瓶 ${productName} 的單價`).toHaveText('Total Price: 1.99¤');
});
