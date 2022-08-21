import fs from "fs";
import path from "path";

import { EmployeesRepositoryInMemory } from "@modules/accounts/repositories/in-memory/EmployeesRepositoryInMemory";
import { LocalStorageProvider } from "@shared/container/providers/StorageProvider/implementations/LocalStorageProvider";

import { UpdateEmployeeAvatarUseCase } from "../UpdateEmployeeAvatarUseCase";

let employeesRepositoryInMemory: EmployeesRepositoryInMemory;
let localStorageProvider: LocalStorageProvider;
let updateEmployeeAvatarUseCase: UpdateEmployeeAvatarUseCase;

const newEmployee = {
  first_name: "John",
  last_name: "Wick",
  username: "John_wick",
  email: "john_wick@mail.com",
  password: "123456",
  access_level: 0,
  position: "JobPosition",
  leader_username: "Boss",
  birthday: new Date(),
  gender: "male",
  hire_date: new Date(),
};

describe("Upload employee avatar", () => {
  beforeEach(() => {
    employeesRepositoryInMemory = new EmployeesRepositoryInMemory();
    localStorageProvider = new LocalStorageProvider();
    updateEmployeeAvatarUseCase = new UpdateEmployeeAvatarUseCase(
      employeesRepositoryInMemory,
      localStorageProvider
    );
  });

  it("Should be able to add a employee avatar", async () => {
    const { id: employee_id } = await employeesRepositoryInMemory.create(
      newEmployee
    );

    const avatarPath = path.resolve("assets/avatar_first_test_image.png");
    const tmpPath = path.resolve("tmp/avatar_first_test_image.png");

    await fs.promises.copyFile(avatarPath, tmpPath);

    const updateEmployeeAvatar = spyOn(employeesRepositoryInMemory, "create");

    await updateEmployeeAvatarUseCase.execute({
      employee_id,
      avatar_file: path.basename(avatarPath),
    });

    await localStorageProvider.delete(path.basename(avatarPath), "avatar");

    expect(updateEmployeeAvatar).toHaveBeenCalled();
  });

  it("Should be able to remove the users old avatar, and replace it with the new", async () => {
    const { id: employee_id } = await employeesRepositoryInMemory.create(
      newEmployee
    );
    const first_avatar_path = path.resolve(
      "assets/avatar_first_test_image.png"
    );
    const second_avatar_path = path.resolve(
      "assets/avatar_second_test_image.png"
    );

    const tmpPath1 = path.resolve("tmp/avatar_first_test_image.png");
    const tmpPath2 = path.resolve("tmp/avatar_second_test_image.png");

    await fs.promises.copyFile(first_avatar_path, tmpPath1);
    await fs.promises.copyFile(second_avatar_path, tmpPath2);

    await updateEmployeeAvatarUseCase.execute({
      employee_id,
      avatar_file: path.basename(first_avatar_path),
    });

    const deleteOldImageFile = spyOn(localStorageProvider, "delete");

    await updateEmployeeAvatarUseCase.execute({
      employee_id,
      avatar_file: path.basename(second_avatar_path),
    });

    expect(deleteOldImageFile).toHaveBeenCalled();
  });
});
