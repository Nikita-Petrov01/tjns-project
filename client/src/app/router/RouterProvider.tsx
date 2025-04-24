import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useAppDispatch } from '../../shared/lib/hooks';

import { refreshUser } from '../../entities/user/model/userThunks';

import SignupPage from '../../pages/Signup/SignupPage';

import LoginPage from '../../pages/Login/LoginPage';

function RouterProvider(): React.JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/singup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage/>} />
    </Routes>
  );
}

export default RouterProvider;
