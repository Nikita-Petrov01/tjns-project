import type { ProductT } from '../../entities/products/model/types';
import { deleteById } from '../../entities/products/model/productThunk';
import { useAppDispatch } from '../../shared/lib/hooks';
import { useNavigate } from 'react-router';

type Props = {
  product: ProductT;
};

export default function ProductCard({ product }: Props): React.ReactElement {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  // const handleDelete = (): void => {
  //   void dispatch(deleteById(product.id));
  // };

  return (
    <>
      {/* <button onClick={() => navigate('/products/edit')}>update</button>
      <button onClick={() => handleDelete()}>Delete</button> */}
      <div>{product.id}</div>
      <div>{product.name}</div>
      <img src={product.image} alt={product.name} />
    </>
  );
}
