import { Router } from "express";
import multer from "multer";

import { ImportFlowEventsController } from "@modules/neighborsCompetitors/useCases/importFlowEvents/ImportFlowEventsController";
import { ImportNeighborsCompetitorsController } from "@modules/neighborsCompetitors/useCases/importNeighborsCompetitors/ImportNeighborsCompetitorsController";
import { ShowCompetitorsController } from "@modules/neighborsCompetitors/useCases/showCompetitors/ShowCompetitorsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const competitorsRoute = Router();

const upload = multer({
  dest: "./tmp",
});

const importNeighborsCompetitorsController =
  new ImportNeighborsCompetitorsController();
const importFlowEventsController = new ImportFlowEventsController();
const showCompetitorsController = new ShowCompetitorsController();

competitorsRoute.post(
  "/import",
  ensureAuthenticated,
  upload.single("file"),
  importNeighborsCompetitorsController.handle
);

competitorsRoute.post(
  "/import/flowevents",
  ensureAuthenticated,
  upload.single("file"),
  importFlowEventsController.handle
);

competitorsRoute.get(
  "/",
  ensureAuthenticated,
  showCompetitorsController.handle
);

export { competitorsRoute };
