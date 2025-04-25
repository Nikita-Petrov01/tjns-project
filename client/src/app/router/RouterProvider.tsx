import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useAppDispatch } from '../../shared/lib/hooks';
import { refreshUser } from '../../entities/user/model/userThunks';
import MainPage from '../../pages/Main/MainPage';
import CreatePage from '../../pages/CreatePage/CreatePage';
import UpdatePage from '../../pages/UpdatePage/UpdatePage';
import Layout from '../../pages/Layout/Layout';
import CategoryPage from '../../pages/CategoryPage/CategoryPage';
import CategoryUpdate from '../../features/categoryOptions/categoryUpdate/ui/CategoryUpdate';
import CategoryCreate from '../../features/categoryOptions/categoryCreate/ui/CategoryCreate';
import SignupPage from '../../pages/Signup/SignupPage';
import LoginPage from '../../pages/Login/LoginPage';

function RouterProvider(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<MainPage />} />
      <Route path="/products/create" element={<CreatePage />} />
      <Route path="/products/edit/:id" element={<UpdatePage />} />

      <Route element={<Layout />}>
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/categories/create" element={<CategoryCreate />} />
        <Route path="/categories/:id/edit" element={<CategoryUpdate />} />
      </Route>
    </Routes>
  );
}

export default RouterProvider;
