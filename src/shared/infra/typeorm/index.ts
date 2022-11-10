import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Neighborhood } from "@modules/neighborhoods/infra/typeorm/entities/Neighborhood";
import { Population } from "@modules/neighborhoods/infra/typeorm/entities/Population";
import { AverageFlow } from "@modules/neighborsCompetitors/infra/typeorm/entities/AverageFlow";
import { AverageFlowPerDay } from "@modules/neighborsCompetitors/infra/typeorm/entities/AverageFlowPerDay";
import { CompetitorInfo } from "@modules/neighborsCompetitors/infra/typeorm/entities/CompetitorInfo";
import { FlowEvent } from "@modules/neighborsCompetitors/infra/typeorm/entities/FlowEvent";
import { NeighborCompetitor } from "@modules/neighborsCompetitors/infra/typeorm/entities/NeighborCompetitor";

import { CreateUsers1667854012016 } from "./migrations/1667854012016-CreateUsers";
import { CreateUsersToken1667854076456 } from "./migrations/1667854076456-CreateUsersToken";
import { CreateNeighborhoods1667854119167 } from "./migrations/1667854119167-CreateNeighborhoods";
import { CreateCompetitors1667876047922 } from "./migrations/1667876047922-CreateCompetitors";
import { CreatePopulation1668005540158 } from "./migrations/1668005540158-CreatePopulation";
import { CreateFlowEvents1668012079639 } from "./migrations/1668012079639-CreateFlowEvents";
import { CreateCompetitorsInfos1668027557848 } from "./migrations/1668027557848-CreateCompetitorsInfos";
import { CreateCompetitorsInfosAverageFlow1668028187456 } from "./migrations/1668028187456-CreateCompetitorsInfosAverageFlow";
import { CreateCompetitorsInfosAverageFlowPerDay1668028554570 } from "./migrations/1668028554570-CreateCompetitorsInfosAverageFlowPerDay";

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
    NeighborCompetitor,
    Population,
    FlowEvent,
    CompetitorInfo,
    AverageFlow,
    AverageFlowPerDay,
  ],
  migrations: [
    CreateUsers1667854012016,
    CreateUsersToken1667854076456,
    CreateNeighborhoods1667854119167,
    CreateCompetitors1667876047922,
    CreatePopulation1668005540158,
    CreateFlowEvents1668012079639,
    CreateCompetitorsInfos1668027557848,
    CreateCompetitorsInfosAverageFlow1668028187456,
    CreateCompetitorsInfosAverageFlowPerDay1668028554570,
  ],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
