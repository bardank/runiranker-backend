import { Schema, model } from "mongoose";
import { User } from "../types/models";
import { ROLES } from "../types/roles";

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: false,
      select: false,
      // default: function (this: User) {
      //   const roleId = this.role.id
      //   return roleId === 2
      //     ? '$2a$10$ew1LvB183zb0roDPsc7ObuEMipcH9ibqp4Ka2r14mFBaU02KmLVlG' // 12345678
      //     : (null as unknown as string)
      // },
    },
    profilePicture: { type: String, required: false },
    role: {
      type: String,
      default: ROLES.CLIENT,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  }
);

const UserModel = model("User", UserSchema, "users");

export default UserModel;
