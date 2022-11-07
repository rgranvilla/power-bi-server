import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create({
    id,
    username,
    avatar,
    email,
    password,
  }: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export type { IUsersRepository };
