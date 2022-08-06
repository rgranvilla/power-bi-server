import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/products/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/products/repositories/implementations/CategoriesRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);
