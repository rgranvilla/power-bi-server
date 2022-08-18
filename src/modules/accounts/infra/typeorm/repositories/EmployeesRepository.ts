import { hash } from "bcrypt";
import { getRepository, Repository } from "typeorm";

import {
  ICreateEmployeesDTO,
  IFindEmployeesDTO,
} from "@modules/accounts/dtos/ICreateEmployeesDTO";
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
    leader_username,
    gender,
    birthday,
    hire_date,
  }: ICreateEmployeesDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const employees = this.repository.create({
      first_name,
      last_name,
      position,
      username,
      access_level,
      email,
      password: passwordHash,
      leader_username,
      gender,
      birthday,
      hire_date,
    });

    await this.repository.save(employees);
  }

  async findByEmployees({
    username,
    email,
  }: IFindEmployeesDTO): Promise<Employees> {
    const employee = await this.repository.findOne({
      where: [{ username }, { email }],
    });

    return employee;
  }
}

export { EmployeesRepository };
