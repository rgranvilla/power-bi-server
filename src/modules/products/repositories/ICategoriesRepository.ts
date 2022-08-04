import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  title: string;
  parentId?: string;
  parentTitle?: string;
  indentation: number;
  icon: string;
  image: string;
  priority: number;
  slug: string;
}

interface INestedCategoryDTO {
  id?: string;
  title: string;
  parentId?: string;
  parentTitle?: string;
  indentation: number;
  icon: string;
  image: string;
  priority: number;
  slug: string;
  children: Array<Category>;
}

interface ICategoriesRepository {
  create({
    title,
    parentId,
    parentTitle,
    indentation,
    icon,
    image,
    priority,
    slug,
  }: ICreateCategoryDTO): void;

  list(): Category[];

  findParentId(parentTitle: string, indentation: number): string;

  checkCategoryAlreadyExists(
    title: string,
    indentation: number,
    parentTitle: string
  ): boolean;

  checkParentCategoryExists(parentTitle: string, indentation: number): boolean;
}

export { ICategoriesRepository, ICreateCategoryDTO, INestedCategoryDTO };
