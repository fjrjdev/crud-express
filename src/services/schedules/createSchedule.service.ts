import AppDataSource from "../../data-source";
import Property from "../../entities/properties.entity";
import Schedule from "../../entities/schedules.entity";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async ({
  propertyId,
  date,
  hour,
  userId,
}: IScheduleRequest): Promise<Schedule> => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const propertyRepository = AppDataSource.getRepository(Property);
  const userRepository = AppDataSource.getRepository(User);

  const property = await propertyRepository.findOne({
    where: { id: propertyId },
  });
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!property || !user) {
    throw new AppError("Property or User is invalid", 404);
  }

  const scheduleVerify = await scheduleRepository.findOne({
    where: { date: date, hour: hour },
  });
  if (scheduleVerify) {
    throw new AppError("This schedule has already been registred", 400);
  }
  const dateVerify = new Date(`${date} ${hour}`);
  const hourVerify = dateVerify.getHours();

  if (hourVerify > 18 || hourVerify < 8) {
    throw new AppError("Invalid Hour", 400);
  }

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = weekday[dateVerify.getDay()];
  if (day === "Sunday" || day === "Saturday") {
    throw new AppError("Invalid Day", 400);
  }

  const schedule = scheduleRepository.create({ date, hour });
  await scheduleRepository.save({
    date,
    hour,
    user: user,
    property: property,
  });

  return schedule;
};

export default createScheduleService;
