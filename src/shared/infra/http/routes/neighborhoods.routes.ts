import { Router } from "express";
import multer from "multer";

import { ImportNeighborhoodsController } from "@modules/neighborhoods/useCases/importNeighborhoods/ImportNeighborhoodsController";
import { ImportNeighborPopulationsController } from "@modules/neighborhoods/useCases/importNeighborPopulations/importNeighborPopulationsController";
import { ShowNeighborhoodByNameController } from "@modules/neighborhoods/useCases/showNeighborhoodByName/ShowNeighborhoodByNameController";
import { ShowNeighborhoodsController } from "@modules/neighborhoods/useCases/showNeighborhoods/ShowNeighborhoodsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const neighborhoodsRoute = Router();

const upload = multer({
  dest: "./tmp",
});

const importNeighborhoodsController = new ImportNeighborhoodsController();
const importNeighborPopulationsController =
  new ImportNeighborPopulationsController();
const showNeighborhoodsController = new ShowNeighborhoodsController();
const showNeighborhoodByNameController = new ShowNeighborhoodByNameController();

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

neighborhoodsRoute.get(
  "/",
  ensureAuthenticated,
  showNeighborhoodsController.handle
);

neighborhoodsRoute.get(
  "/neighbor_name",
  ensureAuthenticated,
  showNeighborhoodByNameController.handle
);

export { neighborhoodsRoute };
