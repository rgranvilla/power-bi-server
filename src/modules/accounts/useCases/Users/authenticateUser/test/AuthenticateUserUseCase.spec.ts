import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  const user: ICreateUserDTO = {
    username: "Johndoe",
    email: "johndoe@test.com",
    password: "password",
  };

  it("should be able to authenticate an user with email and password", async () => {
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: "johndoe@test.com",
      password: "password",
    });

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("user");
  });

  it("shouldn't be able to authenticate an user with wrong password", async () => {
    expect(async () => {
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "johndoe@test.com",
        password: "wrongPassword",
      });
    }).rejects.toMatchObject({
      message: "Email or password incorrect!",
      statusCode: 400,
    });
  });

  it("shouldn't be able to authenticate an user with wrong email", async () => {
    expect(async () => {
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "wrong@email.com",
        password: "password",
      });
    }).rejects.toMatchObject({
      message: "Email or password incorrect!",
      statusCode: 400,
    });
  });
});
