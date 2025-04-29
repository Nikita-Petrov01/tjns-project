import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../shared/api/axiosInstance';
import debounce from 'lodash.debounce';

export const searchItems = createAsyncThunk('search/searchItems', async (query: string) => {
  const response = await axiosInstance.get(`/search?q=${query}`);
  return response.data;
});

export const debouncedSearch = debounce((dispatch: any, query: string) => {
  if (query) {
    dispatch(searchItems(query));
  }
}, 1000);
