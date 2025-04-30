import React from 'react';
import { useAppDispatch } from '../../shared/lib/hooks';
import { newProductSchema } from '../../entities/products/model/schema';
import { create } from '../../entities/products/model/productThunk';

export default function CreatePage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const validatedData = newProductSchema.parse({
      ...data,
      images: [data.images],
      price: Number(data.price),
      categoryId: Number(data.categoryId),
      stock: Number(data.stock),
    });
    void dispatch(create(validatedData));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>name</div>
        <input type="text" name="name" />
        <div>description</div>
        <input type="text" name="description" />
        <div>image</div>
        <input type="text" name="images" />
        <div>price</div>
        <input type="number" name="price" />
        <div>categoryId</div>
        <input type="text" name="categoryId" />
        <div>brand</div>
        <input type="text" name="brand" />
        <div>value</div>
        <input type="number" name="stock" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
