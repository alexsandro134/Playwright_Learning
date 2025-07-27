export const frameworkConfig = {
    retries: 3,
    timeout: 15000,
    authPath: './.auth',
    users: {
        standard_user: 'standard_user',
        locked_out_user: 'locked_out_user',
        problem_user: 'problem_user',
        performance_glitch_user: 'performance_glitch_user',
        password: 'secret_sauce'
    }
}