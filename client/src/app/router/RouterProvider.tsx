import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useAppDispatch } from '../../shared/lib/hooks';

import { refreshUser } from '../../entities/user/model/userThunks';
import MainPage from '../../pages/Main/MainPage';
import CreatePage from '../../pages/CreatePage/CreatePage';
import UpdatePage from '../../pages/UpdatePage/UpdatePage';

function RouterProvider(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/products/create" element={<CreatePage />} />
      <Route path="/products/edit/:id" element={<UpdatePage />} />
    </Routes>
  );
}

export default RouterProvider;
