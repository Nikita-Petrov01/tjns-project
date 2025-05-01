import React, { useEffect, useState } from 'react';
import { getOneProduct, update } from '../../entities/products/model/productThunk';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { useNavigate, useParams } from 'react-router';

export default function UpdatePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [files, setFiles] = useState<File[]>([]);
  const [oldImages, setOldImages] = useState<string[]>([]);

  const product = useAppSelector((state) => state.products.product);
  const loading = useAppSelector((state) => state.products.loading);

  useEffect(() => {
    void dispatch(getOneProduct(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images) {
      setOldImages(product.images);
    }
  }, [product]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newProduct = {
      id: Number(id),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      categoryId: Number(formData.get('categoryId')),
      brand: formData.get('brand') as string,
      stock: Number(formData.get('stock')),
      oldImages, // старые изображения (не удалённые)
      files: files.length > 0 ? files : [], // добавляемые новые
    };

    void dispatch(update(newProduct));
    void navigate(`/products/${newProduct.id}`);
  };

  const handleRemoveOldImage = (imgUrl: string) => {
    setOldImages((prev) => prev.filter((url) => url !== imgUrl));
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
              {
                label: 'Описание',
                name: 'description',
                defaultValue: product.description,
                type: 'text',
              },
              { label: 'Цена', name: 'price', defaultValue: product.price, type: 'number' },
              {
                label: 'Категория (ID)',
                name: 'categoryId',
                defaultValue: product.categoryId,
                type: 'number',
              },
              { label: 'Бренд', name: 'brand', defaultValue: product.brand, type: 'text' },
              {
                label: 'Количество на складе',
                name: 'stock',
                defaultValue: product.stock,
                type: 'number',
              },
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

            {/* Старые изображения */}
            {oldImages.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-[#182628]">Старые изображения:</p>
                <div className="flex flex-wrap gap-4">
                  {oldImages.map((url) => (
                    <div key={url} className="relative">
                      <img
                        src={url}
                        alt="Старое изображение"
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveOldImage(url)}
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Новые изображения */}
            <div>
              <label className="block mb-1 text-sm font-medium text-[#182628]" htmlFor="images">
                Новые изображения (если нужно заменить)
              </label>
              <input
                id="images"
                name="images"
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-[#3B945E] file:text-white file:font-semibold hover:file:bg-[#57BA98] transition"
              />
            </div>

            {oldImages.map((img, i) => (
              <input key={i} type="hidden" name="oldImages" value={img} />
            ))}

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
