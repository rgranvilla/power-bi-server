import request, { Response } from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

import { seedRootCategory } from "./seedCategories";
import { seedAdminEmployee } from "./seedEmployee";

let connection: Connection;
let response: Response;

async function authenticateConnection(): Promise<string> {
  connection = await createConnection();

  await connection.runMigrations();

  await seedAdminEmployee(connection);

  await seedRootCategory(connection);

  response = await request(app).post("/sessions").send({
    username: "John",
    password: "admin",
  });

  const { token } = response.body;

  return token;
}

async function closeConnection(): Promise<void> {
  await connection.dropDatabase();
  await connection.close();
}

export { authenticateConnection, closeConnection };
