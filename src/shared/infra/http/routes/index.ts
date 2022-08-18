import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { employeesRoutes } from "./employees.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/accounts/employees", employeesRoutes);

export { router };
