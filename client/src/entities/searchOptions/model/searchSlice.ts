import { createSlice } from '@reduxjs/toolkit';
import { performSearch } from './searchThunks';
import type { CategoryT } from './searchType';

export type SearchSliceT = {
  query: string;
  results: CategoryT[];
  suggestions: CategoryT[];
  history: string[];
  loading: boolean;
  error: string | null;
};

const initialState: SearchSliceT = {
  query: '',
  results: [],
  suggestions: [],
  history: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    suggestions: [],
    history: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    addToHistory: (state, action) => {
      if (action.payload && !state.history.includes(action.payload)) {
        state.history = [action.payload, ...state.history].slice(0, 10);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setQuery, addToHistory } = searchSlice.actions;
export default searchSlice.reducer;
