import { inject, injectable } from "tsyringe";

import { IEmployeesRepository } from "@modules/accounts/repositories/IEmployeesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  employee_id: string;
  avatar_file: string;
}

@injectable()
class UpdateEmployeeAvatarUseCase {
  constructor(
    @inject("EmployeesRepository")
    private employeesRepository: IEmployeesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ employee_id, avatar_file }: IRequest): Promise<void> {
    const employee = await this.employeesRepository.findById(employee_id);

    if (employee.avatar) this.storageProvider.delete(employee.avatar, "avatar");

    await this.storageProvider.save(avatar_file, "avatar");

    employee.avatar = avatar_file;

    await this.employeesRepository.create(employee);
  }
}

export { UpdateEmployeeAvatarUseCase };
