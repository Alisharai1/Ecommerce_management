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

    // getUserByEmail(email: string): Promise<User | null>
}