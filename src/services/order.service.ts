import { User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { OrderResponse, toOrderResponse } from "../models/order.model";
import { ResponseError } from "../lib/error.response";
import { toOrderItemResponse } from './../models/orderItem.model';
import { toProductResponse } from "../models/product.model";

export class OrderService {
  static async create(user: User): Promise<OrderResponse> {
    const tx = await prismaClient.$transaction(async (prisma) => {
      const getCartItems = await prisma.cartItem.findMany({
        where: { userId: user.id },
        include: { product: true }
      });

      if (getCartItems.length === 0) {
        throw new ResponseError(404, "No cart items found");
      }

      let totalPrice = 0;

      for (const cartItem of getCartItems) {
        totalPrice += cartItem.product.price.toNumber() * cartItem.quantity;
      }

      const order = await prisma.order.create({
        data: {
          userId: user.id,
          totalAmount: totalPrice,
          status: 'pending',
        }
      });

      const orderItemsData = getCartItems.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity
      }));

      await prisma.orderItem.createMany({
        data: orderItemsData
      });

      const orderWithItems = await prisma.order.findUnique({
        where: {
          id: order.id,
        },
        include: {
          orderItems: {
            include: {
              product: true
            }
          }
        }
      })

      return orderWithItems;
    });

    if (!tx) {
      throw new ResponseError(500, "Transaction failed, no order data returned");
    }

    const response = toOrderResponse(tx);
    response.items = tx.orderItems.map((item) => {
      const convert = toOrderItemResponse(item);
      convert.product = toProductResponse(item.product);
      return convert;
    });
    console.log(response);
    return response;
  }
}