import { Category } from "../../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  create({
    title,
    parentId,
    parentTitle,
    indentation,
    icon,
    image,
    priority,
    slug,
  }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      title,
      parentId,
      parentTitle,
      indentation,
      icon,
      image,
      priority,
      slug,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findParentId(parentTitle: string, indentation: number): string {
    const category = this.categories.find(
      (category) =>
        category.title === parentTitle &&
        category.indentation === indentation - 1
    );

    if (!category) {
      return "00000000-0000-0000-0000-000000000000";
    }

    return category.id;
  }

  checkCategoryAlreadyExists(
    title: string,
    indentation: number,
    parentTitle: string
  ): boolean {
    const category = this.categories.find(
      (category) =>
        category.title === title &&
        category.indentation === indentation &&
        category.parentTitle === parentTitle
    );

    if (category) {
      return true;
    }

    return false;
  }

  checkParentCategoryExists(parentTitle: string, indentation: number): boolean {
    const category = this.categories.find(
      (category) =>
        category.title === parentTitle &&
        category.indentation === indentation - 1
    );

    if (category) {
      return true;
    }

    if (parentTitle === "root" && indentation === 0) {
      return true;
    }

    return false;
  }
}

export { CategoriesRepository };
