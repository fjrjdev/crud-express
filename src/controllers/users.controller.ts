import { instanceToPlain } from "class-transformer";
import e, { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";

const createUserController = async (request: Request, response: Response) => {
  const { email, name, password, isAdm }: IUserRequest = request.body;
  const newUser = await createUserService({ email, name, password, isAdm });

  return response.status(201).json(instanceToPlain(newUser));
};

const listUsersController = async (request: Request, response: Response) => {
  const users = await listUsersService();
  return response.status(200).json(instanceToPlain(users));
};

const deleteUserController = async (request: Request, response: Response) => {
  const id: string = request.params.id;
  const deleteUser = await deleteUserService(id);
  return response.status(204).json({ message: "User has been Deleted" });
};

export { createUserController, listUsersController, deleteUserController };
