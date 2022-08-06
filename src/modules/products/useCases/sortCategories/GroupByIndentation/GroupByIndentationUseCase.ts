import { inject, injectable } from "tsyringe";

import { GroupByIndentation } from "../../../../../utils/GroupByIndentation";
import { Category } from "../../../entities/Category";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";

@injectable()
class GroupByIndentationUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[][]> {
    const categories = await this.categoriesRepository.list();

    const groupByIndentation = GroupByIndentation(categories);

    return groupByIndentation;
  }
}

export { GroupByIndentationUseCase };
