import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { ConvertTextToSlugWithoutSpaces } from "../../../../utils/TextNormalizers";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  title: string;
  parent_title: string;
  indentation: number;
  icon_url: string;
  image_url: string;
  priority: number;
  slug?: string;
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
    indentation,
    icon_url,
    image_url,
    priority,
  }: IRequest): Promise<void> {
    const parent_id = uuidV4();

    // const parent_id = this.categoriesRepository.getParentId(
    //   parent_title,
    //   indentation
    // );

    const slug = ConvertTextToSlugWithoutSpaces(title);

    const categoriesAlreadyExists =
      await this.categoriesRepository.checkCategoryAlreadyExists(
        title,
        indentation,
        parent_title
      );

    if (categoriesAlreadyExists) {
      throw new Error("Category already exists!");
    }

    // const parentCategoryNotExists =
    //   !this.categoriesRepository.checkParentCategoryExists(
    //     parent_title,
    //     indentation
    //   );

    // if (parentCategoryNotExists) {
    //   throw new Error("Parent category not exists!");
    // }

    this.categoriesRepository.create({
      title,
      parent_id,
      parent_title,
      indentation,
      icon_url,
      image_url,
      priority,
      slug,
    });
  }
}

export { CreateCategoryUseCase };
