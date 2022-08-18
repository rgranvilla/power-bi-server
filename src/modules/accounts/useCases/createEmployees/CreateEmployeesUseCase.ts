import { inject, injectable } from "tsyringe";

import { IEmployeesRepository } from "@modules/accounts/repositories/IEmployeesRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IRequest {
  first_name: string;
  last_name: string;
  position: string;
  username: string;
  access_level: number;
  email: string;
  password: string;
  leader_username: string;
  gender: string;
  birthday: Date;
  hire_date: Date;
}

@injectable()
class CreateEmployeesUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  async execute({
    first_name,
    last_name,
    position,
    username,
    access_level,
    email,
    password,
    leader_username,
    gender,
    birthday,
    hire_date,
  }: IRequest): Promise<void> {
    const employeesAlreadyExists =
      await this.employeesRepository.findByEmployees({
        username,
        email,
      });

    if (employeesAlreadyExists) {
      throw new AppError("Employee already exists!");
    }

    await this.employeesRepository.create({
      first_name,
      last_name,
      position,
      username,
      access_level,
      email,
      password,
      leader_username,
      gender,
      birthday,
      hire_date,
    });
  }
}

export { CreateEmployeesUseCase };
