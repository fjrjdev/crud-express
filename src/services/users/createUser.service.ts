import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";

const createUserService = async ({
  email,
  name,
  password,
  isAdm,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email: email } });
  if (user) {
    throw new AppError("This user is already registred", 400);
  }

  const hashPwd = await hash(password, 10);

  const newUser = userRepository.create({
    email: email,
    name: name,
    password: hashPwd,
    isAdm: isAdm,
  });

  await userRepository.save(newUser);

  return newUser;
};

export default createUserService;
