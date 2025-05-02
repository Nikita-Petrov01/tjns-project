import type { z } from 'zod';
import type { newProductSchema, productSchema } from './schema';

export type ProductT = z.infer<typeof productSchema>;

export type ProductSliceT = {
  products: ProductT[];
  loading: boolean;
  product: ProductT | null;
  productsTodisplay : ProductT[];
  searchProducts: string;

  productsByCategory: ProductT[] | null;
  sortBy: 'price' | 'name' | 'averageRating';
  sortOrder: 1 | -1;
};

// export type NewProductT = z.infer<typeof newProductSchema>;

export type NewProductT = z.infer<typeof newProductSchema> & {
  files: File[];
};
