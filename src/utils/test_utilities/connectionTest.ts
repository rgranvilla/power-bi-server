import { Connection } from "typeorm";

import createConnection from "@shared/infra/typeorm";

let connection: Connection;

async function openConnection(): Promise<Connection> {
  connection = await createConnection();

  await connection.runMigrations();

  return connection;
}

async function closeConnection(): Promise<void> {
  await connection.dropDatabase();
  await connection.close();
}

export { openConnection, closeConnection };
