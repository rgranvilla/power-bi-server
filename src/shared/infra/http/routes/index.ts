import { Router } from "express";

import { authenticateUserRoutes } from "./authenticateUser.routes";
import { neighborhoodsRoute } from "./neighborhoods.routes";
import { passwordRoutes } from "./password.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/password", passwordRoutes);
router.use("/neighborhoods", neighborhoodsRoute);
router.use(authenticateUserRoutes);

export { router };
