import "reflect-metadata";
import "express-async-errors";
import express from "express";

import usersRoutes from "./routes/users.routes";
import loginRoutes from "./routes/login.routes";
import propertiesRoutes from "./routes/properties.routes";
import categoriesRoutes from "./routes/categories.routes";
import schedulesRoutes from "./routes/schedules.routes";

import handleErrorMiddleware from "./middlewares/handleError.middleware";

const app = express();
app.use(express.json());

const config = {
  users: "/users",
  login: "/login",
  properties: "/properties",
  categories: "/categories",
  schedules: "/schedules",
};

app.use(config.users, usersRoutes);
app.use(config.login, loginRoutes);
app.use(config.properties, propertiesRoutes);
app.use(config.categories, categoriesRoutes);
app.use(config.schedules, schedulesRoutes);

app.use(handleErrorMiddleware);

export default app;
