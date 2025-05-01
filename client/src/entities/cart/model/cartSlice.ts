// import type { PayloadAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AddToCartT, CartItemT, CartSliceT, ProductForCartT } from './cartTypes';
import { addCartItem, deleteCartItem, getCart, getCartItems, updateCartItem } from './cartThunks';
import { toast } from 'react-toastify';
import type { RootState } from '../../../app/store';
// import {
//   addCartItem,
//   deleteCart,
//   deleteCartItem,
//   getCart,
//   getCartItems,
//   updateCartItem,
// } from './cartThunks';
// import { guestCartItemArraySchem } from './cartSchema';
// import type { GuestCartItemT } from './guestCartTypes';

const initialState: CartSliceT = {
  cart: null,
  items: [],
  guestItems: [],
  loading: false,
  error: null,
  hasMerged: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setHasMerged: (state) => {
      state.hasMerged = true;
    },
    loadGuestCart: (state) => {
      const data = localStorage.getItem('guestCart');
      console.log('💾 Загружаем guestCart из localStorage:', data);
      if (data) {
        try {
          state.guestItems = JSON.parse(data);
          console.log('✅ guestItems после загрузки:', state.guestItems);
        } catch (error) {
          localStorage.removeItem('guestCart');
          state.guestItems = [];
          toast.error('Ошибка при чтении гостевой корзины. Корзина очищена.');
        }
      } else {
        state.guestItems = [];
      }
    },
    addGuestItemToCart: (
      state,
      action: PayloadAction<AddToCartT & { product: ProductForCartT }>,
    ) => {
      console.log('👉 Редьюсер addGuestItemToCart получил payload:', action.payload);
      const existing = state.guestItems.find((i) => i.productId === action.payload.productId);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.guestItems.push({
          id: Date.now(),
          cartId: -1,
          productId: action.payload.productId,
          quantity: 1,
          price: action.payload.price,
          product: action.payload.product,
        });
      }
      localStorage.setItem('guestCart', JSON.stringify(state.guestItems));
    },

    updateGuestItemQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.guestItems.find((i) => i.productId === productId);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem('guestCart', JSON.stringify(state.guestItems));
      }
    },
    // addItemLocally(state, action: PayloadAction<GuestCartItemT>) {
    //   const existingItem = state.items.find((item) => item.productId === action.payload.productId);
    //   if (existingItem) {
    //     existingItem.quantity += action.payload.quantity;
    //   } else {
    //     state.items.push({
    //       id: Date.now(),
    //       cartId: 0,
    //       productId: action.payload.productId,
    //       quantity: action.payload.quantity,
    //       price: action.payload.price,
    //       addedAt: new Date().toISOString(),
    //       expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    //       product: {
    //         id: action.payload.productId,
    //         name: '', // можно поставить пусто
    //         description: '',
    //         images: [],
    //         price: action.payload.price,
    //         categoryId: 0,
    //         stock: action.payload.stock,
    //       },
    //     });
    //   }
    //   localStorage.setItem('guestCart', JSON.stringify(state.items));
    // },
    // updateItemLocally(state, action: PayloadAction<{ productId: number; quantity: number }>) {
    //   const item = state.items.find((i) => i.productId === action.payload.productId);
    //   if (item) {
    //     item.quantity = action.payload.quantity;
    //   }
    //   localStorage.setItem('guestCart', JSON.stringify(state.items));
    // },
    removeItemLocally(state, action: PayloadAction<number>) {
      const updatedItems = state.guestItems.filter((item) => item.productId !== action.payload);
      state.guestItems = updatedItems;
      localStorage.setItem('guestCart', JSON.stringify(updatedItems));
    },
    clearGuestCart(state) {
      state.guestItems = [];
      localStorage.removeItem('guestCart');
    },
    // loadFromLocalStorage(state) {
    //   const savedCart = localStorage.getItem('guestCart');
    //   if (savedCart) {
    //     state.items = guestCartItemArraySchem.parse(JSON.parse(savedCart));
    //   }
    // },
    // clearCartLocally(state) {
    //   state.cart = null;
    //   state.items = [];
    //   localStorage.removeItem('guestCart');
    // },
    // setCartItems(state, action: PayloadAction<CartItemT[]>) {
    //   state.items = action.payload
    // }
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

    // // Получение элементов корзины
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

    // // Добавление элемента
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

    // // Обновление элемента
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCartItem.fulfilled, (state, action: PayloadAction<CartItemT>) => {
      const updatedItem = action.payload;
      const index = state.items.findIndex((i) => i.id === updatedItem.id);
      if (index !== -1) {
        state.items[index] = updatedItem;
      }
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка при обновлении элемента';

      if (action.error.message?.includes('Товар не найден')) {
        const { itemId } = action.meta.arg;
        state.items = state.items.filter((i) => i.id !== itemId);
        toast.error('Этот товар больше не доступен в корзине');
      } else {
        toast.error(state.error);
      }
      console.error(action.error);
    });

    // // Удаление элемента
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

    // // Очистка корзины
    // builder.addCase(deleteCart.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(deleteCart.fulfilled, (state) => {
    //   state.loading = false;
    //   state.cart = null;
    //   state.items = [];
    // });
    // builder.addCase(deleteCart.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message ?? 'Ошибка при удалении корзины';
    //   console.error(action.error);
    // });
  },
});

export const {
  loadGuestCart,
  updateGuestItemQuantity,
  clearGuestCart,
  setHasMerged,
  addGuestItemToCart,
  // setCartItems,
  // addItemLocally,
  // updateItemLocally,
  removeItemLocally,
  // loadFromLocalStorage,
  // clearCartLocally,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectIsInCart = (state: RootState, productId: number): boolean => {
  const { user } = state.user;
  if (user) {
    return state.cart.items.some((item) => item.productId === productId);
  }
  return state.cart.guestItems.some((item) => item.productId === productId);
};
