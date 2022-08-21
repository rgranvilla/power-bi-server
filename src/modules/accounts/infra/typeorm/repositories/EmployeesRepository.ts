import { hash } from "bcrypt";
import { getRepository, Repository } from "typeorm";

import { ICreateEmployeeDTO } from "@modules/accounts/dtos/ICreateEmployeeDTO";
import { IEmployeesRepository } from "@modules/accounts/repositories/IEmployeesRepository";

import { Employees } from "../entities/Employees";

class EmployeesRepository implements IEmployeesRepository {
  private repository: Repository<Employees>;

  constructor() {
    this.repository = getRepository(Employees);
  }

  async create({
    id,
    first_name,
    last_name,
    position,
    username,
    avatar,
    access_level,
    email,
    password,
    leader_username,
    gender,
    birthday,
    hire_date,
  }: ICreateEmployeeDTO): Promise<Employees> {
    const passwordHash = await hash(password, 8);

    const employees = this.repository.create({
      id,
      first_name,
      last_name,
      position,
      username,
      avatar,
      access_level,
      email,
      password: passwordHash,
      leader_username,
      gender,
      birthday,
      hire_date,
    });

    const employee = await this.repository.save(employees);

    return employee;
  }

  async findById(id: string): Promise<Employees> {
    const employee = await this.repository.findOne(id);

    return employee;
  }

  async findByUsername(username: string): Promise<Employees> {
    const employee = await this.repository.findOne({ username });

    return employee;
  }

  async findByEmail(email: string): Promise<Employees> {
    const employee = await this.repository.findOne({ email });

    return employee;
  }
}

export { EmployeesRepository };
