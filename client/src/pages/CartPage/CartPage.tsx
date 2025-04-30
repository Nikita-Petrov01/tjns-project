import { useEffect } from 'react';
import {
  loadFromLocalStorage,
  removeItemLocally,
  setCartItems,
  updateItemLocally,
} from '../../entities/cart/model/cartSlice';
import { CartItemCard } from '../../entities/cart/ui/CartItemCard';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import {
  checkCartItems,
  deleteCartItem,
  getCart,
  getCartItems,
  updateCartItem,
} from '../../entities/cart/model/cartThunks';
import { toast } from 'react-toastify';
import syncCartWithServer from '../../entities/cart/api/syncCartWithServer';

export default function CartPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const cart = useAppSelector((state) => state.cart);
  const isRefreshLoading = useAppSelector((state) => state.user.isRefreshLoading);
  console.log(cart, '???????????????????????????????????');
  console.log(items, '---------------------------------');
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (isRefreshLoading) return;
    if (user) {
      void dispatch(getCart())
        .unwrap()
        .then(() => dispatch(getCartItems()))
        .catch(console.error);
    } else {
      dispatch(loadFromLocalStorage());
    }
  }, [dispatch, user, isRefreshLoading]);

  useEffect(() => {
    if (!user) {
      void syncCartWithServer(items, dispatch);
    }
  }, []);

  const handleCheckout = async (): Promise<void> => {
    console.log('🛒 handleCheckout вызван');
    try {
      const cartItemsToCheck = items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
      console.log('🛒 Отправляем на проверку:', cartItemsToCheck);

      const result = await dispatch(checkCartItems(cartItemsToCheck)).unwrap();
      console.log('🛒 Ответ сервера:', result);

      const changedItems = result.updatedItems.filter((serverItem) => {
        const localItem = items.find((i) => i.productId === serverItem.productId);
        return localItem && localItem.quantity > serverItem.availableStock;
      });

      if (changedItems.length > 0) {
        toast.info('Количество некоторых товаров изменилось! Корзина обновлена.');

        const updatedItems = items.map((item) => {
          const serverItem = result.updatedItems.find((si) => si.productId === item.productId);
          if (!serverItem) return item;

          return {
            ...item,
            quantity: Math.min(item.quantity, serverItem.availableStock),
            product: item.product
              ? {
                  ...item.product,
                  stock: serverItem.availableStock,
                }
              : undefined,
          };
        });
        dispatch(setCartItems(updatedItems));
      }
    } catch (error) {
      console.error('Ошибка при проверке корзины', error);
      toast.error('Ошибка проверки корзины. Попробуйте позже.');
    }
  };

  const handleAdd = (productId: number): void => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;

    const stock = item.product?.stock ?? 0;
    if (item.quantity >= stock) return;
    if (user) {
      void dispatch(
        updateCartItem({ itemId: item.id, updateData: { quantity: item.quantity + 1 } }),
      );
    } else {
      dispatch(updateItemLocally({ productId, quantity: item.quantity + 1 }));
    }
  };

  const handleDelete = (productId: number): void => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;

    if (user) {
      void dispatch(deleteCartItem(item.id));
    } else {
      dispatch(removeItemLocally(productId));
    }
  };

  const handleRemove = (productId: number): void => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;

    if (item.quantity <= 1) {
      handleDelete(productId);
    } else if (user) {
      void dispatch(
        updateCartItem({ itemId: item.id, updateData: { quantity: item.quantity - 1 } }),
      );
    } else {
      dispatch(updateItemLocally({ productId, quantity: item.quantity - 1 }));
    }
  };

  const total = items.reduce((acc, item) => {
    const stock = item.product?.stock ?? 0;
    if (stock > 0) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  if (isRefreshLoading) {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Корзина</h1>
        <div className="alert alert-info">Загрузка</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Корзина</h1>

      {items.length === 0 ? (
        <div className="alert alert-info">Корзина пуста</div>
      ) : (
        <div className="row g-3">
          {items.map((item) => {
            const product = item.product ?? {
              name: 'Неизвестно',
              images: [''],
              price: item.price,
              stock: 0,
              description: '',
              categoryId: 0,
            };
            const isOutOfStock = product.stock === 0;

            return (
              <div className="col-12" key={item.id}>
                <CartItemCard
                  image={product.images[0]}
                  name={product.name}
                  price={item.price}
                  quantity={item.quantity}
                  stock={product.stock}
                  add={() => handleAdd(item.productId)}
                  remove={() => handleRemove(item.productId)}
                  onDelete={() => handleDelete(item.productId)}
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
          <button className="btn btn-success mt-2" onClick={handleCheckout}>Оформить заказ</button>
        </div>
      )}
    </div>
  );
}
