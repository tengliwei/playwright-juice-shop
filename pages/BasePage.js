/**
 * 所有页面对象的基底类别：保存 Playwright 的 page，提供共用的导航方法
 */
export class BasePage {
  /**
   * 建立页面对象时把 page 存起来，给后续方法使用
   * @param {import('@playwright/test').Page} page - Playwright 注入的分頁物件
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * 打开指定路径（相对于 baseURL）
   * @param {string} [path='/'] - 要打开的路径，不传就开首页
   * @returns {Promise<void>}
   */
  async goto(path = '/') {
    await this.page.goto(path);
  }

  /**
  * 登记遮挡物处理器：欢迎弹窗和 cookie 横幅一出现就自动关掉
  * @returns {Promise<void>}
  */
  async registerOverlayHandlers() {
    const welcomeButton = this.page.getByRole('button', { name: 'Close Welcome Banner' });
    await this.page.addLocatorHandler(welcomeButton, async() => {
      await welcomeButton.click();
    });
    const cookieAgreeButton = this.page.getByRole('button', { name: 'dismiss cookie message' });
    await this.page.addLocatorHandler(cookieAgreeButton, async() => {
      await cookieAgreeButton.dispatchEvent('click');
    });
  }

}
