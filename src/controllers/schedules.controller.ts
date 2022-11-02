import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listPropertiesService from "../services/properties/listProperties.service";
import createScheduleService from "../services/schedules/createSchedule.service";
import listScheduleService from "../services/schedules/listSchedule.service";

const createScheduleController = async (
  request: Request,
  response: Response
) => {
  const userId: string = request.user.id;
  const { propertyId, date, hour } = request.body;
  const schedule = await createScheduleService({
    userId,
    propertyId,
    date,
    hour,
  });
  return response.status(201).json({ message: "Schedule Created with sucess" });
};

const listScheduleController = async (request: Request, response: Response) => {
  const id = request.params.id;
  const schedule = await listScheduleService(id);
  return response.status(200).json(instanceToPlain(schedule));
};

export { createScheduleController, listScheduleController };
