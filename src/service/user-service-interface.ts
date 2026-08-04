import { User } from "src/models"

export interface IUserService {

    createUser(input: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone?: string;
    }): Promise<User>

    getUsers(input: {
        limit?: number,
        page?: number
    }): Promise<User[]>


    getUserById(id: string): Promise<User>

    deleteUser(id: string): Promise<boolean>

    updateUser(input: {
        id: string,
        firstName: string,
        lastName: string
    }): Promise<User | null>

    login(input: {
        email: string,
        password: string
    }): Promise<{ token: string, userId: string }>

    // getUserByEmail(email: string): Promise<User | null>
}