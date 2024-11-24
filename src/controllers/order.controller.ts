import { NextFunction, Response } from "express";
import { UserRequest } from "../models/user.model";
import { OrderService } from "../services/order.service";

export class OrderController {
  static async createOrder(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await OrderService.create(req.user!);
      res.status(201).json({
        success: true,
        message: "Order created successfully",
        result
      });
    } catch (error) {
      next(error);
    }
  }
}