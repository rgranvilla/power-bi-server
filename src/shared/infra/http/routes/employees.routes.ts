import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateEmployeeController } from "@modules/accounts/useCases/Employees/createEmployee/CreateEmployeeController";
import { UpdateEmployeeAvatarController } from "@modules/accounts/useCases/Employees/updateEmployeeAvatar/UpdateEmployeeAvatarController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const employeesRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createEmployeesController = new CreateEmployeeController();
const updateEmployeeAvatarController = new UpdateEmployeeAvatarController();

employeesRoutes.post(
  "/",
  ensureAuthenticated,
  createEmployeesController.handle
);

employeesRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateEmployeeAvatarController.handle
);

export { employeesRoutes };
