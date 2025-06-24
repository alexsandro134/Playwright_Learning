import { expect, Page, test as setup } from "@playwright/test";
import { Saucedemo } from '../../page-object/Saucedemo.page'
import path = require('path');

const authFile = path.join(__dirname, 'playwright/.auth/normalUser.json')
const lockedOutAuthFile = path.join(__dirname, 'playwright/.auth/lockedOutUser.json')
const problemAuthFile = path.join(__dirname, 'playwright/.auth/problemUser.json')
const performanceGlitchFile = path.join(__dirname, 'playwright/.auth/performanceGlitchUser.json')



setup('authenticate', async ({ page }) => {
    const sauceDemo = new Saucedemo(page)
    await sauceDemo.loginWithUser('standard_user')

    page.waitForURL('https://www.saucedemo.com/inventory.html')
    await page.context().storageState({ path: authFile })
});

setup('lockedOut', async ({ page }) => {
    const sauceDemo = new Saucedemo(page)
    await sauceDemo.loginWithUser('locked_out_user')

    await page.context().storageState({ path: lockedOutAuthFile })
})

setup('problem', async ({ page }) => {
    const sauceDemo = new Saucedemo(page)
    await sauceDemo.loginWithUser('problem_user')
    await page.context().storageState({ path: problemAuthFile })
})

setup('performanceGlitch', async ({ page }) => {
    const sauceDemo = new Saucedemo(page)
    await sauceDemo.loginWithUser('performance_glitch_user', 10000)

    await page.context().storageState({ path: performanceGlitchFile })
})