import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listCategoryController,
} from "../controllers/categories.controller";
import admAccessMiddleware from "../middlewares/admAccess.middleware";
import authTokenMiddleware from "../middlewares/authToken.middleware";

const categoriesRoutes = Router();
const baseRoute = "";

categoriesRoutes.post(
  baseRoute,
  authTokenMiddleware,
  admAccessMiddleware,
  createCategoryController
);
categoriesRoutes.get(baseRoute, listCategoriesController);
categoriesRoutes.get(baseRoute + "/:id/properties", listCategoryController);

export default categoriesRoutes;
