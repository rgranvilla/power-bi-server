import { container } from "tsyringe";

import { EmployeesRepository } from "@modules/accounts/infra/typeorm/repositories/EmployeesRepository";
import { IEmployeesRepository } from "@modules/accounts/repositories/IEmployeesRepository";
import { CategoriesRepository } from "@modules/products/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/products/repositories/ICategoriesRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IEmployeesRepository>(
  "EmployeesRepository",
  EmployeesRepository
);
