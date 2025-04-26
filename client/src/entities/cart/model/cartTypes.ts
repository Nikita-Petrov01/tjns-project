import type { z } from 'zod';
import type { cartItemSchema, cartSchema, newCartItemSchema, newCartSchema, updateCartItemSchema } from './cartSchema';


export type CartT = z.infer<typeof cartSchema>;
export type NewCartT = z.infer<typeof newCartSchema>;
export type CartItemT = z.infer<typeof cartItemSchema>;
export type NewCartItemT = z.infer<typeof newCartItemSchema>;
export type UpdateCartItemT = z.infer<typeof updateCartItemSchema>;

export type CartSliceT = {
    cart: CartT | null,
    items: CartItemT[],
    loading: boolean;
    error: string | null;
}
