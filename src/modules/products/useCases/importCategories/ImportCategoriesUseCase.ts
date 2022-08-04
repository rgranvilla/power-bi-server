// import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ImportCategoriesUseCase {
  // constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(file: Express.Multer.File): void {
    console.log(file);
  }
}

export { ImportCategoriesUseCase };
