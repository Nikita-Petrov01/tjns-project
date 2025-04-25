import type { z } from 'zod';
import type { favoriteSchema, newFavoriteSchema } from './favoriteSchema';

export type FavoriteT = z.infer<typeof favoriteSchema>;

export type NewFavoriteT = z.infer<typeof newFavoriteSchema>;

export type FavoriteSliceT = {
  favorites: FavoriteT[];
  favorite: FavoriteT | null;
};
