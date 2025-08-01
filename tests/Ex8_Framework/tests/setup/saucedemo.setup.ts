import path = require('path');

import { test as setup } from "@playwright/test";
import { Saucedemo } from '../../page-object/Saucedemo.page'
import { getConfig } from "../../configuration/getConfig";

const config = getConfig()

const standard_user = path.join(__dirname, config.authPath + '/normalUser.json')
const locked_out_user = path.join(__dirname, config.authPath + '/lockedOutUser.json')
const problem_user = path.join(__dirname, config.authPath + '/problemUser.json')
const performance_glitch_user = path.join(__dirname, config.authPath + '/performanceGlitchUser.json')

initSetup(standard_user)
initSetup(locked_out_user)
initSetup(problem_user)
initSetup(performance_glitch_user)

function initSetup(userType: string) {
    setup(userType, async ({ page }) => {
        const sauceDemo = new Saucedemo(page)
        await sauceDemo.loginWithUser(config.users[userType])

        await page.context().storageState({ path: userType })
    })
}