import { CRUDRepository, ICRUDRepository } from "@utils/repositories";
import { User } from "src/entities/user";

export interface IUserRepository extends ICRUDRepository<User> {}
export class UserRepository
  extends CRUDRepository<User>
  implements IUserRepository
{
  constructor(table: string) {
    super(table);
  }
}

