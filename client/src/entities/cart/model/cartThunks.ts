import { createAsyncThunk } from '@reduxjs/toolkit';
import CartService from '../api/CartService';
import type { CartItemCheckT, CartItemValidationResponseT } from './cartTypes';
import { type NewCartItemT, type UpdateCartItemT } from './cartTypes';
import { cartItemCheckArraySchema, guestCartItemArraySchem } from './cartSchema';

export const getCart = createAsyncThunk('cart/getCart', () => CartService.getOrCreateCart());

export const deleteCart = createAsyncThunk('cart/deleteCart', () => CartService.deleteCart());

export const getCartItems = createAsyncThunk('cart/getCartItems', () => CartService.getCartItems());

export const addCartItem = createAsyncThunk('cart/addCartItem', async (item: NewCartItemT) => {
  const response = await CartService.addCartItem(item);
  return response;
});

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  ({ itemId, updateData }: { itemId: number; updateData: UpdateCartItemT }) =>
    CartService.updateCartItem(itemId, updateData),
);

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', (itemId: number) =>
  CartService.deleteCartItem(itemId),
);

export const transferGuestCartToServer = createAsyncThunk(
  'cart/transferGuestCartToServer',
  async (_, { dispatch }) => {
    try {
      const guestCart = localStorage.getItem('guestCart');
      if (!guestCart) {
        console.log('🛒 localStorage.guestCart пустой');
        return;
      }

      const parsed = guestCartItemArraySchem.safeParse(JSON.parse(guestCart));

      if (!parsed.success || parsed.data.length === 0) {
        console.log('guestCart некорректный или пустой');
        return;
      }

      const items = parsed.data.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
      console.log('🛒 Отправляем товары на сервер:', items);

      await CartService.createCartWithItems(items);

      console.log('✅ Корзина успешно перенесена на сервер, очищаем localStorage');
      localStorage.removeItem('guestCart');
      console.log('🛒 localStorage.guestCart очищен');
    } catch (error) {
      console.error('❌ Ошибка при переносе корзины:', error);
    }
  },
);

export const checkCartItems = createAsyncThunk<CartItemValidationResponseT, CartItemCheckT[]>(
  'cart/checkCartItems',
  async (cartItems) => {
    const parsed = cartItemCheckArraySchema.safeParse(cartItems);

    if (!parsed.success) {
      throw new Error('Неверные данные для проверки корзины');
    }

    const response = await CartService.checkCartItems(parsed.data);
    return response;
  },
);
