import { createAsyncThunk } from '@reduxjs/toolkit';
import Fuse from 'fuse.js';

export const performSearch = createAsyncThunk(
  'search/perform',
  async ({ query, data }, { rejectWithValue }) => {
    try {
      if (!query || query.length < 2) return [];

      const options = {
        keys: ['name', 'description', 'price'],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 2,
        ignoreLocation: true,
        shouldSort: true, 
      };

      const fuse = new Fuse(data, options);
      return fuse.search(query).map((item) => item.item);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
