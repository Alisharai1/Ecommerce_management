import { number, object, string } from 'yup'

export const AddUserRequestBody = object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().required().email(),
    password: string().required().min(8).max(50),
    phone: string()
})

export const GetUsersSchema = object({
    limit: number().positive().integer().default(5),
    page: number().positive().integer().default(1)
})

export const GetUserByIdParamsSchema = object({
    id: string().uuid().required()
})

export const DeleteUserByParamsSchema = object({
    id: string().uuid().required()

})

export const UpdateUserByParamsSchema = object({
    id: string().uuid().required(),
    firstName: string().required(),
    lastName: string().required(),
})