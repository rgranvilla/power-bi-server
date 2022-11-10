import { Router } from "express";
import multer from "multer";

import { ImportNeighborhoodsController } from "@modules/neighborhoods/useCases/importNeighborhoods/ImportNeighborhoodsController";
import { ImportNeighborPopulationsController } from "@modules/neighborhoods/useCases/importNeighborPopulations/importNeighborPopulationsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const neighborhoodsRoute = Router();

const upload = multer({
  dest: "./tmp",
});

const importNeighborhoodsController = new ImportNeighborhoodsController();
const importNeighborPopulationsController =
  new ImportNeighborPopulationsController();

neighborhoodsRoute.post(
  "/import/neighborhood",
  ensureAuthenticated,
  upload.single("file"),
  importNeighborhoodsController.handle
);

neighborhoodsRoute.post(
  "/import/population",
  ensureAuthenticated,
  upload.single("file"),
  importNeighborPopulationsController.handle
);

export { neighborhoodsRoute };
