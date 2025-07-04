import { expect, request, test } from '@playwright/test'
import { NewUserData, UserData } from '../../types/Ex5/UserData.type'
import { generateBodyUserData } from '../../utils/builderUser';
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
    const bodyData = generateBodyUserData()
    const postNewUsers = await request.post('https://reqres.in/api/users', {
        headers: {
            'x-api-key': 'reqres-free-v1'
        }, data: {
            "name": bodyData.name,
            "job": bodyData.job
        }
    })
    const bodyJson: NewUserData = await postNewUsers.json()
    await expect(postNewUsers.status()).toEqual(201)
    await expect(bodyJson).not.toBeUndefined
});