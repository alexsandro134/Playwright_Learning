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
            await route.fulfill({
                status: 503,
                contentType: 'application/json',
                body: JSON.stringify({ error: 'Service unavailable' })
            });
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
            console.log('Current URL before click:', page.url());
            await page.locator('td + td a').locator('text="/posts"').click()
            console.log('Current URL after click:', page.url());
            await expect(page.getByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')).toBeVisible()
            success = true
        } catch (error) {
            console.log('Current URL in catch:', page.url());
            if (attemps === 3) throw error
            console.log(`Attempt ${attemps} failed, retrying....`)
            await page.goBack()
            console.log('Current URL after goBack:', page.url());
            await page.waitForTimeout(1000)
        }
    }

    expect(attemptCount).toBe(3)
    expect(success).toBe(true)
});

test('Fast_Realistic timeout scenarios', async ({ page }) => {
    await page.route('**/comments', route => {
        // Always fast  
        setTimeout(() => route.continue(), 100);
    });
    await page.goto('https://jsonplaceholder.typicode.com');
    const startTime = Date.now()
    const responsePromise = page.waitForResponse(response => response.url() === 'https://jsonplaceholder.typicode.com/comments' && response.status() === 200, { timeout: 1000 })
    await page.locator('td a').locator('text="/comments"').click()
    await responsePromise
    const endTime = Date.now()
    const responseTime = endTime - startTime
    expect(responseTime).toBeLessThan(500)
    await expect(page.getByText('"email": "Eliseo@gardner.biz",')).toBeVisible()
    console.log(`Fast operation took: ${responseTime}ms`);
});

test('Medium_Realistic timeout scenarios', async ({ page }) => {
    await page.route('**/posts/[0-9]+$', route => {
        // MEDIUM operation: Single post should be reasonable
        setTimeout(() => route.continue(), 2000); // 2 second delay  
    });
    await page.goto('https://jsonplaceholder.typicode.com');
    const startTime = Date.now()
    const responsePromise = page.waitForResponse(response => response.url().includes('/posts/1') && response.status() === 200, { timeout: 5000 })
    await page.locator('td a').locator('text="/posts/1"').click()
    await responsePromise
    const endTime = Date.now()
    const responseTime = endTime - startTime
    expect(responseTime).toBeLessThan(4000)
    await expect(page.getByText('"id": 1,')).toBeVisible()
    console.log(`Medium operation took: ${responseTime}ms`);
});

test.only('Hung_Realistic timeout scenarios', async ({ page }) => {
    await page.route('**/albums**', route => {
        console.log('Request will hang...');
    });

    await page.goto('https://jsonplaceholder.typicode.com');

    const responsePromise = page.waitForResponse(
        response => response.url().includes('/albums'),
        { timeout: 3000 } // Should timeout
    );

    await page.locator('td a').locator('text="/albums"').click();
    try {
        await responsePromise
        await expect(page.getByText('"title": "quidem molestiae enim"')).toBeVisible()
    } catch (error) {
        console.log(`Unable to load albums`);
    }
});

test('App functionality with failed dependencies', async ({ page }) => {
    // Block external services
    // Verify app still works with limited functionality
    // Test "offline mode" behavior
});

test('User error recovery flow', async ({ page }) => {
    // Simulate error → User sees message → Clicks retry → Success
    // Complete recovery cycle testing
});
