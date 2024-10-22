import { IUserService } from "@services/user-service";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { User } from "../entities/user";

export class UserController {
  constructor(private service: IUserService) {
    this.load = this.load.bind(this);
  }

  load(req: Request<{ id: string }>, res: Response) {
    const id = req.params["id"];
    if (id.length == 0) {
      res.status(400);
    }
    res.status(200).json();
  }

  async insert(req: Request<ParamsDictionary, any, User>, resp: Response) {
    const user = req.body;
    const errList = this.service.validate(user);
    if (errList != null) {
      resp.status(422).json(errList);
      return;
    }
    try {
      const res = await this.service.insert(user);
      if (res == 0) {
        resp.status(500).send("Internal Server Error");
        return;
      } else {
        resp.status(201).send(res);
        return;
      }
    } catch (error) {
      resp.status(500).send("Internal Server Error");
      return;
    }
  }

  async update(req: Request<{ id: string }, any, User>, resp: Response){
    const id = req.params["id"]
    const user = req.body;

    const errList = this.service.validate(user);
    if (errList != null) {
      resp.status(422).json(errList);
      return;
    }

    try {
      const res = await this.service.update(user, id);
      if (res == 0) {
        resp.status(500).send("Internal Server Error");
        return;
      } else {
        resp.status(200).send(res);
        return;
      }
    } catch (error) {
      resp.status(500).send("Internal Server Error");
      return;
    }
  }

  async patch(req: Request<{ id: string }, any, User>, resp: Response){
    const id = req.params["id"]
    const user = req.body;

    const errList = this.service.validate(user);
    if (errList != null) {
      resp.status(422).json(errList);
      return;
    }

    try {
      const res = await this.service.patch(user, id);
      if (res == 0) {
        resp.status(500).send("Internal Server Error");
        return;
      } else {
        resp.status(200).send(res);
        return;
      }
    } catch (error) {
      resp.status(500).send("Internal Server Error");
      return;
    }
  }
}
