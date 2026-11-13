/**
 * 所有頁面物件的基底類別：保存 Playwright 的 page，提供共用的導航方法
 */
export class BasePage {
  /**
   * 建立頁面物件時把 page 存起來，給後續方法使用
   * @param {import('@playwright/test').Page} page - Playwright 注入的分頁物件
   */
  constructor(page) {
    this.page = page;
    this.welcomeCloseButton = this.page.getByRole('button', { name: 'Close Welcome Banner' });
    this.userProfileMenuItem = this.page.getByRole('menuitem', { name: 'Go to user profile' });
  }

  /**
   * 打開指定路徑（相對於 baseURL）
   * @param {string} [path='/'] - 要打開的路徑，不傳就開首頁
   * @returns {Promise<void>}
   */
  async goto(path = '/') {
    await this.page.goto(path);
  }

  /**
   * 登記遮擋物處理器：歡迎彈窗和 cookie 橫幅一出現就自動關掉
   * @returns {Promise<void>}
   */
  async registerOverlayHandlers() {
    await this.page.addLocatorHandler(this.welcomeCloseButton, async() => {
      await this.welcomeCloseButton.click();
    });
    const cookieAgreeButton = this.page.getByRole('button', { name: 'dismiss cookie message' });
    await this.page.addLocatorHandler(cookieAgreeButton, async() => {
      await cookieAgreeButton.dispatchEvent('click');
    });
  }

  /**
   * 點開右上角的帳號選單
   * @returns {Promise<void>}
   */
  async openAccountMenu() {
    const accountMenu = this.page.getByRole('button', { name: 'Show/hide account menu' });
    await accountMenu.click();
  }

  /**
   * 等待歡迎彈窗出現（只用來驗證 handler，平常不需要呼叫）
   * @returns {Promise<void>}
   */
  async waitForWelcomeBanner() {
   await this.welcomeCloseButton.waitFor();
  }
}
