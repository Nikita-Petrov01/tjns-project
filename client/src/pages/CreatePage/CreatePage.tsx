import React, { useState } from 'react';
import { useAppDispatch } from '../../shared/lib/hooks';
import { create } from '../../entities/products/model/productThunk';

export default function CreatePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const product = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      categoryId: Number(formData.get('categoryId')),
      brand: formData.get('brand') as string,
      stock: Number(formData.get('stock')),
      files: formData.getAll('images') as File[],
    };

    void dispatch(create(product));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4f8] to-[#d9e9e2] px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-[#3B945E]">Добавить товар</h2>

        {[
          { label: 'Название', name: 'name', type: 'text' },
          { label: 'Описание', name: 'description', type: 'text' },
          { label: 'Цена', name: 'price', type: 'number' },
          { label: 'Категория (ID)', name: 'categoryId', type: 'number' },
          { label: 'Бренд', name: 'brand', type: 'text' },
          { label: 'Количество на складе', name: 'stock', type: 'number' },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block mb-1 text-sm font-medium text-[#182628]" htmlFor={name}>
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              required
              className="w-full px-5 py-3 rounded-xl bg-[#E0F2EF] text-[#182628] placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#65CCB8]"
              placeholder={`Введите ${label.toLowerCase()}`}
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 text-sm font-medium text-[#182628]" htmlFor="images">
            Изображения
          </label>
          <input
            id="images"
            name="images"
            type="file"
            multiple
            className="w-full file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-[#3B945E] file:text-white file:font-semibold hover:file:bg-[#57BA98] transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#3B945E] text-white font-bold text-lg rounded-full hover:bg-[#57BA98] transition duration-300 shadow-md"
        >
          Сохранить товар
        </button>
      </form>
    </div>
  );
}
