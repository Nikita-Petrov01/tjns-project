import React from 'react';
import { useAppDispatch } from '../../shared/lib/hooks';
import { newProductSchema } from '../../entities/products/model/schema';
import { create } from '../../entities/products/model/productThunk';

export default function CreatePage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const validatedData = newProductSchema.parse(data);
    void dispatch(create(validatedData));
  };

  return (
    <>
      <form>
        <div>name</div>
        <input type="text" name="name" />
        <div>description</div>
        <input type="text" name="description" />
        <div>image</div>
        <input type="text" name="image" />
        <div>price</div>
        <input type="text" name="price" />
        <button>Create</button>
      </form>
    </>
  );
}
