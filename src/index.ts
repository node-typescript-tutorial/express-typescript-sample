import express from "express";
import { route } from "./route";
import { Application } from "./app";

const app = new Application()
const exp = express();

const port = process.env.PORT || 8080;

route(exp, app)

exp.listen(port,() => {
  console.log("start listenin at port: " + port);
});
