import { test, expect } from "@playwright/test";
test.describe('Testing with lock out user', () => {
    test.use({ storageState: 'tests/Ex3_Saucedemo/playwright/.auth/lockedOutUser.json' })
    test('Unable to login with locked out user', async ({ page }) => {
        // is there anyway to verify the state when click login button
        await page.goto('https://www.saucedemo.com/inventory.html')
        const text = await page.locator('//h3').textContent()
        expect(text).toEqual("Epic sadface: You can only access '/inventory.html' when you are logged in.")
    });
});