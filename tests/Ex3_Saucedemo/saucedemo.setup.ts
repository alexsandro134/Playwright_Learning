import { expect, Page, test as setup } from "@playwright/test";
import path = require('path');

const authFile = path.join(__dirname, 'playwright/.auth/normalUser.json')
const lockedOutAuthFile = path.join(__dirname, 'playwright/.auth/lockedOutUser.json')
const problemAuthFile = path.join(__dirname, 'playwright/.auth/problemUser.json')
const performanceGlitchFile = path.join(__dirname, 'playwright/.auth/performanceGlitchUser.json')

setup('authenticate', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.locator('#login-button').click()

    page.waitForURL('https://www.saucedemo.com/inventory.html')
    await page.context().storageState({path: authFile})
});

setup('lockedOut', async ({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('locked_out_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.locator('#login-button').click()

    await page.context().storageState({path: lockedOutAuthFile})
})

setup('problem', async ({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('problem_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.locator('#login-button').click()

    await page.context().storageState({path: problemAuthFile})
})

setup('performanceGlitch', async ({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('performance_glitch_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.locator('#login-button').click({timeout: 10000})

    await page.context().storageState({path: performanceGlitchFile})
})