import { Router } from "express";

import { authenticateUserRoutes } from "./authenticateUser.routes";
import { passwordRoutes } from "./password.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use(authenticateUserRoutes);
router.use("/password", passwordRoutes);

export { router };
