import { test, expect } from "@playwright/test";
import { getConfig } from "../configuration/getConfig";

const config = getConfig()
test.use({ storageState: config.authPath + '/normalUser1.json' })
test('standard user_Add to cart', async ({ page }) => {
    await page.goto(config.INVENTORY_URL)
    const itemSauceLabsBackpack = await page.getByText('Sauce Labs Backpack')
    expect(itemSauceLabsBackpack).toBeVisible()
    await page.locator('#add-to-cart-sauce-labs-backpack').click()
});