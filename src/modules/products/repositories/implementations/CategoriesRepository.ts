import { getRepository, Repository } from "typeorm";

import { Category } from "@modules/products/entities/Category";

import {
  ICategoriesRepository,
  ICheckCategoryExistDTO,
  ICreateCategoryDTO,
  IGetCategoryDTO,
  IGetParentCategoryDTO,
  INestedCategoriesDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({
    title,
    parent_id,
    parent_title,
    category_level,
    icon_url,
    slug,
  }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      title,
      parent_id,
      parent_title,
      category_level,
      icon_url,
      slug,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async checkCategoryExists({
    title,
    parent_title,
    category_level,
  }: ICheckCategoryExistDTO): Promise<boolean> {
    const category = await this.repository.findOne({
      title,
      parent_title,
      category_level,
    });

    if (!category) return false;

    return true;
  }

  async getParentCategory({
    parent_title,
    parent_level,
  }: IGetParentCategoryDTO): Promise<Category> {
    const parentCategory = await this.repository.findOne({
      title: parent_title,
      category_level: parent_level,
    });

    return parentCategory;
  }

  async getParentId(parentCategory: Category): Promise<string> {
    const id = await this.repository.getId(parentCategory);

    return id;
  }

  async getCategory({
    title,
    parent_title,
    category_level,
  }: IGetCategoryDTO): Promise<Category> {
    const category = await this.repository.findOne({
      title,
      parent_title,
      category_level,
    });

    return category;
  }

  async nestCategories(): Promise<INestedCategoriesDTO> {
    const categories = await this.list();

    const lastLevel = Math.max(
      ...categories.map(({ category_level }) => category_level)
    );

    const auxNested = new Array<INestedCategoriesDTO>();

    for (let i = lastLevel; i >= 1; i -= 1) {
      const childrenLevel = categories.filter(
        ({ category_level }) => category_level === i
      );
      const parentLevel = categories.filter(
        ({ category_level }) => category_level === i - 1
      );

      const nested = parentLevel.map((category) =>
        Object.assign(category, {
          ...category,
          children: childrenLevel.filter(
            ({ parent_id }) => category.id === parent_id
          ),
        })
      );

      Object.assign(auxNested, {
        ...nested,
      });
    }

    const nestedCategories = auxNested[0];

    return nestedCategories;
  }
}

export { CategoriesRepository };
