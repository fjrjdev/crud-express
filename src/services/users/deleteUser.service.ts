import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";

const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const update = {
    isActive: false,
  };

  const user = await userRepository
    .createQueryBuilder()
    .update({ ...update })
    .where("id = :id", { id })
    .execute();
};

export default deleteUserService;
