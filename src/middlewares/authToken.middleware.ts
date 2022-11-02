import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import "dotenv/config";

const authTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        return response.status(401).json({
          message: "Invalid token",
        });
      }

      request.user = {
        isAdm: decoded.isAdm,
        id: decoded.sub,
      };

      next();
    }
  );
};

export default authTokenMiddleware;
