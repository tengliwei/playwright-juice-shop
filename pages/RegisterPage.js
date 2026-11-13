import { BasePage } from './BasePage.js';

/**
 * 註冊頁的頁面物件：封裝註冊表單的元素定位和註冊動作
 */
export class RegisterPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Email address field' });
    this.passwordInput = page.getByRole('textbox', { name: 'Field for the password' });
    this.repeatPasswordInput = page.getByRole('textbox', { name: 'Field to confirm the password' });
    this.securityQuestionSelect = page.getByRole('combobox', { name: 'Selection list for the security question' });
    this.answerInput = page.getByRole('textbox', { name: 'Field for the answer to the security question' });
    this.registerButton = page.getByRole('button', { name: 'Button to complete the registration' });
  }

  /**
   * 打開註冊頁
   * @returns {Promise<void>}
   */
  async open() {
    const questionsLoaded = this.page.waitForResponse(response =>
      response.url().includes('/api/SecurityQuestions')
    );
    await this.goto('/#/register');
    await questionsLoaded;
  }

  /**
   * 填寫註冊表單並送出
   * @param {{ email: string, password: string, answer: string, question: string }} account - 要註冊的帳號資料
   * @returns {Promise<void>}
   */
  async register({ email, password, answer, question = "Mother's maiden name?" }) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(password);
    await this.securityQuestionSelect.click();
    await this.page.getByRole('option', { name: question }).click();
    await this.answerInput.fill(answer);
    await this.registerButton.click();
  }
}
