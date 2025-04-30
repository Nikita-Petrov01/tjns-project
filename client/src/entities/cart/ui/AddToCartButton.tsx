import React from 'react';

type AddToCartButtonProps = {
  quantity: number;
  stock: number;
  add: () => void;
  remove: () => void;
};

function AddToCartButton({ quantity, stock, add, remove }: AddToCartButtonProps): React.JSX.Element {
  const isUserFilledStock = quantity >= stock;

  if (stock === 0 || isUserFilledStock) {
    return (
      <div className="w-full py-2 px-4 border border-gray-300 text-gray-400 text-center rounded-full cursor-not-allowed">
        Товар закончился
      </div>
    );
  }

  if (quantity === 0) {
    return (
      <button
        className="flex items-center justify-center gap-2 w-full py-2 px-5 border border-gray-400 text-gray-600 rounded-full hover:border-black hover:text-black transition"
        onClick={add}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 1.293a1 1 0 00-.293.707V17a1 1 0 001 1h12a1 1 0 001-1v-2.586a1 1 0 00-.293-.707L17 13M9 21h6" />
        </svg>
        <span className="text-sm font-medium">В корзину</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition"
        onClick={remove}
      >
        –
      </button>
      <span className="text-lg font-medium">{quantity}</span>
      <button
        className="px-4 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-50 transition"
        onClick={add}
      >
        +
      </button>
    </div>
  );
}

export default AddToCartButton;
