import { z, ZodType } from "zod";

export class CartValidation {
  static readonly CREATE: ZodType = z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive()
  });
}