import { test, Page, expect } from "@playwright/test";
test('Capture real API calls', async ({ page }) => {
    page.on('request', request => console.log('>> ', request.timing, request.method(), request.url()))
    page.on('response', response => console.log('<< ', response.status(), response.url()))

    let interceptedRequests = [];

    await page.route('**/posts**', route => {
        interceptedRequests.push({
            method: route.request().method(),
            url: route.request().url(),
        });

        route.continue();
    });

    const responseForPosts = page.waitForResponse('https://jsonplaceholder.typicode.com/posts')
    const requestFinishedPromise = page.waitForEvent('requestfinished')

    await page.goto('https://jsonplaceholder.typicode.com/');
    await page.locator('td + td a').locator('text="/posts"').click()

    const response = await responseForPosts
    const request = await requestFinishedPromise

    console.log('timing: ', request.timing())
    await expect(interceptedRequests.length).toEqual(1)
    await expect(interceptedRequests[0].method).toEqual('GET')
    await expect(interceptedRequests[0].url).toEqual('https://jsonplaceholder.typicode.com/posts')
    await expect(response.status()).toEqual(200)
});

test('Modify API responses', async ({ page }) => {
    const requestFinishedPromise = page.waitForEvent('requestfinished')

    await page.route('**/posts/1', route => {
        console.log(route.request().url())
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(
                { id: 1, title: 'Intercepted Post', body: 'This is fake data!' }
            )
        });
    });

    await page.goto('https://jsonplaceholder.typicode.com/');
    await page.locator('td + td a').locator('text="/posts/1"').click()
    await requestFinishedPromise
    await expect(page.getByText("Intercepted Post")).toBeVisible()
    await expect(page.getByText("This is fake data!")).toBeVisible()
});