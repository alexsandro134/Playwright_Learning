import { getConfig } from "../configuration/getConfig";

const config = getConfig()
console.log("🚀 ~ config:", config)

// Access: config.testData.checkout.validForm
// Access: config.TEST_ADDRESS (from env)