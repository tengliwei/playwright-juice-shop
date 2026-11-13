import { BasePage } from './BasePage.js';

/**
 * 登入頁的頁面物件：封裝登入頁的元素定位和登入動作
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
    this.errorMessage = page.getByRole('alert');
  }

  /**
   * 打開登入頁
   * @returns {Promise<void>}
   */
  async open() {
    await this.goto('/#/login');
  }

  /**
   * 只填帳號密碼，不按登入（空欄位情境用）
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  async fillCredentials(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  /**
   * 填入帳號密碼並按下登入
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  async login(email, password) {
    await this.fillCredentials(email, password);
    await this.loginButton.click();
  }
}
