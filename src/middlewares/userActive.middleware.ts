import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import AppError from "../errors/AppError";

const userActiveMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id: string = request.params.id;

  const userRepository = AppDataSource.getRepository(User);
  const userValidator = await userRepository.findOne({
    where: { id: id },
  });
  if (!userValidator) {
    throw new AppError("This user not exists", 404);
  }
  if (userValidator.isActive === false) {
    throw new AppError("This user not exists", 400);
  }
  next();
};

export default userActiveMiddleware;
