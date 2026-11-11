import { BasePage } from './BasePage.js';

/**
 * 登录页的页面对象：封装登录页的元素定位和登录动作
 */
export class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Text field for the login email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Text field for the login password' });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
  }

  /**
   * 打开登录页
   * @returns {Promise<void>}
   */
  async open() {
    await this.goto('/#/login');
  }

  /**
   * 填入账号密码并按下登录
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
