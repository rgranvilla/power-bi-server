import { inject, injectable } from "tsyringe";

import { Employees } from "@modules/accounts/infra/typeorm/entities/Employees";
import { IEmployeesRepository } from "@modules/accounts/repositories/IEmployeesRepository";

interface IRequest {
  username?: string;
  email?: string;
}

@injectable()
class GetEmployeeUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  async execute({ username, email }: IRequest): Promise<Employees> {
    const employee = await this.employeesRepository.findByEmployees({
      username,
      email,
    });

    return employee;
  }
}

export { GetEmployeeUseCase };
