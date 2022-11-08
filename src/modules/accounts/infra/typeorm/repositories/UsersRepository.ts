import { Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import dataSource from "@shared/infra/typeorm";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create({
    id,
    username,
    avatar,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const users = this.repository.create({
      id,
      username,
      avatar,
      email,
      password,
    });

    const user = await this.repository.save(users);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOneBy({ username });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }
}

export { UsersRepository };
