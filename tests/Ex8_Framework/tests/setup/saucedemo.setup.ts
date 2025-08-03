import path = require('path');

import { test as setup } from "@playwright/test";
import { Saucedemo } from '../../page-object/Saucedemo.page'
import { getConfig } from "../../configuration/getConfig";
import { userSetupMapping } from './user.mapping';

const config = getConfig()

initSetup(userSetupMapping.standard_user)
initSetup(userSetupMapping.locked_out_user)
initSetup(userSetupMapping.problem_user)
initSetup(userSetupMapping.performance_glitch_user)

// function initSetup(userType: string) {
//     setup(userType, async ({ page }) => {
//         const sauceDemo = new Saucedemo(page)
//         await sauceDemo.loginWithUser(config.users[userType])

//         const statePath = path.join(__dirname, config.authPath + '/' + userType + '.json')

//         await page.context().storageState({ path: statePath })
//     })
// }


function initSetup(userType: User) {
    setup(userType.setupName, async ({ page }) => {
        const sauceDemo = new Saucedemo(page)
        await sauceDemo.loginWithUser(config.users[userType.setupName])

        const statePath = path.join(__dirname, config.authPath + '/' + userType.fileName)

        await page.context().storageState({ path: statePath })
    })
}

type User = {
    fileName: string,
    setupName: string,
    needsUrlVerification: boolean
}