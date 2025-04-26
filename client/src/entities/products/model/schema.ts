import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  categoryId: z.number(),
  averageRating: z.number().optional(),
});

export const newProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  categoryId: z.number(),
});
