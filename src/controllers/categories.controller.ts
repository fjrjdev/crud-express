import { Response, Request } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listCategoryService from "../services/categories/listCategory.service";

const createCategoryController = async (
  request: Request,
  response: Response
) => {
  const { name }: ICategoryRequest = request.body;
  const category = await createCategoryService({ name });

  return response.status(201).json(category);
};

const listCategoriesController = async (
  request: Request,
  response: Response
) => {
  const categories = await listCategoriesService();
  return response.status(200).json(categories);
};

const listCategoryController = async (request: Request, response: Response) => {
  const id: string = request.params.id;
  const properties = await listCategoryService(id);
  return response.status(200).json(properties);
};

export {
  createCategoryController,
  listCategoriesController,
  listCategoryController,
};
