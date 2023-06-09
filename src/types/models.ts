import { Role, ROLES } from "./roles";


export interface User {
  name: string;
  email: string;
  password: string;
  role: Role;
  profilePicture: string;
}
