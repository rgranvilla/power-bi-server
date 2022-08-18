import { getRepository, Repository } from "typeorm";

import { ICreateEmployeesDTO } from "@modules/accounts/dtos/ICreateEmployeesDTO";
import { IEmployeesRepository } from "@modules/accounts/repositories/IEmployeesRepository";

import { Employees } from "../entities/Employees";

class EmployeesRepository implements IEmployeesRepository {
  private repository: Repository<Employees>;

  constructor() {
    this.repository = getRepository(Employees);
  }

  async create({
    first_name,
    last_name,
    position,
    username,
    access_level,
    email,
    password,
    leader_id,
    gender,
    birthday,
    hire_date,
  }: ICreateEmployeesDTO): Promise<void> {
    const employees = this.repository.create({
      first_name,
      last_name,
      position,
      username,
      access_level,
      email,
      password,
      leader_id,
      gender,
      birthday,
      hire_date,
    });

    await this.repository.save(employees);
  }
}

export { EmployeesRepository };
