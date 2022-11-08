import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { NeighborhoodRepository } from "@modules/neighborhoods/infra/typeorm/repositories/NeighborhoodRepository";
import { INeighborhoodRepository } from "@modules/neighborhoods/repositories/INeighborhoodRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<INeighborhoodRepository>(
  "NeighborhoodRepository",
  NeighborhoodRepository
);
