import { Router } from "express";

import { AuthenticateEmployeeController } from "@modules/accounts/useCases/authenticateEmployee/AuthenticateEmployeeController";

const authenticateEmployeeRoutes = Router();

const authenticateEmployeeController = new AuthenticateEmployeeController();

authenticateEmployeeRoutes.post(
  "/sessions",
  authenticateEmployeeController.handle
);

export { authenticateEmployeeRoutes };
