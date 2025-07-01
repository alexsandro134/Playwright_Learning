export function generateUniqueEmail() {
    const now = new Date()
    const timestamp = now.getTime() + Math.floor(Math.random() * 1000)
    const email = "testing_" + timestamp + "@gmail.com"
    return email
}

export function generateUniqueUsername() {
    let name = { firstname: '', username: '' }
    const names = ["alex", "barone", "justin", "phat", "long"]
    const randomIndex = Math.floor(Math.random() * names.length)
    const randomName = names[randomIndex]
    const randomNumber = Math.floor(Math.random() * 999) + 1
    const username = randomName + "_" + randomNumber
    name.firstname = randomName
    name.username = username
    return name
}

export function generateUniqueLastname() {
    const names = ["le", "nguyen", "tran", "lac"]
    const randomIndex = Math.floor(Math.random() * names.length)
    const randomLastName = names[randomIndex]
    return randomLastName
}

export function generateAddress() {
    return '123 Main Street, Anytown, CA 91234'
}

export function generateCountry() {
    const countries = ["United States", "India", "Australia", "Canada", "Israel", "New Zealand", "Singapore"]
    const randomIndex = Math.floor(Math.random() * countries.length)
    const randomCountry = countries[randomIndex]
    return randomCountry
}

export function generateState() {
    const states = ["Floria", "Vermont", "Utah", "Idaho", "Washington"]
    const randomIndex = Math.floor(Math.random() * states.length)
    const randomState = states[randomIndex]
    return randomState
}

export function generateCity() {
    const cities = ["New York", "Phoenix", "Chicago", "Los Angeles"]
    const randomIndex = Math.floor(Math.random() * cities.length)
    const randomCity = cities[randomIndex]
    return randomCity
}

export function generateZipcode() {
    const randomZipCode = Math.floor(Math.random() * 99999) + 1
    return randomZipCode.toString()
}

export function generateMobileNumber() {
    const randomMobileNumber = '0' + (Math.floor(Math.random() * 9999999) + 1)
    return randomMobileNumber
}

export function generateTitle() {
    const titleList = ['Mr.', 'Mrs.']
    const randomNumber = Math.floor(Math.random() * titleList.length)
    const randomTitle = titleList[randomNumber]
    return randomTitle
}

export function generateSubject() {
    const subjects = ['Product questions', 'Order issues', 'General inquiries', 'Support requests']
    const randomIndex = Math.floor(Math.random() * subjects.length)
    return subjects[randomIndex]
}

export function generateMessage(subject: string) {
    const subjectMessageMap = {
        'Product questions': "Hi team, I am interested in your product, but I have a few questions before making a purchase. Could you please clarify the warranty? I’d appreciate any details you can provide. Thank you,",
        'Order issues': "Hi team, I recently placed an order #01, but I have encountered an issue. The item I received is [damaged/incorrect/missing], and I would appreciate your help resolving this as soon as possible. Please let me know the next steps or if you need any additional information from me. Thank you, Alex",
        'General inquiries': "Hi team, I hope this message finds you well. I have a few general questions regarding your services/products and would appreciate any information or guidance you can provide. Please let me know the best way to proceed or whom I should contact for more details. Thank you, Alex",
        'Support requests': "Hi team, I’m experiencing an issue with logging into my account. I’ve tried basic troubleshooting, but the problem still persists. Could you please assist me in resolving this? Thank you, Alex"
    }
    return subjectMessageMap[subject as keyof typeof subjectMessageMap]
}