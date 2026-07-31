import { AddUserRequestBody, GetUserByIdParamsSchema, GetUsersSchema } from './user.dto'
import { IUserService } from "../service/user-service-interface";
import { DuplicateUserException } from '../exception/duplicate-user';
import { ValidationError } from 'yup';
import { Request, Response, Router } from "express";
import { UserNotFoundException } from '../exception/user-not-found';


export class UserController {
    private readonly userService: IUserService;

    private constructor(userService: IUserService) {
        this.userService = userService
    }

    static start(userService: IUserService) {
        const router = Router()
        const controller = new UserController(userService)

        router.post('/', controller.createUser)
        router.get('/', controller.getUsers)
        router.get('/:id', controller.getUser)

        return router
    }

    private createUser = async (request: Request, res: Response) => {
        try {
            const input = AddUserRequestBody.validateSync(request.body, {
                abortEarly: false,
                strict: true
            })
            const newUser = await this.userService.createUser(input)
            res.json(newUser).status(200);
        } catch (error) {
            console.log(error);

            if (error instanceof ValidationError) {
                res.status(400).json(error.errors)
            }
            else if (error instanceof DuplicateUserException) {
                res.status(400).json({ message: "user already exist" })
            }
            else {
                res.status(500).json("internal server error")
            }
        }
    }
    private getUsers = async (request: Request, res: Response) => {
        try {
            const input = GetUsersSchema.validateSync(request.query, {
                abortEarly: false,
            })

            const users = await this.userService.getUsers(input)
            res.status(200).json(users)
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json(error.errors)
            } else {
                res.status(500).json("internal server error")
            }
        }
    }

    private getUser = async (request: Request, res: Response) => {
        try {
            const input = GetUserByIdParamsSchema.validateSync(request.params, { abortEarly: false, strict: true })

            const user = await this.userService.getUserById(input.id)
            res.status(200).json(user)
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json(error.errors)
            }
            else if (error instanceof UserNotFoundException) {
                res.status(404).json({ message: "user not found" })
            } else {
                res.status(500).json("internal server error")
            }
        }
    }
}
