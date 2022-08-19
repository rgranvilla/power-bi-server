import { Category } from "../infra/typeorm/entities/Category";

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

export {
  ICreateCategoryDTO,
  ICheckCategoryExistDTO,
  IGetParentCategoryDTO,
  IGetParentIdDTO,
  IGetCategoryDTO,
  INestedCategoriesDTO,
};
