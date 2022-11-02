import { Response, Request } from "express";
import { IUserLogin } from "../interfaces/users";
import loginUserService from "../services/login/loginUser.service";

const loginUserController = async (request: Request, response: Response) => {
  const { email, password }: IUserLogin = request.body;
  const token = await loginUserService({ email, password });

  return response.status(200).json({ token });
};

export default loginUserController;
