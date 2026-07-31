import { User } from "src/models"

export interface IUserService {

    createUser(input: User): Promise<User>

    // getUserByEmail(email: string): Promise<User | null>
}