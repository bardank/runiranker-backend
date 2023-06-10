import UserModel from "../models/user";
import { User } from "../types/models";

const create = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const user = await UserModel.create({
    username,
    email,
    password,
  });
  return user;
};

const findOneByEmail = async (email: string): Promise<User | null> => {
  return await UserModel.findOne({ email });
};

const userService = {
  create,
  findOneByEmail,
};

export default userService;
