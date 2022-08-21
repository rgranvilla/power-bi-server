import { EmployeesRepositoryInMemory } from "@modules/accounts/repositories/in-memory/EmployeesRepositoryInMemory";

import { CreateEmployeeUseCase } from "../CreateEmployeeUseCase";

let employeesRepositoryInMemory: EmployeesRepositoryInMemory;
let createEmployeeUseCase: CreateEmployeeUseCase;

const employee = {
  first_name: "John",
  last_name: "Doe",
  username: "Johndoe",
  email: "johndoe@mail.com",
  password: "admin",
  access_level: 0,
  position: "JobPosition",
  leader_username: "Boss",
  birthday: new Date(),
  gender: "male",
  hire_date: new Date(),
};

describe("Create Employee", () => {
  beforeEach(() => {
    employeesRepositoryInMemory = new EmployeesRepositoryInMemory();
    createEmployeeUseCase = new CreateEmployeeUseCase(
      employeesRepositoryInMemory
    );
  });

  afterEach(() => {
    employeesRepositoryInMemory = null;
    createEmployeeUseCase = null;
  });

  it("Should be able to create a new employee", async () => {
    await createEmployeeUseCase.execute(employee);
    const createdEmployee = await employeesRepositoryInMemory.findByUsername(
      "Johndoe"
    );

    expect(createdEmployee).toHaveProperty("id");
    expect(createdEmployee.first_name).toBe("John");
  });

  it("Shouldn't be able to create an already exists employee", async () => {
    await createEmployeeUseCase.execute(employee);

    expect(async () => {
      await createEmployeeUseCase.execute(employee);
    }).rejects.toMatchObject({
      message: "Employee already exists!",
      statusCode: 400,
    });
  });

  it("Shouldn't be able to create an employee with username already used!", async () => {
    await createEmployeeUseCase.execute(employee);

    expect(async () => {
      const employeeWithUsernameAlreadyExists = {
        first_name: "John",
        last_name: "Doe Wick",
        username: "Johndoe",
        email: "johnwick@mail.com",
        password: "SameUsername",
        access_level: 0,
        position: "JobPosition",
        leader_username: "Boss",
        birthday: new Date(),
        gender: "male",
        hire_date: new Date(),
      };
      await createEmployeeUseCase.execute(employeeWithUsernameAlreadyExists);
    }).rejects.toMatchObject({
      message: "Employee username already exists!",
      statusCode: 400,
    });
  });

  it("Shouldn't be able to create an employee with email already used!", async () => {
    await createEmployeeUseCase.execute(employee);

    expect(async () => {
      const employeeWithEmailAlreadyExists = {
        first_name: "John",
        last_name: "Doe Wick",
        username: "JohnWick",
        email: "johndoe@mail.com",
        password: "SameUsername",
        access_level: 0,
        position: "JobPosition",
        leader_username: "Boss",
        birthday: new Date(),
        gender: "male",
        hire_date: new Date(),
      };

      await createEmployeeUseCase.execute(employeeWithEmailAlreadyExists);
    }).rejects.toMatchObject({
      message: "Employee email already exists!",
      statusCode: 400,
    });
  });
});
