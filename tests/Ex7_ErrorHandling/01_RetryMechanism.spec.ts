import { test, Page, expect } from "@playwright/test";
test('Implement smart retry strategy', async ({ page }) => {
    let success = false
    let attemps = 0
    let attemptCount = 0;

    await page.route('**/posts**', async (route) => {
        attemptCount++;
        console.log(`Number of retries ${attemptCount}`)

        // Your task: Implement failure logic for first 2 attempts
        if (attemptCount === 1) {
            console.log('abc')
            await route.abort('timedout')
        } else if (attemptCount === 2) {
            await route.fulfill({ status: 500, body: 'Internal Server Error' })
        } else {
            route.continue()
        }
    });

    await page.goto('https://jsonplaceholder.typicode.com/');

    while (!success && attemps < 3) {
        attemps++;
        try {
            await page.locator('td + td a').locator('text="/posts"').click()
            expect(attemptCount).toBe(3)
            await expect(page.getByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')).toBeVisible()
            success = true
        } catch (error) {
            if (attemps === 3) throw error
            console.log(`Attempt ${attemps} failed, retrying....`)
            await page.goBack()
            await page.waitForTimeout(1000)
        }
    }
});