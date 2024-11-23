import { CartItem } from "@prisma/client";
import { ProductResponse } from "./product.model";

export type CartResponse = {
  productId: string;
  quantity: number;
  products?: ProductResponse[];
}

export type CreateCartRequest = {
  productId: string;
  userId: string;
  quantity: number;
}

export function toCartResponse(cart: CartItem): CartResponse {
  return {
    productId: cart.productId,
    quantity: cart.quantity
  }
}