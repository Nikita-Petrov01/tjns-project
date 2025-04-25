import type { z } from 'zod';
import type { newProductSchema, productSchema } from './schema';

export type ProductT = z.infer<typeof productSchema>;

export type ProductSliceT = {
  products: ProductT[];
  loading: boolean;
  product: ProductT | null;

  searchProducts: string;

  productsByCategory: ProductT[] | null;
  sortBy: keyof ProductT;
  sortOrder: 1 | -1;
};

export type NewProductT = z.infer<typeof newProductSchema>;
