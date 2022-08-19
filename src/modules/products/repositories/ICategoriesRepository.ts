import {
  ICheckCategoryExistDTO,
  ICreateCategoryDTO,
  IGetCategoryDTO,
  IGetParentCategoryDTO,
  INestedCategoriesDTO,
} from "../dtos/ICategoriesDTO";
import { Category } from "../infra/typeorm/entities/Category";

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

export { ICategoriesRepository };
