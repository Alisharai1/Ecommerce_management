import { User } from "../models";
import { IUserRepo } from "./user-repo-interface";
import { UserDb } from "./users-model";

export class UserRepo implements IUserRepo {
    async getUserByEmail(email: string): Promise<User | null> {
        const user = await UserDb.findOne({ where: { email } })
        if (user) {
            return user.toJSON<User>();
        }
        return null
    }

    async createUser(input: User): Promise<User> {
        const user = await UserDb.create(input);
        return user.toJSON<User>();
    }
}
