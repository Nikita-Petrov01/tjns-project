import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserFormT, UserLoginFormT } from './types';
import userService from '../api/userService';
import { getCartItems, transferGuestCartToServer } from '../../cart/model/cartThunks';

export const signupUser = createAsyncThunk('user/signupUser', (data: UserFormT) =>
  userService.signupUser(data),
);

export const loginUser = createAsyncThunk('user/loginUser', (data: UserLoginFormT) =>
  userService.loginUser(data),
);

export const refreshUser = createAsyncThunk('user/refreshUser', () =>
  userService.refreshUser(),
);

export const logoutUser = createAsyncThunk('user/logoutUser', () =>
  userService.logoutUser(),
);

export const signupUserThunk = createAsyncThunk('user/signupUserThunk', async (data: UserFormT, { dispatch }) => {
  const user = await dispatch(signupUser(data)).unwrap();
  await dispatch(transferGuestCartToServer());
  await dispatch(getCartItems());
  return user;
})

export const loginUserThunk = createAsyncThunk('user/loginUserThunk', async (data: UserLoginFormT, { dispatch }) => {
  const user = await dispatch(loginUser(data)).unwrap();
  await dispatch(transferGuestCartToServer());
  await dispatch(getCartItems());
  return user;
});