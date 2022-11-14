import { DataSource } from "typeorm";

import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

async function openConnection(): Promise<DataSource> {
  connection = await createConnection();

  await connection.runMigrations();

  return connection;
}

async function closeConnection(): Promise<void> {
  await connection.dropDatabase();
  await connection.destroy();
}

export { openConnection, closeConnection };
