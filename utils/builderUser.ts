import { generateAddress, generateMobileNumber, generateZipcode, generateCity, generateCountry, generateState, generateUniqueUsername, generateTitle, generateUniqueLastname, generateUniqueEmail, generateMessage, generateSubject } from "./generateData"

export function generateUser(age: number) {
    const name = generateUniqueUsername()
    const user = {
        title: generateTitle(),
        username: name.username,
        firstname: name.firstname,
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

export function generateContactForm() {
    const name = generateUniqueUsername()
    const subject = generateSubject()
    const form = {
        name: name.firstname,
        email: generateUniqueEmail(),
        subject: subject,
        message: generateMessage(subject)
    }
    return form
}