import { getRepository, Repository } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
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
    indentation,
    icon_url,
    image_url,
    priority,
    slug,
  }: ICreateCategoryDTO): Promise<void> {
    const id = uuidV4();

    const category = await this.repository.save({
      id,
      title,
      parent_id,
      parent_title,
      indentation,
      icon_url,
      image_url,
      priority,
      slug,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async getParentId(
    parent_title: string,
    indentation: number
  ): Promise<string> {
    const parentIndentation = indentation - 1;
    const category = await this.repository.findOne({
      where: {
        title: parent_title,
        indentation: parentIndentation,
      },
    });

    if (!category) {
      return "00000000-0000-0000-0000-000000000000";
    }

    return category.id;
  }

  async checkCategoryAlreadyExists(
    title: string,
    indentation: number,
    parent_title: string
  ): Promise<boolean> {
    const category = await this.repository.findOne({
      title,
      indentation,
      parent_title,
    });

    if (category) {
      return true;
    }

    return false;
  }

  // checkParentCategoryExists(
  //   parent_title: string,
  //   indentation: number
  // ): boolean {
  //   const category = this.categories.find(
  //     (category) =>
  //       category.title === parent_title &&
  //       category.indentation === indentation - 1
  //   );

  //   if (category) {
  //     return true;
  //   }

  //   if (parent_title === "root" && indentation === 0) {
  //     return true;
  //   }

  //   return false;
  // }
}

export { CategoriesRepository };
