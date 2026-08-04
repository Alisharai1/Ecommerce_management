import { User } from "src/models";
import { IUserService } from "./user-service-interface";
import { IUserRepo } from "src/repo/user-repo-interface";
import { v4 } from "uuid";
import { DuplicateUserException } from "../exception/duplicate-user";
import { UserNotFoundException } from "../exception/user-not-found";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { InvalidCredentialException } from "../exception/invalid-cred";

const salt = bcryptjs.genSaltSync(10);
export class UserService implements IUserService {
    private readonly userRepo: IUserRepo
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }
    
    async login(input: { email: string, password: string }): Promise<{ token: string; userId: string; }> {
        const existingUser = await this.userRepo.getUserByEmail(input.email)
        if (!existingUser || !existingUser.password) {
            throw new InvalidCredentialException("Invalid credential")
        }
        const output = bcryptjs.compare(input.password, existingUser.password)
        if (!output) {
            throw new InvalidCredentialException("Invalid credential")
        }
        const token = jwt.sign({ userId: existingUser.id }, "qwertyui", { expiresIn: "1D" })
        return { userId: existingUser.id, token }
    }

    async updateUser(input: { id: string, firstName: string, lastName: string }): Promise<User | null> {

        const existingUser = await this.userRepo.getUserById(input.id)
        if (!existingUser) {
            throw new UserNotFoundException("user not found")
        }
        const updatedUser = await this.userRepo.updateUser(input)
        if (!updatedUser) {
            throw new UserNotFoundException("user not found")
        }
        return { ...updatedUser, password: undefined }
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
        user.password = undefined
        return user
    }

    async getUsers(input: { limit: number; page: number; }): Promise<User[]> {
        const offset = input.limit * (input.page - 1)

        const users = await this.userRepo.getAllUsers({ limit: input.limit || 5, offset })
        return users.map((user) => {
            return { ...user, password: undefined }
        })
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
        const hash = bcryptjs.hashSync(input.password, salt);

        const newUser = await this.userRepo.createUser({ ...input, password: hash, id: v4(), createdAt: new Date(), updatedAt: new Date() })
        return { ...newUser, password: undefined }
    }
}