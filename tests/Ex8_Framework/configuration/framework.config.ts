import defineConfig from "../../../playwright.config"

export const config = {
    ...defineConfig,
    retries: 3,
    authPath: './.auth',
    screenshot: 'on',
    users: {
        standard_user: 'standard_user',
        locked_out_user: 'locked_out_user',
        problem_user: 'problem_user',
        performance_glitch_user: 'performance_glitch_user',
        password: 'secret_sauce'
    },
    timeouts: 15000,
}