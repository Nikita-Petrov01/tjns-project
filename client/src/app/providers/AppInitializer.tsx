import { useEffect } from 'react';
import { useAuth } from '../../entities/user/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { getCart, transferGuestCartToServer } from '../../entities/cart/model/cartThunks';
import { loadFromLocalStorage } from '../../entities/cart/model/cartSlice';
import { refreshUser } from '../../entities/user/model/userThunks';
import GlobalLoader from '../../shared/ui/GlobalLoader/GlobalLoader';

export const AppInitializer = (): null => {
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const isRefreshLoading = useAppSelector((state) => state.user.isRefreshLoading);

  useEffect(() => {
    void dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isRefreshLoading) {
      if (isAuthenticated) {
      void dispatch(getCart());
      void dispatch(transferGuestCartToServer());
    } else {
      dispatch(loadFromLocalStorage());
    }
    }
    
  }, [isRefreshLoading, isAuthenticated, dispatch]);

  if (isRefreshLoading) {
    return <GlobalLoader/>
  }

  return null;
};
