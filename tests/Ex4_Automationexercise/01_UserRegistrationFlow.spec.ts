import { Page, test, expect } from "@playwright/test"
import { title } from "process"
function generateUniqueEmail() {
    const now = new Date()
    const timestamp = now.getTime() + Math.floor(Math.random() * 1000)
    const email = "testing_" + timestamp + "@gmail.com"
    return email
}

function generateUniqueUsername() {
    const names = ["alex", "barone", "justin", "phat", "long"]
    const randomIndex = Math.floor(Math.random() * names.length)
    const randomName = names[randomIndex]
    const randomNumber = Math.floor(Math.random() * 999) + 1
    const username = randomName + "_" + randomNumber
    return username
}

function generateUniqueLastname() {
    const names = ["le", "nguyen", "tran", "lac"]
    const randomIndex = Math.floor(Math.random() * names.length)
    const randomLastName = names[randomIndex]
    return randomLastName
}
function generateAddress() {
    return '123 Main Street, Anytown, CA 91234'
}

function generateCountry() {
    const countries = ["United States", "India", "Australia", "Canada", "Israel", "New Zealand", "Singapore"]
    const randomIndex = Math.floor(Math.random() * countries.length)
    const randomCountry = countries[randomIndex]
    return randomCountry
}

function generateState() {
    const states = ["Floria", "Vermont", "Utah", "Idaho", "Washington"]
    const randomIndex = Math.floor(Math.random() * states.length)
    const randomState = states[randomIndex]
    return randomState
}

function generateCity() {
    const cities = ["New York", "Phoenix", "Chicago", "Los Angeles"]
    const randomIndex = Math.floor(Math.random() * cities.length)
    const randomCity = cities[randomIndex]
    return randomCity
}

function generateZipcode() {
    const randomZipCode = Math.floor(Math.random() * 99999) + 1
    return randomZipCode.toString()
}

function generateMobileNumber() {
    const randomMobileNumber = '0' + (Math.floor(Math.random() * 9999999) + 1)
    return randomMobileNumber
}

function generateUser(age: number) {
    const username = generateUniqueUsername()
    const user = {
        title: generateTitle(),
        username: username,
        firstname: username,
        lastname: generateUniqueLastname(),
        email: generateUniqueEmail(),
        password: '12345678',
        city: generateCity(),
        age: age,
        country: generateCountry(),
        state: generateState(),
        zipcode: generateZipcode(),
        mobile: generateMobileNumber(),
        address: generateAddress()
    }
    return user
}

function generateTitle() {
    const titleList = ['Mr.', 'Mrs.']
    const randomNumber = Math.floor(Math.random() * titleList.length)
    const randomTitle = titleList[randomNumber]
    return randomTitle
}

test('User Registration Flow', async ({ page }) => {
    const youngUser = generateUser(25)
    const seniorUser = generateUser(40)
    const businessUser = generateUser(35)

    await page.goto('https://automationexercise.com/')
    await page.getByText(' Signup / Login').click()
    await page.getByPlaceholder('Name').fill(youngUser.username)
    await page.locator('[data-qa="signup-email"]').fill(youngUser.email)
    await page.getByRole('button', { name: 'Signup' }).click()

    const enterAccountInformationPage = await page.getByText('Enter Account Information')
    await expect(enterAccountInformationPage).toBeVisible()

    await page.getByText('Title').locator('..').locator('div label', { hasText: youngUser.title }).click()
    await page.locator('input#password').fill(youngUser.password)
    await page.locator('input#first_name').fill(youngUser.firstname)
    await page.locator('input#last_name').fill(youngUser.lastname)
    await page.locator('input#address1').fill(youngUser.address)
    await page.locator('select#country').selectOption(youngUser.country)
    await page.locator('input#state').fill(youngUser.state)
    await page.locator('input#city').fill(youngUser.city)
    await page.locator('input#zipcode').fill(youngUser.zipcode)
    await page.locator('input#mobile_number').fill(youngUser.mobile)
    await page.getByRole('button', { name: 'Create Account' }).click()

    const txtAccountCreated = await page.getByText('Account Created!')
    await expect(txtAccountCreated).toBeVisible()
});