import {
  ICreateEmployeesDTO,
  IFindById,
  IFindEmployeesDTO,
} from "../dtos/ICreateEmployeesDTO";
import { Employees } from "../infra/typeorm/entities/Employees";

interface IEmployeesRepository {
  create(data: ICreateEmployeesDTO): Promise<void>;
  findById({ id }: IFindById): Promise<Employees>;
  findByEmployees({ username, email }: IFindEmployeesDTO): Promise<Employees>;
}

export { IEmployeesRepository };
