import { expect, request, test } from '@playwright/test'
import { UserData } from '../../types/Ex5/UserData.type'
test('GET list users', async ({ request }) => {
    const getUsers = await request.get('https://reqres.in/api/users')
    const bodyJson = await getUsers.json()
    let firstDataUser: UserData = bodyJson.data[0]

    await expect(getUsers.ok()).toBeTruthy()
    await expect(bodyJson).toHaveProperty('data')
    await expect(bodyJson.data.length).toBeGreaterThan(0)
    await expect(firstDataUser).toBeDefined()
});


test('POST create new users', async ({ request }) => {
    const postNewUsers = await request.post('https://reqres.in/api/users', {
        headers: {
            'x-api-key': 'reqres-free-v1'
        }, data: {
            "name": "morpheus",
            "job": "leader"
        }
    })
    const bodyJson = await postNewUsers.json()
    // let firstDataUser: UserData = bodyJson.data[0]

    await expect(postNewUsers.status()).toEqual
    await expect(bodyJson).toHaveProperty('name')
    await expect(bodyJson).toHaveProperty('job')
});