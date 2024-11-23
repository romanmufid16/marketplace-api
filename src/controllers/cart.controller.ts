import { NextFunction, Response } from "express";
import { UserRequest } from "../models/user.model";
import { CreateCartRequest } from "../models/cart.model";
import { CartService } from "../services/cart.service";

export class CartController {
  static async createCart(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateCartRequest = req.body;
      const result = await CartService.create(req.user!, request);
      res.status(201).json({
        success: true,
        message: "Cart Item created successfully",
        result
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCartItems(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await CartService.get(req.user!);
      res.status(200).json({
        success: true,
        message: "Cart Item successfully retrieved",
        result
      })
    } catch (error) {
      next(error);
    }
  }
}