import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
  title: string;
  parent_id?: string;
  parent_title?: string;
  indentation: number;
  icon_url: string;
  image_url: string;
  priority: number;
  slug: string;
}

interface INestedCategoryDTO {
  id?: string;
  title: string;
  parent_id?: string;
  parent_title?: string;
  indentation: number;
  icon_url: string;
  image_url: string;
  priority: number;
  slug: string;
  children: Array<Category>;
}

interface ICategoriesRepository {
  create({
    title,
    parent_id,
    parent_title,
    indentation,
    icon_url,
    image_url,
    priority,
    slug,
  }: ICreateCategoryDTO): Promise<void>;

  list(): Promise<Category[]>;

  getParentId(parent_title: string, indentation: number): Promise<string>;

  checkCategoryAlreadyExists(
    title: string,
    indentation: number,
    parent_title: string
  ): Promise<boolean>;

  // checkParentCategoryExists(
  //   parent_title: string,
  //   indentation: number
  // ): Promise<boolean>;
}

export { ICategoriesRepository, ICreateCategoryDTO, INestedCategoryDTO };
