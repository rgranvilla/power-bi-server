import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { NestCategoriesController } from "./NestCategoriesController";
import { NestCategoriesUseCase } from "./NestCategoriesUseCase";

export default (): NestCategoriesController => {
  const categoriesRepository = new CategoriesRepository();

  const nestCategoriesUseCase = new NestCategoriesUseCase(categoriesRepository);

  const nestCategoriesController = new NestCategoriesController(
    nestCategoriesUseCase
  );

  return nestCategoriesController;
};
