import { User } from "src/models"

export interface IUserService {

    createUser(input: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone?: string;
    }): Promise<User>

    // getUserByEmail(email: string): Promise<User | null>
}