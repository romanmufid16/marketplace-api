import { z, ZodType } from "zod";

export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    price: z.number(),
    stock: z.number().positive(),
    category: z.string().min(1).max(100),
    imageUrl: z.string().min(1).max(190)
  });

  static readonly QUERY: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    category: z.string().min(1).max(100).optional()
  });

  static readonly GET: ZodType = z.object({
    id: z.string().uuid()
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(100).optional(),
    price: z.number().optional(),
    stock: z.number().positive().optional(),
    category: z.string().min(1).max(100).optional()
  });

  static readonly REMOVE: ZodType = z.object({
    id: z.string().uuid()
  });
}