import { Page } from "@playwright/test";
import { User } from "../types/User.type";
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
}