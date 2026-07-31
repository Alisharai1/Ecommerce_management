export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone?: string,
    createdAt: Date,
    updatedAt: Date
}