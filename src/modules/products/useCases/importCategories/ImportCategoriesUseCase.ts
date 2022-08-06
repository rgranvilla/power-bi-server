import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { CreateCategoryUseCase } from "../createCategories/CreateCategoryUseCase";

interface IImportCategories {
  title: string;
  parent_title: string;
  indentation: number;
  icon_url: string;
  image_url: string;
  priority: number;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  private createCategoryUseCase = new CreateCategoryUseCase(
    this.categoriesRepository
  );

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategories[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [
            title,
            parent_title,
            indentation,
            icon_url,
            image_url,
            priority,
          ] = line;

          // used to eliminate whitespace before value from string values returned
          const parseTitle = String(title).trim();
          const parseParentTitle = String(parent_title).trim();
          const parseIconUrl = String(icon_url).trim();
          const parseImageUrl = String(image_url).trim();

          categories.push({
            title: parseTitle,
            parent_title: parseParentTitle,
            indentation,
            icon_url: parseIconUrl,
            image_url: parseImageUrl,
            priority,
          });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    // group by indentation (ASC)
    categories.sort((a, b) => a.indentation - b.indentation);

    categories.map(async (category) => {
      const {
        title,
        parent_title,
        indentation,
        icon_url,
        image_url,
        priority,
      } = category;

      const existCategory =
        await this.categoriesRepository.checkCategoryAlreadyExists(
          title,
          indentation,
          parent_title
        );

      if (!existCategory) {
        this.createCategoryUseCase.execute({
          title,
          parent_title,
          indentation,
          icon_url,
          image_url,
          priority,
        });
      }
    });
  }
}

export { ImportCategoriesUseCase };
