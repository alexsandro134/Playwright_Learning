import { Page, test, expect } from "@playwright/test";
test('User error recovery flow', async ({ page }) => {
    // Simulate error → User sees message → Clicks retry → Success
    let attemptCount = 0;
    
    await page.route('**/posts', route => {
        attemptCount++;
        if (attemptCount === 1) {
            // First attempt fails
            route.abort('failed');
        } else {
            // Retry succeeds
            route.continue();
        }
    });
    
    await page.goto('https://jsonplaceholder.typicode.com');
    
    // User tries to access posts
    await page.click('[href="/posts"]');
    
    // Gets error page
    await expect(page.getByText("can't be reached")).toBeVisible();
    
    // User recovery actions:
    // 1. Can they go back?
    // 2. Can they retry?
    // 3. Can they access other features?
    
    // Test recovery: Go back to home
    await page.goBack();
    
    // Test recovery: Try again (should work now)
    await page.click('[href="/posts"]');
    await expect(page.getByText('sunt aut facere')).toBeVisible();
    
    console.log('✅ User successfully recovered from error');
});