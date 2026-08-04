import { User } from "src/models";
import { IUserService } from "./user-service-interface";
import { IUserRepo } from "src/repo/user-repo-interface";
import { v4 } from "uuid";
import { DuplicateUserException } from "../exception/duplicate-user";
import { UserNotFoundException } from "../exception/user-not-found";

export class UserService implements IUserService {
    private readonly userRepo: IUserRepo
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }
    async updateUser(input: { id: string, firstName: string, lastName: string }): Promise<User | null> {

        const existingUser = await this.userRepo.getUserById(input.id)
        if (!existingUser) {
            throw new UserNotFoundException("user not found")
        }
        return await this.userRepo.updateUser(input)
    }

    async deleteUser(id: string): Promise<boolean> {
        const user = await this.userRepo.getUserById(id)
        if (!user) {
            throw new UserNotFoundException("user not found")
        }
        return await this.userRepo.deleteUser(id)
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepo.getUserById(id)
        if (!user) {
            throw new UserNotFoundException("user not found")
        }
        return user
    }

    async getUsers(input: { limit: number; page: number; }): Promise<User[]> {
        const offset = input.limit * (input.page - 1)

        return await this.userRepo.getAllUsers({ limit: input.limit || 5, offset })
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