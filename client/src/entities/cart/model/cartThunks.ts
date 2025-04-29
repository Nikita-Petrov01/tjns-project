import { createAsyncThunk } from '@reduxjs/toolkit';
import CartService from '../api/CartService';
import type { NewCartItemT, UpdateCartItemT } from './cartTypes';
import { clearCartLocally } from './cartSlice';
import { cartItemArraySchem } from './cartSchema';

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

export const transferGuestCartToServer = createAsyncThunk('cart/transferGuestCartToServer', async (_, { dispatch }) => {
  const guestCart = localStorage.getItem('guestCart');
  if (!guestCart) return;

  const items = cartItemArraySchem.parse(JSON.parse(guestCart));

  await CartService.getOrCreateCart();

    if (items.length > 0) {
      // Если корзина только что создана — отправляем все товары одним запросом
      await CartService.createCartWithItems(items);
    }

    dispatch(clearCartLocally());
    await dispatch(getCartItems());
  }
);