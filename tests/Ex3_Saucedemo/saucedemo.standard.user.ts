import { test, expect } from "@playwright/test";

test.use({ storageState: 'tests/Ex3_Saucedemo/playwright/.auth/normalUser.json' })
test('standard user_Add to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html')
    const itemSauceLabsBackpack = await page.getByText('Sauce Labs Backpack')
    expect(itemSauceLabsBackpack).toBeVisible()
    await page.locator('#add-to-cart-sauce-labs-backpack').click()
});

test.describe('Testing with problem user', () => {
    test.use({ storageState: 'tests/Ex3_Saucedemo/playwright/.auth/problemUser.json' })
    test('Same img src with problem user', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html')
        const imgsrc = await page.locator('.inventory_item img.inventory_item_img')
        const count = await imgsrc.count()
        for (let i = 0; i < count; i++) {
            expect(await imgsrc.nth(i).getAttribute('src')).toEqual('/static/media/sl-404.168b1cce.jpg')
        }
    });
});
test.describe('Testing with performance glitch user', () => {
    test.use({ storageState: 'tests/Ex3_Saucedemo/playwright/.auth/performanceGlitchUser.json' })
    test('Login take more time than normal with performance glitch', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html')
        const itemSauceLabsBackpack = await page.getByText('Sauce Labs Backpack')
        await itemSauceLabsBackpack.waitFor({ state: "visible", timeout: 10000 })
        expect(itemSauceLabsBackpack).toBeVisible({ timeout: 10000 })
    });

});
test.describe('Testing with lock out user', () => {
    test.use({ storageState: 'tests/Ex3_Saucedemo/playwright/.auth/lockedOutUser.json' })
    test('Unable to login with locked out user', async ({ page }) => {
        // is there anyway to verify the state when click login button
        await page.goto('https://www.saucedemo.com/inventory.html')
        const text = await page.locator('//h3').textContent()
        expect(text).toEqual("Epic sadface: You can only access '/inventory.html' when you are logged in.")
    });
});

