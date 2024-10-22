import { IUserRepository } from "@repositories/user-repository";
import { User } from "@entities/user";
import { ErrorMsgs, Model } from "@utils/model-validator";

export interface IUserService {
  load(id: string): Promise<User | null>;
  insert(user: User): Promise<number>;
  update(user: User, id: string): Promise<number>;
  patch(user: User, id: string): Promise<number>;
  delete(id: string): Promise<number>;
  validate(user: User): ErrorMsgs | null;
}

export class UserService implements IUserService {
  constructor(
    private repository: IUserRepository,
    private userModel: Model,
    private validateFn: (
      model: Model,
      obj: Record<string, any>
    ) => ErrorMsgs | null
  ) {
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
    this.load = this.load.bind(this);
    this.insert = this.insert.bind(this);
    this.validate = this.validate.bind(this);
  }

  async load(id: string): Promise<User | null> {
    return await this.repository.load(id);
  }

  insert(user: User): Promise<number> {
    return this.repository.insert(user);
  }

  update(user: User, id: string): Promise<number> {
    return this.repository.update(user, id)
  }
  patch(user: User, id: string): Promise<number> {
    return this.repository.patch(user, id)
  }

  delete(id: string): Promise<number> {
    return this.repository.delete(id)
  }

  validate(user: User): ErrorMsgs | null {
    return this.validateFn(this.userModel, user);
  }
}
