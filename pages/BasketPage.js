import { BasePage } from './BasePage.js';

/**
 * 購物車頁的頁面物件：封裝購物車標題定位和開頁動作
 */
export class BasketPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Your Basket' });
    this.totalPrice = page.getByText(/Total Price/);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout', exact: true });
  }

  /**
   * 打開購物車頁
   * @returns {Promise<void>}
   */
  async open() {
    await this.goto('/#/basket');
  }

  /**
   * 購物車表格裡某個商品的那一列
   * @param {string} name 商品全名，例如 'Apple Juice (1000ml)'
   * @returns {import('@playwright/test').Locator}
   */
  productRow(name) {
    return this.page.getByRole('row').filter({ has: this.page.getByRole('cell', { name, exact: true }) });
  }

  /**
   * 某個商品那一列的數量格
   * @param {string} name
   * @returns {import('@playwright/test').Locator}
   */
  quantityCell(name) {
    return this.productRow(name).locator('.mat-column-quantity');
  }
}
