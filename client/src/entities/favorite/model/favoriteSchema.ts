import { z } from 'zod';

export const favoriteSchema = z.object({
  id: z.number(),
  userId: z.number(),
  productId: z.number(),
});

export const newFavoriteSchema = z.object({
  userId: z.number(),
  productId: z.number(),
});