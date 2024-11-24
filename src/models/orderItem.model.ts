import { OrderItem } from "@prisma/client";
import { ProductResponse } from "./product.model";

export type OrderItemResponse = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  product?: ProductResponse;
}

export type OrderItemRequest = {
  productId: string;
  quantity: number;
}

export function toOrderItemResponse(orderItem: OrderItem): OrderItemResponse {
  return {
    id: orderItem.id,
    orderId: orderItem.orderId,
    productId: orderItem.productId,
    quantity: orderItem.quantity,
  }
}