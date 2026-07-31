import { Express } from 'express'
import { UserController } from "./controller/user-controller";
import { UserRepo } from "./repo/user-repo";
import { UserService } from "./service/user-service";

export function bootstrap(app: Express) {
    const userRepo = new UserRepo()
    const userService = new UserService(userRepo)
    const router = UserController.start(userService);
    app.use('/v0/user', router)
}
