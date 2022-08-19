import { inject, injectable } from "tsyringe";

import { Category } from "@modules/products/entities/Category";
import { ICategoriesRepository } from "@modules/products/repositories/ICategoriesRepository";
import { groupByCategoryLevel } from "@utils/groupCategories";

@injectable()
class GroupByCategoryLevelUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[][]> {
    const categories = await this.categoriesRepository.list();

    const groupedCategories = groupByCategoryLevel(categories);

    return groupedCategories;
  }
}

export { GroupByCategoryLevelUseCase };
