import { User } from "src/models";

export interface IUserRepo {

    createUser(input: User): Promise<User>

    getUserByEmail(email: string): Promise<User | null>

    getAllUsers(input: { limit: number, offset: number }): Promise<User[]>

    getUserById(id:string):Promise<User | null>

}