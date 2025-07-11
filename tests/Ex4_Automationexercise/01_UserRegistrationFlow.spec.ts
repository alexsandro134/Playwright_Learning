import { Page, test, expect } from "@playwright/test"
import { Automationexsercise } from '../../page-object/Automationexercise.page'
import { generateUser } from '../../utils/builderUser'

// test.describe('User Registration Tests', () => {
//     // const youngUser = generateUser(25)
//     // const seniorUser = generateUser(40)
//     // const businessUser = generateUser(35)
//     // const dataTest = [youngUser, seniorUser, businessUser]

//     const dataTest = [generateUser(25), generateUser(35), generateUser(45)]

//     test.afterEach(async ({ page }) => {
//         await page.getByText(' Delete Account').click()
//         const txtAccountDeleted = await page.getByText('Account Deleted!')
//         await expect(txtAccountDeleted).toBeVisible()
//     })

//     // dataTest.forEach((user) => {
//     //     test(`User Registration ${user.firstname}`, async ({ page }) => {
//     //         await page.goto('https://automationexercise.com/')
//     //         await page.getByText(' Signup / Login').click()
//     //         await page.getByPlaceholder('Name').fill(user.username)
//     //         await page.locator('[data-qa="signup-email"]').fill(user.email)
//     //         await page.getByRole('button', { name: 'Signup' }).click()

//     //         const enterAccountInformationPage = await page.getByText('Enter Account Information')
//     //         await expect(enterAccountInformationPage).toBeVisible()

//     //         const automationexercisePage = new Automationexsercise(page)
//     //         automationexercisePage.inputNewAccountInformation(user)
//     //         const txtAccountCreated = await page.getByText('Account Created!')
//     //         await expect(txtAccountCreated).toBeVisible()

//     //         await page.getByText('Continue').click()
//     //         let loginUser = await page.locator('li a b').innerText()
//     //         await expect(loginUser).toEqual(user.username)
//     //     });
//     // })

//     test.each(dataTest)('User Registration $firstname', async ({ page }, user) => {
//         await page.goto('https://automationexercise.com/')
//         await page.getByText(' Signup / Login').click()
//         await page.getByPlaceholder('Name').fill(user.username)
//         await page.locator('[data-qa="signup-email"]').fill(user.email)
//         await page.getByRole('button', { name: 'Signup' }).click()

//         const enterAccountInformationPage = await page.getByText('Enter Account Information')
//         await expect(enterAccountInformationPage).toBeVisible()

//         const automationexercisePage = new Automationexsercise(page)
//         automationexercisePage.inputNewAccountInformation(user)
//         const txtAccountCreated = await page.getByText('Account Created!')
//         await expect(txtAccountCreated).toBeVisible()

//         await page.getByText('Continue').click()
//         let loginUser = await page.locator('li a b').innerText()
//         await expect(loginUser).toEqual(user.username)
//     })
// })

test.describe('User Registration Tests', () => {  // ✅ Remove async
    const youngUser = generateUser(25);
    const seniorUser = generateUser(40);
    const businessUser = generateUser(35);
    const dataTest = [youngUser, seniorUser, businessUser];

    test.afterEach(async ({ page }) => {
        await page.getByText(' Delete Account').click();
        const txtAccountDeleted = await page.getByText('Account Deleted!');
        await expect(txtAccountDeleted).toBeVisible();
    });

    dataTest.forEach((user) => {
        test(`User Registration ${user.age}`, async ({ page }) => {
            // Your test code here
            await page.goto('https://automationexercise.com/');
            await page.getByText(' Signup / Login').click()
            await page.getByPlaceholder('Name').fill(user.username)
            await page.locator('[data-qa="signup-email"]').fill(user.email)
            await page.getByRole('button', { name: 'Signup' }).click()

            const enterAccountInformationPage = await page.getByText('Enter Account Information')
            await expect(enterAccountInformationPage).toBeVisible()

            const automationexercisePage = new Automationexsercise(page)
            automationexercisePage.inputNewAccountInformation(user)
            const txtAccountCreated = await page.getByText('Account Created!')
            await expect(txtAccountCreated).toBeVisible()

            await page.getByText('Continue').click()
            let loginUser = await page.locator('li a b').innerText()
            await expect(loginUser).toEqual(user.username)
        });
    });
});