import { User } from "../models";
import { IUserRepo } from "./user-repo-interface";
import { UserDb } from "./users-model";

export class UserRepo implements IUserRepo {
    async getUserById(id: string): Promise<User | null> {
        const user = await UserDb.findByPk(id)
        if (!user) {
            return null
        }
        return user.toJSON<User>()
    }

    async getAllUsers(input: { limit: number; offset: number; }): Promise<User[]> {
        const users = await UserDb.findAll(input)
        return users.map((user) => user.toJSON<User>())
    }
    async getUserByEmail(email: string): Promise<User | null> {
        const user = await UserDb.findOne({ where: { email }, limit: 1 })
        if (!user) {
            return null
        }
        return user.toJSON<User>();
    }

    async createUser(input: User): Promise<User> {
        const user = await UserDb.create(input);
        return user.toJSON<User>();
    }
}
