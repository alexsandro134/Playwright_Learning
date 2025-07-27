import * as _ from 'lodash'
import { frameworkConfig } from "./framework.config"
import * as dotenv from 'dotenv'

function getConfig(environment: string = 'local') {
    const envConfig = dotenv.config({ path: `${__dirname}/env/${environment}.env` })
    if (envConfig.error) {
        throw new Error(`Failed to load ${environment}.env: ${envConfig.error.message}`)
    }
    const config = _.merge(frameworkConfig, envConfig.parsed)

    if (!config.BASE_URL) {
        throw new Error(`BASE_URL not found in ${environment}.env`)
    }
    return config
}

export { getConfig }