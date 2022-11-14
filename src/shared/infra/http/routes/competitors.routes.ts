import { Router } from "express";
import multer from "multer";

import { ImportCompetitorsController } from "@modules/competitors/useCases/importCompetitors/ImportCompetitorsController";
import { ImportFlowEventsController } from "@modules/competitors/useCases/importFlowEvents/ImportFlowEventsController";
import { ShowCompetitorInfoController } from "@modules/competitors/useCases/showCompetitorInfo/ShowCompetitorInfoController";
import { ShowCompetitorsController } from "@modules/competitors/useCases/showCompetitors/ShowCompetitorsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const competitorsRoute = Router();

const upload = multer({
  dest: "./tmp",
});

const importCompetitorsController = new ImportCompetitorsController();
const importFlowEventsController = new ImportFlowEventsController();
const showCompetitorsController = new ShowCompetitorsController();
const showCompetitorInfoController = new ShowCompetitorInfoController();

competitorsRoute.post(
  "/import",
  ensureAuthenticated,
  upload.single("file"),
  importCompetitorsController.handle
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

competitorsRoute.get(
  "/competitor",
  ensureAuthenticated,
  showCompetitorInfoController.handle
);

export { competitorsRoute };
