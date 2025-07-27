import { Locator, Page } from "@playwright/test";
import { getConfig } from '../configuration/getConfig'

const config = getConfig('local')

export class Saucedemo {

    public inputUsername: Locator
    public inputPwd: Locator
    public btnLogin: Locator
    constructor(private page: Page) {
        this.page = page
        this.inputUsername = page.getByPlaceholder('Username')
        this.inputPwd = page.getByPlaceholder('Password')
        this.btnLogin = page.locator('#login-button')
    }

    async loginWithUser(username: string, timeout?: number) {
        await this.page.goto(config.BASE_URL)
        await this.inputUsername.fill(username)
        await this.inputPwd.fill('secret_sauce')
        await this.btnLogin.click({ timeout: timeout })
    }
}