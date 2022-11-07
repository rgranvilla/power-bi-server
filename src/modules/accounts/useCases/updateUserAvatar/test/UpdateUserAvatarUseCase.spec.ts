import fs from "fs";
import path from "path";

import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { LocalStorageProvider } from "@shared/container/providers/StorageProvider/implementations/LocalStorageProvider";

import { UpdateUserAvatarUseCase } from "../UpdateUserAvatarUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let localStorageProvider: LocalStorageProvider;
let updateUserAvatarUseCase: UpdateUserAvatarUseCase;

const newUser = {
  username: "John_wick",
  email: "john_wick@mail.com",
  password: "123456",
};

describe("Upload user avatar", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    localStorageProvider = new LocalStorageProvider();
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
      usersRepositoryInMemory,
      localStorageProvider
    );
  });

  it("Should be able to add a user avatar", async () => {
    const { id: user_id } = await usersRepositoryInMemory.create(newUser);

    const avatarPath = path.resolve("assets/avatar_first_test_image.png");
    const tmpPath = path.resolve("tmp/avatar_first_test_image.png");

    await fs.promises.copyFile(avatarPath, tmpPath);

    const updateUserAvatar = spyOn(usersRepositoryInMemory, "create");

    await updateUserAvatarUseCase.execute({
      user_id,
      avatar_file: path.basename(avatarPath),
    });

    await localStorageProvider.delete(path.basename(avatarPath), "avatar");

    expect(updateUserAvatar).toHaveBeenCalled();
  });

  it("Should be able to remove the users old avatar, and replace it with the new", async () => {
    const { id: user_id } = await usersRepositoryInMemory.create(newUser);
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

    await updateUserAvatarUseCase.execute({
      user_id,
      avatar_file: path.basename(first_avatar_path),
    });

    const deleteOldImageFile = spyOn(localStorageProvider, "delete");

    await updateUserAvatarUseCase.execute({
      user_id,
      avatar_file: path.basename(second_avatar_path),
    });

    expect(deleteOldImageFile).toHaveBeenCalled();
  });
});
