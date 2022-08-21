import { CategoriesRepositoryInMemory } from "@modules/products/repositories/in-memory/CategoryRepositoryInMemory";

import { CreateCategoryUseCase } from "../../../createCategories/CreateCategoryUseCase";
import { GroupByCategoryLevelUseCase } from "../GroupByCategoryLevelUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let groupByCategoryLevelUseCase: GroupByCategoryLevelUseCase;

describe("Group by category level", () => {
  beforeEach(async () => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
    groupByCategoryLevelUseCase = new GroupByCategoryLevelUseCase(
      categoriesRepositoryInMemory
    );

    const category1 = {
      title: "Category 1",
      parent_title: "Root",
      category_level: 1,
      icon_url: "",
    };

    const category2 = {
      title: "Category 1_1",
      parent_title: "Category 1",
      category_level: 2,
      icon_url: "",
    };

    const category3 = {
      title: "Category 1_1_1",
      parent_title: "Category 1_1",
      category_level: 3,
      icon_url: "",
    };

    const category4 = {
      title: "Category 1_2",
      parent_title: "Category 1",
      category_level: 2,
      icon_url: "",
    };

    const category5 = {
      title: "Category 1_1_2",
      parent_title: "Category 1_1",
      category_level: 3,
      icon_url: "",
    };

    const category6 = {
      title: "Category 2",
      parent_title: "Root",
      category_level: 1,
      icon_url: "",
    };

    await createCategoryUseCase.execute(category1);
    await createCategoryUseCase.execute(category2);
    await createCategoryUseCase.execute(category3);
    await createCategoryUseCase.execute(category4);
    await createCategoryUseCase.execute(category5);
    await createCategoryUseCase.execute(category6);
  });

  it("Should be able to sort categories by level category", async () => {
    const response = await groupByCategoryLevelUseCase.execute();

    expect(response[0][0].category_level).toBe(0);
    expect(response[1][0].category_level).toBe(1);
    expect(response[1][1].category_level).toBe(1);
    expect(response[2][0].category_level).toBe(2);
    expect(response[2][1].category_level).toBe(2);
    expect(response[3][0].category_level).toBe(3);
    expect(response[3][1].category_level).toBe(3);
  });
});
