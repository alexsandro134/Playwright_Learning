import { Page } from "@playwright/test";
import path = require('path');

export class HerokuApp {
    constructor(private page: Page) { }
    public dynamicLink = (text: string) => { return this.page.getByRole('link', { name: text }) }
    public dynamicButton = (text: string) => { return this.page.getByRole('button', { name: text }) }
    async navigate() {
        await this.page.goto('https://the-internet.herokuapp.com/')
    }

    async selectButton(buttonText: string) {
        await this.dynamicButton(buttonText).click()
    }

    async selectLink(linkText: string) {
        await this.dynamicLink(linkText).click()
    }

    async uploadFile(fileName: string) {
        const fileChoosePromise = this.page.waitForEvent('filechooser')

        await this.page.locator('#file-upload').click()
        const fileChooser = await fileChoosePromise
        await fileChooser.setFiles(path.join(__dirname, fileName))

        await this.page.getByText('Upload').click()
    }
}