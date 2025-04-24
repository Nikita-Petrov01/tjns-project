import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useAppDispatch } from '../../shared/lib/hooks';
import { refreshUser } from '../../entities/user/model/userThunks';
import CategoryPage from '../../pages/CategoryPage/CategoryPage';
import CategoryUpdate from '../../features/categoryOptions/categoryUpdate/ui/CategoryUpdate';
import CategoryCreate from '../../features/categoryOptions/categoryCreate/ui/CategoryCreate';
import Layout from '../../pages/Layout/Layout';

function RouterProvider(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/categories/create" element={<CategoryCreate />} />
        <Route path="/categories/:id/edit" element={<CategoryUpdate />} />
      </Route>
    </Routes>
  );
}

export default RouterProvider;
