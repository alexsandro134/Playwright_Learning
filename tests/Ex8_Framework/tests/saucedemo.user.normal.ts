import { test, expect } from "@playwright/test";
test.use({ storageState: 'tests/Ex3_Saucedemo/playwright/.auth/normalUser1.json' })
test('standard user_Add to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html')
    const itemSauceLabsBackpack = await page.getByText('Sauce Labs Backpack')
    expect(itemSauceLabsBackpack).toBeVisible()
    await page.locator('#add-to-cart-sauce-labs-backpack').click()
});