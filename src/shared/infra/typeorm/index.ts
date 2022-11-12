import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";
import { Population } from "@modules/neighborhoods/infra/typeorm/entities/Population";
import { FlowEvent } from "@modules/neighborsCompetitors/infra/typeorm/entities/FlowEvent";
import { NeighborCompetitor } from "@modules/neighborsCompetitors/infra/typeorm/entities/NeighborCompetitor";

import { CreateUsers1667854012016 } from "./migrations/1667854012016-CreateUsers";
import { CreateUsersToken1667854076456 } from "./migrations/1667854076456-CreateUsersToken";
import { CreateTables1668275234491 } from "./migrations/1668275234491-CreateTables";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "powerbi",
  password: "123456",
  database: process.env.NODE_ENV === "test" ? "dbpowerbi_test" : "dbpowerbi",
  entities: [
    User,
    UserTokens,
    Neighborhood,
    Population,
    NeighborCompetitor,
    FlowEvent,
  ],
  migrations: [
    CreateUsers1667854012016,
    CreateUsersToken1667854076456,
    CreateTables1668275234491,
  ],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
