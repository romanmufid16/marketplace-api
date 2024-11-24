import { Order, Prisma } from "@prisma/client";
import { OrderItemResponse } from "./orderItem.model";

export type OrderResponse = {
  id: string;
  userId: string;
  totalAmount: Prisma.Decimal;
  status: string
  items?: OrderItemResponse[];
}

export type CreateOrderRequest = {
  userId: string;
}

export function toOrderResponse(order: Order): OrderResponse {
  return {
    id: order.id,
    userId: order.userId,
    status: order.status,
    totalAmount: order.totalAmount
  }
}