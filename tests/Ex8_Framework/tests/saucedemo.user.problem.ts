import { test, expect } from "@playwright/test";
import { getConfig } from "../configuration/getConfig";

const config = getConfig()
test.describe('Testing with problem user', () => {
    test.use({ storageState: config.authPath + '/problemUser.json' })
    test('Same img src with problem user', async ({ page }) => {
        await page.goto(config.INVENTORY_URL)
        const imgsrc = await page.locator('.inventory_item img.inventory_item_img')
        const count = await imgsrc.count()
        for (let i = 0; i < count; i++) {
            expect(await imgsrc.nth(i).getAttribute('src')).toEqual('/static/media/sl-404.168b1cce.jpg')
        }
    });
});