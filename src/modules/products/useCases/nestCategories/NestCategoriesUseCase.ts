import { GroupByIndentation } from "../../../../utils/GroupByIndentation";
import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  INestedCategoryDTO,
} from "../../repositories/ICategoriesRepository";

class NestCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<INestedCategoryDTO[]> {
    const categories = await this.categoriesRepository.list();

    const nestedCategories = new Array<INestedCategoryDTO>();
    const sortedCategoriesByIndentation = GroupByIndentation(categories);

    const lastLevel = Math.max(
      ...categories.map(({ indentation }) => indentation)
    );

    if (lastLevel === 0) {
      const auxNestedCategories = new Array<INestedCategoryDTO>();

      categories.map((category, index) =>
        Object.assign(auxNestedCategories, {
          ...auxNestedCategories,
          [index]: { ...category, children: [] },
        })
      );

      Object.assign(nestedCategories, {
        ...nestedCategories,
        ...auxNestedCategories,
      });

      return nestedCategories;
    }

    for (let i = lastLevel; i > 0; i -= 1) {
      const auxNestedCategories = new Array<INestedCategoryDTO>();

      const auxParent = sortedCategoriesByIndentation[i - 1];
      const auxChildren =
        i === lastLevel ? sortedCategoriesByIndentation[i] : nestedCategories;

      auxParent.forEach((category, index) => {
        let filteredChildren = new Array<Category>();

        filteredChildren = auxChildren.filter(
          (cat: Category) => cat.parent_title === category.title
        );

        Object.assign(auxNestedCategories, {
          ...auxNestedCategories,
          [index]: { ...category, children: filteredChildren },
        });
      });

      Object.assign(nestedCategories, {
        ...auxNestedCategories,
      });
    }

    return nestedCategories;
  }
}

export { NestCategoriesUseCase };
