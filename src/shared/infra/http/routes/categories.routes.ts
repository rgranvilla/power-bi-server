import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/products/useCases/Categories/createCategories/CreateCategoryController";
import { ImportCategoriesController } from "@modules/products/useCases/Categories/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/products/useCases/Categories/listCategories/ListCategoriesController";
import { NestCategoriesController } from "@modules/products/useCases/Categories/nestCategories/NestCategoriesController";
import { GroupByCategoryLevelController } from "@modules/products/useCases/Categories/sortCategories/GroupByIndentation/GroupByCategoryLevelController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const nestCategoriesController = new NestCategoriesController();
const groupByCategoryLevelController = new GroupByCategoryLevelController();

const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.get("/nest", nestCategoriesController.handle);

categoriesRoutes.get(
  "/group/by_category_level",
  groupByCategoryLevelController.handle
);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);

export { categoriesRoutes };
