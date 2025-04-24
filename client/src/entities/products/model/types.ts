import type { z } from 'zod';
import type { productSchema } from './schema';

export type ProductT = z.infer<typeof productSchema>;

export type ProductSliceT = {
  products: ProductT[];
  loading: boolean;
  product: ProductT | null;
};
