import { test, expect, chromium } from "@playwright/test";

// test.use({storageState: 'tests/Ex3_Saucedemo/playwright/.auth/normalUser.json'})
test('standard user_Add to cart', async ({ }) => {
    const browser = await chromium.launch()
    const context = await browser.newContext({storageState: 'tests/Ex3_Saucedemo/playwright/.auth/normalUser.json'})
    const page = await context.newPage()
    await page.goto('https://www.saucedemo.com/inventory.html')
    const itemSauceLabsBackpack = await page.getByText('Sauce Labs Backpack')
    expect(itemSauceLabsBackpack).toBeVisible()

    await page.locator('#add-to-cart-sauce-labs-backpack').click()
    await context.close()
    await browser.close()
});