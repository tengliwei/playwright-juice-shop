import { BasePage } from "./BasePage.js";

/**
 * 結帳流程的頁面物件：負責新增地址、選擇送貨方式、確認金額與下單
 */

export class CheckoutPage extends BasePage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        super(page);
        this.addNewAddressButton = page.getByRole('button', { name: 'Add New Address'});
        this.addressNameInput = page.getByRole('textbox', { name: 'Name', exact: true });
        this.countryInput = page.getByRole('textbox', { name: 'Country'});
        this.mobileInput = page.getByRole('spinbutton', { name: 'Mobile Number'});
        this.zipCodeInput = page.getByRole('textbox', { name: 'ZIP Code'});
        this.streetAddressInput = page.getByRole('textbox', { name: 'Address', exact: true });
        this.cityInput = page.getByRole('textbox', { name: 'City'});
        this.addressSubmitButton = page.getByRole('button', { name: 'Submit', exact: true });
        this.addressContinueButton = page.getByRole('button', { name: 'Continue', exact: true });
    }

    /**
     * 在結帳的地址頁新增一筆地址，等伺服器存好才結束
     * @param {{ name: string, country: string, mobile: string, zipCode: string, street: string, city: string }} address
     * @returns {Promise<void>}
     */
    async addAddress({ name, country, mobile, zipCode, street, city }) {
        await this.addNewAddressButton.click();
        await this.addressNameInput.fill(name);
        await this.countryInput.fill(country);
        await this.mobileInput.fill(mobile);
        await this.zipCodeInput.fill(zipCode);
        await this.streetAddressInput.fill(street);
        await this.cityInput.fill(city);
        const addressResponse = this.page.waitForResponse(reponse => 
            reponse.url().includes('/api/Addresss') && reponse.request().method() === 'POST'
        );
        await this.addressSubmitButton.click();
        await addressResponse;
    }

    /**
     * 在地址列表勾選指定收件人那一列，然後按 Continue
     * @param {string} name 收件人姓名，要跟 addAddress 傳的 name 一樣
     * @returns {Promise<void>}
     */
    async selectAddress(name) {
        const address = this.page.getByRole('row').filter({ has: this.page.getByRole('cell', { name, exact: true })});
        await address.getByRole('radio').check();
        await this.addressContinueButton.click();
    }
}