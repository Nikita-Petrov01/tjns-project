import React from 'react'

type AddToCartButtonProps = {
    quantity: number,
    stock: number,
    add: () => void,
    remove: () => void
}

function AddToCartButton({ quantity, stock, add, remove }: AddToCartButtonProps): React.JSX.Element {
  const isOutOfStock = stock === 0;
  const isMaxReached = quantity >= stock;

  if (isOutOfStock) {
    return <span className="text-danger">Нет в наличии</span>;
  }

  return (
    <div className="d-flex align-items-center gap-2 flex-wrap">
      {quantity > 0 && (
        <>
          <button className="btn btn-outline-danger" onClick={remove} disabled={quantity <= 0}>
            -
          </button>
          <span>{quantity}</span>
        </>
      )}
      <button
        className="btn btn-outline-success"
        onClick={add}
        disabled={isMaxReached}
      >
        {quantity > 0 ? '+' : 'В корзину'}
      </button>

      {/* Добавляем надпись, если больше добавить нельзя */}
      {isMaxReached && (
        <span className="text-danger small">
          Максимальное количество товара
        </span>
      )}
    </div>
  );

  }

export default AddToCartButton