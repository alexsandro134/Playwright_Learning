import { test, expect } from '@playwright/test'
test('Dynamic Controls', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/')
    await page.getByRole('link', { name: 'Dynamic Controls' }).click()
    await expect(page.getByText('This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.')).toBeVisible()

    await expect(page.getByRole('checkbox')).toBeVisible()
    await page.getByRole('button', { name: 'Remove' }).click()
    await expect(page.getByRole('checkbox', { name: 'A checkbox' })).not.toBeVisible()
    await expect(page.getByText('It\'s gone!')).toBeVisible()

    await expect(page.locator('#input-example input[type=text]')).toBeDisabled()
    await page.getByRole('button', { name: 'Enable' }).click()
    await expect(page.locator('#input-example input[type=text]')).toBeEnabled()
});

test('Dropdown list', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/')
    await page.getByRole('link', { name: 'Dropdown' }).click()
    await expect(page.getByText('Dropdown List')).toBeVisible()

});