import { expect, request, test } from '@playwright/test'
test('Testing API on ReqRes', async ({ request }) => {
    const freeAPIKey = 'reqres-free-v1'
    const getUsers = await request.get('https://reqres.in/api/users', {
        headers : {
            'x-api-key': freeAPIKey
        }
    })
    const bodyJson = await getUsers.json()

    await expect(getUsers.ok()).toBeTruthy()
    await expect(bodyJson).toHaveProperty('data')
});