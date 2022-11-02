import { Router } from "express";
import loginUserController from "../controllers/login.controller";

const loginRoutes = Router();

loginRoutes.post("", loginUserController);

export default loginRoutes;
