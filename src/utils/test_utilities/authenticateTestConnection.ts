import request, { Response } from "supertest";

import { app } from "@shared/infra/http/app";

import { openConnection } from "./connectionTest";
import { seedRootCategory } from "./seedCategories";
import { seedAdminEmployee } from "./seedEmployee";

let response: Response;

async function authenticateTestConnection(): Promise<string> {
  const connection = await openConnection();

  await seedAdminEmployee(connection);

  await seedRootCategory(connection);

  response = await request(app).post("/sessions").send({
    username: "John",
    password: "admin",
  });

  const { token } = response.body;

  return token;
}

export { authenticateTestConnection };
