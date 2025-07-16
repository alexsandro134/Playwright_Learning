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

test('Hung_Realistic timeout scenarios', async ({ page }) => {
    await page.route('**/albums**', route => {
        console.log('Request will hang...');
    });

    await page.goto('https://jsonplaceholder.typicode.com');
    const startTime = Date.now();
    const responsePromise = page.waitForResponse(
        response => response.url().includes('/albums'),
        { timeout: 3000 } // Should timeout
    );

    await page.locator('td a').locator('text="/albums"').click();
    try {
        await responsePromise
        throw new Error('Expected timeout but request succeeded');
    } catch (error) {
        const endTime = Date.now();
        const timeoutDuration = endTime - startTime;
        expect(timeoutDuration).toBeGreaterThan(2800);  // Close to 3000ms
        expect(timeoutDuration).toBeLessThan(3000);     // But not too much over

        console.log(`Request timed out after: ${timeoutDuration}ms`);

        expect(error.message).toContain('Timeout');
    }
});

test('Core functionality works with failed API dependencies', async ({ page }) => {
    await page.route('**/users/**', route => {
        console.log('User API blocked - simulating service failure');
        route.abort('failed');
    });

    await page.route('**/albums/**', route => {
        console.log('Albums API blocked - simulating service failure');
        route.abort('failed');
    });

    await page.route('**/posts/**', route => {
        route.continue(); // Posts still work
    });

    await page.goto('https://jsonplaceholder.typicode.com');
    await page.locator('td a').locator('text="/users"').click()
    await expect(page.getByText('"name": "Leanne Graham",')).toBeVisible()
    await page.goBack()
    await page.click('[href="/posts"]');
    await expect(page.getByText('sunt aut facere')).toBeVisible();
    await page.goBack()
    await page.click('[href="/users"]');
});

test('Test graceful degradation predictions', async ({ page }) => {
    console.log('=== Testing Graceful Degradation ===');

    // Block specific services
    await page.route('**/users/**', route => {
        console.log('🚫 Blocking users API...');
        route.abort('failed');
    });

    await page.route('**/albums/**', route => {
        console.log('🚫 Blocking albums API...');
        route.abort('failed');
    });

    // Allow core functionality
    await page.route('**/posts/**', route => {
        console.log('✅ Allowing posts API...');
        route.continue();
    });

    await page.goto('https://jsonplaceholder.typicode.com');

    // Test Prediction 1: Core functionality still works
    console.log('Testing: Core posts functionality...');
    await page.click('[href="/posts"]');

    try {
        await expect(page.getByText('sunt aut facere')).toBeVisible({ timeout: 5000 });
        console.log('✅ PREDICTION CORRECT: Posts still work!');
    } catch (error) {
        console.log('❌ PREDICTION WRONG: Posts failed too!');
    }

    // Test Prediction 2: Blocked services show graceful fallback
    console.log('Testing: Blocked users service...');

    await page.goBack()
    await page.click('[href="/users"]');

    // Wait and see what actually happens
    await page.waitForTimeout(3000);

    // Check what the page shows
    const currentUrl = page.url();
    console.log('Current URL after clicking users:', currentUrl);

    // Test what's actually on the page
    const pageText = await page.textContent('body');
    console.log('Page content preview:', pageText?.substring(0, 200));

    await page.goBack()
    // Test Prediction 3: Navigation still works
    console.log('Testing: Navigation still functional...');
    try {
        await page.click('[href="/posts"]'); // Try to go back to working section
        await expect(page.getByText('sunt aut facere')).toBeVisible();
        console.log('✅ PREDICTION CORRECT: Navigation still works!');
    } catch (error) {
        console.log('❌ PREDICTION WRONG: Navigation broken!');
    }
});

test('Debug route interception', async ({ page }) => {
    let blockedRequests = 0;

    await page.route('**/users', route => {
        blockedRequests++;
        console.log(`🚫 BLOCKED: ${route.request().url()}`);
        route.abort('failed');
    });

    await page.route('**/albums', route => {
        console.log(`🚫 BLOCKED: ${route.request().url()}`);
        route.abort('failed');
    });

    // Allow posts to work
    await page.route('**/posts', route => {
        console.log(`✅ ALLOWED: ${route.request().url()}`);
        route.continue();
    });

    await page.goto('https://jsonplaceholder.typicode.com');
    // Test core functionality still works
    await page.click('[href="/posts"]');
    await expect(page.getByText('sunt aut facere')).toBeVisible();
    console.log('✅ Posts still work when other services blocked');
    await page.goBack()
    // Test blocked service
    await page.click('[href="/users"]');
    await page.waitForTimeout(2000);
    // Now you should see real blocking behavior!
    console.log(`Blocked requests count: ${blockedRequests}`);

    // Your real investigation questions:
    // 1. What appears on the blocked users page?
    // 2. Is there a network error message?
    // 3. Does the page show "loading forever"?
    // 4. Is navigation still functional?
    
    const pageContent = await page.textContent('body');
    console.log('Blocked page content:', pageContent?.substring(0, 200));
    await page.goBack()
    // Test 3: Can you navigate away from blocked page?
    await page.click('[href="/posts"]');
    await expect(page.getByText('sunt aut facere')).toBeVisible();
    console.log('✅ Navigation recovery works');
});

test('Investigate actual network requests', async ({ page }) => {
    // Capture ALL requests to see what's really being called
    const networkRequests = [];

    page.on('request', request => {
        networkRequests.push(request.url());
        console.log(`🌐 REQUEST: ${request.method()} ${request.url()}`);
    });

    page.on('response', response => {
        console.log(`📥 RESPONSE: ${response.status()} ${response.url()}`);
    });

    await page.goto('https://jsonplaceholder.typicode.com');
    console.log('--- Clicking users link ---');
    await page.click('[href="/users"]');

    // Wait for page to load
    await page.waitForTimeout(2000);

    console.log('\n=== ALL NETWORK REQUESTS ===');
    networkRequests.forEach((url, index) => {
        console.log(`${index + 1}. ${url}`);
    });

    // Check if any requests contain 'users'
    const userRequests = networkRequests.filter(url => url.includes('users'));
    console.log('\n=== USER-RELATED REQUESTS ===');
    userRequests.forEach(url => console.log(`🔍 ${url}`));
});