import { Page } from "@playwright/test";
import { getConfig } from '../configuration/getConfig'

const config = getConfig('local')

export class Saucedemo {
    constructor(private page: Page) {
        this.page = page
        this.inputUsername = page.getByPlaceholder('Username')
        this.inputPwd = page.getByPlaceholder('Password')
        this.btnLogin = page.locator('#login-button')
    }

    public inputUsername = this.page.getByPlaceholder('Username')
    public inputPwd = this.page.getByPlaceholder('Password')
    public btnLogin = this.page.locator('#login-button')

    async loginWithUser(username: string, timeout?: number) {
        await this.page.goto(process.env.BASE_URL)
        await this.inputUsername.fill(username)
        await this.inputPwd.fill('secret_sauce')
        await this.btnLogin.click({ timeout: timeout })
    }
}