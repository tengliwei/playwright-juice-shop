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
}
