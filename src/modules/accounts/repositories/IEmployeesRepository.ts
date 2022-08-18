import {
  ICreateEmployeesDTO,
  IFindEmployeesDTO,
} from "../dtos/ICreateEmployeesDTO";
import { Employees } from "../infra/typeorm/entities/Employees";

interface IEmployeesRepository {
  create(data: ICreateEmployeesDTO): Promise<void>;
  findByEmployees({ username, email }: IFindEmployeesDTO): Promise<Employees>;
}

export { IEmployeesRepository };
