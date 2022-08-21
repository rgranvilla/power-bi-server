import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import {
  closeConnection,
  openConnection,
} from "@utils/test_utilities/connectionTest";
import { seedAdminEmployee } from "@utils/test_utilities/seedEmployee";

let connection: Connection;

describe("Authenticate Employee", () => {
  beforeAll(async () => {
    connection = await openConnection();

    await seedAdminEmployee(connection);
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("Should be authenticate an employee", async () => {
    const response = await request(app).post("/sessions").send({
      username: "Admin",
      password: "admin",
    });

    expect(response.statusCode).toBe(201);
  });
});
