import { BasePage } from './BasePage.js';

/**
 * 搜尋頁的頁面物件：負責搜尋商品、在結果裡找商品、加入購物車
 */
export class SearchPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.openSearchButton = page.getByRole('button', { name: 'Open search' });
    this.searchInput = page.locator('app-mat-search-bar').getByRole('textbox');
    this.closeNoticeButton = page.getByRole('button', { name: 'X', exact: true });
  }

  /**
   * 從導覽列搜尋關鍵字
   * @param {string} keyword
   * @returns {Promise<void>}
   */
  async search(keyword) {
    await this.openSearchButton.click();
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }

  /**
   * 依商品名稱找到結果裡那一張商品卡
   * @param {string} productName - 完整商品名，例如 'Apple Juice (1000ml)'
   * @returns {import('@playwright/test').Locator}
   */
  productCard(productName) {
    return this.page
      .getByRole('article')
      .filter({ has: this.page.getByRole('img', { name: productName, exact: true }) });
  }

  /**
   * 把指定商品加入購物車，等伺服器回應完才結束
   * @param {string} productName
   * @returns {Promise<void>}
   */
  async addToBasket(productName) {
    const basketItemsResponse = this.page.waitForResponse(
      (response) => response.url().includes('/api/BasketItems') && response.request().method() === 'POST',
    );
    await this.productCard(productName).getByRole('button', { name: 'Add to Basket', exact: true }).click();
    await basketItemsResponse;
  }

  /**
   * 關掉「已加入購物車」的提示條，避免擋住後面頁面的按鈕
   * @returns {Promise<void>}
   */
  async closeBasketNotice() {
    await this.closeNoticeButton.click();
  }
}
