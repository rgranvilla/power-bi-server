import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/Users/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/Users/refreshToken/RefreshTokenController";

const authenticateUserRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateUserRoutes.post("/sessions", authenticateUserController.handle);
authenticateUserRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateUserRoutes };
