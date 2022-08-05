import { GroupByIndentation } from "../../../../../utils/GroupByIndentation";
import { Category } from "../../../entities/Category";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";

class GroupByIndentationUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[][]> {
    const categories = await this.categoriesRepository.list();

    const groupByIndentation = GroupByIndentation(categories);

    return groupByIndentation;
  }
}

export { GroupByIndentationUseCase };
