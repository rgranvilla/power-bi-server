import { hash } from "bcrypt";
import request, { Response } from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
let responseAdminToken: Response;

async function authenticateConnection(): Promise<string> {
  connection = await createConnection();

  await connection.runMigrations();

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `
    INSERT INTO employees(id, first_name, last_name, position, username, avatar, access_level, email, password, leader_username, gender, birthday, hire_date, created_at, updated_at )
    values('${id}', 'John', 'Doe', 'TI Admin', 'John', '', 0, 'johndoe@mail.com', '${password}', 'Boss', 'male', 'now()', 'now()', 'now()', 'now()')
    `
  );

  await connection.query(
    `INSERT INTO CATEGORIES(id, title, parent_id, parent_title, category_level, icon_url, slug, created_at, updated_at )
      values('${id}', 'Root', '00000000-0000-0000-0000-000000000000', 'null', 0, 'null', 'root', 'now()', 'now()')
    `
  );

  responseAdminToken = await request(app).post("/sessions").send({
    username: "John",
    password: "admin",
  });

  const { token } = responseAdminToken.body;

  return token;
}

async function closeConnection(): Promise<void> {
  await connection.dropDatabase();
  await connection.close();
}

export { authenticateConnection, closeConnection };
