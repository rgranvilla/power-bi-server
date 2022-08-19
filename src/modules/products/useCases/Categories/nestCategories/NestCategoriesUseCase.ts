import { inject, injectable } from "tsyringe";

import { INestedCategoriesDTO } from "@modules/products/dtos/ICategoriesDTO";
import { ICategoriesRepository } from "@modules/products/repositories/ICategoriesRepository";

@injectable()
class NestCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<INestedCategoriesDTO> {
    const nestedCategories = await this.categoriesRepository.nestCategories();

    return nestedCategories;
  }
}

export { NestCategoriesUseCase };
