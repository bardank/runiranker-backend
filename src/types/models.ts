import { ObjectId } from "mongoose";
import { INSTITUTION_TYPE } from "./institutionType";
import { Role, ROLES } from "./roles";

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  salt: string;
  role: Role;
  profilePicture: string;
  accessToken: string;
}

export interface AffiliatedBy {
  label: string;
  link: string;
}
export interface Institution {
  _id: ObjectId;
  name: string;
  address: string;
  phone: string[];
  email: string;
  website: string;
  affiliatedBy: AffiliatedBy[];
  logo: string;
  institutionType: INSTITUTION_TYPE;
}
