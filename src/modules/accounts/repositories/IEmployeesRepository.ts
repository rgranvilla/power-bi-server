import {
  ICreateEmployeesDTO,
  IFindByIdDTO,
  IFindEmployeesDTO,
} from "../dtos/IEmployeesDTO";
import { Employees } from "../infra/typeorm/entities/Employees";

interface IEmployeesRepository {
  create(data: ICreateEmployeesDTO): Promise<void>;
  findById({ id }: IFindByIdDTO): Promise<Employees>;
  findByEmployees({ username, email }: IFindEmployeesDTO): Promise<Employees>;
}

export { IEmployeesRepository };
