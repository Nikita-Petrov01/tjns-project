import React, { useEffect } from 'react'
import { useAuth } from '../entities/user/hooks/useAuth'
import { useAppDispatch, useAppSelector } from '../shared/lib/hooks';
import { getCartItems } from '../entities/cart/model/cartThunks';
import CartItemCard from '../entities/cart/ui/CartItemCard';

function CartPage(): React.JSX.Element {
    const {isAuthenticated} = useAuth();
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cart.items);

    useEffect(() => {
        if (isAuthenticated) {
            void dispatch(getCartItems());
        }
    }, [isAuthenticated, dispatch]);

    if (!items.length) {
        return <div className="container mt-5"><h3>Ваша корзина пуста</h3></div>
    }
  return (
    <div className="container mt-5">
      <h3 className="mb-4">Корзина</h3>
      <div className="row g-3">
        {items.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default CartPage