import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/products/repositories/ICategoriesRepository";
import { convertTextToSlugWithoutSpaces } from "@utils/textNormalizers";

interface IImportCategory {
  title: string;
  parent_title: string;
  category_level: number;
  icon_url: string;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [title, parent_title, category_level, icon_url] = line;

          // used to eliminate whitespace before value from string values returned
          const parseTitle = String(title).trim();
          const parseParentTitle = String(parent_title).trim();
          const parseIconUrl = String(icon_url).trim();

          categories.push({
            title: parseTitle,
            parent_title: parseParentTitle,
            category_level,
            icon_url: parseIconUrl,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  orderCategories(categories: IImportCategory[]): IImportCategory[] {
    const orderedCategories = categories.sort(
      (a, b) => a.category_level - b.category_level
    );

    return orderedCategories;
  }

  async createCategory(categories: IImportCategory[]): Promise<void> {
    if (categories.length > 0) {
      const category = categories.shift();

      const { title, parent_title, category_level, icon_url } = category;

      const slug = convertTextToSlugWithoutSpaces(title);

      const parent_level = category_level - 1;

      const parentCategory = await this.categoriesRepository.getParentCategory({
        parent_title,
        parent_level,
      });

      const parent_id = parentCategory.id;

      const categoryAlreadyExists =
        await this.categoriesRepository.checkCategoryExists({
          title,
          parent_title,
          category_level,
        });

      if (!categoryAlreadyExists) {
        await this.categoriesRepository.create({
          title,
          parent_id,
          parent_title,
          category_level,
          icon_url,
          slug,
        });
      }

      this.createCategory(categories);
    }
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    const orderedCategories = this.orderCategories(categories);

    await this.createCategory(orderedCategories);
  }
}

export { ImportCategoriesUseCase };
