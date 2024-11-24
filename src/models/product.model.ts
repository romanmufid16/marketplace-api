import { Prisma, Product } from "@prisma/client";

export type ProductResponse = {
  id: string;
  name: string;
  description: string;
  price: Prisma.Decimal;
  stock: number;
  category: string;
  imageUrl: string;
}

export type CreateProductRequest = {
  name: string;
  description: string;
  price: Prisma.Decimal;
  stock: number;
  category: string;
  imageUrl: string;
}

export type GetProductRequest = {
  name?: string;
  category?: string;
}

export type GetByIdProductRequest = {
  id: string;
}

export type UpdateProductRequest = {
  id: string;
  name?: string;
  description?: string;
  price?: Prisma.Decimal;
  stock?: number;
  category?: string;
}

export type RemoveProductRequest = GetByIdProductRequest;

export function toProductResponse(product: Product): ProductResponse {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    imageUrl: product.imageUrl
  }
}