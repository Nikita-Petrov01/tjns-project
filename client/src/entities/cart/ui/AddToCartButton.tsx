import React from 'react'

type AddToCartButtonProps = {
    quantity: number,
    stock: number,
    add: () => void,
    remove: () => void
}

function AddToCartButton({ quantity, stock, add, remove }: AddToCartButtonProps): React.JSX.Element {
    const isUserFilledStock = quantity >= stock; // ⚡ Пользователь уже набрал максимум товаров

  if (stock === 0) {
    return (
      <div className="btn btn-secondary py-2 flex-grow-1 disabled">
        Товар закончился
      </div>
    );
  }

  if (isUserFilledStock) {
    return (
      <div className="btn btn-secondary py-2 flex-grow-1 disabled">
        Товар закончился
      </div>
    );
  }

  if (quantity === 0) {
    return (
      <button className="btn btn-danger py-2 flex-grow-1" onClick={add}>
        В корзину
      </button>
    );
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <button className="btn btn-outline-danger" onClick={remove}>
        -
      </button>
      <span className="fs-4">{quantity}</span>
      <button className="btn btn-outline-success" onClick={add}>
        +
      </button>
    </div>
  );
  }

export default AddToCartButton