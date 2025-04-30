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
import syncCartWithServer from '../../entities/cart/api/syncCartWithServer';
import { store } from '../../app/store';
import { toast } from 'react-toastify';
import type { CartItemT } from '../../entities/cart/model/cartTypes';
import { z } from 'zod';
import { zip } from 'lodash';

export default function CartPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const isRefreshLoading = useAppSelector((state) => state.user.isRefreshLoading);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (isRefreshLoading) return;
    if (user) {
      void dispatch(getCart())
        .unwrap()
        .then(() => dispatch(getCartItems()))
        .then(() => {
          const currentItems = store.getState().cart.items;

          const cartItemsToCheck = currentItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          }));

          return dispatch(checkCartItems(cartItemsToCheck))
            .unwrap()
            .then((result) => {
              const changedItems = result.updatedItems.filter((serverItem) => {
                const localItem = currentItems.find((i) => i.productId === serverItem.productId);
                console.log('inside filter', localItem, serverItem.availableStock);
                return localItem && localItem.quantity > serverItem.availableStock;
              });

              if (changedItems.length > 0) {
                toast.info('Некоторые товары были изменены. Корзина обновлена.');
                const updatedItems = currentItems.map((item) => {
                  const serverItem = result.updatedItems.find(
                    (s) => s.productId === item.productId,
                  );
                  if (!serverItem) return item;

                  return {
                    ...item,
                    quantity: Math.min(item.quantity, serverItem.availableStock),
                    product: item.product
                      ? { ...item.product, stock: serverItem.availableStock }
                      : undefined,
                  };
                });
                dispatch(setCartItems(updatedItems));
              }
            });
        })
        .catch(console.error);
    } else {
      dispatch(loadFromLocalStorage());

      const localCartRaw = localStorage.getItem('guestCart');
      if (!localCartRaw) return;

      const localCartItems = JSON.parse(localCartRaw) as CartItemT[];

      const cartItemsToCheck = localCartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      void dispatch(checkCartItems(cartItemsToCheck))
        .unwrap()
        .then((result) => {
          const changedItems = result.updatedItems.filter((serverItem) => {
            const localItem = localCartItems.find((i) => i.productId === serverItem.productId);
            return localItem && localItem.quantity > serverItem.availableStock;
          });

          if (changedItems.length > 0) {
            toast.info('Некоторые товары были изменены. Корзина обновлена.');

            const updatedItems = localCartItems.map((item) => {
              const serverItem = result.updatedItems.find((s) => s.productId === item.productId);
              if (!serverItem) return item;

              return {
                ...item,
                quantity: Math.min(item.quantity, serverItem.availableStock),
                product: item.product
                  ? {
                      id: item.product.id,
                      name: item.product.name,
                      description: item.product.description,
                      images: item.product.images,
                      price: item.product.price, // ⬅ обязательно!
                      categoryId: item.product.categoryId,
                      stock: serverItem.availableStock,
                    }
                  : undefined,
              };
            });
            localStorage.setItem('guestCart', JSON.stringify(updatedItems));
            dispatch(setCartItems(updatedItems));
          }
        })
        .catch(console.error);
    }
  }, [dispatch, user, isRefreshLoading]);

  useEffect(() => {
    if (!user) {
      void syncCartWithServer(items, dispatch);
    }
  }, []);

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
          <button
            style={{
              position: 'absolute',
              top: '50%',
              right: '50%',
              zIndex: '9999',
              width: '50px',
              height: '50px',
            }}
            onClick={() =>
              void dispatch(updateCartItem({ itemId: items[0].id, updateData: { quantity: 100 } }))
            }
          >
            ADD
          </button>
          <h4>Итого: {total.toLocaleString()} ₽</h4>
          <button className="btn btn-success mt-2">Офить заказ</button>
        </div>
      )}
    </div>
  );
}
