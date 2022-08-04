import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/products/useCases/createCategories";
import { importCategoriesController } from "../modules/products/useCases/importCategories";
import { listCategoriesController } from "../modules/products/useCases/listCategories";
import { nestCategoriesController } from "../modules/products/useCases/nestCategories";
import { groupByIndentationController } from "../modules/products/useCases/sortCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.get("/nest_categories", (request, response) => {
  return nestCategoriesController.handle(request, response);
});

categoriesRoutes.get("/group_by_indentation", (request, response) => {
  return groupByIndentationController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoriesController.handle(request, response);
});

export { categoriesRoutes };
