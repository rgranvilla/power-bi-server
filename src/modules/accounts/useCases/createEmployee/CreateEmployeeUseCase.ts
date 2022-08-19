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
class CreateEmployeeUseCase {
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
    const employeeUsernameExists =
      await this.employeesRepository.findByUsername(username);

    const employeeEmailExists = await this.employeesRepository.findByEmail(
      email
    );

    const employeeAlreadyExists = employeeUsernameExists && employeeEmailExists;

    if (employeeAlreadyExists) {
      throw new AppError("Employee already exists!");
    }

    if (employeeUsernameExists) {
      throw new AppError("Employee username already exists!");
    }

    if (employeeEmailExists) {
      throw new AppError("Employee email already exists!");
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

export { CreateEmployeeUseCase };
