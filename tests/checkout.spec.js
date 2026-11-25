import { test, expect } from '../fixtures/pages.js';

test.beforeEach(async ({ page, loginPage, newUser }) => {
  await loginPage.registerOverlayHandlers();
  await loginPage.open();
  await loginPage.login(newUser.email, newUser.password);
  await expect(page).toHaveURL(/\/#\/search/);
});

test('買一瓶 Apple Juice 走完結帳，金額與訂單正確', async ({ page, searchPage, basketPage, checkoutPage }) => {
  const productName = 'Apple Juice (1000ml)';
  const recipient = 'Test User';

  await test.step('搜尋商品並加入購物車', async () => {
    await searchPage.search('apple');
    await searchPage.addToBasket(productName);
    await searchPage.closeBasketNotice();
  });

  await test.step('從購物車進入結帳', async () => {
    await basketPage.open();
    await basketPage.checkoutButton.click();
  });

  await test.step('新增並選擇地址', async () => {
    await checkoutPage.addAddress({
      name: recipient,
      country: 'Taiwan',
      mobile: '912345678',
      zipCode: '100',
      street: 'Test Road 1',
      city: 'Taipei',
    });
    await checkoutPage.selectAddress(recipient);
  });

  await test.step('選擇送貨方式', async () => {
    await checkoutPage.chooseDelivery('Fast Delivery');
  });

  await test.step('新增並選擇信用卡', async () => {
    await checkoutPage.addCard({
      name: recipient,
      cardNumber: '4111111111111111',
      expiryMonth: '7',
      expiryYear: '2090',
    });
    await checkoutPage.selectCard('************1111');
  });

  await test.step('確認金額', async () => {
    const totalPriceRow = checkoutPage.tableRow('Total Price');
    await expect(totalPriceRow, `一瓶 ${productName} 1.99 加 Fast Delivery 運費 0.50`).toHaveText(/2\.49/);
  });

  const orderId = await test.step('下單', async () => {
    return await checkoutPage.placeOrder();
  });

  await test.step('確認訂單完成且購物車清空', async () => {
    await expect(page, '下單後應進到伺服器剛建立的這筆訂單的完成頁').toHaveURL(
      new RegExp(`order-completion/${orderId}`),
    );
    await expect(checkoutPage.basketButton, '下單後商品已轉成訂單，購物車應清空').toContainText(/Basket0$/);
  });
});
