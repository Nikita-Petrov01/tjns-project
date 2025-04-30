import React, { useEffect, useState } from 'react';
import { getOneProduct, update } from '../../entities/products/model/productThunk';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { useNavigate, useParams } from 'react-router';

export default function UpdatePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    void dispatch(getOneProduct(Number(id)));
  }, [dispatch, id]);

  const product = useAppSelector((state) => state.products.product);
  const loading = useAppSelector((state) => state.products.loading);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const product = {
      id: Number(id),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      categoryId: Number(formData.get('categoryId')),
      brand: formData.get('brand') as string,
      stock: Number(formData.get('stock')),
      oldImages: (formData.get('oldImages') as string)?.split(','),
      files: formData.getAll('images') as File[],
    };

    void dispatch(update(product));
  };

  if (loading) return <div className="text-center mt-20 text-lg">Загрузка...</div>;

  return (
    <>
      {product && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4f8] to-[#d9e9e2] px-6 py-12">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 space-y-6"
          >
            <h2 className="text-3xl font-bold text-center text-[#3B945E]">Редактировать товар</h2>

            {[
              { label: 'Название', name: 'name', defaultValue: product.name, type: 'text' },
              { label: 'Описание', name: 'description', defaultValue: product.description, type: 'text' },
              { label: 'Цена', name: 'price', defaultValue: product.price, type: 'number' },
              { label: 'Категория (ID)', name: 'categoryId', defaultValue: product.categoryId, type: 'number' },
              { label: 'Бренд', name: 'brand', defaultValue: product.brand, type: 'text' },
              { label: 'Количество на складе', name: 'stock', defaultValue: product.stock, type: 'number' },
            ].map(({ label, name, defaultValue, type }) => (
              <div key={name}>
                <label className="block mb-1 text-sm font-medium text-[#182628]" htmlFor={name}>
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  defaultValue={defaultValue}
                  required
                  className="w-full px-5 py-3 rounded-xl bg-[#E0F2EF] text-[#182628] placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#65CCB8]"
                />
              </div>
            ))}

            <div>
              <label className="block mb-1 text-sm font-medium text-[#182628]" htmlFor="images">
                Изображения (добавить новые или оставить старые)
              </label>
              <input
                id="images"
                name="images"
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-[#3B945E] file:text-white file:font-semibold hover:file:bg-[#57BA98] transition"
              />
              <input type="hidden" name="oldImages" value={product.images?.join(',')} />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#3B945E] text-white font-bold text-lg rounded-full hover:bg-[#57BA98] transition duration-300 shadow-md"
            >
              Сохранить изменения
            </button>
          </form>
        </div>
      )}
    </>
  );
}
