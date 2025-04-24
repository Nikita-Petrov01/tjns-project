import type { z } from 'zod';
import type { newProductSchema, productSchema } from './schema';

export type ProductT = z.infer<typeof productSchema>;

export type ProductSliceT = {
  products: ProductT[];
  loading: boolean;
  product: ProductT | null;
  productCategory: ProductT[] | null;
};

export type NewProductT = z.infer<typeof newProductSchema>;