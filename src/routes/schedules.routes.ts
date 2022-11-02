import { Router } from "express";
import {
  createScheduleController,
  listScheduleController,
} from "../controllers/schedules.controller";
import admAccessMiddleware from "../middlewares/admAccess.middleware";
import authTokenMiddleware from "../middlewares/authToken.middleware";

const schedulesRoutes = Router();
const baseRoute: string = "";
schedulesRoutes.post(baseRoute, authTokenMiddleware, createScheduleController);
schedulesRoutes.get(
  baseRoute + "/properties/:id",
  authTokenMiddleware,
  admAccessMiddleware,
  listScheduleController
);

export default schedulesRoutes;
