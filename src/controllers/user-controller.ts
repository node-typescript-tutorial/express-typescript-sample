import { UserService } from "@services/user-service";
import { Request, Response } from "express";
import { User } from "@entities/user";

export class UserController {
    constructor(private service: UserService){
        this.get = this.get.bind(this)
    }

    get(req: Request, res:Response){
        const user:User = {
            id: "1",
            name: "vinh"
        }
        res.status(200).json(user)
    }
}