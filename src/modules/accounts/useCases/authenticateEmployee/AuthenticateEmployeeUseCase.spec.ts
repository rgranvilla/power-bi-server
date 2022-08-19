import { ICreateEmployeeDTO } from "@modules/accounts/dtos/ICreateEmployeeDTO";
import { EmployeesRepositoryInMemory } from "@modules/accounts/repositories/in-memory/EmployeesRepositoryInMemory";

import { CreateEmployeeUseCase } from "../createEmployee/CreateEmployeeUseCase";
import { AuthenticateEmployeeUseCase } from "./AuthenticateEmployeeUseCase";

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

  it("should be able to authenticate an employee with username and password", async () => {
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

    await createEmployeeUseCase.execute(employee);

    const result = await authenticateEmployeeUseCase.execute({
      username: "Johndoe",
      password: "password",
    });

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("employee");
    expect(result.employee.username).toBe(employee.username);
    expect(result.employee.first_name).toBe(employee.first_name);
    expect(result.employee.last_name).toBe(employee.last_name);
    expect(result.employee.access_level).toBe(employee.access_level);
    expect(result.employee.leader_username).toBe(employee.leader_username);
    expect(result.employee.email).toBe(employee.email);
  });

  it("should be able to authenticate an employee with email and password", async () => {
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

    await createEmployeeUseCase.execute(employee);

    const result = await authenticateEmployeeUseCase.execute({
      email: "johndoe@test.com",
      password: "password",
    });

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("employee");
    expect(result.employee.username).toBe(employee.username);
    expect(result.employee.first_name).toBe(employee.first_name);
    expect(result.employee.last_name).toBe(employee.last_name);
    expect(result.employee.access_level).toBe(employee.access_level);
    expect(result.employee.leader_username).toBe(employee.leader_username);
    expect(result.employee.email).toBe(employee.email);
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

      await createEmployeeUseCase.execute(employee);

      await authenticateEmployeeUseCase.execute({
        username: "Johndoe",
        password: "wrongPassword",
      });
    }).rejects.toMatchObject({
      message: "Username, email or password incorrect!",
      statusCode: 400,
    });
  });

  it("shouldn't be able to authenticate an employee with wrong username", async () => {
    expect(async () => {
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
