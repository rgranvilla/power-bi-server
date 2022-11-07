import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/Users/createUser/CreateUserController";
import { ProfileUserController } from "@modules/accounts/useCases/Users/profileUserController/ProfileUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/Users/updateUserAvatar/UpdateUserAvatarController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUsersController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createUsersController.handle
);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
