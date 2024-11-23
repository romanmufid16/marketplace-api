import { Product } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../lib/error.response";
import { CreateProductRequest, GetByIdProductRequest, GetProductRequest, ProductResponse, RemoveProductRequest, toProductResponse, UpdateProductRequest } from "../models/product.model";
import { ProductValidation } from "../validation/product.validation";
import { Validation } from "../validation/validation";

export class ProductService {
  // Checking product in database
  static async checkProductExist(productId: string): Promise<Product> {
    const product = await prismaClient.product.findUnique({
      where: {
        id: productId
      }
    });

    if (!product) {
      throw new ResponseError(404, "Product not found");
    }

    return product;
  }

  // Creating Product
  static async create(request: CreateProductRequest): Promise<ProductResponse> {
    const productRequest = Validation.validate(
      ProductValidation.CREATE,
      request
    );

    const product = await prismaClient.product.create({
      data: productRequest
    });

    return toProductResponse(product);
  }

  //  Get All Product (Query : name , category)
  static async getAllProducts(request: GetProductRequest): Promise<Array<ProductResponse>> {
    const query = Validation.validate(
      ProductValidation.QUERY,
      request
    );

    const filters = [];

    if (query.name) {
      filters.push({
        name: {
          contains: query.name,
        }
      });
    }

    if (query.category) {
      filters.push({
        category: {
          contains: query.category,
        }
      });
    }

    const products = await prismaClient.product.findMany({
      where: filters.length > 0 ? { AND: filters } : {}
    });

    if (products.length == 0) {
      throw new ResponseError(404, "Product not found");
    }

    return products.map((product) => toProductResponse(product));
  }

  //  Get Product By ID
  static async getProductByID(request: GetByIdProductRequest): Promise<ProductResponse> {
    const productRequest = Validation.validate(
      ProductValidation.GET,
      request
    );
    const product = await this.checkProductExist(productRequest.id);
    return toProductResponse(product);
  }

  static async updateProduct(request: UpdateProductRequest): Promise<ProductResponse> {
    const productRequest = Validation.validate(
      ProductValidation.UPDATE,
      request
    );
    await this.checkProductExist(productRequest.id);

    const product = await prismaClient.product.update({
      where: {
        id: productRequest.id
      },
      data: productRequest
    });

    return toProductResponse(product);
  }

  static async remove(request: RemoveProductRequest): Promise<ProductResponse> {
    const removeRequest = Validation.validate(
      ProductValidation.REMOVE,
      request
    );

    await this.checkProductExist(removeRequest.id);

    const product = await prismaClient.product.delete({
      where: {
        id: removeRequest.id
      }
    });

    return toProductResponse(product);
  }
}