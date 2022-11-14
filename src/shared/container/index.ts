import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { CompetitorsRepository } from "@modules/competitors/infra/typeorm/repositories/CompetitorsRepository";
import { FlowEventsRepository } from "@modules/competitors/infra/typeorm/repositories/FlowEventsRepository";
import { ICompetitorsRepository } from "@modules/competitors/repositories/ICompetitorsRepository";
import { IFlowEventsRepository } from "@modules/competitors/repositories/IFlowEventsRepository";
import { NeighborhoodsRepository } from "@modules/neighborhoods/infra/typeorm/repositories/NeighborhoodsRepository";
import { PopulationRepository } from "@modules/neighborhoods/infra/typeorm/repositories/PopulationRepository";
import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";
import { IPopulationRepository } from "@modules/neighborhoods/repositories/IPopulationRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<INeighborhoodsRepository>(
  "NeighborhoodsRepository",
  NeighborhoodsRepository
);

container.registerSingleton<ICompetitorsRepository>(
  "CompetitorsRepository",
  CompetitorsRepository
);

container.registerSingleton<IPopulationRepository>(
  "PopulationRepository",
  PopulationRepository
);

container.registerSingleton<IFlowEventsRepository>(
  "FlowEventsRepository",
  FlowEventsRepository
);
