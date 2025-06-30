function generateUser(age: number) {
    const username = generateUniqueUsername()
    const user = {
        title: generateTitle(),
        username: username,
        firstname: username,
        lastname: generateUniqueLastname(),
        email: generateUniqueEmail(),
        password: '12345678',
        city: generateCity(),
        age: age,
        country: generateCountry(),
        state: generateState(),
        zipcode: generateZipcode(),
        mobile: generateMobileNumber(),
        address: generateAddress()
    }
    return user
}