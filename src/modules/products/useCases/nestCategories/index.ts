import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { NestCategoriesController } from "./NestCategoriesController";
import { NestCategoriesUseCase } from "./NestCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const nestCategoriesUseCase = new NestCategoriesUseCase(categoriesRepository);
const nestCategoriesController = new NestCategoriesController(
  nestCategoriesUseCase
);

export { nestCategoriesController };
