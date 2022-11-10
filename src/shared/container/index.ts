import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { NeighborhoodsRepository } from "@modules/neighborhoods/infra/typeorm/repositories/NeighborhoodsRepository";
import { PopulationRepository } from "@modules/neighborhoods/infra/typeorm/repositories/PopulationRepository";
import { INeighborhoodsRepository } from "@modules/neighborhoods/repositories/INeighborhoodsRepository";
import { IPopulationRepository } from "@modules/neighborhoods/repositories/IPopulationRepository";
import { AverageFlowPerDayRepository } from "@modules/neighborsCompetitors/infra/typeorm/repositories/AverageFlowPerDayRepository";
import { AverageFlowRepository } from "@modules/neighborsCompetitors/infra/typeorm/repositories/AverageFlowRepository";
import { CompetitorsInfosRepository } from "@modules/neighborsCompetitors/infra/typeorm/repositories/CompetitorsInfosRepository";
import { FlowEventsRepository } from "@modules/neighborsCompetitors/infra/typeorm/repositories/FlowEventsRepository";
import { NeighborsCompetitorsRepository } from "@modules/neighborsCompetitors/infra/typeorm/repositories/NeighborsCompetitorsRepository";
import { IAverageFlowPerDayRepository } from "@modules/neighborsCompetitors/repositories/IAverageFlowPerDayRepository";
import { IAverageFlowRepository } from "@modules/neighborsCompetitors/repositories/IAverageFlowRepository";
import { ICompetitorsInfosRepository } from "@modules/neighborsCompetitors/repositories/ICompetitorsInfosRepository";
import { IFlowEventsRepository } from "@modules/neighborsCompetitors/repositories/IFlowEventsRepository";
import { INeighborsCompetitorsRepository } from "@modules/neighborsCompetitors/repositories/INeighborsCompetitorsRepository";

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

container.registerSingleton<INeighborsCompetitorsRepository>(
  "NeighborsCompetitorsRepository",
  NeighborsCompetitorsRepository
);

container.registerSingleton<IPopulationRepository>(
  "PopulationRepository",
  PopulationRepository
);

container.registerSingleton<IFlowEventsRepository>(
  "FlowEventsRepository",
  FlowEventsRepository
);

container.registerSingleton<ICompetitorsInfosRepository>(
  "CompetitorsInfosRepository",
  CompetitorsInfosRepository
);

container.registerSingleton<IAverageFlowRepository>(
  "AverageFlowRepository",
  AverageFlowRepository
);

container.registerSingleton<IAverageFlowPerDayRepository>(
  "AverageFlowPerDayRepository",
  AverageFlowPerDayRepository
);
