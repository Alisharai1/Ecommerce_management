import { object, string } from 'yup'

export const addUserBodySchema = object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().required().email(),
    password: string().required().min(8).max(50),
    phone: string()
})