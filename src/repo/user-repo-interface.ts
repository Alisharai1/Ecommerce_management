import { User } from "src/models";

export interface IUserRepo {

    createUser(input: User): Promise<User>

    getUserByEmail(email: string): Promise<User | null>

}