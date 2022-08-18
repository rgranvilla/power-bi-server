import { inject, injectable } from "tsyringe";

import { Category } from "@modules/products/entities/Category";
import { ICategoriesRepository } from "@modules/products/repositories/ICategoriesRepository";
import { GroupByCategoryLevel } from "@utils/GroupByCategoryLevel";

@injectable()
class GroupByCategoryLevelUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[][]> {
    const categories = await this.categoriesRepository.list();

    const groupByIndentation = GroupByCategoryLevel(categories);

    return groupByIndentation;
  }
}

export { GroupByCategoryLevelUseCase };
