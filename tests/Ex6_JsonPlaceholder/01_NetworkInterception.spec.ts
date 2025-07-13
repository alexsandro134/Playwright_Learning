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

test('API Performance Monitoring', async ({ page }) => {
    const performanceData = [];

    page.on('response', response => {
        let timing = response.request().timing()
        if (response.url().includes("/posts")) {
            // Your thinking: What timing data do you need to capture?
            let startTime = timing.requestStart
            let endTime = timing.responseEnd
            // How do you calculate the total response time?
            let responseTime = endTime - startTime

            // Your enhancement: What other metrics matter?
            // - DNS lookup time: timing.domainLookupEnd - timing.domainLookupStart
            // - Connection time: timing.connectEnd - timing.connectStart
            // - Time to first byte: timing.responseStart - timing.requestStart

            let performanceInfo = {
                endpoint: response.url(),
                responseTime: responseTime,
            }
            // What should you store in performanceData array?
            performanceData.push(performanceInfo)
            expect(responseTime).toBeLessThan(2000)
        }
    });

    const requestFinishedPromise = page.waitForEvent('requestfinished')
    await page.goto('https://jsonplaceholder.typicode.com/');
    const request = await requestFinishedPromise
    await page.locator('td + td a').locator('text="/posts"').click()
    await page.goBack()
    await page.locator('td + td a').locator('text="/posts/1"').click()
    console.log('Performance Data', performanceData)
    // Make multiple API calls
    // Your challenge: How do you verify performance meets standards?
});

test('Network Failure Simulation', async ({ page }) => {
    await page.route('**/posts**', async route => {
        // How do you add delays to simulate slow networks?
        await new Promise(resolve => setTimeout(resolve, 2000))
        // Your thinking: How do you choose which error to simulate?
        await route.fulfill({
            status: 500,
            contentType: 'text/plain',
            body: 'Internal Server Error'
        })

        // How do you return different HTTP status codes?

    });

    // Navigate and trigger API calls
    await page.goto('https://jsonplaceholder.typicode.com/');
    await page.locator('td + td a').locator('text="/posts"').click()
    // Your challenge: How do you verify the UI shows appropriate error handling?
    await expect(page.getByText('Internal Server Error')).toBeVisible()
});

test('POST Request Validation', async ({ page, request }) => {
    await page.route('**/posts', route => {
        if (route.request().method() === 'POST') {
            // Your thinking: How do you get the request body?
            console.log('request body', route.request().postData())

            // How do you parse and validate JSON data?

            // How do you access request headers?
            console.log('request header', route.request().headers())

            // Should you let the request continue or return a mock response?
            route.continue()
        }
    });

    // Make the browser send the POST request
    const response = await page.evaluate(async () => {
        const responseData = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        const data = await responseData.json()
        return data
    })
    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('title')
    expect(response).toHaveProperty('body')
    expect(response).toHaveProperty('userId')
    expect(typeof response.title).toBe('string')
    expect(typeof response.userId).toBe('number')
});