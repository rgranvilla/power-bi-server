import { Router } from "express";
import multer from "multer";

import { ImportFlowEventsController } from "@modules/neighborsCompetitors/useCases/importFlowEvents/ImportFlowEventsController";
import { ImportNeighborsCompetitorsController } from "@modules/neighborsCompetitors/useCases/importNeighborsCompetitors/ImportNeighborsCompetitorsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const competitorsRoute = Router();

const upload = multer({
  dest: "./tmp",
});

const importNeighborsCompetitorsController =
  new ImportNeighborsCompetitorsController();
const importFlowEventsController = new ImportFlowEventsController();

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

export { competitorsRoute };
