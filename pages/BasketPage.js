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
  }

  /**
   * 打開購物車頁
   * @returns {Promise<void>}
   */
  async open() {
    await this.goto('/#/basket');
  }
}
