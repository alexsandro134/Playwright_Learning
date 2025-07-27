import { test, expect } from "@playwright/test";
import { getConfig } from "../configuration/getConfig";

const config = getConfig()
test.describe('Testing with lock out user', () => {
    test.use({ storageState: config.authPath + '/lockedOutUser.json' })
    test('Unable to login with locked out user', async ({ page }) => {
        // is there anyway to verify the state when click login button
        await page.goto(config.INVENTORY_URL)
        const text = await page.locator('//h3').textContent()
        expect(text).toEqual("Epic sadface: You can only access '/inventory.html' when you are logged in.")
    });
});