import { NextFunction, Request, Response } from "express";
import { CreateProductRequest, GetProductRequest } from "../models/product.model";
import { ProductService } from "../services/product.service";

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateProductRequest = req.body;
      const result = await ProductService.create(request);
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        result
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const request: GetProductRequest = {
        name: req.query.name as string,
        category: req.query.category as string
      }

      const result = await ProductService.getAllProducts(request);
      res.status(200).json({
        success: true,
        message: "Product list",
        result
      });
    } catch (error) {
      next(error);
    }
  }
}