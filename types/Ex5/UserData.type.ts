export type UserData = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export type NewUserData = {
    name: string,
    job: string,
    id?: string,
    createAt?: Date
}

export type Todo = {
    id: number,
    text: string,
    completed: boolean
}