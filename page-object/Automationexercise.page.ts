import { Page } from "@playwright/test";
import { User } from "../types/User.type";
import { ContactForm } from "../types/ContactForm.type";
import path = require('path');
export class Automationexsercise {
    constructor(private page: Page) { }

    async inputNewAccountInformation(user: User) {
        await this.page.getByText('Title').locator('..').locator('div label', { hasText: user.title }).click()
        await this.page.locator('input#password').fill(user.password)
        await this.page.locator('input#first_name').fill(user.firstname)
        await this.page.locator('input#last_name').fill(user.lastname)
        await this.page.locator('input#address1').fill(user.address)
        await this.page.locator('select#country').selectOption(user.country)
        await this.page.locator('input#state').fill(user.state)
        await this.page.locator('input#city').fill(user.city)
        await this.page.locator('input#zipcode').fill(user.zipcode.toString())
        await this.page.locator('input#mobile_number').fill(user.mobile)
        await this.page.getByRole('button', { name: 'Create Account' }).click()
    }

    async inputContactForm(contactForm: ContactForm) {
        await this.page.locator('input[name="name"]').fill(contactForm.name)
        await this.page.locator('input[name="email"]').fill(contactForm.email)
        await this.page.locator('input[name="subject"]').fill(contactForm.subject)
        await this.page.locator('textarea[name="message"]').fill(contactForm.message)
    }

    async uploadFile() {
        const fileChooserPromise = this.page.waitForEvent('filechooser')
        await this.page.locator('input[name="upload_file"]').click()
        const fileChooser = await fileChooserPromise
        await fileChooser.setFiles(path.join(__dirname, '../resoures/', 'sample.jpg'))
    }

    async clickSubmitBtn() {
        await this.page.locator('input[name="submit"]').click()
        await this.page.waitForTimeout(5000)
    }

    async acceptDialog() {
        // await this.page.evaluate('(() => {window.waitForPrintDialog = new Promise(f => window.print = f);})()');
        // await this.page.waitForFunction('window.waitForPrintDialog');
        this.page.on('dialog', dialog => dialog.accept());
    }

    async getValidityPropertiesEmailInput(): Promise<string> {
        let emailElement = await this.page.locator('input[name="email"]')
        let validationMessage = await emailElement.evaluate((el: HTMLInputElement) => {
            return el.validationMessage
        })
        return validationMessage
    }
}