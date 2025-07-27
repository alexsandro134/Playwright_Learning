import { test, expect } from "@playwright/test";
test.describe('Testing with performance glitch user', () => {
    test.use({ storageState: 'tests/Ex3_Saucedemo/playwright/.auth/performanceGlitchUser.json' })
    test('Login take more time than normal with performance glitch', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html')
        const itemSauceLabsBackpack = await page.getByText('Sauce Labs Backpack')
        await expect(itemSauceLabsBackpack).toBeVisible({timeout: 40000})
    });

});