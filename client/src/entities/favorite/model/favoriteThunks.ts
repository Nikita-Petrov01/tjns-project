import { createAsyncThunk } from '@reduxjs/toolkit';
import FavoriteService from '../api/favoriteService';
import type { FavoriteT, NewFavoriteT } from './favoriteType';

export const getFavorites = createAsyncThunk('favorite/getFavorites', async () => {
  const allFavorites = await FavoriteService.getFavorites();
  return allFavorites;
});

export const createFavorite = createAsyncThunk(
  'favorite/createFavorite',
  async (data: NewFavoriteT) => {
    const newFavorite = await FavoriteService.createFavorite(data);
    return newFavorite;
  },
);

export const deleteFavorite = createAsyncThunk(
  'favorite/deleteFavorite',
  async (id: FavoriteT['id']) => {
    await FavoriteService.deleteFavorite(id);
  },
);
