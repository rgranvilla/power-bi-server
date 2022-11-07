import { hash } from "bcrypt";

import { AppError } from "../../../../shared/errors/AppErrors";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    username,
    avatar,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    const passwordHash = await hash(password, 8);

    Object.assign(user, {
      username,
      avatar,
      email,
      password: passwordHash,
    });

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User> {
    const res = this.users.find((user) => user.id === id);

    return res;
  }

  async findByUsername(username: string): Promise<User> {
    const res = this.users.find((user) => user.username === username);

    return res;
  }
  async findByEmail(email: string): Promise<User> {
    const res = this.users.find((user) => user.email === email);

    return res;
  }
}

export { UsersRepositoryInMemory };
