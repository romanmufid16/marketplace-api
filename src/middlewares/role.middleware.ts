import { NextFunction, Response } from "express";
import { UserRequest } from "../models/user.model";
import { ResponseError } from "../lib/error.response";

export const merchantMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
  console.log(req.user?.role)
  if (req.user?.role !== "merchant") {
    throw new ResponseError(403, "Forbidden");
  }
  next();
}