import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import {
  closeConnection,
  openConnection,
} from "@utils/test_utilities/connectionTest";
import { seedAdminUser } from "@utils/test_utilities/seedUser";

let connection: Connection;

describe("Authenticate User", () => {
  beforeAll(async () => {
    connection = await openConnection();

    await seedAdminUser(connection);
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("Should be authenticate an user", async () => {
    const response = await request(app).post("/sessions").send({
      email: "admin@mail.com",
      password: "admin",
    });

    expect(response.statusCode).toBe(200);
  });
});
