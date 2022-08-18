import { ICreateEmployeesDTO } from "../dtos/ICreateEmployeesDTO";

interface IEmployeesRepository {
  create(data: ICreateEmployeesDTO): Promise<void>;
}

export { IEmployeesRepository };
