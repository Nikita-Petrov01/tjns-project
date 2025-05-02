import { useCartActions } from '../../entities/cart/hooks/useCartActions';
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
import { useNavigate } from 'react-router';

export default function CartPage(): React.JSX.Element {
  const { items, totalPrice, handleAdd, handleRemove, handleDelete } = useCartActions();
  const navigate = useNavigate();
  console.log('🧾 Товары для отображения в корзине:', items);
  return (
    <div className="min-h-screen bg-[#E6F0FA] font-poppins py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-[#1A3C6D] mb-8"
          style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}
        >
          Корзина
        </h1>

        {items.length === 0 ? (
          <div className="bg-[#F1F5F9] text-[#1A3C6D] px-6 py-4 rounded-xl shadow-sm text-center">
            <p className="text-lg">Корзина пуста</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8">
              {items.map((item) => (
                <div key={item.id}>
                  <CartItemCard
                    image={item.product.images[0]}
                    name={item.product.name}
                    price={item.price}
                    quantity={item.quantity}
                    stock={item.product.stock}
                    add={() => handleAdd(item.productId)}
                    remove={() => handleRemove(item.productId)}
                    onDelete={() => handleDelete(item.productId)}
                    isOutOfStock={item.product.stock === 0}
                  />
                  <button
                    onClick={() => navigate(`/products/${item.id.toString()}`)}
                    className="text-[#1A3C6D]  hover:bg-[#D1E3F6] rounded px-2 py-1 transition-all duration-300"
                  >
                    Подробнее
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-end">
              <h4 className="text-xl font-bold text-[#1A3C6D] mb-4">
                Итого: {totalPrice.toLocaleString()} ₽
              </h4>
              <button className="bg-gradient-to-r from-[#1A3C6D] to-[#3B5A9A] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 transition-all duration-300">
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
