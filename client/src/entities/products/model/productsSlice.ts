import { createSlice } from '@reduxjs/toolkit';
import type { ProductSliceT } from './types';
import { create, deleteById, getById, getProducts, update } from './productThunk';

const initialState: ProductSliceT = {
  products: [],
  loading: false,
  product: null,
};

export const companySlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Все продукты
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      console.error(action.error);
    });
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });

    // По id
    builder.addCase(getById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getById.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      console.error(action.error);
    });
    builder.addCase(getById.pending, (state) => {
      state.loading = true;
    });

    // удаление
    builder.addCase(deleteById.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter((product) => product.id !== action.payload);
    });
    builder.addCase(deleteById.rejected, (state, action) => {
      state.loading = false;
      console.error(action.error);
    });
    builder.addCase(deleteById.pending, (state) => {
      state.loading = true;
    });

    // добавление
    builder.addCase(create.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    });
    builder.addCase(create.rejected, (state, action) => {
      state.loading = false;
      console.error(action.error);
    });
    builder.addCase(create.pending, (state) => {
      state.loading = true;
    });

    // изменение
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product,
      );
    });
    builder.addCase(update.rejected, (state, action) => {
      state.loading = false;
      console.error(action.error);
    });
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = companySlice.actions;

export default companySlice.reducer;
