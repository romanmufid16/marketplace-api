import { prismaClient } from "../app/database";
import { CreateProductRequest, GetProductRequest, ProductResponse, toProductResponse } from "../models/product.model";
import { ProductValidation } from "../validation/product.validation";
import { Validation } from "../validation/validation";

export class ProductService {
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

    return products.map((product) => toProductResponse(product));
  }
}