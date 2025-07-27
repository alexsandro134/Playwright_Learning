import path = require('path');

import { test as setup } from "@playwright/test";
import { Saucedemo } from '../page-object/Saucedemo.page'
import { getConfig } from "../configuration/getConfig";

const config = getConfig()

const standard_user = path.join(__dirname, config.authPath + '/normalUser.json')
const locked_out_user = path.join(__dirname, config.authPath + '/lockedOutUser.json')
const problem_user = path.join(__dirname, config.authPath + '/problemUser.json')
const performance_glitch_user = path.join(__dirname, config.authPath + '/performanceGlitchUser.json')

initSetup(standard_user)
initSetup(locked_out_user)
initSetup(problem_user)
initSetup(performance_glitch_user)

// setup('authenticate', async ({ page }) => {
//     const sauceDemo = new Saucedemo(page)
//     await sauceDemo.loginWithUser(config.users.standard_user)

//     await page.waitForURL(config.INVENTORY_URL)
//     await page.context().storageState({ path: standard_user })
// });

// setup('lockedOut', async ({ page }) => {
//     const sauceDemo = new Saucedemo(page)
//     await sauceDemo.loginWithUser(config.users.locked_out_user)

//     await page.context().storageState({ path: locked_out_user })
// })

// setup('problem', async ({ page }) => {
//     const sauceDemo = new Saucedemo(page)
//     await sauceDemo.loginWithUser(config.users.problem_user)
//     await page.context().storageState({ path: problem_user })
// })

// setup('performanceGlitch', async ({ page }) => {
//     const sauceDemo = new Saucedemo(page)
//     await sauceDemo.loginWithUser(config.users.performance_glitch_user, config.timeout)

//     await page.context().storageState({ path: performance_glitch_user })
// })

function initSetup(userType: string) {
    setup(userType, async ({ page }) => {
        const sauceDemo = new Saucedemo(page)
        await sauceDemo.loginWithUser(config.users.userType)

        await page.context().storageState({ path: userType })
    })
}