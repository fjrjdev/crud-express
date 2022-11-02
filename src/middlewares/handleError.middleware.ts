import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

const handleErrorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statuscode).json({ message: error.message });
  }
  return response.status(500).json({ message: "Internal Server Error" });
};

export default handleErrorMiddleware;
