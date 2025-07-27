import * as _ from 'lodash'
import { frameworkConfig } from "./framework.config"
import * as dotenv from 'dotenv'

function getConfig(environment: string = 'local') {
    const envConfig = dotenv.config({ path: `${__dirname}/env/${environment}.env` })
    return _.merge(frameworkConfig, envConfig.parsed)
}

export { getConfig }