import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/AppError";

const admAccessMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.user;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: id } });
  if (!user) {
    throw new AppError("Invalid Authorization", 403);
  }
  if (user.id === id && user.isAdm === true) {
    next();
  } else {
    throw new AppError("Invalid Authorization", 403);
  }
};

export default admAccessMiddleware;
