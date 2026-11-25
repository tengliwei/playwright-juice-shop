import { BasePage } from './BasePage.js';

/**
 * 個人資料頁的頁面物件：封裝使用者名稱欄位、儲存按鈕和設定名稱的動作
 */
export class ProfilePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Text field for the username' });
    this.setUsernameButton = page.getByRole('button', { name: 'Button to save/set the username' });
  }

  /**
   * 打開個人資料頁
   * @returns {Promise<void>}
   */
  async open() {
    await this.goto('/profile');
  }

  /**
   * 填入使用者名稱並送出，等伺服器存好才結束
   * @param {string} name - 要設定的使用者名稱
   * @returns {Promise<void>}
   */
  async setUsername(name) {
    const responsePromise = this.page.waitForResponse((response) => {
      return response.url().endsWith('/profile') && response.request().method() === 'POST';
    });
    await this.usernameInput.fill(name);
    await this.setUsernameButton.click();
    await responsePromise;
  }
}
