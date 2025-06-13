import { test, expect } from '@playwright/test'
import path = require('path');
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
    await page.locator('#dropdown').selectOption('Option 1')
    await page.locator('#dropdown').selectOption('Option 2')
    const selectedOption = page.locator('option[value="2"]')
    const selectedValue = await selectedOption.getAttribute('selected')
    await expect(selectedValue).toEqual('selected')
});

test('File Upload', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/')
    await page.getByRole('link', { name: 'File Upload' }).click()
    await expect(page.getByText('File Uploader')).toBeVisible()
    const fileChoosePromise = page.waitForEvent('filechooser')

    await page.locator('#file-upload').click()
    const fileChooser = await fileChoosePromise
    console.log('aaa', __dirname)
    await fileChooser.setFiles(path.join(__dirname, 'sample.jpg'))

    await page.getByText('Upload').click()
    await expect(page.getByText('File Uploaded!')).toBeVisible()
});

test('Hovers', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/')
    await page.getByRole('link', { name: 'Hovers'}).click()
    const listProfile = await page.$$('.example .figure')
    await listProfile[0].hover()
    await expect(page.getByText('name: user1')).toBeVisible()
});

test('Drag and drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/')
    await page.getByRole('link', { name: 'Drag and Drop'}).click()
    await expect(page.getByText('Drag and Drop')).toBeVisible()
    await page.locator('#column-a').dragTo(page.locator('#column-b'))
});