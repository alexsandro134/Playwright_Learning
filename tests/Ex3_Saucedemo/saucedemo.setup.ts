import { expect, Page, test as setup } from "@playwright/test";
import path = require('path');

const authFile = path.join(__dirname, 'playwright/.auth/normalUser.json')
// console.log("🚀 ~ __dirname:", __dirname)

setup('authenticate', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.locator('#login-button').click()

    page.waitForURL('https://www.saucedemo.com/inventory.html')

    const itemSauceLabsBackpack = await page.getByText('Sauce Labs Backpack')
    expect(itemSauceLabsBackpack).toBeVisible()
    // await page.locator('#add-to-cart-sauce-labs-backpack').click()
    await page.context().storageState({path: authFile})
});
// test('Sauce demo authentication', async ({ page }) => {
//     page.goto('https://www.saucedemo.com/')
// });