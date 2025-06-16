import { test, expect } from "@playwright/test";

test('standard user_Add to cart', async ({ page }) => {
    // const desc = await page.locator('.inventory_item_description').filter({ hasText: 'Sauce Labs Backpack' })
    // const pricebar = await desc.locator('.pricebar')
    await page.locator('#add-to-cart-sauce-labs-backpack').click()
});