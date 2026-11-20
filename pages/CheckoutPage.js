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
        this.deliveryContinueButton = page.getByRole('button', { name: 'Proceed to delivery method selection' });
        this.addCardButton = page.getByRole('button', { name: 'Add new card' });
        this.cardNameInput = page.getByRole('textbox', { name: 'Name', exact: true });
        this.cardNumberInput = page.getByRole('spinbutton', { name: 'Card Number' });
        this.expiryMonthSelect = page.getByRole('combobox', { name: 'Expiry Month' });
        this.expiryYearSelect = page.getByRole('combobox', { name: 'Expiry Year' });
        this.cardSubmitButton = page.getByRole('button', { name: 'Submit', exact: true });
        this.paymentContinueButton = page.getByRole('button', { name: 'Proceed to review', exact: true });
        this.placeOrderButton = page.getByRole('button', { name: 'Complete your purchase' });
    }

    /**
     * 找出表格裡「含有名字剛好是 name 的格子」的那一列
     * @param {string} name 格子的文字
     * @returns {import('@playwright/test').Locator}
     */
    tableRow(name) {
        return this.page.getByRole('row').filter({ has: this.page.getByRole('cell', { name, exact: true })});
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
        const addressResponse = this.page.waitForResponse(response => 
            response.url().includes('/api/Addresss') && response.request().method() === 'POST'
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
        await this.tableRow(name).getByRole('radio').check();
        await this.addressContinueButton.click();
    }

    /**
     * 在送貨方式頁勾選指定的送貨方式，然後按繼續
     * @param {string} name 送貨方式名稱，例如 'Fast Delivery'
     * @returns {Promise<void>}
     */
    async chooseDelivery(name) {
        await this.tableRow(name).getByRole('radio').check();
        await this.deliveryContinueButton.click();
    }

    /**
     * 在付款頁新增一張信用卡，等伺服器存好才結束
     * @param {{ name: string, cardNumber: string, expiryMonth: string, expiryYear: string }} card
     * @returns {Promise<void>}
     */
    async addCard({ name, cardNumber, expiryMonth, expiryYear }) {
        await this.addCardButton.click();
        await this.cardNameInput.fill(name);
        await this.cardNumberInput.fill(cardNumber);
        await this.expiryMonthSelect.selectOption(expiryMonth);
        await this.expiryYearSelect.selectOption(expiryYear);
        const addCardResponse = this.page.waitForResponse(response =>
            response.url().includes('/api/Cards') && response.request().method() === 'POST'
        );
        await this.cardSubmitButton.click();
        await addCardResponse;
    }

    /**
     * 在付款頁勾選指定的信用卡，然後按繼續到確認頁
     * @param {string} maskedCardNumber 畫面上遮住的卡號，例如 '************1111'
     * @returns {Promise<void>}
     */
    async selectCard(maskedCardNumber) {
        await this.tableRow(maskedCardNumber).getByRole('radio').check();
        await this.paymentContinueButton.click();
    }

    /**
     * 在確認頁按下單，等伺服器建好訂單才往下，並回傳訂單編號
     * @returns {Promise<string>} 伺服器回傳的訂單編號（orderConfirmation）
     */
    async placeOrder() {
        const placeOrderResponse = this.page.waitForResponse(response => 
            response.url().includes('/checkout') && response.request().method() === 'POST'
        );
        await this.placeOrderButton.click();
        const body = await (await placeOrderResponse).json();
        return body.orderConfirmation;
    }


}