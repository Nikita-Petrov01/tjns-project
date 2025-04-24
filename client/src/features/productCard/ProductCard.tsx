import type { ProductT } from '../../entities/products/model/types';
import { deleteById } from '../../entities/products/model/productThunk';
import { useAppDispatch } from '../../shared/lib/hooks';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';

type Props = {
  product: ProductT;
};

export default function ProductCard({ product }: Props): React.ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (): void => {
    void dispatch(deleteById(product.id));
  };

  return (
    <Card>
      <Button variant="primary" onClick={() => navigate(`/products/edit/${product.id.toString()}`)}>
        update
      </Button>
      {/* <button onClick={() => handleDelete()}>Delete</button> */}
      <Card.Img variant="top" src={product.images[0]} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>{product.price}</Card.Text>
      </Card.Body>
      <Button variant="danger" onClick={() => handleDelete()}>
        Delete
      </Button>
    </Card>
  );
}
