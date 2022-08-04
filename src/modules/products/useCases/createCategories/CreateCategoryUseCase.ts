import { ConvertTextToSlugWithoutSpaces } from "../../../../utils/TextNormalizers";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  title: string;
  parentTitle: string;
  indentation: number;
  icon: string;
  image: string;
  priority: number;
  slug?: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({
    title,
    parentTitle,
    indentation,
    icon,
    image,
    priority,
  }: IRequest): void {
    const parentId = this.categoriesRepository.findParentId(
      parentTitle,
      indentation
    );

    const slug = ConvertTextToSlugWithoutSpaces(title);

    const categoriesAlreadyExists =
      this.categoriesRepository.checkCategoryAlreadyExists(
        title,
        indentation,
        parentTitle
      );

    if (categoriesAlreadyExists) {
      throw new Error("Category already exists!");
    }

    const parentCategoryNotExists =
      !this.categoriesRepository.checkParentCategoryExists(
        parentTitle,
        indentation
      );

    if (parentCategoryNotExists) {
      throw new Error("Parent category not exists!");
    }

    this.categoriesRepository.create({
      title,
      parentId,
      parentTitle,
      indentation,
      icon,
      image,
      priority,
      slug,
    });
  }
}

export { CreateCategoryUseCase };
