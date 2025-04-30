import React, { useState } from 'react';

type SortType = 'none' | 'rating-asc' | 'rating-desc' | 'price-asc' | 'price-desc';

type ProductSortButtonsProps = {
  sortType: SortType;
  onSortChange: (sortType: SortType) => void;
};

export default function ProductSortButtons({
  sortType,
  onSortChange,
}: ProductSortButtonsProps): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const sortOptions = [
    { label: 'Без сортировки', value: 'none' },
    { label: 'По рейтингу ↑', value: 'rating-asc' },
    { label: 'По рейтингу ↓', value: 'rating-desc' },
    { label: 'По цене ↑', value: 'price-asc' },
    { label: 'По цене ↓', value: 'price-desc' },
  ];

  return (
    <div className="relative inline-block text-left my-6">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
      >
        Сортировать: {sortOptions.find((o) => o.value === sortType)?.label}
        <svg
          className="ml-2 -mr-1 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value as SortType);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm transition ${
                  sortType === option.value
                    ? 'bg-gray-200 text-gray-900 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
