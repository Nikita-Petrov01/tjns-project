import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../entities/user/model/userSlice';
import productsReducer from '../entities/products/model/productsSlice';
import { categorySlice } from '../entities/category/model/categorySlice';
// import searchReducer from '../entities/searchOptions/model/searchSlice';
import reviewReducer from '../entities/review/model/reviewSlice';
import favoriteReduser from '../entities/favorite/model/favoriteSlice';
import { searchSlice } from '../entities/searchOptions/model/searchSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    categories: categorySlice.reducer,
    search: searchSlice.reducer,
    rewiew: reviewReducer,
    favorites: favoriteReduser,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
