import { CartItem } from "@prisma/client";
import { ProductResponse } from "./product.model";

export type CartResponse = {
  id: string;
  productId: string;
  quantity: number;
  products?: ProductResponse[];
}

export type CreateCartRequest = {
  productId: string;
  userId: string;
  quantity: number;
}

export type DeleteCartRequest = {
  cartId: string
}

export function toCartResponse(cart: CartItem): CartResponse {
  return {
    id: cart.id,
    productId: cart.productId,
    quantity: cart.quantity
  }
}