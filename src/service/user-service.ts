import { User } from "src/models";
import { IUserService } from "./user-service-interface";
import { IUserRepo } from "src/repo/user-repo-interface";

export class UserService implements IUserService {
    private readonly userRepo: IUserRepo
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async createUser(input: User): Promise<User> {
        const existingUser = await this.userRepo.getUserByEmail(input.email)
        if (existingUser) {
            throw new Error('user already exist')
        }
        return this.userRepo.createUser(input)
    }
}