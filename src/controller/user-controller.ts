import { AddUserRequestBody } from './user.dto'
import { IUserService } from "../service/user-service-interface";
import { DuplicateUserException } from '../exception/dublicate-user';
import { ValidationError } from 'yup';
import { Request, Response, Router } from "express";


export class UserController {
    private readonly userService: IUserService;

    private constructor(userService: IUserService) {
        this.userService = userService
    }

    static start(userService: IUserService) {
        const router = Router()
        const controller = new UserController(userService)

        router.post('/', controller.createUser)

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
}