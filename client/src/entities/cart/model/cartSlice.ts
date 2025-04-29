import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CartItemT, CartSliceT } from './cartTypes';
import {
  addCartItem,
  deleteCart,
  deleteCartItem,
  getCart,
  getCartItems,
  updateCartItem,
} from './cartThunks';
import { guestCartItemArraySchem } from './cartSchema';
import type { GuestCartItemT } from './guestCartTypes';

const initialState: CartSliceT = {
  cart: null,
  items: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemLocally(state, action: PayloadAction<GuestCartItemT>) {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          id: Date.now(),
          cartId: 0,
          productId: action.payload.productId,
          quantity: action.payload.quantity,
          price: action.payload.price,
          addedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          product: {
            id: action.payload.productId,
            name: '', // можно поставить пусто
            description: '',
            images: [],
            price: action.payload.price,
            categoryId: 0,
            stock: action.payload.stock,
          },
        });
      }
      localStorage.setItem('guestCart', JSON.stringify(state.items));
    },
    updateItemLocally(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const item = state.items.find((i) => i.productId === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem('guestCart', JSON.stringify(state.items));
    },
    removeItemLocally(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.productId !== action.payload);
      localStorage.setItem('guestCart', JSON.stringify(state.items));
    },
    loadFromLocalStorage(state) {
      const savedCart = localStorage.getItem('guestCart');
      if (savedCart) {
        state.items = guestCartItemArraySchem.parse(JSON.parse(savedCart));
      }
    },
    clearCartLocally(state) {
      state.cart = null;
      state.items = [];
      localStorage.removeItem('guestCart');
    },
    setCartItems(state, action: PayloadAction<CartItemT[]>) {
      state.items = action.payload
    }
  },
  extraReducers(builder) {
    // Получение корзины
    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при получении корзины';
    });

    // Получение элементов корзины
    builder.addCase(getCartItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action: PayloadAction<CartItemT[]>) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при получении элементов корзины';
      console.error(action.error);
    });

    // Добавление элемента
    builder.addCase(addCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCartItem.fulfilled, (state, action: PayloadAction<CartItemT>) => {
      state.loading = false;
      state.items.push(action.payload);
    });
    builder.addCase(addCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при добавлении элемента';
      console.error(action.error);
    });

    // Обновление элемента
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCartItem.fulfilled, (state, action: PayloadAction<CartItemT>) => {
      state.loading = false;
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при обновлении элемента';
      console.error(action.error);
    });

    // Удаление элемента
    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.items = state.items.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при удалении элемента';
      console.error(action.error);
    });

    // Очистка корзины
    builder.addCase(deleteCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCart.fulfilled, (state) => {
      state.loading = false;
      state.cart = null;
      state.items = [];
    });
    builder.addCase(deleteCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при удалении корзины';
      console.error(action.error);
    });
  },
});

export const {
  setCartItems,
  addItemLocally,
  updateItemLocally,
  removeItemLocally,
  loadFromLocalStorage,
  clearCartLocally,
} = cartSlice.actions;

export default cartSlice.reducer;
