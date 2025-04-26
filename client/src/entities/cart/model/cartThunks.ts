import { createAsyncThunk } from '@reduxjs/toolkit';
import CartService from '../api/CartService';
import type { NewCartItemT, UpdateCartItemT } from './cartTypes';

export const getCart = createAsyncThunk('cart/getCart', () => CartService.getOrCreateCart());

export const deleteCart = createAsyncThunk('cart/deleteCart', () => CartService.deleteCart());

export const getCartItems = createAsyncThunk('cart/getCartItems', () => CartService.getCartItems());

export const addCartItem = createAsyncThunk('cart/addCartItem', (item: NewCartItemT) =>
  CartService.addCartItem(item),
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  ({ itemId, updateData }: { itemId: number; updateData: UpdateCartItemT }) =>
    CartService.updateCartItem(itemId, updateData),
);

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', (itemId: number) =>
  CartService.deleteCartItem(itemId),
);