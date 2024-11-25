import { NextFunction, Request, Response } from "express";
import { LoginRequest, RegisterRequest, UserRequest } from "../models/user.model";
import { UserService } from "../services/user.service";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterRequest = req.body;
      const result = await UserService.register(request);
      res.status(201).json({
        success: true,
        message: "Register Successfully",
        result
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginRequest = req.body;
      const result = await UserService.login(request);
      res.status(200).json({
        success: true,
        message: "Login Successfully",
        result
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await UserService.getUser(req.user!);
      res.status(200).json({
        success: true,
        message: "User Data Successfully Retrivied",
        result
      });
    } catch (error) {
      next(error);
    }
  }
}