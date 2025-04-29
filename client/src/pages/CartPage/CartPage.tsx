import { useEffect } from 'react';
import { removeItemLocally, updateItemLocally } from '../../entities/cart/model/cartSlice';
import { CartItemCard } from '../../entities/cart/ui/CartItemCard';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import syncCartWithServer from '../../entities/cart/api/syncCartWithServer';

export default function CartPage(): React.JSX.Element {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void syncCartWithServer(items, dispatch);
  }, []);

  const handleAdd = (productId: number): void => {
    console.log('Нажатие + для productId:', productId);
    const item = items.find((i) => i.productId === productId);
    console.log('Найден item:', item);

    if (!item) {
      console.warn('❗ item не найден в корзине!');
      return;
    }

    if (!item.product) {
      console.warn('❗ У item нет product!');
      return;
    }

    console.log('Проверка quantity и stock:', item.quantity, item.product.stock);

    if (item.quantity < item.product.stock) {
      console.log('✅ Можно добавить, отправляем updateItemLocally');
      dispatch(updateItemLocally({ productId, quantity: item.quantity + 1 }));
    } else {
      console.warn('🚫 Нельзя добавить, quantity >= stock');
    }
  };

  const handleRemove = (productId: number): void => {
    const item = items.find((i) => i.productId === productId);
    if (item) {
      if (item.quantity <= 1) {
        dispatch(removeItemLocally(productId));
      } else {
        dispatch(updateItemLocally({ productId, quantity: item.quantity - 1 }));
      }
    }
  };

  const total = items.reduce((acc, item) => {
    if (item.product && item.product.stock > 0) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Корзина</h1>

      {items.length === 0 ? (
        <div className="alert alert-info">Корзина пуста</div>
      ) : (
        <div className="row g-3">
          {items.map((item) => {
            const stock = item.product ? item.product.stock : 0;
            const isOutOfStock = stock === 0;

            return (
              <div className="col-12" key={item.id}>
                <CartItemCard
                  image={item.product?.images[0] ?? ''}
                  name={item.product?.name ?? 'Неизвестно'}
                  price={item.price}
                  quantity={item.quantity}
                  stock={stock}
                  add={() => handleAdd(item.productId)}
                  remove={() => handleRemove(item.productId)}
                  isOutOfStock={isOutOfStock}
                />
              </div>
            );
          })}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-4 text-end">
          <h4>Итого: {total.toLocaleString()} ₽</h4>
          <button className="btn btn-success mt-2">Оформить заказ</button>
        </div>
      )}
    </div>
  );
}
