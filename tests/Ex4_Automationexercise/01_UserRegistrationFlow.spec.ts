import { Page, test, expect } from "@playwright/test"
import { Automationexsercise } from '../../page-object/Automationexercise.page'
import { generateUser } from '../../utils/builderUser'

const youngUser = generateUser(25)
const seniorUser = generateUser(40)
const businessUser = generateUser(35)

const dataTest = [youngUser, seniorUser, businessUser]

// dataTest.forEach((user) => {
// for (const user of dataTest) {
test(`User Registration`, async ({ page }) => {
    await page.goto('https://automationexercise.com/')
    await page.getByText(' Signup / Login').click()
    await page.getByPlaceholder('Name').fill(youngUser.username)
    await page.locator('[data-qa="signup-email"]').fill(youngUser.email)
    await page.getByRole('button', { name: 'Signup' }).click()

    const enterAccountInformationPage = await page.getByText('Enter Account Information')
    await expect(enterAccountInformationPage).toBeVisible()

    const automationexercisePage = new Automationexsercise(page)
    automationexercisePage.inputNewAccountInformation(youngUser)
    const txtAccountCreated = await page.getByText('Account Created!')
    await expect(txtAccountCreated).toBeVisible()

    await page.getByText('Continue').click()
    let loginUser = await page.locator('li a b').innerText()
    await expect(loginUser).toEqual(youngUser.username)
});

test.afterEach(async ({ page }) => {
    await page.getByText(' Delete Account').click()
    const txtAccountDeleted = await page.getByText('Account Deleted!')
    await expect(txtAccountDeleted).toBeVisible()
})
// }