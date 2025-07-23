import * as _ from 'lodash'
import { frameworkConfig } from "./framework.config"
import * as dotenv from 'dotenv'

function getConfig(environment: string) {
    const envConfig = dotenv.config({ path: `./env/{environment}.env` })
    return _.merge(frameworkConfig, envConfig)
}

export { getConfig }