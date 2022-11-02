import { Router } from "express";
import {
  createPropertyController,
  listPropertiesController,
} from "../controllers/properties.controller";
import admAccessMiddleware from "../middlewares/admAccess.middleware";
import authTokenMiddleware from "../middlewares/authToken.middleware";

const propertiesRoutes = Router();
const baseRoute = "";
propertiesRoutes.post(
  baseRoute,
  authTokenMiddleware,
  admAccessMiddleware,
  createPropertyController
);

propertiesRoutes.get(baseRoute, listPropertiesController);
export default propertiesRoutes;
