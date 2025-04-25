import { Button, ButtonGroup } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import type { ProductSliceT } from '../../entities/products/model/types';
import { reverseSortOrder, setSortBy } from '../../entities/products/model/productsSlice';

export default function ProductSortButtons(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((store) => store.products.sortBy);
  const sortOrder = useAppSelector((store) => store.products.sortOrder);

  const keys: ProductSliceT['sortBy'][] = ['price'];

  return (
    <ButtonGroup aria-label="Basic button group">
      {keys.map((key) => (
        <Button
          variant={sortBy === key ? 'contained' : 'outlined'}
          key={key}
          onClick={() => dispatch(setSortBy(key))}
        >
          {key}
        </Button>
      ))}
      <Button onClick={() => dispatch(reverseSortOrder())}> {sortOrder === 1 ? '↑' : '↓'}</Button>
    </ButtonGroup>
  );
}
