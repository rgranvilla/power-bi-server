import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class GroupByIndentationUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[][] {
    const listCategories = this.categoriesRepository.list();

    const groupByIndentation = new Array<Category[]>();

    const lastLevel = Math.max(
      ...listCategories.map(({ indentation }) => indentation)
    );

    for (let i = 0; i <= lastLevel; i += 1) {
      groupByIndentation.push(
        listCategories.filter((category) => category.indentation === i)
      );
    }

    return groupByIndentation;
  }
}

export { GroupByIndentationUseCase };
