import {
  ICreateCategoryDTO,
  ICheckCategoryExistDTO,
  IGetParentCategoryDTO,
  IGetCategoryDTO,
  INestedCategoriesDTO,
} from "@modules/products/dtos/ICategoriesDTO";
import { Category } from "@modules/products/infra/typeorm/entities/Category";

import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [
    {
      id: "623f42c2-ace8-4db1-8b9c-606dd54cf569",
      title: "Root",
      parent_id: "00000000-0000-0000-0000-000000000000",
      parent_title: "null",
      category_level: 0,
      icon_url: "null",
      slug: "root",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  async create({
    title,
    parent_id,
    parent_title,
    category_level,
    icon_url,
    slug,
  }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      title,
      parent_id,
      parent_title,
      category_level,
      icon_url,
      slug,
    });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    const listAll = this.categories;
    return listAll;
  }

  async checkCategoryExists({
    title,
    parent_title,
    category_level,
  }: ICheckCategoryExistDTO): Promise<boolean> {
    const category = this.categories.find(
      (category) =>
        category.title === title &&
        category.parent_title === parent_title &&
        category.category_level === category_level
    );

    return !!category;
  }

  async getParentCategory({
    parent_title,
    parent_level,
  }: IGetParentCategoryDTO): Promise<Category> {
    const parentCategory = this.categories.find(
      (category) =>
        category.title === parent_title &&
        category.category_level === parent_level
    );

    return parentCategory;
  }

  async getCategory({
    title,
    parent_title,
    category_level,
  }: IGetCategoryDTO): Promise<Category> {
    const category = this.categories.find(
      (category) =>
        category.title === title &&
        category.parent_title === parent_title &&
        category.category_level === category_level
    );

    return category;
  }

  async nestCategories(): Promise<INestedCategoriesDTO> {
    throw new Error("Method not implemented.");
  }
}

export { CategoriesRepositoryInMemory };
