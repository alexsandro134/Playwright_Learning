import { test, Page, expect } from "@playwright/test";
test('Capture real API calls', async ({ page }) => {
    let interceptedRequests = [];

    // 1. Set up request interception
    await page.route('**/posts**', route => {
        interceptedRequests.push({
            method: route.request().method(),
            url: route.request().url()
        });

        route.continue();
    });

    await page.goto('https://jsonplaceholder.typicode.com/');
    await page.locator('td + td a').locator('text="/posts"').click()
    await expect(interceptedRequests.length).toEqual(1)
    await expect(interceptedRequests[0].method).toEqual('GET')
    await expect(interceptedRequests[0].url).toEqual('https://jsonplaceholder.typicode.com/posts')
});

test.only('Modify API responses', async ({ page }) => {
    await page.route('**/posts/1', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([
                { id: 1, title: 'Intercepted Post', body: 'This is fake data!' }
            ])
        });
    });

    await page.goto('https://jsonplaceholder.typicode.com/');
    await page.locator('td + td a').locator('text="/posts/1"').click()
    await page.waitForTimeout(500);
    await expect(page.locator('span', { hasText: "Intercepted Post" })).toBeVisible()
    await expect(page.locator('span', { hasText: "This is fake data!" })).toBeVisible()
});