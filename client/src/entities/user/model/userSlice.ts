import { createSlice } from '@reduxjs/toolkit';
import type { UserSliceT } from './types';
import { getAdmin, loginUser, logoutUser, refreshUser, signupAdmin, signupUser } from './userThunks';

const initialState: UserSliceT = {
  user: null,
  isRefreshLoading: false,
  admin: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setAdmin: (state, action) => {
      state.admin.push(action.payload);
    },
    },
    extraReducers(builder) {
      builder.addCase(signupAdmin.fulfilled, (_, action) => {
      console.log(action.payload);
    });
    builder.addCase(signupAdmin.rejected, (_, action) => {
      console.error(action.error);
    });

    builder.addCase(getAdmin.fulfilled, (state, action) => {
      state.admin = action.payload
    });
    builder.addCase(getAdmin.rejected, (_, action) => {
      console.error(action.error);
    });
      
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
            state.isRefreshLoading = false;
            state.user = action.payload;
        })
        builder.addCase(refreshUser.rejected, (state, action) => {
            state.isRefreshLoading = false;
            console.error(action.error);
            state.user = null;
        })
        builder.addCase(refreshUser.pending, (state) => {
            state.isRefreshLoading = true;
        })

        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
        })
        builder.addCase(logoutUser.rejected, (_, action) => {
            console.error(action.error);
        })
    }
})

export const { setAdmin } = userSlice.actions;

export default userSlice.reducer;
