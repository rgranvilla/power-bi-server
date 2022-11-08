import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";

import { CreateUsers1667854012016 } from "./migrations/1667854012016-CreateUsers";
import { CreateUsersToken1667854076456 } from "./migrations/1667854076456-CreateUsersToken";
import { CreateNeighborhoods1667854119167 } from "./migrations/1667854119167-CreateNeighborhoods";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "powerbi",
  password: "123456",
  database: process.env.NODE_ENV === "test" ? "dbpowerbi_test" : "dbpowerbi",
  entities: [User, UserTokens, Neighborhood],
  migrations: [
    CreateUsers1667854012016,
    CreateUsersToken1667854076456,
    CreateNeighborhoods1667854119167,
  ],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
