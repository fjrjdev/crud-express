import { Request, Response } from "express";
import { IAddressRequest, IPropertyRequest } from "../interfaces/properties";
import createPropertyService from "../services/properties/createProperty.service";
import listPropertiesService from "../services/properties/listProperties.service";
const createPropertyController = async (
  request: Request,
  response: Response
) => {
  const { address, categoryId, size, value }: IPropertyRequest = request.body;
  const property = await createPropertyService({
    address,
    categoryId,
    size,
    value,
  });
  return response.status(201).json(property);
};

const listPropertiesController = async (
  request: Request,
  response: Response
) => {
  const properties = await listPropertiesService();
  return response.status(200).json(properties);
};

export { createPropertyController, listPropertiesController };
