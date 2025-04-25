import React, { useEffect } from 'react';
import { productSchema } from '../../entities/products/model/schema';
import { getOneProduct, update } from '../../entities/products/model/productThunk';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { useNavigate, useParams } from 'react-router';

export default function UpdatePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    void dispatch(getOneProduct(Number(id)));
  }, [dispatch, id]);

  const product = useAppSelector((state) => state.products.product);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const imgArray = data.images;
    const validatedData = productSchema.parse({
      ...data,
      id: Number(id),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      images: imgArray.split(','),
      price: Number(data.price),
      categoryId: Number(data.categoryId),
    });
    console.log(product);
    void dispatch(update(validatedData));
  };

  const loading = useAppSelector((state) => state.products.loading);

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>name</div>
          <input type="text" defaultValue={product?.name} name="name" />
          <div>description</div>
          <input type="text" defaultValue={product?.description} name="description" />
          <div>image</div>
          <input type="text" defaultValue={product?.images.join(', ')} name="images" />
          <div>price</div>
          <input type="number" defaultValue={product?.price} name="price" />
          <div>categoryId</div>
          <input type="text" defaultValue={product?.categoryId} name="categoryId" />
          <button type="submit" onClick={() => navigate('/')}>
            Submit
          </button>
        </form>
      )}
    </>
  );
}
