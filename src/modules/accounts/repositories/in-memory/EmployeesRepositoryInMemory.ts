import { hash } from "bcrypt";

import { ICreateEmployeeDTO } from "@modules/accounts/dtos/ICreateEmployeeDTO";
import { Employees } from "@modules/accounts/infra/typeorm/entities/Employees";

import { IEmployeesRepository } from "../IEmployeesRepository";

class EmployeesRepositoryInMemory implements IEmployeesRepository {
  employees: Employees[] = [];

  async create({
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
  }: ICreateEmployeeDTO): Promise<void> {
    const employee = new Employees();

    const passwordHash = await hash(password, 8);

    Object.assign(employee, {
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

    this.employees.push(employee);
  }

  async findById(id: string): Promise<Employees> {
    return this.employees.find((employee) => employee.id === id);
  }

  async findByUsername(username: string): Promise<Employees> {
    return this.employees.find((employee) => employee.username === username);
  }
  async findByEmail(email: string): Promise<Employees> {
    return this.employees.find((employee) => employee.email === email);
  }
}

export { EmployeesRepositoryInMemory };
