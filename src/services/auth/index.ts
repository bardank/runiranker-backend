import UserModel from "../../models/user";
import { HttpErrorPayload } from "../../types/error";



const login = async (email: string, password: string): Promise<string> => {
  const errObj: HttpErrorPayload = {
    code: 400,
    type: "BAD_REQUEST",
    message: "Invalid credentials!",
  };

  return "";
};

const register = async (
  username: string,
  email: string,
  password: string
): Promise<string> => {
  const user = await UserModel.create({});

  return "";
};

const authService = {
  login,
};

export default authService;
