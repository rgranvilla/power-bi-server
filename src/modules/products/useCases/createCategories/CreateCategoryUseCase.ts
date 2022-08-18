import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/products/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppErrors";
import { ConvertTextToSlugWithoutSpaces } from "@utils/TextNormalizers";

interface IRequest {
  title: string;
  parent_title: string;
  category_level: number;
  icon_url?: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    title,
    parent_title,
    category_level,
    icon_url,
  }: IRequest): Promise<void> {
    const slug = ConvertTextToSlugWithoutSpaces(title);

    const categoryAlreadyExists =
      await this.categoriesRepository.checkCategoryExists({
        title,
        parent_title,
        category_level,
      });

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }

    const parent_level = category_level - 1;

    const parentCategory = await this.categoriesRepository.getParentCategory({
      parent_title,
      parent_level,
    });

    if (!parentCategory) {
      throw new AppError("Parent category doesn't exists");
    }

    const parent_id = parentCategory.id;

    this.categoriesRepository.create({
      title,
      parent_id,
      parent_title,
      category_level,
      icon_url,
      slug,
    });
  }
}

export { CreateCategoryUseCase };
