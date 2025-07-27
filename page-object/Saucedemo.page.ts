import { Page } from "@playwright/test";


export class Saucedemo {
    constructor(private page: Page) { }

    public inputUsername = this.page.getByPlaceholder('Username')
    public inputPwd = this.page.getByPlaceholder('Password')
    public btnLogin = this.page.locator('#login-button')

    async loginWithUser(username: string, timeout?: number) {
        await this.page.goto('https://www.saucedemo.com/')
        await this.inputUsername.fill(username)
        await this.inputPwd.fill('secret_sauce')
        await this.btnLogin.click({ timeout: timeout })
    }
}