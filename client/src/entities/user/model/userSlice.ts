import { createSlice } from '@reduxjs/toolkit';
import type { UserSliceT } from './types';
import { loginUser, logoutUser, refreshUser, signupUser } from './userThunks';

const initialState: UserSliceT = {
  user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(signupUser.rejected, (state, action) => {
            console.error(action.error);
            state.user = null;
        })

        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            console.error(action.error);
            state.user = null;
        })

        builder.addCase(refreshUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(refreshUser.rejected, (state, action) => {
            console.error(action.error);
            state.user = null;
        })

        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
        })
        builder.addCase(logoutUser.rejected, (_, action) => {
            console.error(action.error);
        })
    }
})

export default userSlice.reducer