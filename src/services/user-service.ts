import { IUserRepository } from "@repositories/user-repository";

export class UserService {
  constructor(private repository: IUserRepository) {
    
  }
}
