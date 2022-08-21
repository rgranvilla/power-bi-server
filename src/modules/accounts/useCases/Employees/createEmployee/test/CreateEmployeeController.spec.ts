import request from "supertest";

import { app } from "@shared/infra/http/app";
import { authenticateTestConnection } from "@utils/test_utilities/authenticateTestConnection";
import { closeConnection } from "@utils/test_utilities/connectionTest";

let token: string;

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

describe("Create Employee Controller", () => {
  beforeAll(async () => {
    token = await authenticateTestConnection();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("Should be able to create a new employee", async () => {
    const response = await request(app)
      .post("/accounts/employees")
      .send(employee)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.body.message).toBe("Employee created");
  });
});
