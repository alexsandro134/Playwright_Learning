import { test, expect, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async () => {
    await page.close();
});

test('Add new todo item', async ({ }) => {
    await page.goto('/todomvc/#');
    await page.getByPlaceholder('What needs to be done?').fill('Buy groceries');
    await page.keyboard.press('Enter');
    await expect(page.getByText('Buy groceries')).toBeVisible();

    await page.getByPlaceholder('What needs to be done?').fill('Walk the dog');
    await page.keyboard.press('Enter');
    await expect(page.getByText('Walk the dog')).toBeVisible();
})

test('Mark todo as complete', async ({ }) => {
    await page.getByText('Buy groceries').locator('..').getByRole('checkbox').check();
    await expect(page.getByText('Buy groceries').locator('..').getByRole('checkbox')).toBeChecked();
});

test('Filter todos', async ({ }) => {

    await page.getByText('Active').click();
    await expect(page.getByText('Walk the dog')).toBeVisible();
    await expect(page.getByText('Buy groceries')).not.toBeVisible();

    // Expects page to have a heading with the name of Installation.
    await page.getByRole('link').getByText('Completed').click();
    await expect(page.getByText('Walk the dog')).not.toBeVisible();
    await expect(page.getByText('Buy groceries')).toBeVisible();

    await page.getByRole('link').getByText('All').click();
    await expect(page.getByText('Walk the dog')).toBeVisible();
    await expect(page.getByText('Buy groceries')).toBeVisible();
});

test('Delete todo item', async ({ }) => {
    await page.getByText('Buy groceries').hover()
    await page.locator('//label[contains(text(),"Buy groceries")]/following-sibling::button').click();
    await expect(page.getByText('Buy groceries')).not.toBeVisible();
});
