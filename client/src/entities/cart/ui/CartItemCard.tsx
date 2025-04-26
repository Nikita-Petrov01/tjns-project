import type { CartItemT } from '../model/cartTypes';
import React from 'react';

type CartItemCardProps = {
  item: CartItemT;
};

function CartItemCard({ item }: CartItemCardProps): React.JSX.Element {
  return (
    <div className="col-12">
      <div className="card p-3 shadow-sm">
        <h5>Товар #{item.productId}</h5>
        <p>Количество: {item.quantity}</p>
        <p>Цена за шт.: {item.price} ₽</p>
        <p>Общая сумма: {item.quantity * item.price} ₽</p>
      </div>
    </div>
  );
}

export default CartItemCard;
