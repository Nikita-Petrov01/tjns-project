import { createSlice } from '@reduxjs/toolkit';
import { searchItems } from './searchThunks';

const initialState = {
  results: [],
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(searchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
