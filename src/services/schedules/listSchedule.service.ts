import AppDataSource from "../../data-source";
import Property from "../../entities/properties.entity";
import AppError from "../../errors/AppError";

const listScheduleService = async (id: string) => {
  const propertyRepository = AppDataSource.getRepository(Property);

  const property = await propertyRepository.findOne({
    where: { id: id },
    relations: { schedules: true },
  });
  if (!property) {
    throw new AppError("property not found", 404);
  }

  return property;
};

export default listScheduleService;
