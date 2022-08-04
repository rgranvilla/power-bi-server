import { Category } from "../../model/Category";
import {
  ICategoriesRepository,
  INestedCategoryDTO,
} from "../../repositories/ICategoriesRepository";
import { groupByIndentationUseCase } from "../sortCategories";

class NestCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): INestedCategoryDTO[] {
    const listCategories = this.categoriesRepository.list();

    const nestedCategories = new Array<INestedCategoryDTO>();
    const sortedCategoriesByIndentation = groupByIndentationUseCase.execute();

    const lastLevel = Math.max(
      ...listCategories.map(({ indentation }) => indentation)
    );

    if (lastLevel === 0) {
      const auxNestedCategories = new Array<INestedCategoryDTO>();

      listCategories.map((category, index) =>
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
      const auxLastChildren =
        i === lastLevel ? sortedCategoriesByIndentation[i] : nestedCategories;

      auxParent.forEach((category, index) => {
        let filteredChildren = new Array<Category>();

        filteredChildren = auxLastChildren.filter(
          ({ parentId }) => parentId === category.id
        );

        Object.assign(auxNestedCategories, {
          ...auxNestedCategories,
          [index]: { ...category, children: filteredChildren },
        });

        Object.assign(nestedCategories, {
          ...nestedCategories,
          ...auxNestedCategories,
        });
      });
    }

    return nestedCategories;
  }
}

export { NestCategoriesUseCase };
