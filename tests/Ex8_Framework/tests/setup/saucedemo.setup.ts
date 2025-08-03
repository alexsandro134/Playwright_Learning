import path = require('path');

import { test as setup } from "@playwright/test";
import { Saucedemo } from '../../page-object/Saucedemo.page'
import { getConfig } from "../../configuration/getConfig";

const config = getConfig()

initSetup('standard_user')
initSetup('locked_out_user')
initSetup('problem_user')
initSetup('performance_glitch_user')

function initSetup(userType: string) {
    setup(userType, async ({ page }) => {
        const username = config.users[userType]

        if (!username) {
            throw new Error(`User '${userType}' not found in config.users. Available: ${Object.keys(config.users)}`)
        }

        const sauceDemo = new Saucedemo(page)
        await sauceDemo.loginWithUser(username)
        const statePath = path.join(__dirname, config.authPath + '/' + userType + '.json')
        await page.context().storageState({ path: statePath })

        await page.waitForURL(config.INVENTORY_URL)
    })
}