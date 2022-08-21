import { inject, injectable } from "tsyringe";

import { IEmployeesRepository } from "@modules/accounts/repositories/IEmployeesRepository";
import { deleteFile } from "@utils/file";

interface IRequest {
  employee_id: string;
  avatar_file: string;
}

@injectable()
class UpdateEmployeeAvatarUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository
  ) {}

  async execute({ employee_id, avatar_file }: IRequest): Promise<void> {
    const employee = await this.employeesRepository.findById(employee_id);

    if (employee.avatar) {
      await deleteFile(`./tmp/avatar/${employee.avatar}`);
    }

    employee.avatar = avatar_file;

    await this.employeesRepository.create(employee);
  }
}

export { UpdateEmployeeAvatarUseCase };
