import { ICreateEmployeeDTO } from "@modules/accounts/dtos/ICreateEmployeeDTO";
import { EmployeesRepositoryInMemory } from "@modules/accounts/repositories/in-memory/EmployeesRepositoryInMemory";

import { CreateEmployeeUseCase } from "../../createEmployee/CreateEmployeeUseCase";
import { AuthenticateEmployeeUseCase } from "../AuthenticateEmployeeUseCase";

let authenticateEmployeeUseCase: AuthenticateEmployeeUseCase;
let employeesRepositoryInMemory: EmployeesRepositoryInMemory;
let createEmployeeUseCase: CreateEmployeeUseCase;

describe("Authenticate Employee", () => {
  beforeEach(() => {
    employeesRepositoryInMemory = new EmployeesRepositoryInMemory();
    authenticateEmployeeUseCase = new AuthenticateEmployeeUseCase(
      employeesRepositoryInMemory
    );
    createEmployeeUseCase = new CreateEmployeeUseCase(
      employeesRepositoryInMemory
    );
  });

  const employee: ICreateEmployeeDTO = {
    first_name: "John",
    last_name: "Doe",
    position: "Administrator",
    username: "Johndoe",
    access_level: 0,
    email: "johndoe@test.com",
    password: "password",
    leader_username: "Boss",
    gender: "Male",
    birthday: new Date(),
    hire_date: new Date(),
  };

  it("should be able to authenticate an employee with username and password", async () => {
    await createEmployeeUseCase.execute(employee);

    const result = await authenticateEmployeeUseCase.execute({
      username: "Johndoe",
      password: "password",
    });

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("employee");
  });

  it("should be able to authenticate an employee with email and password", async () => {
    await createEmployeeUseCase.execute(employee);

    const result = await authenticateEmployeeUseCase.execute({
      email: "johndoe@test.com",
      password: "password",
    });

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("employee");
  });

  it("shouldn't be able to authenticate an non-existent employee", () => {
    expect(async () => {
      await authenticateEmployeeUseCase.execute({
        username: "Johndoe",
        password: "admin",
      });
    }).rejects.toMatchObject({
      message: "Username, email or password incorrect!",
      statusCode: 400,
    });
  });

  it("shouldn't be able to authenticate an employee with wrong password", async () => {
    expect(async () => {
      await createEmployeeUseCase.execute(employee);

      await authenticateEmployeeUseCase.execute({
        email: "johndoe@test.com",
        password: "wrongPassword",
      });
    }).rejects.toMatchObject({
      message: "Username, email or password incorrect!",
      statusCode: 400,
    });
  });

  it("shouldn't be able to authenticate an employee with wrong username", async () => {
    expect(async () => {
      await createEmployeeUseCase.execute(employee);

      await authenticateEmployeeUseCase.execute({
        username: "wrongUsername",
        password: "password",
      });
    }).rejects.toMatchObject({
      message: "Username, email or password incorrect!",
      statusCode: 400,
    });
  });

  it("shouldn't be able to authenticate an employee with wrong email", async () => {
    expect(async () => {
      await createEmployeeUseCase.execute(employee);

      await authenticateEmployeeUseCase.execute({
        email: "wrong@email.com",
        password: "password",
      });
    }).rejects.toMatchObject({
      message: "Username, email or password incorrect!",
      statusCode: 400,
    });
  });
});
