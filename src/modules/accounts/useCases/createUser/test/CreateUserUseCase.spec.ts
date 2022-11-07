import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

const user = {
  username: "Johndoe",
  email: "johndoe@mail.com",
  password: "admin",
};

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  afterEach(() => {
    usersRepositoryInMemory = null;
    createUserUseCase = null;
  });

  it("Should be able to create a new user", async () => {
    await createUserUseCase.execute(user);
    const createdUser = await usersRepositoryInMemory.findByUsername("Johndoe");

    expect(createdUser).toHaveProperty("id");
    expect(createdUser.username).toBe("Johndoe");
  });

  it("Shouldn't be able to create an already exists user", async () => {
    await createUserUseCase.execute(user);

    expect(async () => {
      await createUserUseCase.execute(user);
    }).rejects.toMatchObject({
      message: "Username or email already exists!",
      statusCode: 500,
    });
  });

  it("Shouldn't be able to create an user with username already used!", async () => {
    await createUserUseCase.execute(user);

    expect(async () => {
      const userWithUsernameAlreadyExists = {
        username: "Johndoe",
        email: "johnwick@mail.com",
        password: "SameUsername",
      };
      await createUserUseCase.execute(userWithUsernameAlreadyExists);
    }).rejects.toMatchObject({
      message: "Username or email already exists!",
      statusCode: 500,
    });
  });

  it("Shouldn't be able to create an user with email already used!", async () => {
    await createUserUseCase.execute(user);

    expect(async () => {
      const userWithEmailAlreadyExists = {
        username: "JohnWick",
        email: "johndoe@mail.com",
        password: "SameUsername",
      };

      await createUserUseCase.execute(userWithEmailAlreadyExists);
    }).rejects.toMatchObject({
      message: "Username or email already exists!",
      statusCode: 500,
    });
  });
});
