import { Router } from "express";

import { CreateEmployeesController } from "@modules/accounts/useCases/createEmployees/CreateEmployeesController";

const employeesRoutes = Router();

const createEmployeesController = new CreateEmployeesController();

employeesRoutes.post("/", createEmployeesController.handle);

export { employeesRoutes };
