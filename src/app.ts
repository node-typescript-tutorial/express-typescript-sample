import { UserService } from "@services/user-service";
import { UserController } from "./controllers/user-controller";
import { UserRepository } from "@repositories/user-repository";
export class Application {
     userController: UserController
    constructor(){
        const userRepo = new UserRepository("user")
        const userService = new UserService(userRepo) 
        this.userController = new UserController(userService)
    }
}