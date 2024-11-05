import { UserController } from "@controllers/user-controller";
import { UserService } from "@services/user-service";
import { UserRepository } from "@repositories/user-repository";
import { MySQLClient } from "@utils/mysql/mysql-client";
import { userModel } from "@entities/user";
import { validate } from "./utils/model-validator";

export class Application {
  userController: UserController;
  constructor(dbClient: MySQLClient) {
    const userRepo = new UserRepository("users", dbClient, userModel);
    const userService = new UserService(userRepo, userModel, validate);
    this.userController = new UserController(userService);
  }
}
