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
    },
    testData: {
        checkout: {
            validForm: { name: 'John', address: '123 Main St' },
            invalidForm: { name: '', address: '' }
        },
        products: {
            backpack: { id: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' }
        }
    }
}