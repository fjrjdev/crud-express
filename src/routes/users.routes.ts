import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
} from "../controllers/users.controller";
import admAccessMiddleware from "../middlewares/admAccess.middleware";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import userActiveMiddleware from "../middlewares/userActive.middleware";

const usersRoutes = Router();
const baseRoute = "";

usersRoutes.post(baseRoute, createUserController);
usersRoutes.get(
  baseRoute,
  authTokenMiddleware,
  admAccessMiddleware,
  listUsersController
);
usersRoutes.delete(
  baseRoute + "/:id",
  authTokenMiddleware,
  admAccessMiddleware,
  userActiveMiddleware,
  deleteUserController
);

export default usersRoutes;
