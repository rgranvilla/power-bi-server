import request from "supertest";

import { app } from "@shared/infra/http/app";
import { authenticateTestConnection } from "@utils/test_utilities/authenticateTestConnection";
import { closeConnection } from "@utils/test_utilities/connectionTest";

let token: string;

const user = {
  username: "Johndoe",
  email: "johndoe@mail.com",
  password: "admin",
};

describe("Create User Controller", () => {
  beforeAll(async () => {
    token = await authenticateTestConnection();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send(user)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.body).toHaveProperty("id");
  });
});
