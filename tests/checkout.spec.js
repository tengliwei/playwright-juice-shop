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

  await searchPage.search('apple');
  await searchPage.addToBasket(productName);
  await basketPage.open();
  await basketPage.checkoutButton.click();

  await checkoutPage.addAddress({
    name: recipient,
    country: 'Taiwan',
    mobile: '912345678',
    zipCode: '100',
    street: 'Test Road 1',
    city: 'Taipei',
  });
  await checkoutPage.selectAddress(recipient);
  await checkoutPage.chooseDelivery('Fast Delivery');
  await checkoutPage.addCard({ name: recipient, cardNumber: '4111111111111111', expiryMonth: '7', expiryYear: '2090' });
  await checkoutPage.selectCard('************1111');

  const totalPriceRow = checkoutPage.tableRow('Total Price');
  await expect(totalPriceRow, `一瓶 ${productName} 1.99 加 Fast Delivery 運費 0.50`).toHaveText(/2\.49/);
  const orderId = await checkoutPage.placeOrder();
  await expect(page, '下單後應進到伺服器剛建立的這筆訂單的完成頁').toHaveURL(new RegExp(`order-completion/${orderId}`));
  await expect(checkoutPage.basketButton, '下單後商品已轉成訂單，購物車應清空').toContainText(/Basket0$/);
});
