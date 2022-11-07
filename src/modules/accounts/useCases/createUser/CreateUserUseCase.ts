import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IRequest {
  username: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ username, email, password }: IRequest): Promise<User> {
    const userUsernameExists = await this.usersRepository.findByUsername(
      username
    );

    const userEmailExists = await this.usersRepository.findByEmail(email);

    const userAlreadyExists = userUsernameExists && userEmailExists;

    if (userAlreadyExists) {
      throw new AppError("Username or email already exists!", 500);
    }

    if (userUsernameExists) {
      throw new AppError("Username or email already exists!", 500);
    }

    if (userEmailExists) {
      throw new AppError("Username or email already exists!", 500);
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      username,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserUseCase };
