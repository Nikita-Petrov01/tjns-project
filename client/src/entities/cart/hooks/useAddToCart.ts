import { useAppDispatch } from '../../../shared/lib/hooks';
import { useAuth } from '../../user/hooks/useAuth';
import { addItemLocally } from '../model/cartSlice';
import { addCartItem } from '../model/cartThunks';
import type { CartItemT } from '../model/cartTypes';

type UseAddToCartReturn = {
  addToCart: (product: { id: number; price: number }) => void;
}

export const useAddToCart = (): UseAddToCartReturn => {
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();

  const addToCart = (product: { id: number; price: number }): void => {
    if (isAuthenticated) {
      void dispatch(
        addCartItem({
          productId: product.id,
          quantity: 1,
          price: product.price,
        }),
      );
    } else {
      const localItem: CartItemT = {
        id: Date.now(),
        cartId: 0,
        productId: product.id,
        quantity: 1,
        price: product.price,
      };
      dispatch(addItemLocally(localItem));
    }
  };

  return { addToCart };
};
