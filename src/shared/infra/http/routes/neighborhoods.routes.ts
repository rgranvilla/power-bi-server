import { Router } from "express";
import multer from "multer";

import { ImportNeighborhoodController } from "@modules/neighborhoods/useCases/importNeighborhoods/ImportNeighborhoodController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const neighborhoodsRoute = Router();

const upload = multer({
  dest: "./tmp",
});

const importNeighborhoodController = new ImportNeighborhoodController();

neighborhoodsRoute.post(
  "/import",
  ensureAuthenticated,
  upload.single("file"),
  importNeighborhoodController.handle
);

export { neighborhoodsRoute };
