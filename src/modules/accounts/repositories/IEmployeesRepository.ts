import { ICreateEmployeeDTO } from "../dtos/ICreateEmployeeDTO";
import { Employees } from "../infra/typeorm/entities/Employees";

interface IEmployeesRepository {
  create({
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
  }: ICreateEmployeeDTO): Promise<void>;
  findById(id: string): Promise<Employees>;
  findByUsername(username: string): Promise<Employees>;
  findByEmail(email: string): Promise<Employees>;
}

export { IEmployeesRepository };
