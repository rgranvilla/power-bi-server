import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
  title: string;
  parent_id: string;
  parent_title: string;
  category_level: number;
  icon_url?: string;
  slug: string;
}

interface ICheckCategoryExistDTO {
  title: string;
  parent_title: string;
  category_level: number;
}

interface IGetParentCategoryDTO {
  parent_title: string;
  parent_level: number;
}
interface IGetParentIdDTO {
  parent_title: string;
  parent_level: number;
}

interface IGetCategoryDTO {
  title: string;
  parent_title: string;
  category_level: number;
}

interface INestedCategoriesDTO {
  id: string;
  title: string;
  parent_id: string;
  parent_title: string;
  category_level: number;
  icon_url: string;
  slug: string;
  children: Array<Category>;
}

interface ICategoriesRepository {
  create({
    title,
    parent_id,
    parent_title,
    category_level,
    icon_url,
    slug,
  }: ICreateCategoryDTO): Promise<void>;

  list(): Promise<Category[]>;

  checkCategoryExists({
    title,
    parent_title,
    category_level,
  }: ICheckCategoryExistDTO): Promise<boolean>;

  getParentCategory({
    parent_title,
    parent_level,
  }: IGetParentCategoryDTO): Promise<Category>;

  getParentId(parentCategory: Category): Promise<string>;

  getCategory({
    title,
    parent_title,
    category_level,
  }: IGetCategoryDTO): Promise<Category>;

  nestCategories(): Promise<INestedCategoriesDTO>;
}

export {
  ICategoriesRepository,
  ICreateCategoryDTO,
  ICheckCategoryExistDTO,
  IGetParentCategoryDTO,
  IGetParentIdDTO,
  IGetCategoryDTO,
  INestedCategoriesDTO,
};
