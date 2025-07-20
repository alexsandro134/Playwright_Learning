import * as _ from 'lodash'

import { config } from "./configuration/framework.config"
const envConfig = process.env

const finalConfig = _.merge(config, envConfig)