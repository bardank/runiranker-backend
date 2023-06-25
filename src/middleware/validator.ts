import { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpError } from "../libs/httpError";
import validators from "../validators";
import * as yup from "yup";

type Validator = keyof typeof validators;
type RequestPayloadIn = "body" | "query";

const validator =
  (args: Partial<Record<RequestPayloadIn, Validator>>): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keys = Object.keys(args) as RequestPayloadIn[];

      for (const key of keys) {
        const payload = req[key];
        const validator = args[key];

        if (validator) {
          const result =  validators[validator].validate(payload);
          console.log({ result , "heelo" : "hi"});
        }
      }
      return next();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        new HttpError({
          code: 400,
          type: "BAD_REQUEST",
          message: err.message,
        });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
      return next();
    }
  };

export default validator;
