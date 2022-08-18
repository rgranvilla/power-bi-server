import { container } from "tsyringe";

import { EmployeesRepository } from "@modules/accounts/infra/typeorm/repositories/EmployeesRepository";
import { IEmployeesRepository } from "@modules/accounts/repositories/IEmployeesRepository";
import { ICategoriesRepository } from "@modules/products/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/products/repositories/implementations/CategoriesRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IEmployeesRepository>(
  "EmployeesRepository",
  EmployeesRepository
);
