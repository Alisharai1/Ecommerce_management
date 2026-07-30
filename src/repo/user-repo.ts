import { User } from "../models";
import { UserDb } from "./users-model";

interface UserRepoInterface {
    createUser(input: User): Promise<User>
}

export class UserRepo implements UserRepoInterface {
    async createUser(input: User): Promise<User> {
        const user = await UserDb.create(input);
        return user.toJSON<User>();
    }
}
