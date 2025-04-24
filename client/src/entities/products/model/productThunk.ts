import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductsService from '../api/ProductsService';
import type { ProductT } from './types';

export const getProducts = createAsyncThunk('products/getProducts', async () =>
  ProductsService.getProducts(),
);

export const getById = createAsyncThunk('products/getById', async (id: ProductT['id']) =>
  ProductsService.getById(id),
);

export const deleteById = createAsyncThunk(
  'products/deleteById',
  async (id: number): Promise<ProductT['id']> => {
    await ProductsService.deleteById(id);
    return id;
  },
);

export const create = createAsyncThunk('products/create', async (product: ProductT) =>
  ProductsService.create(product),
);

export const update = createAsyncThunk('products/update', async (product: ProductT) =>
  ProductsService.update(product),
);
