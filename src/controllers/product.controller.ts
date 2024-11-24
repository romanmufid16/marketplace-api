import { NextFunction, Request, Response } from "express";
import { CreateProductRequest, GetByIdProductRequest, GetProductRequest, RemoveProductRequest, UpdateProductRequest } from "../models/product.model";
import { ProductService } from "../services/product.service";

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateProductRequest = {
        ...req.body,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        imageUrl: req.file ? req.file.filename : ''
      };
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

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const request: GetByIdProductRequest = {
        id: req.params.id
      }

      const result = await ProductService.getProductByID(request);
      res.status(200).json({
        success: true,
        message: "Product retrivied successfully",
        result
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateProductRequest = req.body;
      request.id = req.params.id;

      const result = await ProductService.updateProduct(request);
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        result
      });
    } catch (error) {
      next(error);
    }
  }

  static async removeProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RemoveProductRequest = {
        id: req.params.id,
      }
      await ProductService.remove(request);
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        result: null
      });
    } catch (error) {
      next(error);
    }
  }
}