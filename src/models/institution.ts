import { Schema, model } from "mongoose";
import { Institution } from "../types/models";
import { INSTITUTION_TYPE } from "../types/institutionType";

export const InstitutionSchema = new Schema<Institution>(
  {
    name: { type: String, required: true },
    address: { type: String, required: false },
    phone: { type: [String], required: false, default: [] },
    email: { type: String, required: false },
    website: { type: String, required: false },
    affiliatedBy: { type: [String], required: false, default: [] },
    logo: { type: String, required: false },
    institutionType: {
      type: String,
      required: false,
      default: INSTITUTION_TYPE.COLLEGE,
    },
    slug: { type: String, required: false },
    ownership: { type: String, required: false },
    about: { type: String, required: false },
    established: { type: String, required: false },
    programs: { type: [String], required: false, default: [] },
    location: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
export const InstitutionModel = model(
  "Institution",
  InstitutionSchema,
  "institutions"
);
export default InstitutionModel;
