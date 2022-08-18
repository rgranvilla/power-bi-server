import { Router } from "express";

import { CreateEmployeesController } from "@modules/accounts/useCases/createEmployees/CreateEmployeesController";
import { GetEmployeeController } from "@modules/accounts/useCases/getEmployee/GetEmployeeController";

const employeesRoutes = Router();

const createEmployeesController = new CreateEmployeesController();
const getEmployeeController = new GetEmployeeController();

employeesRoutes.post("/", createEmployeesController.handle);
employeesRoutes.get("/", getEmployeeController.handle);

export { employeesRoutes };
