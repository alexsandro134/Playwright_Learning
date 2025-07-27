import path = require('path');

import { test as setup } from "@playwright/test";
import { Saucedemo } from '../page-object/Saucedemo.page'
import { getConfig } from "../configuration/getConfig";

const config = getConfig()

const authFile = path.join(__dirname, config.authPath + '/normalUser.json')
const lockedOutAuthFile = path.join(__dirname, config.authPath + '/lockedOutUser.json')
const problemAuthFile = path.join(__dirname, config.authPath + '/problemUser.json')
const performanceGlitchFile = path.join(__dirname, config.authPath + '/performanceGlitchUser.json')

setup('authenticate', async ({ page }) => {
    const sauceDemo = new Saucedemo(page)
    await sauceDemo.loginWithUser(config.users.standard_user)

    await page.waitForURL('https://www.saucedemo.com/inventory.html')
    await page.context().storageState({ path: authFile })
});

setup('lockedOut', async ({ page }) => {
    const sauceDemo = new Saucedemo(page)
    await sauceDemo.loginWithUser(config.users.locked_out_user)

    await page.context().storageState({ path: lockedOutAuthFile })
})

setup('problem', async ({ page }) => {
    const sauceDemo = new Saucedemo(page)
    await sauceDemo.loginWithUser(config.users.problem_user)
    await page.context().storageState({ path: problemAuthFile })
})

setup('performanceGlitch', async ({ page }) => {
    const sauceDemo = new Saucedemo(page)
    await sauceDemo.loginWithUser(config.users.performance_glitch_user, config.timeout)

    await page.context().storageState({ path: performanceGlitchFile })
})