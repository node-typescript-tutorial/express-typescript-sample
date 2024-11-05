import express, { json } from "express";
import { route } from "./route";
import { Application } from "./app";
import mysql from "mysql2/promise";
import * as yaml from "js-yaml";
import { readFileSync } from "fs";
import { Config } from "./config";
import { MySQLClient } from "./utils/mysql/mysql-client";

const config = yaml.load(readFileSync("./config.yml", "utf8")) as Config;

const pool = mysql.createPool({
  uri: config.database.MYSQL_URI,
});

// ping to mysql database
try {
  pool.getConnection();
  console.log("mysql connection establis");
} catch (error) {
  console.log(error);
  throw error;
}

const dbClient = new MySQLClient(pool);
const app = new Application(dbClient);
const exp = express();

exp.use(json());

const port = process.env.PORT || 8080;

route(exp, app);

exp.listen(port, () => {
  console.log("start listenin at port: " + port);
});
