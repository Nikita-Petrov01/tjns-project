import type { ProductT } from '../../entities/products/model/types';
import { deleteById } from '../../entities/products/model/productThunk';
import { useAppDispatch } from '../../shared/lib/hooks';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { deleteFavorite } from '../../entities/favorite/model/favoriteThunks';
import { useState } from 'react';

type Props = {
  product: ProductT;
  rating?: number;
};

export default function ProductCard({ product, rating }: Props): React.ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);

  // const deleteFavoriteHandler = async () => {
  //   try {
  //     await dispatch(deleteFavorite(product.id));
  //   } catch (error) {
  //     console.error('Ошибка удаления избранного товара', error);
  //   }
  // };

  return (
    <Card
      className="h-100 shadow-sm position-relative"
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s',
        minHeight: '400px',
      }}
      onClick={() => navigate(`/products/${product.id.toString()}`)}
    >
      {rating !== undefined && <span className="text-warning fs-6"> ★</span>}
      {rating !== undefined && <span>{rating.toFixed(1)}</span>}
      {/* Кнопки действий */}
      <div className="position-absolute top-0 end-0 p-2 d-flex gap-2 z-1">
        <Button variant="outline-primary" size="sm" title="favorite">
          ❤️
        </Button>

        {/* "❤️ Unlike" : "🤍 Like" */}

        <Button
          variant="outline-primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            void navigate(`/products/edit/${product.id.toString()}`);
          }}
          title="Edit"
        >
          <BiEdit />
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            void dispatch(deleteById(product.id));
          }}
          title="Delete"
        >
          <BiTrash />
        </Button>
      </div>

      {/* Изображение товара */}
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <Card.Img
          variant="top"
          src={product.images[0]}
          alt={product.name}
          className="h-100 object-fit-contain p-2"
        />
      </div>

      {/* Информация о товаре */}
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate">{product.name}</Card.Title>
        <Card.Text
          className="flex-grow-1 text-muted"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.description}
        </Card.Text>
        <Card.Text className="fw-bold fs-5 mt-auto">{product.price.toLocaleString()} ₽</Card.Text>
      </Card.Body>
    </Card>
  );
}
