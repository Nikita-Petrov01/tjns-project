import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getAdmin, refreshUser } from '../../entities/user/model/userThunks';
import MainPage from '../../pages/Main/MainPage';
import CreatePage from '../../pages/CreatePage/CreatePage';
import UpdatePage from '../../pages/UpdatePage/UpdatePage';
import CategoryPage from '../../pages/CategoryPage/CategoryPage';
import CategoryUpdate from '../../features/categoryOptions/categoryUpdate/ui/CategoryUpdate';
import CategoryCreate from '../../features/categoryOptions/categoryCreate/ui/CategoryCreate';
import SignupPage from '../../pages/Signup/SignupPage';
import LoginPage from '../../pages/Login/LoginPage';
import Layout from '../../pages/Layout/Layout';
import OneProductPage from '../../pages/OneProductPage/OneProductPage';
import FilteredCardList from '../../features/FilteredCardList/FilteredCardList';
import CartPage from '../../pages/CartPage/CartPage';
import SuperAdminPage from '../../pages/SuperAdminPage/SuperAdminPage';
import ProtectedRoute from '../../shared/ui/ProtectedRoute';
import FavoritePage from '../../pages/FavoritePage/FavoritePage';

function RouterProvider(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/products/:id" element={<OneProductPage />} />
        <Route path="categories/:id" element={<FilteredCardList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritePage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/products/create" element={<CreatePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/admin" element={<SuperAdminPage />} />
          <Route path="/categories/create" element={<CategoryCreate />} />
          <Route path="/categories/:id/edit" element={<CategoryUpdate />} />
          <Route path="/products/edit/:id" element={<UpdatePage />} />
        </Route>

        <Route path="*" element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default RouterProvider;
