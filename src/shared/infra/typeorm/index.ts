import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Competitor } from "@modules/competitors/infra/typeorm/entities/Competitor";
import { FlowEvent } from "@modules/competitors/infra/typeorm/entities/FlowEvent";
import { ViewCompetitorInfo } from "@modules/competitors/infra/typeorm/entities/ViewCompetitorInfo";
import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";
import { Population } from "@modules/neighborhoods/infra/typeorm/entities/Population";

import { CreateUsers1667854012016 } from "./migrations/1667854012016-CreateUsers";
import { CreateUsersToken1667854076456 } from "./migrations/1667854076456-CreateUsersToken";
import { CreateTables1668401432519 } from "./migrations/1668401432519-CreateTables";
import { CreateViewCompetitorInfo1668411455187 } from "./migrations/1668411455187-CreateViewCompetitorInfo";

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
    Competitor,
    FlowEvent,
    ViewCompetitorInfo,
  ],
  migrations: [
    CreateUsers1667854012016,
    CreateUsersToken1667854076456,
    CreateTables1668401432519,
    CreateViewCompetitorInfo1668411455187,
  ],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
