import { Prisma, Product } from "@prisma/client";

export type ProductResponse = {
  name: string;
  description: string;
  price: Prisma.Decimal;
  stock: number;
  category: string;
}

export type CreateProductRequest = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export type GetProductRequest = {
  name?: string;
  category?: string;
}

export function toProductResponse(product: Product): ProductResponse {
  return {
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category
  }
}