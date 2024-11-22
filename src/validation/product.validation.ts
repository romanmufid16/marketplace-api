import { z, ZodType } from "zod";

export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    price: z.number(),
    stock: z.number().positive(),
    category: z.string().min(1).max(100)
  });

  static readonly QUERY: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    category: z.string().min(1).max(100).optional()
  });
}