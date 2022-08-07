import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/products/useCases/createCategories/CreateCategoryController";
import { ImportCategoriesController } from "../modules/products/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../modules/products/useCases/listCategories/ListCategoriesController";
import { NestCategoriesController } from "../modules/products/useCases/nestCategories/NestCategoriesController";
import { GroupByIndentationController } from "../modules/products/useCases/sortCategories/GroupByIndentation/GroupByIndentationController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const groupByIndentationController = new GroupByIndentationController();
const nestCategoriesController = new NestCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.get("/nest", nestCategoriesController.handle);

categoriesRoutes.get(
  "/group/by_indentation",
  groupByIndentationController.handle
);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);

export { categoriesRoutes };
