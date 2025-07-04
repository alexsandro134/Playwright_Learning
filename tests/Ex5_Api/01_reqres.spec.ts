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
    await expect(bodyJson).not.toBeUndefined()
    await expect(bodyJson).toHaveProperty('name')
    await expect(bodyJson).toHaveProperty('job')
    await expect(bodyJson).toHaveProperty('id')
    await expect(bodyJson).toHaveProperty('createdAt')
    await expect(bodyJson.name).toBe(bodyData.name)
});

test('GET single user', async ({ request }) => {
    const getSingleUser = await request.get('https://reqres.in/api/users/2')
    const bodyJson = await getSingleUser.json()
    const resp: UserData = bodyJson.data
    await expect(getSingleUser.status()).toEqual(200)
    await expect(resp).not.toBeUndefined()
    await expect(resp).toHaveProperty('id')
    await expect(resp).toHaveProperty('email')
    await expect(resp.id).toBe(2)
});

test('PUT update user', async ({ request }) => {
    const bodyData = generateBodyUserData()
    const putDataUser = await request.put('https://reqres.in/api/users/2', {
        headers: {
            'x-api-key': 'reqres-free-v1'
        }, data: {
            "name": bodyData.name,
            "job": bodyData.job
        }
    })
    const bodyJson: NewUserData = await putDataUser.json()
    await expect(putDataUser.status()).toEqual(200)
    await expect(bodyJson).toHaveProperty('name')
    await expect(bodyJson).toHaveProperty('job')
    await expect(bodyJson).toHaveProperty('updatedAt')
});

test('DELETE user', async ({ request }) => {
    // How would you delete a user?const bodyData = generateBodyUserData()
    const deleteUser = await request.delete('https://reqres.in/api/users/2', {
        headers: {
            'x-api-key': 'reqres-free-v1'
        }
    })
    await expect(deleteUser.status()).toEqual(204)
});