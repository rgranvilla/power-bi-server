import { CategoriesRepositoryInMemory } from "@modules/products/repositories/in-memory/CategoryRepositoryInMemory";

import { CreateCategoryUseCase } from "../../createCategories/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "../ListCategoriesUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let listCategoriesUseCase: ListCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able list all categories.", async () => {
    const category1 = {
      title: "Category 1",
      parent_title: "Root",
      category_level: 1,
      icon_url: "",
    };

    const category2 = {
      title: "Category 2",
      parent_title: "Root",
      category_level: 1,
      icon_url: "",
    };

    await createCategoryUseCase.execute(category1);
    await createCategoryUseCase.execute(category2);

    const listAll = await listCategoriesUseCase.execute();

    expect(listAll).toHaveLength(3);
    expect(listAll[0].title).toBe("Root");
    expect(listAll[1].title).toBe(category1.title);
    expect(listAll[1].parent_title).toBe(category1.parent_title);
    expect(listAll[1].category_level).toBe(category1.category_level);
    expect(listAll[1].icon_url).toBe(category1.icon_url);
    expect(listAll[2].title).toBe(category2.title);
    expect(listAll[2].parent_title).toBe(category2.parent_title);
    expect(listAll[2].category_level).toBe(category2.category_level);
    expect(listAll[2].icon_url).toBe(category2.icon_url);
  });
});
