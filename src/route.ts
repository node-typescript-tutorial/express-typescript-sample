import { Express } from "express";
import { Application } from "./app";

export function route(router: Express, app: Application) {
    router.get("/users/:id", app.userController.load)
}
