import { Page, test, expect } from "@playwright/test";
import { generateContactForm } from '../../utils/builderUser'
import { Automationexsercise } from '../../page-object/Automationexercise.page'


test('Contact Form_Valid data', async ({ page }) => {
    const form = generateContactForm()
    await page.goto('https://automationexercise.com/')
    await page.getByText(' Contact us').click()
    await page.waitForURL('https://automationexercise.com/contact_us')

    const txtGetInTouch = await page.getByText('Get In Touch')
    await expect(txtGetInTouch).toBeVisible()
    
    const automationexercisePage = new Automationexsercise(page)
    await automationexercisePage.inputContactForm(form)
});