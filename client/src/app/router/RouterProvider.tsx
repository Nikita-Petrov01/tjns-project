import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useAppDispatch } from '../../shared/lib/hooks';

import { refreshUser } from '../../entities/user/model/userThunks';

function RouterProvider(): React.JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route/>
    </Routes>
  );
}

export default RouterProvider;
