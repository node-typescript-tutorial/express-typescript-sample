import { CRUDRepository, ICRUDRepository } from "@utils/repositories";
import { User } from "@entities/user";
import { MySQLClient } from "../utils/mysql/mysql-client";
import { Model } from "../utils/model-validator/model";

export interface IUserRepository extends ICRUDRepository<User> {}
export class UserRepository
  extends CRUDRepository<User>
  implements IUserRepository
{
  constructor(protected table: string, protected dbClient: MySQLClient, protected model:Model) {
    super(table, dbClient, model)
    
  }
}

