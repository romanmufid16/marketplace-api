import { User } from "@prisma/client";
import { CartResponse, CreateCartRequest, DeleteCartRequest, toCartResponse } from "../models/cart.model";
import { CartValidation } from "../validation/cart.validation";
import { Validation } from "../validation/validation";
import { ProductService } from "./product.service";
import { prismaClient } from "../app/database";
import { toProductResponse } from "../models/product.model";

export class CartService {
  static async create(user: User, request: CreateCartRequest): Promise<CartResponse> {
    const cartRequest = Validation.validate(
      CartValidation.CREATE,
      request
    );

    await ProductService.checkProductExist(request.productId);

    const record = {
      ...cartRequest,
      ...{ userId: user.id }
    };

    const cart = await prismaClient.cartItem.create({
      data: record
    });

    return toCartResponse(cart);
  }

  static async get(user: User): Promise<Array<CartResponse>> {
    const carts = await prismaClient.cartItem.findMany({
      where: {
        userId: user.id
      },
      include: {
        product: true
      }
    });

    return carts.map((cart) => {
      const response = toCartResponse(cart);
      response.products = cart.product ? [toProductResponse(cart.product)] : [];
      return response;
    });
  }

  static async remove(request: DeleteCartRequest): Promise<CartResponse> {
    const removeRequest = Validation.validate(
      CartValidation.DELETE,
      request
    );

    const cart = await prismaClient.cartItem.delete({
      where: {
        id: removeRequest.cartId
      }
    });

    return toCartResponse(cart);
  }
}