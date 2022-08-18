import { Router } from "express";

import { authenticateEmployeeRoutes } from "./authenticateEmployee.routes";
import { categoriesRoutes } from "./categories.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use(authenticateEmployeeRoutes);

export { router };
