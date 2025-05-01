import { useCartActions } from '../../entities/cart/hooks/useCartActions';
import { CartItemCard } from '../../entities/cart/ui/CartItemCard';



export default function CartPage(): React.JSX.Element {
  const { items, totalPrice, handleAdd, handleRemove, handleDelete } = useCartActions();


  console.log('🧾 Товары для отображения в корзине:', items);
  return (
    <div className="container py-4">
      <h1 className="mb-4">Корзина</h1>

      {items.length === 0 ? (
        <div className="alert alert-info">Корзина пуста</div>
      ) : (
        <>
          <div className="row g-3">
            {items.map((item) => (
              <div className="col-12" key={item.id}>
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
              </div>
            ))}
          </div>

          <div className="mt-4 text-end">
            <h4>Итого: {totalPrice.toLocaleString()} ₽</h4>
            <button className="btn btn-success mt-2">Оформить заказ</button>
          </div>
        </>
      )}
    </div>
  );
}
