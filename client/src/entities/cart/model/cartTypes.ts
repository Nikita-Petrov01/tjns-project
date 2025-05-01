import type { z } from 'zod';
import type { addToCartSchema, cartItemSchema, cartSchema, productForCartSchema, updateCartItemPayload } from './cartSchema';
// import type { cartItemCheckSchema, cartItemSchema, cartSchema, newCartItemSchema, newCartSchema, updateCartItemSchema } from './cartSchema';

// export type CartT = z.infer<typeof cartSchema>;
// export type NewCartT = z.infer<typeof newCartSchema>;
// export type CartItemT = z.infer<typeof cartItemSchema>;
// export type NewCartItemT = z.infer<typeof newCartItemSchema>;
// export type UpdateCartItemT = z.infer<typeof updateCartItemSchema>;
// export type CartItemCheckT = z.infer<typeof cartItemCheckSchema>;

// export type CartItemValidationResponseT = {
//     errors: {
//         productId: number;
//         message: string;
//       }[];
//       updatedItems: {
//         productId: number;
//         availableStock: number;
//       }[];
// }

export type ProductForCartT = z.infer<typeof productForCartSchema>;
export type CartItemT = z.infer<typeof cartItemSchema>;
export type CartT = z.infer<typeof cartSchema>;
export type AddToCartT = z.infer<typeof addToCartSchema>;
export type UpdateCartT = z.infer<typeof updateCartItemPayload>;

export type CartSliceT = {
  cart: CartT | null;
  items: CartItemT[];
  guestItems: CartItemT[];
  loading: boolean;
  error: string | null;
  hasMerged: boolean;
};
