import request, { Response } from "supertest";

import { app } from "@shared/infra/http/app";

import { openConnection } from "./connectionTest";
import { seedAdminUser } from "./seedUser";

let response: Response;

async function authenticateTestConnection(): Promise<string> {
  const connection = await openConnection();

  await seedAdminUser(connection);

  response = await request(app).post("/sessions").send({
    email: "admin@mail.com",
    password: "admin",
  });

  const { token } = response.body;

  return token;
}

export { authenticateTestConnection };
