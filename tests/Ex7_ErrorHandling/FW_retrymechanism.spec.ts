import { Page, test } from "@playwright/test";
test('Retry mechanism', async ({ page }) => {
    const maxRetries = 3;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Your flaky operation here
            // If it succeeds, you'll break out of the loop
            // If it fails, catch block handles it

            console.log(`Attempt ${attempt} succeeded!`);
            break; // Exit retry loop on success

        } catch (error) {
            lastError = error;
            console.log(`Attempt ${attempt} failed: ${error.message}`);

            // Your thinking: Should you retry this error?
            // Some errors shouldn't be retried (syntax errors, etc.)

            if (attempt === maxRetries) {
                throw new Error(`All ${maxRetries} attempts failed. Last error: ${error.message}`);
            }

            // Wait before retry
            await page.waitForTimeout(1000);
        }
    }
});