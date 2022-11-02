import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users";

const loginUserService = async ({
  email,
  password,
}: IUserLogin): Promise<String> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 403);
  }

  if (user.isActive === false) {
    throw new AppError("Invalid email or password", 403);
  }
  const passwordConfirm = await compare(password, user.password);

  if (!passwordConfirm) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "2h",
    }
  );

  return token;
};

export default loginUserService;
