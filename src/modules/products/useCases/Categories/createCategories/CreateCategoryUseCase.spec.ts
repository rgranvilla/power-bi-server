import { CategoriesRepositoryInMemory } from "@modules/products/repositories/in-memory/CategoryRepositoryInMemory";
import { convertTextToSlugWithoutSpaces } from "@utils/textNormalizers";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      title: "Category title test",
      parent_title: "Root",
      category_level: 1,
      icon_url: "",
    };
    await createCategoryUseCase.execute({
      title: category.title,
      parent_title: category.parent_title,
      category_level: category.category_level,
      icon_url: category.icon_url,
    });

    const categoryCreated = await categoriesRepositoryInMemory.getCategory({
      title: category.title,
      parent_title: category.parent_title,
      category_level: category.category_level,
    });

    expect(categoryCreated).toHaveProperty("id");
    expect(categoryCreated.title).toBe(category.title);
    expect(categoryCreated.parent_id).toBe(
      "623f42c2-ace8-4db1-8b9c-606dd54cf569"
    );
    expect(categoryCreated.parent_title).toBe(category.parent_title);
    expect(categoryCreated.category_level).toBe(category.category_level);
    expect(categoryCreated.icon_url).toBe(category.icon_url);
    expect(categoryCreated.slug).toBe(
      convertTextToSlugWithoutSpaces(category.title)
    );
  });

  it("shouldn't be able to create a category already exists", async () => {
    expect(async () => {
      const category = {
        title: "Category title test",
        parent_title: "Root",
        category_level: 1,
        icon_url: "",
      };

      await createCategoryUseCase.execute({
        title: category.title,
        parent_title: category.parent_title,
        category_level: category.category_level,
        icon_url: category.icon_url,
      });

      await createCategoryUseCase.execute({
        title: category.title,
        parent_title: category.parent_title,
        category_level: category.category_level,
        icon_url: category.icon_url,
      });
    }).rejects.toMatchObject({
      message: "Category already exists!",
      statusCode: 400,
    });
  });

  it("shouldn't be able to create a category with non-existent parent category", async () => {
    expect(async () => {
      const category = {
        title: "Category title test",
        parent_title: "Parent don't exists",
        category_level: 1,
        icon_url: "",
      };

      await createCategoryUseCase.execute({
        title: category.title,
        parent_title: category.parent_title,
        category_level: category.category_level,
        icon_url: category.icon_url,
      });
    }).rejects.toMatchObject({
      message:
        "Can't create a new category because parent category doesn't exists!",
      statusCode: 400,
    });
  });
});
