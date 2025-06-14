import { test, expect } from '../../fixture/resources.fixture';
import path = require('path');
test('Dynamic Controls', async ({ herokuApp, page }) => {
    await herokuApp.selectLink('Dynamic Controls')
    await expect(page.getByText('This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.')).toBeVisible()

    await expect(page.getByRole('checkbox')).toBeVisible()
    await herokuApp.selectButton('Remove')
    await expect(page.getByRole('checkbox', { name: 'A checkbox' })).not.toBeVisible()
    await expect(page.getByText('It\'s gone!')).toBeVisible()

    await expect(page.locator('#input-example input[type=text]')).toBeDisabled()
    await herokuApp.selectButton('Enable')
    await expect(page.locator('#input-example input[type=text]')).toBeEnabled()
});

test('Dropdown list', async ({ herokuApp, page }) => {
    await herokuApp.selectLink('Dropdown')
    await expect(page.getByText('Dropdown List')).toBeVisible()
    await page.locator('#dropdown').selectOption('Option 1')
    await page.locator('#dropdown').selectOption('Option 2')
    const selectedOption = page.locator('option[value="2"]')
    const selectedValue = await selectedOption.getAttribute('selected')
    await expect(selectedValue).toEqual('selected')
});

test('File Upload', async ({ herokuApp, page }) => {
    await herokuApp.selectLink('File Upload')
    await expect(page.getByText('File Uploader')).toBeVisible()
    await herokuApp.uploadFile('sample.jpg')
    await expect(page.getByText('File Uploaded!')).toBeVisible()
});

test('Hovers', async ({ herokuApp, page }) => {
    await herokuApp.selectLink('Hovers')
    const listProfile = await page.$$('.example .figure')
    await listProfile[0].hover()
    await expect(page.getByText('name: user1')).toBeVisible()
});

test('Drag and drop', async ({ herokuApp, page }) => {
    await herokuApp.selectLink('Drag and Drop')
    await expect(page.getByText('Drag and Drop')).toBeVisible()
    await page.locator('#column-a').dragTo(page.locator('#column-b'))
});