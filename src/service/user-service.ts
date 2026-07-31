import { User } from "src/models";
import { IUserService } from "./user-service-interface";
import { IUserRepo } from "src/repo/user-repo-interface";
import { v4 } from "uuid";
import { DuplicateUserException } from "../exception/dublicate-user";

export class UserService implements IUserService {
    private readonly userRepo: IUserRepo
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async createUser(input: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone?: string;
    }): Promise<User> {
        const existingUser = await this.userRepo.getUserByEmail(input.email)
        if (existingUser) {
            throw new DuplicateUserException('user already exist')
        }
        return this.userRepo.createUser({ ...input, id: v4(), createdAt: new Date(), updatedAt: new Date() })
    }
}