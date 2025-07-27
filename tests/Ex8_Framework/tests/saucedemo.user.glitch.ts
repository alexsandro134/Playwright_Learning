import { test, expect } from "@playwright/test";
import { getConfig } from "../configuration/getConfig";

const config = getConfig()
test.describe('Testing with performance glitch user', () => {
    test.use({ storageState: config.authPath + '/performanceGlitchUser.json' })
    test('Login take more time than normal with performance glitch', async ({ page }) => {
        await page.goto(config.INVENTORY_URL)
        const itemSauceLabsBackpack = await page.getByText('Sauce Labs Backpack')
        await expect(itemSauceLabsBackpack).toBeVisible({timeout: 40000})
    });

});